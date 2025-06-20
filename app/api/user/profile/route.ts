import { NextRequest, NextResponse } from "next/server";
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

    const { name, email, phone, address, locale } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return NextResponse.json(
        { err: "Invalid email format" },
        { status: 400 },
      );
    }

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: verified.userId },
      });

      if (existingUser) {
        return NextResponse.json(
          { err: "Email already in use" },
          { status: 400 },
        );
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email.toLowerCase();
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (locale !== undefined) updateData.locale = locale;

    const updatedUser = await User.findByIdAndUpdate(
      verified.userId,
      updateData,
      { new: true, select: "name email phone address locale" },
    );

    if (!updatedUser) {
      return NextResponse.json({ err: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        msg: "Profile updated successfully",
        user: updatedUser,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json({ err: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not authorized" }, { status: 401 });
    }

    await connect();

    const user = await User.findById(
      verified.userId,
      "name email phone address locale isVerified ct",
    );

    if (!user) {
      return NextResponse.json({ err: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("Profile fetch error:", err);
    return NextResponse.json({ err: "Internal server error" }, { status: 500 });
  }
}
