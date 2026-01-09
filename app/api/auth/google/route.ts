import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthUrl, generateState } from "@/utils/google-oauth";

export async function GET(request: NextRequest) {
  const state = generateState();
  const authUrl = getGoogleAuthUrl();

  // Return the auth URL
  return NextResponse.json({
    authUrl,
    state,
  });
}