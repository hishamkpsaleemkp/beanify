import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/ui/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INSTAGRAM_IMAGES } from "@/data/content";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

// Asymmetric, Instagram-style layout. Wide tiles get taller rows and a lower focal point so the bean bag stays in frame.
const CELLS = [
  { span: "row-span-2", pos: "object-[50%_70%]" },
  { span: "", pos: "object-[50%_75%]" },
  { span: "col-span-2 row-span-2", pos: "object-[50%_80%]" },
  { span: "", pos: "object-[50%_80%]" },
  { span: "col-span-2 row-span-2 md:row-span-1", pos: "object-[50%_88%]" },
  { span: "col-span-2 row-span-2 md:row-span-1", pos: "object-[50%_88%]" },
] as const;

export function InstagramGrid() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="On Instagram" title="See Beanify in Real Life." description="Your space. Your style. Your story." />
          <ScrollReveal className="flex flex-col gap-4 sm:flex-row sm:items-center md:flex-col md:items-end lg:flex-row lg:items-center">
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-display text-lg font-bold text-garnet hover:underline"
            >
              <InstagramIcon className="size-5" />
              {SITE.instagram.handle}
            </a>
            <Button href={SITE.instagram.url} external variant="secondary" arrow>
              Follow Us
            </Button>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-2.5 sm:auto-rows-[200px] sm:gap-3 md:grid-cols-4 md:grid-rows-[200px_200px_300px] lg:grid-rows-[230px_230px_330px] lg:gap-4">
          {INSTAGRAM_IMAGES.map((img, i) => (
            <ScrollReveal key={img.src} delay={(i % 4) * 0.07} scale={0.96} className={cn("h-full", CELLS[i].span)}>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${img.alt} — view on Instagram`}
                className="group relative block size-full overflow-hidden rounded-xl bg-sand sm:rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={CELLS[i].span.includes("col-span-2") ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className={cn("object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.06]", CELLS[i].pos)}
                />
                <span className="absolute inset-0 grid place-items-center bg-garnet/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <InstagramIcon className="size-8 text-bone" />
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
