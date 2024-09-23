'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import ToastProvider from "@/components/common/ToastProvider";
import Logo from "@/components/common/Logo";
import LangSwitch from "@/components/common/LangSwtich";
import LinkText from "@/components/common/LinkText";
import { fetchData } from "@/utils/http";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Rental Management Platform",
//   description: "Will add later",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(()=>{
    fetchData({url:'/api/ping'});
  },[])
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <header className="p-4 shadow flex justify-between items-center">
            <Logo />
            <nav className="flex gap-3">
              <LinkText href={"/signup"} text="Signup" />
              <LinkText href={"/login"} text="Login" />
              <LangSwitch />
            </nav>
          </header>

          <main className="min-h-screen flex justify-center items-center">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
