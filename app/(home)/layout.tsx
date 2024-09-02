import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import ToastProvider from "@/components/common/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rental Management Platform",
  description: "Will add later",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
            <header className="p-4 shadow flex justify-between items-center">
                <a className="font-bold text-orange-600 text-xl">RMP Logo</a>
                <nav>
                    <Link href={'/login'}>Login</Link>
                </nav>
                <nav>
                    <Link href={'/signup'}>Signup</Link>
                </nav>
            </header>

            <main className="min-h-screen">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
