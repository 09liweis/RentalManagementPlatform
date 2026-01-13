"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import LinkText from "@/components/common/LinkText";

interface PasswordLoginFormProps {
  email: string;
  password: string;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  t: (key: string) => string;
}

export default function PasswordLoginForm({
  email,
  password,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  t,
}: PasswordLoginFormProps) {
  return (
    <>
      <Input
        autoFocus={true}
        type="email"
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder={t('home.Email')}
        value={email}
      />
      <Input
        type="password"
        onChange={(e) => onPasswordChange(e.target.value)}
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
  );
}
