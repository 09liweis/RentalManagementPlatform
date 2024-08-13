import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/dashboard/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rental Management Platform Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen flex">
          <Sidebar />
          <section className="w-4/5 p-2">
            <section className="shadow-lg min-h-screen p-2">{children}</section>
          </section>
        </main>
      </body>
    </html>
  );
}
