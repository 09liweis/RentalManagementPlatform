import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
import { decodeToken } from "@/utils/jwt";
import connect from "@/config/db";

export async function PUT(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not authorized" }, { status: 401 });
    }

    await connect();

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          err: "Current password and new password are required",
        },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        {
          err: "New password must be at least 6 characters long",
        },
        { status: 400 },
      );
    }

    const user = await User.findById(verified.userId);

    if (!user) {
      return NextResponse.json({ err: "User not found" }, { status: 404 });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcryptjs.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { err: "Current password is incorrect" },
        { status: 400 },
      );
    }

    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

    // Update password
    await User.findByIdAndUpdate(verified.userId, {
      password: hashedNewPassword,
    });

    return NextResponse.json(
      {
        msg: "Password updated successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Password update error:", err);
    return NextResponse.json({ err: "Internal server error" }, { status: 500 });
  }
}
