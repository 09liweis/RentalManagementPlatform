"use client";
import Logo from "@/components/common/Logo";
import LangSwitch from "@/components/common/LangSwtich";
import LinkText from "@/components/common/LinkText";
import useUserStore from "@/stores/userStore";
import useAppStore from "@/stores/appStore";

export default function Header() {
  const {loginUser, loadingUser} = useUserStore();
  const {t} = useAppStore();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 border-b border-gray-100">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Navigation section */}
          <nav className="flex items-center space-x-4 sm:space-x-6">
            {loadingUser ? (
              <div className="w-8 h-8 flex items-center justify-center bg-gray-500">
                <svg className="size-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : loginUser._id ? (
              <LinkText 
                href="/dashboard" 
              >
                {t('home.Dashboard')}
              </LinkText>
            ) : (
              <>
                <LinkText 
                  href="/signup" 
                >
                  {t('home.Signup')}
                </LinkText>
                <LinkText 
                  href="/login" 
                >
                  {t('home.Login')}
                </LinkText>
              </>
            )}
            <div className="pl-2 border-l border-gray-200">
              <LangSwitch />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}