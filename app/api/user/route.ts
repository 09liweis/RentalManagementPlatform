import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { decodeToken } from "@/utils/jwt";
import connect from "@/config/db";

export async function GET(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await connect();

    const user = await User.findOne({ _id: verified.userId },'email roles');
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}