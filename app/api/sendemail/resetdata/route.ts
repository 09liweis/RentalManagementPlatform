// api/email/reset/reset_password.js
import bcrypt from 'bcryptjs';
import clientPromise from '../../../../config/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('db');

    // 通过bcrypt加密新密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 更新数据库中对应用户的密码
    const result = await db.collection('users').updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Failed to reset password. User not found.' });
    }

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
