import type { Metadata } from "next";
import { CategorySection } from "@/components/sections/CategorySection";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { Hero } from "@/components/sections/Hero";
import { InstagramGrid } from "@/components/sections/InstagramGrid";
import { LifestyleSection } from "@/components/sections/LifestyleSection";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyBeanify } from "@/components/sections/WhyBeanify";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: { absolute: SITE.title },
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedCollection />
      <CategorySection />
      <LifestyleSection />
      <WhyBeanify />
      <InstagramGrid />
      <TestimonialSlider />
      <CTASection />
    </>
  );
}
