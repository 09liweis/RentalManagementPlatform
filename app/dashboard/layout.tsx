import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rental Management Platform",
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
        <main className="min-h-screen flex">
          <aside className="w-1/4 p-2">
            <section className="shadow min-h-screen p-2">Sidebar</section>
          </aside>
          <section className="w-4/5 p-2">
            <section className="shadow min-h-screen p-2">{children}</section>
          </section>
        </main>
      </body>
    </html>
  );
}
