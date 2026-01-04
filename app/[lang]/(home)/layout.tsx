"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ToastProvider from "@/components/common/ToastProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/Footer";
import useUserStore from "@/stores/userStore";
import { useEffect, use } from "react";
import useAppStore from "@/stores/appStore";
import { WEBSITE_NAME } from "@/constants/text";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Rental Management Platform",
//   description: "Will add later",
// };

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }>
) {
  const params = use(props.params);

  const {
    lang
  } = params;

  const {
    children
  } = props;

  const { fetchUser } = useUserStore();
  const { setLocale } = useAppStore();
  useEffect(() => {
    fetchUser();
    setLocale(lang);
  }, [fetchUser, lang, setLocale]);
  return (
    <html lang={lang}>
      <title>{WEBSITE_NAME}</title>
      <meta name="description" content="Rental Management" />
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
        <ToastProvider>
          <Header />

          <main className="min-h-screen flex justify-center items-center">
            {children}
          </main>
          {/* <Footer lang={lang} /> */}
        </ToastProvider>
      </body>
    </html>
  );
}
