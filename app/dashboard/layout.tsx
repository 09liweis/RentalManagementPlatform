import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rental Management Platform",
};

const DASHBOARD_MENUS = [
  {tl:"Dashboard"},
  {tl:"Properties"},
  {tl:"Renters"},
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen flex">
          <aside className="w-1/4 p-2">
            <section className="shadow-lg min-h-screen p-2">
              {DASHBOARD_MENUS.map((menu, index)=>
                <a href="" className="block bg-amber-600 p-2 rounded text-white mt-5 duration-300 hover:bg-amber-500" key={menu.tl}>{menu.tl}</a>
              )}
            </section>
          </aside>
          <section className="w-4/5 p-2">
            <section className="shadow-lg min-h-screen p-2">{children}</section>
          </section>
        </main>
      </body>
    </html>
  );
}
