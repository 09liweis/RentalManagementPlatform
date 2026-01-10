import { NextRequest, NextResponse } from "next/server";
import { getFacebookAuthUrl } from "@/utils/facebook-oauth";

export async function GET(request: NextRequest) {
  const authUrl = getFacebookAuthUrl();

  // Return the auth URL
  return NextResponse.json({
    authUrl,
  });
}
