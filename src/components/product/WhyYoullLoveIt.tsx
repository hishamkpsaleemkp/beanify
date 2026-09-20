import { Cloud, Feather, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/types/product";

const ICONS: LucideIcon[] = [Cloud, Sparkles, Feather, ShieldCheck];

export function WhyYoullLoveIt({ product }: { product: Product }) {
  return (
    <section className="bg-sand/60 py-16 lg:py-24">
      <Container>
        <SectionHeading eyebrow={product.name} title="Why you'll love it." />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {product.highlights.map((h, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={h.title}>
                <ScrollReveal delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-bone p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(120,28,46,0.35)]">
                    <span className="mb-6 grid size-12 place-items-center rounded-full bg-garnet text-bone">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="font-display text-xl font-extrabold text-ink">{h.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{h.text}</p>
                  </div>
                </ScrollReveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
