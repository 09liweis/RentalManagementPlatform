"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useUserStore from "@/stores/userStore";
import useAppStore from "@/stores/appStore";
import FormWrapper from "@/components/common/form/FormWrapper";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";
import FacebookLoginButton from "@/components/login/FacebookLoginButton";
import Divider from "@/components/login/Divider";
import PasswordLoginForm from "@/components/login/PasswordLoginForm";
import CodeLoginForm from "@/components/login/CodeLoginForm";
import LoginMethodToggle from "@/components/login/LoginMethodToggle";

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
  const [codeMessage, setCodeMessage] = useState("");

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

  const handleSendCode = async () => {
    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }

    setCodeLoading(true);
    setCodeMessage("");
    try {
      const response = await fetch('/api/auth/code/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.message || data.msg) {
        setCodeMessage(data.message || data.msg);
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
          <GoogleLoginButton />
          <FacebookLoginButton />
          <Divider text="or continue with email" />
          <PasswordLoginForm
            email={email}
            password={password}
            loading={loading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleLogin}
            t={t}
          />
        </>
      )}

      <LoginMethodToggle
        showCodeLogin={showCodeLogin}
        onToggle={() => {
          setShowCodeLogin(!showCodeLogin);
          setLoginCode('');
          setPassword('');
          setCodeSent(false);
        }}
      />

      {showCodeLogin && (
        <CodeLoginForm
          email={email}
          loginCode={loginCode}
          codeSent={codeSent}
          codeMessage={codeMessage}
          loading={loading}
          codeLoading={codeLoading}
          onEmailChange={setEmail}
          onCodeChange={setLoginCode}
          onSendCode={handleSendCode}
          onResendCode={() => {
            setCodeSent(false);
            setLoginCode('');
            setCodeMessage('');
          }}
          onSubmit={handleVerifyCode}
          t={t}
        />
      )}
    </FormWrapper>
  );
}

// @ts-ignore
export default Login;