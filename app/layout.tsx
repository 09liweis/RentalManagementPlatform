import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <header className="p-4 shadow flex justify-between items-center">
          <a className="font-bold text-orange-600 text-xl">RMP Logo</a>
          <nav>Menu</nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="p-4 shadow">Footer</footer>
      </body>
    </html>
  );
}
