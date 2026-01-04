import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import connect from "@/config/db";
import { generateToken } from "@/utils/jwt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email.trim()) {
      return NextResponse.json({ err: "Email is required" }, { status: 400 });
    }
    if (!password.trim()) {
      return NextResponse.json({ err: "Password is required" }, { status: 400 });
    }

    await connect();

    let existingUser = await User.findOne({ email:email.toLowerCase() });

    if (!existingUser) {
      return NextResponse.json(
        { err: "User not found, please sign up" },
        { status: 400 },
      )
    } else {
      const validPassword = await bcryptjs.compare(
        password,
        existingUser.password
      );

      if (!validPassword) {
        return NextResponse.json(
          { err: "Invalid password" },
          { status: 401 },
        );
      }
    }

    await User.findByIdAndUpdate(existingUser._id, { lts: new Date() });

    const token = generateToken(existingUser._id);

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token,
      locale: existingUser.locale
    });
    // response.cookies.set("token", token, {
    //   httpOnly: true,
    // });
    return response;
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
