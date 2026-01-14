import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import Tenant from "@/models/tenant";
import { calculateDays } from "@/utils/tenant";

export async function GET() {
  try {
    await dbConnect();

    const tenants = await Tenant.find();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tenantStats = [];

    for (const tenant of tenants) {
      if (tenant.startDate) {
        const startDate = new Date(tenant.startDate);
        startDate.setHours(0, 0, 0, 0);

        let calculatedEndDate: Date;

        // Calculate end date for display purposes
        if (tenant.endDate) {
          calculatedEndDate = new Date(tenant.endDate);
          calculatedEndDate.setHours(0, 0, 0, 0);
        } else {
          // If no end date and start date is not in the future, use today as end date
          if (startDate <= today) {
            calculatedEndDate = today;
          } else {
            // Start date is in the future, use start date as end date
            calculatedEndDate = startDate;
          }
        }

        // Calculate days using utility function
        const days = calculateDays({
          startDate: tenant.startDate,
          endDate: tenant.endDate,
        });

        tenantStats.push({
          id: tenant._id,
          name: tenant.name,
          startDate: tenant.startDate,
          endDate: tenant.endDate || (startDate <= today ? today.toISOString().split('T')[0] : null),
          calculatedEndDate: calculatedEndDate.toISOString().split('T')[0],
          days,
        });

        if (days > 0) {
          tenant.rentDays = days;
          await tenant.save();
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Successfully calculated tenant rental days",
      totalTenants: tenants.length,
      tenantsWithDays: tenantStats.length,
      stats: tenantStats,
    });

  } catch (err: any) {
    console.error("Cron stats error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to calculate tenant rental days",
        error: err?.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}