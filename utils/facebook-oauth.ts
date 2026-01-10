import crypto from 'crypto';

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || '';
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || '';
const FACEBOOK_REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/api/auth/facebook/callback';

export function getFacebookAuthUrl() {
  const params = new URLSearchParams({
    client_id: FACEBOOK_APP_ID,
    redirect_uri: FACEBOOK_REDIRECT_URI,
    response_type: 'code',
    scope: 'email,public_profile',
    state: generateState(),
  });

  return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const tokenResponse = await fetch(
    `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(FACEBOOK_REDIRECT_URI)}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`
  );

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to exchange code for token: ${error}`);
  }

  return tokenResponse.json();
}

export async function getFacebookUserInfo(accessToken: string) {
  // Get user info including email and picture
  const userInfoResponse = await fetch(
    `https://graph.facebook.com/v18.0/me?fields=id,name,email,picture&access_token=${accessToken}`
  );

  if (!userInfoResponse.ok) {
    const error = await userInfoResponse.text();
    throw new Error(`Failed to fetch user info: ${error}`);
  }

  return userInfoResponse.json();
}

export function generateState() {
  return crypto.randomBytes(32).toString('hex');
}

export async function verifyState(state: string, sessionState: string) {
  return state === sessionState;
}
