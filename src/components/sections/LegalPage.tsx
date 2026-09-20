import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LEGAL_UPDATED, type LegalSection } from "@/data/legal";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={intro}>
        <p className="mt-6 text-sm font-semibold text-muted">Last updated: {LEGAL_UPDATED}</p>
      </PageHero>
      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[260px_1fr] lg:gap-20 lg:py-20">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-muted uppercase">On this page</p>
            <ol className="space-y-2.5 border-l border-line">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#${slug(s.heading)}`} className="-ml-px block border-l-2 border-transparent py-0.5 pl-4 text-[15px] text-muted transition-colors hover:border-garnet hover:text-garnet">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="max-w-2xl space-y-12">
          {sections.map((s, i) => (
            <ScrollReveal key={s.heading} y={20}>
              <section id={slug(s.heading)} className="scroll-mt-28">
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  <span className="mr-3 text-garnet/40">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-3 leading-relaxed text-muted">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </>
  );
}
