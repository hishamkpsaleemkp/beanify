import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { ImageReveal, ParallaxImage } from "@/components/ui/ImageReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT_PROMISES } from "@/data/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Beanify — Comfort Has a Personality",
  description: "Beanify was created to make everyday comfort more beautiful. Meet the premium bean bag and home living brand designed around you and your space.",
  alternates: { canonical: "/about" },
};

const PRODUCT_LINES = [
  { title: "Bean Bags", text: "Our signature — supportive, sink-in comfort in classic, XL, kids and premium designs.", href: "/shop?category=Bean+Bags", image: "/images/products/beanify-classic/burgundy-front.webp" },
  { title: "Loungers", text: "Low, long and made for stretching out with a book, a movie or nothing at all.", href: "/shop?category=Loungers", image: "/images/products/beanify-lounger/beige-front.webp" },
  { title: "Floor Seating & Cushions", text: "Soft, easy pieces that make every corner of the home a little more inviting.", href: "/shop?category=Floor+Seating", image: "/images/products/beanify-floor-pouf/blush-front.webp" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-sand/50">
        <Container className="grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <ScrollReveal>
            <p className="mb-5 text-xs font-bold tracking-[0.24em] text-garnet uppercase">About Beanify</p>
            <h1 className="font-display-heading text-[clamp(2.75rem,5.6vw,4.75rem)] text-ink">
              Comfort Has
              <br />a <span className="text-garnet">Personality.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">Beanify is a premium bean bag and home living brand, designed around one simple idea — your favourite spot should feel like you.</p>
          </ScrollReveal>
          <ScrollReveal y={40} scale={0.97} className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand shadow-[0_40px_80px_-50px_rgba(120,28,46,0.5)]">
              <Image src="/images/scenes/about-story.webp" alt="A textured burgundy Beanify bean bag in a warm, sunlit room" fill preload sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-32">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="01" title="Our Story" />
          </div>
          <ScrollReveal className="space-y-6 lg:col-span-8">
            <p className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.2] font-extrabold tracking-tight text-ink">Beanify was created to make everyday comfort more beautiful.</p>
            <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              We believe your favourite place at home should not only feel comfortable — it should feel like you. So we design bean bags and home-living pieces that sit as naturally in a considered space as they do in a lazy Sunday.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Our Philosophy */}
      <section className="relative bg-garnet text-bone on-garnet">
        <div className="absolute inset-0 opacity-25">
          <ParallaxImage src="/images/scenes/about-philosophy.webp" alt="" sizes="100vw" className="size-full" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-garnet/85" />
        <Container className="relative grid grid-cols-1 gap-10 py-24 lg:grid-cols-12 lg:gap-16 lg:py-36">
          <div className="lg:col-span-4">
            <SectionHeading light eyebrow="02" title="Our Philosophy" />
          </div>
          <ScrollReveal className="lg:col-span-8">
            <p className="font-display text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.08] font-extrabold tracking-tight">
              Comfort should be effortless, honest and a little bit beautiful.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 text-bone/80 sm:grid-cols-2 sm:text-lg">
              <p>Good design isn&apos;t loud. It&apos;s the soft shape you sink into, the colour that makes a corner feel calm, the seam that stays put after a hundred movie nights.</p>
              <p>We keep our range focused and our details considered — so every Beanify earns its place in your home, and keeps earning it.</p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Our Products */}
      <section className="py-20 lg:py-32">
        <Container>
          <SectionHeading eyebrow="03" title="Our Products" description="Bean bags first — and a growing family of pieces for the way you live." />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:mt-16 lg:gap-7">
            {PRODUCT_LINES.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1} className="h-full">
                <Link href={p.href} className="group block h-full">
                  <ImageReveal src={p.image} alt={p.title} sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[4/5] rounded-2xl bg-sand" imgClassName="transition-transform duration-700 ease-premium group-hover:scale-[1.05]" delay={i * 0.1} />
                  <h3 className="mt-5 flex items-center justify-between font-display text-2xl font-extrabold text-ink">
                    {p.title}
                    <ArrowRight className="size-5 text-garnet transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Promise */}
      <section className="bg-sand/60 py-20 lg:py-32">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ImageReveal src="/images/scenes/about-promise.webp" alt="Beanify cushions on a sofa in a bright living room" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-square rounded-[2rem] rounded-bl-[7rem] bg-sand" />
          <div>
            <SectionHeading eyebrow="04" title="Our Promise" />
            <ul className="mt-10 space-y-8">
              {ABOUT_PROMISES.map((p, i) => (
                <li key={p.title}>
                  <ScrollReveal delay={i * 0.1} y={20} className="flex gap-5">
                    <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-garnet font-display text-sm font-bold text-bone">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl font-extrabold text-ink sm:text-2xl">{p.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted sm:text-lg">{p.text}</p>
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <div className="pt-20 lg:pt-28">
        <CTASection />
      </div>
    </>
  );
}
