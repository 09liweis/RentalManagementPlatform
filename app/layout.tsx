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
          <a className="bold">RMP Logo</a>
          <nav>Menu</nav>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
