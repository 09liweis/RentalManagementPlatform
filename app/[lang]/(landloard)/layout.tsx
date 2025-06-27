"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import "@/app/globals.css";
import Sidebar from "@/components/dashboard/sidebar";
import LangSwitch from "@/components/common/LangSwtich";
import Button from "@/components/common/Button";
import ToastProvider from "@/components/common/ToastProvider";
import { showToast } from "@/components/common/Toast";
import Loading from "./dashboard/Loading";
import Logo from "@/components/common/Logo";
import useUserStore from "@/stores/userStore";
import useAppStore from "@/stores/appStore";
import SearchModal from "@/components/common/SearchModal";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { setLocale, t, curLocale } = useAppStore();
  const { fetchUser } = useUserStore();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    fetchUser();
    setLocale(lang);
  }, [fetchUser, setLocale, lang]);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    showToast("Logout Successful");
    localStorage.removeItem("auth-token");
    router.replace(`/${curLocale}/login`);
  };

  return (
    <html lang={lang}>
      <title>Dashboard</title>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100`}
      >
        <Analytics />
        <ToastProvider>
          <div className="flex gap-3">
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1">
              <header className="flex items-center justify-between rounded-xl p-4 shadow-sm mb-4 bg-white/80 backdrop-blur-sm border border-gray-100">
                <Logo />

                <div className="flex items-center gap-3">
                  {/* Search Button */}
                  <button
                    onClick={() => setIsSearchModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    title="Search (Cmd+K)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Search</span>
                    <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 border border-gray-200 rounded text-xs font-mono bg-gray-50">
                      ⌘K
                    </kbd>
                  </button>

                  <LangSwitch />
                  <Button
                    buttonType="danger"
                    outline={true}
                    onClick={handleLogout}
                  >{t("home.Logout")}</Button>
                </div>
              </header>
              <section className="shadow-lg min-h-screen p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </section>
            </main>
          </div>

          {/* Search Modal */}
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
          />
        </ToastProvider>
      </body>
    </html>
  );
}
