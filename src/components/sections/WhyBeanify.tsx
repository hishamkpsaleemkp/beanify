import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_BEANIFY } from "@/data/content";

function FeatureCard({ n, title, text, index }: { n: string; title: string; text: string; index: number }) {
  return (
    <ScrollReveal delay={index * 0.06} y={36}>
      <article className="group grid grid-cols-[auto_1fr] items-start gap-x-5 border-t border-garnet/15 py-8 sm:gap-x-9 lg:py-10">
        <span
          aria-hidden
          className="font-display text-[clamp(3.25rem,8vw,6rem)] leading-[0.85] font-extrabold tracking-tighter text-garnet/20 transition-colors duration-500 ease-premium group-hover:text-garnet"
        >
          {n}
        </span>
        <div className="pt-1">
          <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">{title}</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-muted sm:text-lg">{text}</p>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function WhyBeanify() {
  return (
    <section className="bg-sand/60 py-20 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow="The Beanify difference" title="Why Beanify?" description="Comfort is a feeling — and it's in the details. Here's what goes into every piece we make." />
            </div>
          </div>
          <div className="lg:col-span-8">
            {WHY_BEANIFY.map((f, i) => (
              <FeatureCard key={f.n} {...f} index={i} />
            ))}
            <div className="border-t border-garnet/15" />
          </div>
        </div>
      </Container>
    </section>
  );
}
