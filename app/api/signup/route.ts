import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
import connect from "@/config/db";
import { sendEmail } from "@/lib/email";
import { WEBSITE_NAME } from "@/constants/text";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email.trim()) {
      return NextResponse.json({ err: "Email is required" }, { status: 400 });
    }

    if (!password.trim()) {
      return NextResponse.json(
        { err: "Password is required" },
        { status: 400 },
      );
    }

    await connect();

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      //register
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        email,
        password: hashedPassword,
        ts: new Date(),
        mt: new Date()
      });

      existingUser = await newUser.save();
      sendEmail({
        to: email,
        subject: `Welcome to ${WEBSITE_NAME}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333;">Welcome to ${WEBSITE_NAME}!</h2>
            <p>Thank you for signing up. We're excited to have you on board.</p>
            <p>Your account has been successfully created with the email: <strong>${email}</strong></p>
            <p>Start exploring our platform and discover all the features we offer.</p>
            <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
              If you did not request this account, please ignore this email.
            </p>
          </div>
        `,
      });
      return NextResponse.json(
        { msg: "Sign up successfully!" },
        { status: 200 },
      );
    } else {
      const response = NextResponse.json(
        { err: "Already Registered" },
        { status: 400 },
      );
      // response.cookies.set("token", token, {
      //   httpOnly: true,
      // });
      return response;
    }
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}