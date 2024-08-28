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

    // 生成6位数验证码
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 存储验证码到 Redis，设置过期时间为10分钟
    try {
      await redis.set(`verificationCode:${email}`, verificationCode, { EX: 600 });
    } catch (err) {
      console.error('Redis set error:', err);
      return NextResponse.json({ error: 'Failed to store verification code' }, { status: 500 });
    }

    // 创建邮件内容
    const emailContent = {
      From: process.env.POSTMARK_SENDER_EMAIL,
      To: email,
      Subject: 'Your verification code',
      TextBody: `Your verification code：${verificationCode}`,
      HtmlBody: `<p>Your verification code：<strong>${verificationCode}</strong></p>`,
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
