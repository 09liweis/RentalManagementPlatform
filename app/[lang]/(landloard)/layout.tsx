"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Inter } from "next/font/google";

import "@/app/globals.css";
import Sidebar from "@/components/dashboard/sidebar";
import Button from "@/components/common/Button";
import ToastProvider from "@/components/common/ToastProvider";
import { showToast } from "@/components/common/Toast";
import Loading from "./dashboard/Loading";
import Logo from "@/components/common/Logo";
import useUserStore from "@/stores/userStore";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params:{lang}
}: Readonly<{
  children: React.ReactNode;
  params:any
}>) {
  const {fetchUser} = useUserStore();
  useEffect(()=>{
    fetchUser();
  },[]);

  const router = useRouter();

  const handleLogout = () => {
    showToast("Logout Successful");
    localStorage.removeItem("auth-token");
    router.replace("/login");
  };

  return (
    <html lang={lang}>
      <title>Dashboard</title>
      <body className={`${inter.className} min-h-screen flex`}>
        <ToastProvider>
          <Sidebar />
          <main className="w-4/5 p-2">
            <header className="flex items-center justify-between p-2 shadow mb-2">
              <Logo/>
              <Button tl="Logout" handleClick={handleLogout} />
            </header>
            <section className="shadow-lg min-h-screen p-2">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </section>
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
