"use client";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useUserStore from "@/stores/userStore";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useAppStore from "@/stores/appStore";
import LinkText from "@/components/common/LinkText";
import FormWrapper from "@/components/common/form/FormWrapper";

function Login() {
  const {t, curLocale} = useAppStore();
  const { login, loginUser, fetchUser } = useUserStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [showCodeLogin, setShowCodeLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { err,locale } = await login({ email, password });
    if (!err) {
      router.push(`/${locale||curLocale}/dashboard`);
    } else {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if (loginUser.email) {
      return router.push(`/${curLocale}/dashboard`);
    }
  },[loginUser]);

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('/api/auth/google');
      const data = await response.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await fetch('/api/auth/facebook');
      const data = await response.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };

  const handleSendCode = async () => {
    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }

    setCodeLoading(true);
    try {
      const response = await fetch('/api/auth/code/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.message || data.msg) {
        alert(data.message || data.msg);
        setShowCodeLogin(true);
        setCodeSent(true);
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error sending login code:', error);
      alert('Failed to send login code. Please try again.');
    } finally {
      setCodeLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/code/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: loginCode }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem('auth-token', data.token);
        if (data.user?.locale) {
          localStorage.setItem('locale', data.user.locale);
        }

        fetchUser();
        router.push(`/${data.user?.locale || curLocale}/dashboard`);
      } else if (data.error) {
        alert(data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('Failed to verify code. Please try again.');
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={showCodeLogin ? handleVerifyCode : handleLogin}>
      <h1 className="font-bold text-lg">{t('home.LoginAsALandlord')}</h1>

      {!showCodeLogin && (
        <>
          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>

          {/* Facebook Login Button */}
          <button
            type="button"
            onClick={handleFacebookLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-gray-700 font-medium">Sign in with Facebook</span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          <Input
            autoFocus={true}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('home.Email')}
            value={email}
          />
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('home.Password')}
            value={password}
          />

          <nav className="text-right">
            <LinkText
              href="/forgotpassword"
            >
              {t('home.ForgotPassword')}
            </LinkText>
          </nav>

          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : t('home.Login')}
          </Button>
        </>
      )}

      {/* Toggle between login methods */}
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => {
            setShowCodeLogin(!showCodeLogin);
            setLoginCode('');
            setPassword('');
            setCodeSent(false);
          }}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {showCodeLogin ? '← Back to password login' : 'Login with code instead'}
        </button>
      </div>

      {/* Code Login Section */}
      {showCodeLogin && (
        <div className="mt-4 space-y-3">
          {!codeSent ? (
            <>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('home.Email')}
                value={email}
              />
              <Button
                type="button"
                onClick={handleSendCode}
                size="lg"
                fullWidth
                disabled={codeLoading}
              >
                {codeLoading ? <LoadingSpinner /> : 'Send Login Code'}
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 text-center">
                Enter the 6-digit code sent to {email}
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter 6-digit code</label>
                <input
                  type="text"
                  maxLength={6}
                  onChange={(e) => setLoginCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  value={loginCode}
                  autoFocus
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-300 text-center text-2xl tracking-widest"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : 'Verify & Login'}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setCodeSent(false);
                  setLoginCode('');
                }}
                className="w-full text-sm text-gray-600 hover:text-blue-600 text-center mt-2"
              >
                Resend Code
              </button>
            </>
          )}
        </div>
      )}
    </FormWrapper>
  );
}

// @ts-ignore
export default Login;