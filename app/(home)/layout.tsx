"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ToastProvider from "@/components/common/ToastProvider";
import Header from "@/components/common/Header";
import useUserStore from "@/stores/userStore";
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
  const {fetchUser} = useUserStore();
  useEffect(()=>{
    fetchUser();
  },[fetchUser]);
  return (
    <html lang="en">
      <title>Rental Management Platform</title>
      <body className={inter.className}>
        <ToastProvider>
          <Header />

          <main className="min-h-screen flex justify-center items-center">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
