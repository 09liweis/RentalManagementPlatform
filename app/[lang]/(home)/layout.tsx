"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ToastProvider from "@/components/common/ToastProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/Footer";
import useUserStore from "@/stores/userStore";
import { useEffect } from "react";
import useAppStore from "@/stores/appStore";
import { WEBSITE_NAME } from "@/constants/text";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Rental Management Platform",
//   description: "Will add later",
// };

export default function RootLayout({
  children,
  params:{lang}
}: Readonly<{
  children: React.ReactNode;
  params:any
}>) {
  const {fetchUser} = useUserStore();
  const {setLocale} = useAppStore();
  useEffect(()=>{
    fetchUser();
    setLocale(lang);
  },[fetchUser, lang, setLocale]);
  return (
    <html lang={lang}>
      <title>{WEBSITE_NAME}</title>
      <meta name="description" content="Rental Management" />
      <body className={inter.className}>
        <ToastProvider>
          <Header />

          <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 to-indigo-100 ">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}