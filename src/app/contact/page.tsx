import type { Metadata } from "next";
import { Mail, MapPin, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SITE, WHATSAPP_NUMBER } from "@/constants/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { GENERAL_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Beanify",
  description: "Questions about sizes, colours or delivery? Chat with Beanify on WhatsApp, message us on Instagram or send a note — we're happy to help.",
  alternates: { canonical: "/contact" },
};

function formatPhone(n: string) {
  return n.length === 12 && n.startsWith("91") ? `+91 ${n.slice(2, 7)} ${n.slice(7)}` : `+${n}`;
}

interface ContactItem {
  icon: LucideIcon | ((p: { className?: string }) => ReactNode);
  label: string;
  value: string;
  href?: string;
}

const items: ContactItem[] = [
  { icon: WhatsAppIcon, label: "WhatsApp", value: formatPhone(WHATSAPP_NUMBER), href: whatsappUrl(GENERAL_MESSAGE) },
  { icon: InstagramIcon, label: "Instagram", value: SITE.instagram.handle, href: SITE.instagram.url },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: "Location", value: SITE.location },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero eyebrow="Get in touch" title="Let's Talk." description="Picking a size, a colour or a corner? Ask us anything — a real person replies, usually within a few hours." />

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
        <div>
          <ScrollReveal>
            <Button href={whatsappUrl(GENERAL_MESSAGE)} external size="lg" icon={<WhatsAppIcon className="size-5" />} className="w-full sm:w-auto">
              Chat on WhatsApp
            </Button>
            <p className="mt-3 text-sm text-muted">Fastest way to reach us — and to place an order.</p>
          </ScrollReveal>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {items.map((item, i) => {
              const Icon = item.icon;
              const body = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-garnet/[0.07] text-garnet transition-colors duration-300 group-hover:bg-garnet group-hover:text-bone">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold tracking-[0.2em] text-muted uppercase">{item.label}</span>
                    <span className="block font-display text-lg leading-snug font-bold break-words text-ink">{item.value}</span>
                  </span>
                </>
              );
              return (
                <li key={item.label}>
                  <ScrollReveal delay={i * 0.06} y={16}>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-5 py-5">
                        {body}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-5 py-5">{body}</div>
                    )}
                  </ScrollReveal>
                </li>
              );
            })}
          </ul>

          <ScrollReveal className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-3xl bg-sand lg:block">
            <Image src="/images/scenes/contact.webp" alt="A sage Beanify bean bag in a reading corner" fill sizes="45vw" className="object-cover object-[50%_70%]" />
          </ScrollReveal>
        </div>

        <ScrollReveal y={36}>
          <ContactForm />
        </ScrollReveal>
      </Container>
    </>
  );
}
