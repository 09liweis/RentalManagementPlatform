//app/api/verification/route.ts

import { NextResponse } from 'next/server';
import { ServerClient } from 'postmark';
import redis from '../../../lib/redis';

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

// 处理 POST 请求
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Sorry, Email Address is necessary.' }, { status: 400 });
    }

    // 创建邮件内容
    const emailContent = {
      From: process.env.POSTMARK_SENDER_EMAIL,
      To: email,
      Subject: 'Reset your password',
      HtmlBody: `
        <div class="bg-gray-100 p-8 max-w-lg mx-auto">
          <div class="text-center mb-4">
            <img src="/images/backgroundImage.jpg" alt="Logo" class="mx-auto mb-4" />
          </div>
          <div class="bg-white p-6 shadow-md rounded">
            <p class="text-gray-700 mb-4">Hi there,</p>
            <p class="text-gray-700 mb-4">
              You have requested to have your password reset for your account. To continue, click the button below:
            </p>
            <div class="text-center mb-4">
              <a href="/login/forgot/reset/emaillink/resetpassword" class="bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600">
                RESET PASSWORD
              </a>
            </div>
            <p class="text-gray-500 text-center text-sm mb-4">
              If you received this email in error, you can safely ignore this email.
            </p>
            <p class="text-gray-700">
              Please do not hesitate to send an email to 
              <a href="mailto:help@rentalstudio.com" class="text-blue-500 hover:underline">
                help@rentalstudio.com
              </a> if you have any questions.
            </p>
            <p class="text-gray-700 mt-4">Thanks,</p>
          </div>
        </div>
      `,
    };

    try {
      console.log('Sending email with Postmark...');
      await client.sendEmail(emailContent);
      return NextResponse.json({ message: 'The verification code has been sent to your email' }, { status: 200 });
    } catch (error) {
      console.error('Error sending email:', error.message, error.response);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
