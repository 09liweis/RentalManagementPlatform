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

    const users = await User.find();
    const emailResults: EmailResult[] = [];

    for (const user of users) {
      try {
        if (user.email) {
          const emailContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.7;
                  color: #2c3e50;
                  margin: 0;
                  padding: 0;
                  background-color: #f8f9fa;
                }
                .wrapper {
                  background-color: #f8f9fa;
                  padding: 40px 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: white;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.05);
                }
                .header {
                  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
                  padding: 50px 40px;
                  text-align: center;
                  color: white;
                }
                .header h1 {
                  margin: 0 0 10px 0;
                  font-size: 28px;
                  font-weight: 700;
                  letter-spacing: -0.5px;
                }
                .header p {
                  margin: 0;
                  font-size: 14px;
                  opacity: 0.9;
                }
                .content {
                  padding: 40px;
                }
                .greeting {
                  font-size: 16px;
                  margin-bottom: 20px;
                  color: #4a5568;
                }
                .intro {
                  font-size: 16px;
          margin-bottom: 35px;
                  color: #2d3748;
                  line-height: 1.8;
                }
                .feature {
                  background: white;
                  padding: 28px;
                  border-radius: 10px;
                  margin: 24px 0;
                  border: 1px solid #e2e8f0;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
                  transition: box-shadow 0.3s ease;
                }
                .feature:hover {
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
                }
                .feature-header {
                  display: flex;
                  align-items: center;
                  margin-bottom: 14px;
                }
                .feature-icon {
                  width: 48px;
                  height: 48px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  border-radius: 12px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 22px;
                  margin-right: 16px;
                  flex-shrink: 0;
                }
                .feature-icon.code {
                  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                }
                .feature-title {
                  font-size: 18px;
                  font-weight: 700;
                  color: #1a365d;
                  margin: 0;
                }
                .feature-desc {
                  font-size: 15px;
                  color: #4a5568;
                  line-height: 1.7;
                  margin: 0;
                }
                .feature-desc ul {
                  margin: 16px 0 0 0;
                  padding-left: 20px;
                }
                .feature-desc li {
                  margin-bottom: 8px;
                  color: #4a5568;
                }
                .feature-desc li:last-child {
                  margin-bottom: 0;
                }
                .security-note {
                  background: linear-gradient(135deg, #f0f4ff 0%, #e8efff 100%);
                  border-left: 4px solid #667eea;
                  padding: 24px;
                  border-radius: 8px;
                  margin: 30px 0;
                }
                .security-note strong {
                  color: #1a365d;
                  font-weight: 700;
                }
                .cta-box {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  padding: 28px;
                  border-radius: 10px;
                  text-align: center;
                  margin: 30px 0;
                }
                .cta-box p {
                  margin: 0 0 16px 0;
                  font-size: 16px;
                  color: white;
                }
                .cta-button {
                  display: inline-block;
                  padding: 14px 32px;
                  background: white;
                  color: #667eea;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: 700;
                  font-size: 15px;
                  transition: all 0.3s ease;
                }
                .cta-button:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                }
                .support-text {
                  color: #718096;
                  font-size: 14px;
                  text-align: center;
                  margin: 30px 0 0 0;
                }
                .footer {
                  background: #f8f9fa;
                  padding: 30px 40px;
                  text-align: center;
                  border-top: 1px solid #e2e8f0;
                }
                .footer p {
                  margin: 6px 0;
                  color: #a0aec0;
                  font-size: 13px;
                }
                .footer a {
                  color: #667eea;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="header">
                    <h1>New Features Available</h1>
                    <p>Landlord Master • ${new Date().toLocaleDateString()}</p>
                  </div>
                  <div class="content">
                    <p class="greeting">Dear ${user.name || "User"},</p>
                    <p class="intro">We're excited to announce new login options that make accessing your account easier and more secure than ever before.</p>

                    <div class="feature">
                      <div class="feature-header">
                        <div class="feature-icon">🔐</div>
                        <h3 class="feature-title">Google Login</h3>
                      </div>
                      <p class="feature-desc">Log in securely with your Google account. No need to remember another password. Simply click the "Sign in with Google" button on the login page for instant access.</p>
                    </div>

                    <div class="feature">
                      <div class="feature-header">
                        <div class="feature-icon code">📧</div>
                        <h3 class="feature-title">Login with Code</h3>
                      </div>
                      <p class="feature-desc">Access your account using a secure 6-digit code sent to your email. Perfect for users who prefer passwordless authentication.
                      <ul>
                        <li>Click "Login with code instead"</li>
                        <li>Enter your email address</li>
                        <li>Receive a 6-digit code (valid for 5 minutes)</li>
                        <li>Enter the code to access your account</li>
                      </ul>
                      </p>
                    </div>

                    <div class="security-note">
                      <strong>Security & Convenience Combined:</strong> Both login methods use industry-standard OAuth 2.0 and secure token-based authentication, ensuring your data stays safe while providing you with seamless access.
                    </div>

                    <div class="cta-box">
                      <p>Ready to try the new login methods?</p>
                      <a href="https://landlordmaster.com/login" class="cta-button">Go to Login Page</a>
                    </div>

                    <p class="support-text">If you have any questions or need assistance, please contact our support team.</p>
                  </div>
                  <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Landlord Master. All rights reserved.</p>
                    <p>This is an automated email. Please do not reply.</p>
                  </div>
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
