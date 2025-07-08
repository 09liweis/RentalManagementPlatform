"use client";
import { Suspense, useEffect, useState } from "react";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "@/app/globals.css";
import Sidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import ToastProvider from "@/components/common/ToastProvider";
import Loading from "./dashboard/Loading";
import useUserStore from "@/stores/userStore";
import useAppStore from "@/stores/appStore";
import SearchModal from "@/components/common/SearchModal";
import { getPageTitle } from "@/constants/text";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { setLocale } = useAppStore();
  const { fetchUser } = useUserStore();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchUser();
    setLocale(lang);
  }, [fetchUser, setLocale, lang]);

  // Mobile detection logic
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  return (
    <html lang={lang}>
      <title>{getPageTitle('Dashboard')}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Dashboard" />
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100`}
      >
        <Analytics />
        <ToastProvider>
          <div className="flex">
            <Sidebar isMobile={isMobile} />

            {/* Main Content Area */}
            <main
              className={`flex-1 transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}
            >
              <DashboardHeader setIsSearchModalOpen={setIsSearchModalOpen} />
              
              <section className="shadow-lg min-h-screen p-6 bg-white/80 backdrop-blur-sm border border-gray-100">
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
