"use client";
import { motion } from "framer-motion";
import LinkText from "@/components/common/LinkText";

interface BottomCTAProps {
  dict: {
    home: {
      getStarted: string;
      signup: string;
      login: string;
    };
  };
  lang: string;
}

export default function BottomCTA({ dict, lang }: BottomCTAProps) {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            {dict.home.getStarted}
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            {lang === "zh-CN"
              ? "立即开始免费试用，无需信用卡"
              : "Start your free trial today. No credit card required."}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LinkText
              href={`/signup`}
              className="inline-flex items-center px-8 py-3.5 bg-white text-gray-900 rounded-full text-base font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              {dict.home.signup}
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </LinkText>
            <LinkText
              href={`/login`}
              className="inline-flex items-center px-8 py-3.5 border border-gray-600 text-gray-300 rounded-full text-base font-semibold hover:border-gray-400 hover:text-white transition-colors"
            >
              {dict.home.login}
            </LinkText>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            {lang === "zh-CN" ? "已有账户？" : "Already have an account?"}{" "}
            <LinkText href={`/login`} className="text-gray-300 underline underline-offset-2 hover:text-white">
              {dict.home.login}
            </LinkText>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
