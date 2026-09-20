import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Use on dark (garnet) backgrounds */
  light?: boolean;
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", light, as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <ScrollReveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-4 text-xs font-bold tracking-[0.22em] uppercase", light ? "text-blush" : "text-garnet")}>{eyebrow}</p>
      )}
      <Tag className={cn("font-display-heading text-[clamp(2.25rem,5.2vw,4rem)]", light ? "text-bone" : "text-ink")}>{title}</Tag>
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed whitespace-pre-line sm:text-lg", light ? "text-bone/80" : "text-muted")}>{description}</p>
      )}
    </ScrollReveal>
  );
}
