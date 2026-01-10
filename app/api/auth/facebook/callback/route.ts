import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import dbConnect from "@/config/db";
import { generateToken } from "@/utils/jwt";
import { exchangeCodeForToken, getFacebookUserInfo } from "@/utils/facebook-oauth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check for OAuth errors
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    if (!code) {
      return NextResponse.json({ error: 'No authorization code received' }, { status: 400 });
    }

    // Exchange code for tokens
    const tokenData = await exchangeCodeForToken(code);

    if (!tokenData.access_token) {
      return NextResponse.json({ error: 'Failed to obtain access token' }, { status: 400 });
    }

    // Get user info from Facebook
    const userInfo = await getFacebookUserInfo(tokenData.access_token);

    await dbConnect();

    // Find or create user
    let user = await User.findOne({ email: userInfo.email?.toLowerCase() });

    if (!user) {
      // Create new user with Facebook info
      user = new User({
        name: userInfo.name,
        email: userInfo.email?.toLowerCase(),
        isVerified: true, // Facebook users are automatically verified
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
    console.error('Facebook OAuth callback error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
