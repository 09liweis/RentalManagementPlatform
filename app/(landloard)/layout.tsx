"use client";
import { useRouter } from 'next/navigation';

import { Inter } from "next/font/google";

import "@/app/globals.css";
import Sidebar from "@/components/dashboard/sidebar";
import Button from "@/components/common/Button";
import { showToast } from "@/components/common/Toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const handleLogout = () => {
    showToast("Logout Successful");
    localStorage.removeItem("auth-token");
    router.replace("/login");
  }
  
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex`}>
        <Sidebar />
        <main className="w-4/5 p-2">
          <header className="flex justify-between p-2 shadow mb-2">
            <span>Logo</span>
            <Button tl="Logout" handleClick={handleLogout} />
          </header>
          <section className="shadow-lg min-h-screen p-2">{children}</section>
        </main>
      </body>
    </html>
  );
}
