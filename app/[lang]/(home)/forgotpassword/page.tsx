'use client';
import { useState } from 'react';
import useAppStore from '@/stores/appStore';
import { fetchData } from '@/utils/http';

export default function ForgotPassword() {
  const {t} = useAppStore();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {err} = await fetchData({url:'/api/sendemail',body:{email},method:'POST'});

    let msg = 'Verification code sent to your email.';
    if (err) {
      msg = `Error: ${err}`;
    }
    setMessage(msg);
  };

  return (
  
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        {t('home.ForgotPassword')}?
      </h2>
      <p className="text-gray-600 text-center">
        {t('home.DontWorry')}
      </p>
      <input
        type="email"
        placeholder={t('home.Email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        {t('home.ResetPassword')}
      </button>
      {message && <p className="text-center mt-4 text-green-500">{message}</p>}
    </form>

  );
}

