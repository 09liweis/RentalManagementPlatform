import { getDictionary } from "../dictionaries";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import FeatureGrid from "@/components/home/FeatureGrid";
import ProductShowcase from "@/components/home/ProductShowcase";
import WorkflowSteps from "@/components/home/WorkflowSteps";
import TestimonialCards from "@/components/home/TestimonialCards";
import BottomCTA from "@/components/home/BottomCTA";
import BlogPreview from "@/components/home/BlogPreview";

export default async function Home(
  props: {
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <div className="w-full">
      <HeroSection dict={dict} lang={lang} />
      <StatsBar lang={lang} />
      <FeatureGrid dict={dict} />
      <ProductShowcase dict={dict} lang={lang} />
      <WorkflowSteps dict={dict} />
      <TestimonialCards dict={dict} />
      <BlogPreview lang={lang} />
      <BottomCTA dict={dict} lang={lang} />
    </div>
  );
}
