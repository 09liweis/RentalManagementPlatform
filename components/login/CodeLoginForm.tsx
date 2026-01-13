"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface CodeLoginFormProps {
  email: string;
  loginCode: string;
  codeSent: boolean;
  codeMessage: string;
  loading: boolean;
  codeLoading: boolean;
  onEmailChange: (email: string) => void;
  onCodeChange: (code: string) => void;
  onSendCode: () => void;
  onResendCode: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  t: (key: string) => string;
}

export default function CodeLoginForm({
  email,
  loginCode,
  codeSent,
  codeMessage,
  loading,
  codeLoading,
  onEmailChange,
  onCodeChange,
  onSendCode,
  onResendCode,
  onSubmit,
  t,
}: CodeLoginFormProps) {
  return (
    <div className="mt-4 space-y-3">
      {!codeSent ? (
        <>
          <Input
            type="email"
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder={t('home.Email')}
            value={email}
          />
          <Button
            type="button"
            onClick={onSendCode}
            size="lg"
            fullWidth
            disabled={codeLoading}
          >
            {codeLoading ? <LoadingSpinner /> : 'Send Login Code'}
          </Button>
        </>
      ) : (
        <>
          {codeMessage && (
            <p className="text-sm text-green-600 text-center font-medium">
              ✓ {codeMessage}
            </p>
          )}
          <p className="text-sm text-gray-600 text-center">
            Enter the 6-digit code sent to {email}
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter 6-digit code</label>
            <input
              type="text"
              maxLength={6}
              onChange={(e) => onCodeChange(e.target.value)}
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
            onClick={onResendCode}
            className="w-full text-sm text-gray-600 hover:text-blue-600 text-center mt-2"
          >
            Resend Code
          </button>
        </>
      )}
    </div>
  );
}
