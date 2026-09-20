import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { privacySections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Beanify collects, uses and protects your information when you browse, enquire and order through WhatsApp.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" intro="What we collect, why we collect it, and the choices you have." sections={privacySections} />;
}
