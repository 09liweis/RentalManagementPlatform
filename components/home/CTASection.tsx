import LinkText from "@/components/common/LinkText";
import styles from "../app/[lang]/(home)/page.module.css";

interface CTASectionProps {
  dict: {
    home: {
      getStarted: string;
      signup: string;
      login: string;
    };
  };
  lang: string;
}

export default function CTASection({ dict, lang }: CTASectionProps) {
  return (
    <section
      className={`py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white ${styles.ctaSection}`}
    >
      <div className="container mx-auto px-6 text-center">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-8 ${styles.animate}`}
        >
          {dict.home.getStarted}
        </h2>
        <p className="mb-8 text-xl text-purple-100 max-w-2xl mx-auto">
          {lang === "zh-CN"
            ? "立即开始免费试用，无需信用卡"
            : "Start your free trial today, no credit card required"}
        </p>
        <div
          className={`flex flex-wrap justify-center gap-6 ${styles.animate} ${styles.animateDelay1}`}
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
      </div>
    </section>
  );
}
