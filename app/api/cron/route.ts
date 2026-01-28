import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/user";
import Property from "@/models/property";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import Rent from "@/models/rent";
import { sendEmail } from "@/lib/email";
import { calculateDays } from "@/utils/tenant";

interface EmailResult {
  userId: string;
  name: string;
  email: string;
  success: boolean;
  error?: string;
}

const UNKNOWN_ERROR = 'Unknown error';

export async function GET() {
  try {
    await dbConnect();

    // Update all tenants' rentDays
    const allTenants = await Tenant.find();
    const updatedTenants = [];

    for (const tenant of allTenants) {
      if (tenant.startDate) {
        const rentDays = calculateDays({
          startDate: tenant.startDate,
          endDate: tenant.endDate,
        });

        if (rentDays > 0 && tenant.rentDays !== rentDays) {
          tenant.rentDays = rentDays;
          await tenant.save();
          updatedTenants.push({
            id: tenant._id,
            name: tenant.name,
            rentDays,
          });
        }
      }
    }

    const users = await User.find({isAdmin:true});

    const emailResults: EmailResult[] = [];

    // Get statistics for each user and send email
    for (const user of users) {
      try {
        if (user.email) {
          // Get user's properties
          const properties = await Property.find({ user: user._id });
          const propertyCount = properties.length;

          // Get user's rooms
          const propertyIds = properties.map(p => p._id);
          const rooms = await Room.find({ property: { $in: propertyIds } });
          const roomCount = rooms.length;

          // Get user's tenants
          const roomIds = rooms.map(r => r._id);
          const tenants = await Tenant.find({ room: { $in: roomIds } });
          const tenantCount = tenants.length;

          // Get user's rents
          const tenantIds = tenants.map(t => t._id);
          const rents = await Rent.find({ tenant: { $in: tenantIds } });
          const rentCount = rents.length;

          // Calculate rent statistics
          const paidRents = rents.filter(r => r.status === "paid");
          const unpaidRents = rents.filter(r => r.status === "pending");
          const paidRentCount = paidRents.length;
          const unpaidRentCount = unpaidRents.length;

          const totalIncome = paidRents.reduce((sum, r) => sum + (r.amount || 0), 0);
          const unpaidAmount = unpaidRents.reduce((sum, r) => sum + (r.amount || 0), 0);

          // Get current tenants with their room details
          const currentTenants = tenants.filter(t => t.isCurrent);
          const currentTenantsWithRooms = [];

          for (const tenant of currentTenants) {
            const room = await Room.findById(tenant.room);
            const property = room ? await Property.findById(room.property) : null;

            if (room && property) {
              currentTenantsWithRooms.push({
                name: tenant.name,
                roomName: room.name,
                propertyName: property.name,
                rent: tenant.rent || 0,
                startDate: tenant.startDate,
                endDate: tenant.endDate,
                rentDays: tenant.rentDays || 0,
              });
            }
          }

          const emailContent = `
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
                  .content { background: #f9f9f9; padding: 30px; border-radius: 8px; margin-top: 20px; }
                  .stats { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                  .stat-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                  .stat-item:last-child { border-bottom: none; }
                  .stat-label { font-weight: 600; }
                  .stat-value { color: #667eea; }
                  .success-value { color: #10b981; }
                  .warning-value { color: #f59e0b; }
                  .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Property Statistics Report</h1>
                    <p>Landlord Master - ${new Date().toLocaleDateString()}</p>
                  </div>
                  <div class="content">
                    <p>Dear <strong>${user.name || "User"}</strong>,</p>
                    <p>Here is your property statistics update from <strong>Landlord Master</strong>.</p>

                    <div class="stats">
                      <h3>📊 Portfolio Overview</h3>
                      <div class="stat-item">
                        <span class="stat-label">Properties:</span>
                        <span class="stat-value">${propertyCount}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">Rooms:</span>
                        <span class="stat-value">${roomCount}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">Tenants:</span>
                        <span class="stat-value">${tenantCount}</span>
                      </div>

                      <h3 style="margin-top: 30px;">💰 Rent Statistics</h3>
                      <div class="stat-item">
                        <span class="stat-label">Total Rent Records:</span>
                        <span class="stat-value">${rentCount}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">Paid Rents:</span>
                        <span class="stat-value success-value">${paidRentCount}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">Pending Rents:</span>
                        <span class="stat-value warning-value">${unpaidRentCount}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">Total Income:</span>
                        <span class="stat-value success-value">$${totalIncome.toFixed(2)}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">Unpaid Amount:</span>
                        <span class="stat-value warning-value">$${unpaidAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    ${currentTenantsWithRooms.length > 0 ? `
                      <h3>👥 Current Tenants</h3>
                      <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        ${currentTenantsWithRooms.map((tenant, index) => `
                          <div style="padding: 15px; ${index < currentTenantsWithRooms.length - 1 ? 'border-bottom: 1px solid #eee;' : ''}">
                            <div style="font-weight: 600; font-size: 16px; color: #333; margin-bottom: 8px;">
                              ${tenant.name}
                            </div>
                            <div style="font-size: 16px; color: #666; line-height: 1.8;">
                              <div><strong>🏠 Property:</strong> ${tenant.propertyName}</div>
                              <div><strong>🚪 Room:</strong> ${tenant.roomName}</div>
                              <div><strong>💵 Monthly Rent:</strong> $${tenant.rent.toFixed(2)}</div>
                              <div><strong>📅 Lease Period:</strong> ${tenant.startDate}${tenant.endDate ? ` - ${tenant.endDate}` : ' - Present'}</div>
                              <div><strong>⏱️ Rent Days:</strong> ${tenant.rentDays} days</div>
                            </div>
                          </div>
                        `).join('')}
                      </div>
                    ` : `
                      <div style="background: #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; color: #666;">
                        <strong>No current tenants</strong>
                      </div>
                    `}

                    <p>This is an automated report sent by our cron job system.</p>
                    <p>You can view more details in your <strong>dashboard</strong>.</p>

                    ${unpaidRentCount > 0 ? `
                      <p style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <strong>⚠️ Action Required:</strong> You have ${unpaidRentCount} unpaid rent record(s) totaling $${unpaidAmount.toFixed(2)}. Please follow up with your tenants.
                      </p>
                    ` : ''}

                    <p style="color: #666; font-size: 14px;">
                      If you have any questions or need assistance, please contact our support team.
                    </p>
                  </div>
                  <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Landlord Master. All rights reserved.</p>
                    <p>This is an automated email, please do not reply.</p>
                  </div>
                </div>
              </body>
            </html>
          `;

          await sendEmail({
            to: user.email,
            subject: `Landlord Master - Property Daily Report - ${new Date().toLocaleDateString()}`,
            html: emailContent,
          });

          emailResults.push({
            userId: user._id.toString(),
            name: user.name || "",
            email: user.email,
            success: true,
          });
        }
      } catch (error) {
        emailResults.push({
          userId: user._id.toString(),
          name: user.name || "",
          email: user.email || "",
          success: false,
          error: error instanceof Error ? error.message : UNKNOWN_ERROR,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Successfully processed cron jobs",
      scanDate: new Date().toISOString(),
      tenantStats: {
        totalTenants: allTenants.length,
        updatedTenants: updatedTenants.length,
        updates: updatedTenants,
      },
      emailStats: {
        totalUsers: users.length,
        emailsSent: emailResults.filter(r => r.success).length,
        emailsFailed: emailResults.filter(r => !r.success).length,
        results: emailResults,
      },
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send user emails",
        error: error instanceof Error ? error.message : UNKNOWN_ERROR,
      },
      { status: 500 }
    );
  }
}
