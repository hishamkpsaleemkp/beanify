import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { termsSections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply when you use the Beanify website and order our products through WhatsApp.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" intro="The simple ground rules for browsing and ordering with Beanify." sections={termsSections} />;
}
