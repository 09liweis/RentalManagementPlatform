"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { showToast } from "@/components/common/Toast";
import useAppStore from "@/stores/appStore";
import useUserStore from "@/stores/userStore";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { curLocale } = useAppStore();
  const { fetchUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const oauthError = searchParams.get('error');

        if (oauthError) {
          setError(oauthError);
          setLoading(false);
          return;
        }

        if (!code) {
          setError('No authorization code received');
          setLoading(false);
          return;
        }

        // Call the Google callback API
        const response = await fetch(`/api/auth/google/callback?code=${code}&state=${state || ''}`);

        if (!response.ok) {
          const errorText = await response.text();
          setError(errorText || 'Authentication failed');
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data.success && data.token) {
          // Store token in localStorage
          localStorage.setItem('auth-token', data.token);
          if (data.user?.locale) {
            localStorage.setItem('locale', data.user.locale);
          }

          showToast('Login Successful');
          await fetchUser();

          // Redirect to dashboard
          router.push(`/${data.user?.locale || curLocale}/dashboard`);
        } else {
          setError('Authentication failed');
          setLoading(false);
        }
      } catch (err) {
        console.error('Google callback error:', err);
        setError('An error occurred during authentication');
        setLoading(false);
      }
    };

    handleGoogleCallback();
  }, [searchParams, router, curLocale, fetchUser]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push(`/${curLocale}/login`)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Completing sign in with Google...</p>
      </div>
    </div>
  );
}
