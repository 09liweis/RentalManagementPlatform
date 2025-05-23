"use client";

import { showToast } from "@/components/common/Toast";
import Input from "@/components/common/Input";
import { fetchData } from "@/utils/http";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { EMAIL } from "@/constants/text";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Link from "next/link";
import useAppStore from "@/stores/appStore";
import LinkText from "@/components/common/LinkText";
import FormWrapper from "@/components/common/form/FormWrapper";

function Signup() {

  const {t} = useAppStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const {msg,err} = await fetchData({url:"/api/signup",method:"POST",body:{email,password}});
    setLoading(false);

    showToast(msg || err);
    if (!err) {
      router.push("/login");
    }
  };
  return (
    <FormWrapper onSubmit={handleSignup}>

      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {t('home.SignupAsALandlord')}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('home.JoinOurCommunity') || 'Join our community of landlords'}
        </p>
      </div>
      
      <div className="space-y-6 relative z-10">
        <div className="relative">
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('home.Email')}
            value={email}
          />
        </div>
        <div className="relative">
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('home.Password')}
            value={password}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <LinkText 
              href={'/login'} 
              text={t('home.HaveAlreadyRegister')}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:-translate-y-0.5"
          disabled={loading}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-purple-500 group-hover:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
          {loading ? <LoadingSpinner /> : t('home.Signup')}
        </button>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            {t('home.BySigningUp') || 'By signing up, you agree to our'}{' '}
            <Link href="/terms" className="text-purple-600 hover:text-purple-500">
              {t('home.Terms') || 'Terms'}
            </Link>{' '}
            {t('home.And') || 'and'}{' '}
            <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
              {t('home.Privacy') || 'Privacy Policy'}
            </Link>
          </p>
        </div>
      </div>
    </FormWrapper>
  );
}

export default Signup;