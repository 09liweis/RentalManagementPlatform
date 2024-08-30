//login/forgot/reset/resetpassword
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const queryToken = router.query.token as string;
      if (queryToken) {
        setToken(queryToken);
      } else {
        setMessage('Invalid or missing token');
      }
    }
  }, [router.isReady, router.query]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (!token) {
      setMessage('Invalid token');
      return;
    }

    const response = await fetch('/api/sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    if (response.ok) {
      setMessage('Password reset successful');
      router.push('/login');
    } else {
      const data = await response.json();
      setMessage(`Error: ${data.error}`);
    }
  };

  if (!token && !message) {
    console.log("token: ",{token},";","message:",{message});
    return <p>Loading...</p>; // 或者显示其他加载状态
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
         style={{ backgroundImage: "url('/images/backgroundImage.jpg')" }}>

      <div className="absolute inset-0 bg-blue-500 opacity-70"></div>

      <div className="relative z-10 bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          {message && <p className="text-center text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
