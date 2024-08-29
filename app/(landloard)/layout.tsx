"use client";
import type { Metadata } from "next";
import { useRouter } from 'next/navigation';

import { Inter } from "next/font/google";

import "../globals.css";
import Sidebar from "@/components/dashboard/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    router.replace("/login");
  }
  
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex`}>
        <Sidebar />
        <main className="w-4/5 p-2">
          <header className="flex justify-between p-2 shadow">
            <span>Logo</span>
            <a href="#" onClick={handleLogout}>Logout</a>
          </header>
          <section className="shadow-lg min-h-screen p-2">{children}</section>
        </main>
      </body>
    </html>
  );
}
