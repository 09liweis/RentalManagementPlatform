import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { decodeToken, generateToken } from "@/utils/jwt";
import connect from "@/config/db";
import { sendResponse } from "@/utils/http";

export async function POST(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await connect();
    const { locale } = await request.json();

    const user = await User.findOne(
      { _id: verified.userId },
      "name email phone address locale roles isAdmin plan",
    );

    if (locale) {
      user.locale = locale;
      await user.save();
    }

    const refreshToken = generateToken(verified.userId);

    return NextResponse.json({ user, refreshToken }, { status: 200 });
  } catch (err) {
    return sendResponse({ response: { err }, status: 500 });
  }
}
