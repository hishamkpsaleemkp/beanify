import { Cloud, House, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TRUST_ITEMS } from "@/data/content";

const ICONS: Record<(typeof TRUST_ITEMS)[number]["icon"], LucideIcon> = {
  shield: ShieldCheck,
  cloud: Cloud,
  sparkles: Sparkles,
  home: House,
};

export function TrustStrip() {
  return (
    <section id="explore" className="scroll-mt-16 border-y border-line bg-bone">
      <Container className="py-14 lg:py-16">
        <ScrollReveal>
          <p className="text-center font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Comfort made for real life.</p>
        </ScrollReveal>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4 lg:gap-x-10">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title}>
                <ScrollReveal delay={i * 0.08} className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:gap-4 lg:text-left">
                  <span className="mb-3 grid size-12 shrink-0 place-items-center rounded-full bg-garnet/[0.07] text-garnet lg:mb-0">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink sm:text-lg">{item.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-muted">{item.text}</p>
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
