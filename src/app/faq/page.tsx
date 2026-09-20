import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { faqs } from "@/data/faqs";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { GENERAL_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "FAQs — Sizes, Delivery, Returns & Ordering",
  description: "Answers to common questions about Beanify bean bags: choosing a size, materials, care, delivery, COD, returns and how to order on WhatsApp.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(faqs), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faq" }])]} />
      <PageHero eyebrow="Help centre" title="Good questions." description="Everything you might want to know before you bring a Beanify home." />
      <Container className="max-w-4xl py-14 lg:py-20">
        <ScrollReveal>
          <Accordion syncHash items={faqs.map((f) => ({ id: f.id, title: f.question, content: <p>{f.answer}</p> }))} defaultOpenId={faqs[0].id} />
        </ScrollReveal>
      </Container>
      <CTASection
        title={
          <>
            Still have
            <br />
            a question?
          </>
        }
        description="Message us on WhatsApp — we're happy to help you choose."
        cta={{ label: "Chat on WhatsApp", href: whatsappUrl(GENERAL_MESSAGE), external: true }}
      />
    </>
  );
}
