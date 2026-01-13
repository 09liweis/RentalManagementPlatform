import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/user";
import { sendEmail } from "@/lib/email";

interface EmailResult {
  userId: string;
  name: string;
  email: string;
  success: boolean;
  error?: string;
}

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find({isAdmin:true});
    const emailResults: EmailResult[] = [];

    for (const user of users) {
      try {
        if (user.email) {
          const emailContent = `
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
                  .content { background: #f9f9f9; padding: 30px; border-radius: 8px; margin-top: 20px; }
                  .feature { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #667eea; }
                  .feature-title { font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 10px; }
                  .feature-desc { font-size: 14px; color: #555; }
                  .icon { font-size: 24px; margin-right: 10px; }
                  .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>🎉 Exciting New Features!</h1>
                    <p>Landlord Master - ${new Date().toLocaleDateString()}</p>
                  </div>
                  <div class="content">
                    <p>Dear <strong>${user.name || "User"}</strong>,</p>
                    <p>We're excited to announce new login options that make accessing your account easier and more secure than ever!</p>

                    <div class="feature">
                      <div class="feature-title">
                        <span class="icon">🔐</span>Google Login
                      </div>
                      <div class="feature-desc">
                        Log in securely with your Google account. No need to remember another password! Simply click the "Sign in with Google" button on the login page.
                      </div>
                    </div>

                    <div class="feature" style="border-left-color: #10b981;">
                      <div class="feature-title" style="color: #10b981;">
                        <span class="icon">📧</span>Login with Code
                      </div>
                      <div class="feature-desc">
                        Access your account using a secure 6-digit code sent to your email. Perfect for users who prefer passwordless authentication!
                        <br><br>
                        <strong>How it works:</strong>
                        <ul style="margin-top: 10px; padding-left: 20px;">
                          <li>Click "Login with code instead"</li>
                          <li>Enter your email address</li>
                          <li>Receive a 6-digit code (valid for 5 minutes)</li>
                          <li>Enter the code to access your account</li>
                        </ul>
                      </div>
                    </div>

                    <p style="margin-top: 25px;">
                      <strong>Security & Convenience Combined:</strong> Both login methods use industry-standard OAuth 2.0 and secure token-based authentication, ensuring your data stays safe while providing you with seamless access.
                    </p>

                    <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                      <p style="margin: 0; font-size: 14px;">
                        <strong>Ready to try?</strong> Visit the <a href="${process.env.HOST}/login" style="color: #667eea; font-weight: bold;">login page</a> and choose your preferred method.
                      </p>
                    </div>

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
            subject: `🎉 New Login Features - Google & Code Login Available!`,
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
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Successfully sent new feature announcement emails",
      sentDate: new Date().toISOString(),
      totalUsers: users.length,
      emailsSent: emailResults.filter(r => r.success).length,
      emailsFailed: emailResults.filter(r => !r.success).length,
      results: emailResults,
    });
  } catch (error) {
    console.error("Cron send-emails error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send feature announcement emails",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
