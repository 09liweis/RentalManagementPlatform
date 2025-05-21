// api/sendemail/route.ts

import { NextResponse } from 'next/server';
import { ServerClient } from 'postmark';
import { sendEmail } from '@/lib/email';
import User from '@/models/user';
import { WEBSITE_NAME } from '@/constants/text';

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN || "");
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_URL = process.env.POSTMARK_SENDER_EMAIL;

// Function to generate a random 6-character string
function generateRandomToken(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ err: 'Sorry, Email Address is necessary.' }, { status: 400 });
    }

    const user = await User.findOne({email});
    if (!user) {
      return NextResponse.json({err: 'User Not Found'}, {status: 404});
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // if (!EMAIL_URL) {
    //   throw new Error("POSTMARK_SENDER_EMAIL is not defined");
    // }

    const token = generateRandomToken(6);

    // 创建邮件内容，使用生成的 token 替换链接中的 your_token_here
    const resetLink = `${process.env.HOST}/en-CA/resetpassword?token=${token}`;
    const emailContent = {
      to: email,
      subject: 'Reset your password',
      html: `
        <div style="background-color: #f7fafc; padding: 32px; max-width: 600px; margin: auto; font-family: Arial, sans-serif;">
          <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <p style="color: #4a5568; margin-bottom: 16px;">Hi there,</p>
            <p style="color: #4a5568; margin-bottom: 16px;">
              You have requested to reset your password. To continue, click the button below:
            </p>
            <div style="text-align: center; margin-bottom: 16px;">
              <a href="${resetLink}" style="background-color: #f97316; color: #ffffff; font-weight: bold; padding: 12px 24px; border-radius: 24px; text-decoration: none; display: inline-block;">
                RESET PASSWORD
              </a>
            </div>
            <div>
              or copy and paste this link in your browser:
              ${resetLink}
            </div>
            <p style="color: #718096; text-align: center; font-size: 14px; margin-bottom: 16px;">
              If you received this email in error, you can safely ignore this email.
            </p>
            <p style="color: #4a5568;">
              Please do not hesitate to email to 
              <a href="mailto:help@rentalstudio.com" style="color: #3182ce; text-decoration: underline;">
                help@rentalstudio.com
              </a> if you have any questions.
            </p>
            <p style="color: #4a5568; margin-top: 16px;">Thanks,</p>
            <p style="color: #4a5568; margin-top: 16px;">The ${WEBSITE_NAME} Team</p>
          </div>
        </div>
      `,
    };

    try {
      sendEmail(emailContent);
      return NextResponse.json({ msg: 'The verification code has been sent to your email' }, { status: 200 });
    } catch (error: any) {
      console.error('Error sending email:', error.message, error.response);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid request' }, { status: 400 });
  }
}
