import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connect from "@/config/db";
import { sendEmail } from "@/lib/email";
import crypto from "crypto";

// Function to generate a 6-digit numeric code
function generateLoginCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await connect();

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // For security, still return success even if user doesn't exist
      // This prevents email enumeration attacks
      return NextResponse.json(
        { message: "If the email exists, a login code has been sent" },
        { status: 200 }
      );
    }

    // Generate 6-digit login code
    const loginCode = generateLoginCode();
    const loginCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save login code to user document
    user.loginCode = loginCode;
    user.loginCodeExpiry = loginCodeExpiry;
    await user.save();

    // Send email with login code
    const emailContent = {
      to: email,
      subject: "Your Login Code",
      html: `
        <div style="background-color: #f7fafc; padding: 32px; max-width: 600px; margin: auto; font-family: Arial, sans-serif;">
          <div style="background-color: #ffffff; padding: 32px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
            <h2 style="color: #2d3748; margin-bottom: 24px;">Your Login Code</h2>
            <p style="color: #4a5568; margin-bottom: 24px;">
              Use the following code to sign in to your account. This code will expire in 15 minutes.
            </p>
            <div style="background-color: #f7fafc; padding: 24px; border-radius: 8px; margin: 24px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #3182ce; letter-spacing: 8px;">
                ${loginCode}
              </span>
            </div>
            <p style="color: #718096; font-size: 14px; margin-bottom: 16px;">
              If you didn't request this code, you can safely ignore this email.
            </p>
            <p style="color: #718096; font-size: 14px;">
              Please do not hesitate to contact support if you have any questions.
            </p>
          </div>
        </div>
      `,
    };

    try {
      await sendEmail(emailContent);
      return NextResponse.json(
        { message: "Login code sent to your email" },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error("Error sending login code email:", emailError);
      return NextResponse.json(
        { error: "Failed to send login code email" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error sending login code:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send login code" },
      { status: 500 }
    );
  }
}
