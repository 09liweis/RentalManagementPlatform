import redis from '../../../lib/redis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Sorry, Email Address is necessary' });
    }

    try {
      const storedCode = await redis.get(`verificationCode:${email}`);

      if (storedCode === code) {
        // 验证成功，删除验证码
        await redis.del(`verificationCode:${email}`);
        res.status(200).json({ message: 'Verification code verification successful.' });
      } else {
        res.status(400).json({ error: 'Verification code is wrong or has expired.' });
      }
    } catch (err) {
      console.error('Redis get error:', err);
      res.status(500).json({ error: 'Authentication failed.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
