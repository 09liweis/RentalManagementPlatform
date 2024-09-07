import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";

/**
 * @swagger
 * /api/signup:
 *   post:
 *     description: Sign up landlord
 *     responses:
 *       200:
 *         description: Sign up successfully!
 *       400:
 *         description: Email Already Registered
 */
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

      const response = NextResponse.json(
          {err: "Already Registered"},
          {status: 400},
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
