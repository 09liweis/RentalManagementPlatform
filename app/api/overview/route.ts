import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import { getStats } from "@/services/stats";
import connect from "@/config/db";

export async function GET(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await connect();

    const date = request.nextUrl.searchParams.get("date") || "";
    const stats = await getStats({ userId: verified.userId, date });
    return NextResponse.json(stats, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
