import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      //register
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      existingUser = await newUser.save();
    } else {
      const validPassword = await bcryptjs.compare(
        password,
        existingUser.password,
      );

      if (!validPassword) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 400 },
        );
      }
      existingUser = { ...existingUser };
    }

    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };
    const token = jwt.sign(tokenData, "rental-management-platform", {
      expiresIn: "1d",
    });
    //TODO: set secret on env, set expired

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token,
    });
    // response.cookies.set("token", token, {
    //   httpOnly: true,
    // });
    return response;
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
