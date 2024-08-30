import { NextResponse } from 'next/server';
import { ServerClient } from 'postmark';
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
    <div style="background-color: #f7fafc; padding: 32px; max-width: 600px; margin: auto; font-family: Arial, sans-serif;">
<!--      <div style="text-align: center; margin-bottom: 16px;">-->
<!--        <img src="https://your-public-storage-service.com/images/logo.jpg" alt="Logo" style="display: block; margin: auto; margin-bottom: 16px; max-width: 100px;" />-->
<!--      </div>-->
      <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <p style="color: #4a5568; margin-bottom: 16px;">Hi there,</p>
        <p style="color: #4a5568; margin-bottom: 16px;">
          You have requested to reset your password. To continue, click the button below:
        </p>
        <div style="text-align: center; margin-bottom: 16px;">
          <a href="http://localhost:3000/login/forgot/reset/resetpassword?token=your_token_here" style="background-color: #f97316; color: #ffffff; font-weight: bold; padding: 12px 24px; border-radius: 24px; text-decoration: none; display: inline-block;">
            RESET PASSWORD
          </a>
        </div>
        <p style="color: #718096; text-align: center; font-size: 14px; margin-bottom: 16px;">
          If you received this email in error, you can safely ignore this email.
        </p>
        <p style="color: #4a5568;">
          Please do not hesitate to send an email to 
          <a href="mailto:help@rentalstudio.com" style="color: #3182ce; text-decoration: underline;">
            help@rentalstudio.com
          </a> if you have any questions.
        </p>
        <p style="color: #4a5568; margin-top: 16px;">Thanks,</p>
        <p style="color: #4a5568; margin-top: 16px;">The RentalManagementPlatform Team</p>
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
