"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Inter } from "next/font/google";

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
  useEffect(() => {
    fetchUser();
    setLocale(lang);
  }, [fetchUser, setLocale, lang]);

  const router = useRouter();

  const handleLogout = () => {
    showToast("Logout Successful");
    localStorage.removeItem("auth-token");
    router.replace(`/${curLocale}/login`);
  };

  return (
    <html lang={lang}>
      <title>Dashboard</title>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 `}>
        <ToastProvider>
          {/* <Sidebar /> */}
          <main className="p-4 max-w-6xl mx-auto">
            <header className="flex items-center justify-between rounded p-4 shadow mb-4 bg-white/80">
              <Logo />
              
              <div className="flex items-center gap-3">
                <LangSwitch />
                <Button
                  tp="danger"
                  tl={t("home.Logout")}
                  handleClick={handleLogout}
                />
              </div>
            </header>
            <section className="shadow-lg min-h-screen p-4 bg-white/80 rounded">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </section>
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
