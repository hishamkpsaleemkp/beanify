import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
}

/** Compact hero used at the top of inner pages (Shop, FAQ, Contact, legal…). */
export function PageHero({ eyebrow, title, description, children, className, align = "left" }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-line bg-sand/50", className)}>
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-[380px] rounded-[62%_38%_57%_43%/55%_45%_55%_45%] bg-blush/60 blur-2xl" />
      <Container className={cn("relative py-14 sm:py-20 lg:py-24", align === "center" && "text-center")}>
        <ScrollReveal className={cn("max-w-3xl", align === "center" && "mx-auto")}>
          {eyebrow && <p className="mb-4 text-xs font-bold tracking-[0.24em] text-garnet uppercase">{eyebrow}</p>}
          <h1 className="font-display-heading text-[clamp(2.75rem,7vw,5.5rem)] text-ink">{title}</h1>
          {description && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{description}</p>}
          {children}
        </ScrollReveal>
      </Container>
    </section>
  );
}
