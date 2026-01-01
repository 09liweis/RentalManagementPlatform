import LinkText from "@/components/common/LinkText";
import Image from "next/image";
import styles from "../../app/[lang]/(home)/page.module.css";

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
    <section
      className={`relative bg-gradient-to-r from-purple-600 to-purple-800 text-white py-24 ${styles.heroBackground}`}
    >
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`text-left ${styles.heroContent}`}>
            <h1
              className={`text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight ${styles.heroTitle} ${styles.animate}`}
            >
              {dict.home.heroTitle}
            </h1>
            <p
              className={`mt-6 text-xl text-blue-100 ${styles.heroSubtitle} ${styles.animate} ${styles.animateDelay1}`}
            >
              {dict.home.heroSubtitle}
            </p>
            <div
              className={`flex flex-wrap mt-4 gap-6 ${styles.animate} ${styles.animateDelay1}`}
            >
              <LinkText
                href={`/signup`}
                className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {dict.home.signup}
              </LinkText>
              <LinkText
                href={`/login`}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-700 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {dict.home.login}
              </LinkText>
            </div>
            <div className="mt-8 flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {lang === "zh-CN" ? "无需信用卡" : "No credit card required"}
              </span>
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {lang === "zh-CN" ? "免费试用" : "free trial"}
              </span>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[600px] rounded-lg shadow-2xl overflow-hidden">
              <Image
                src="/images/backgroundImage.jpg"
                alt={
                  lang === "zh-CN"
                    ? "平台仪表板预览"
                    : "Platform Dashboard Preview"
                }
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
