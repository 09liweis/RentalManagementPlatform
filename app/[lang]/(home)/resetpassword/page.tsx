//login/forgot/reset/resetpassword/page.tsx
"use client";

import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import Button from "@/components/common/Button";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryToken = searchParams.get('token');
    if (queryToken) {
      setToken(queryToken);
    } else {
      setMessage('Invalid or missing token');
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (!token) {
      setMessage('Invalid token');
      return;
    }

    const response = await fetch('/api/resetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token, password}),
    });

    if (response.ok) {
      setMessage('Password reset successful');
      router.push('/login');
    } else {
      let data;
      try {
        data = await response.json();
      } catch (error: any) {
        console.error('Error parsing JSON response:', error.message);
        setMessage('An error occurred while processing your request.');
        return;
      }
      setMessage(`Error: ${data.error}`);
    }
  };

  if (!token && !message) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative z-10 bg-white p-8 rounded-lg max-w-md w-full shadow-xl">
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
          <Button
            type="submit"
            size="lg"
            fullWidth
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}