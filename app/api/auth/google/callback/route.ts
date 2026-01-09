import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import dbConnect from "@/config/db";
import { generateToken } from "@/utils/jwt";
import { exchangeCodeForToken, getGoogleUserInfo } from "@/utils/google-oauth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check for OAuth errors
    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/login?error=no_code', request.url)
      );
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForToken(code);

    // Get user info from Google
    const userInfo = await getGoogleUserInfo(tokens.access_token);

    await dbConnect();

    // Find or create user
    let user = await User.findOne({ email: userInfo.email.toLowerCase() });

    if (!user) {
      // Create new user with Google info
      user = new User({
        name: userInfo.name,
        email: userInfo.email.toLowerCase(),
        isVerified: true, // Google users are automatically verified
        isDelete: 0,
        ts: new Date(),
        mt: new Date(),
        lts: new Date(),
        locale: 'en',
      });
      await user.save();
    } else {
      // Update last login time
      user.lts = new Date();
      await user.save();
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Return success response with token
    return NextResponse.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        locale: user.locale,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/login?error=oauth_failed', request.url)
    );
  }
}
