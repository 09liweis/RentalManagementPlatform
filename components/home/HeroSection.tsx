"use client";
import { motion } from "framer-motion";
import LinkText from "@/components/common/LinkText";

interface HeroSectionProps {
  dict: {
    home: {
      heroTitle: string;
      heroSubtitle: string;
      signup: string;
      login: string;
    };
  };
  lang: string;
}

export default function HeroSection({ dict, lang }: HeroSectionProps) {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50 via-white to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {lang === "zh-CN" ? "全新版本现已上线" : "New version now available"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1]"
          >
            {dict.home.heroTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl leading-relaxed"
          >
            {dict.home.heroSubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <LinkText
              href={`/signup`}
              className="inline-flex items-center px-8 py-3.5 bg-gray-900 text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
            >
              {dict.home.signup}
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </LinkText>
            <LinkText
              href={`/login`}
              className="inline-flex items-center px-8 py-3.5 border border-gray-200 text-gray-700 rounded-full text-base font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {dict.home.login}
            </LinkText>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-400"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {lang === "zh-CN" ? "无需信用卡" : "No credit card required"}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {lang === "zh-CN" ? "免费试用" : "Free trial"}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {lang === "zh-CN" ? "随时取消" : "Cancel anytime"}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
