"use client";
import { getDictionary } from "../dictionaries";
import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import FeaturesSection from "@/components/home/FeaturesSection";
import Screenshots from "@/components/home/Screenshots";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="w-full">
      <HeroSection dict={dict} lang={lang} />
      <TrustBadges lang={lang} />
      <FeaturesSection dict={dict} />
      <Screenshots dict={dict} lang={lang} />
      <HowItWorks dict={dict} />
      <Testimonials dict={dict} />
      <CTASection dict={dict} lang={lang} />
    </div>
  );
}
