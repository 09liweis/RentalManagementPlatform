import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connect from "@/config/db";
import { generateToken } from "@/utils/jwt";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 }
      );
    }

    await connect();

    // Find user by email
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // User doesn't exist, create a new user
      user = new User({
        email: email.toLowerCase(),
        name: email.split('@')[0], // Use email prefix as name
        isVerified: true, // Auto-verify code login users
        isDelete: 0,
        ts: new Date(),
        mt: new Date(),
        lts: new Date(),
        locale: 'en',
      });
    } else {
      // Verify login code
      if (!user.loginCode || user.loginCode !== code) {
        return NextResponse.json(
          { error: "Invalid login code" },
          { status: 400 }
        );
      }

      // Check if code has expired
      if (!user.loginCodeExpiry || new Date() > user.loginCodeExpiry) {
        return NextResponse.json(
          { error: "Login code has expired. Please request a new one." },
          { status: 400 }
        );
      }

      // Clear the used login code
      user.loginCode = undefined;
      user.loginCodeExpiry = undefined;
      user.lts = new Date(); // Update last login time
    }

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        locale: user.locale,
        isVerified: user.isVerified,
      },
    });
  } catch (error: any) {
    console.error("Error verifying login code:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify login code" },
      { status: 500 }
    );
  }
}
