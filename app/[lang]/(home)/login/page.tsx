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
  const { login, loginUser } = useUserStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <FormWrapper onSubmit={handleLogin}>
      <h1 className="font-bold text-lg">{t('home.LoginAsALandlord')}</h1>
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
          text={t('home.ForgotPassword')}
          href="/forgotpassword"
          className="text-black-800 underline decoration-1 underline-offset-4"
        />
      </nav>

      <Button disabled={loading} handleClick={handleLogin} tl={loading ? <LoadingSpinner /> : t('home.Login')} />
    </FormWrapper>
  );
}

// @ts-ignore
export default Login;
