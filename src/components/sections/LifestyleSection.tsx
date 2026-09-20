import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ParallaxImage } from "@/components/ui/ImageReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const MOMENTS = ["Your reading corner.", "Your movie night.", "Your gaming setup.", "Your lazy Sunday."];

/** Magazine-style editorial block: oversized type, one big lifestyle image, an inset detail shot. */
export function LifestyleSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pr-6">
            <ScrollReveal>
              <p className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-garnet uppercase">
                <span aria-hidden className="h-px w-8 bg-garnet" />
                The Beanify Life
              </p>
              <h2 className="font-display-heading text-[clamp(2.75rem,6.4vw,5.5rem)] text-ink">
                More Than
                <br />a Bean Bag<span className="text-garnet">.</span>
              </h2>
            </ScrollReveal>

            <ul className="mt-9 space-y-1">
              {MOMENTS.map((m, i) => (
                <li key={m}>
                  <ScrollReveal delay={i * 0.1} y={18}>
                    <p className="font-display text-2xl font-semibold tracking-tight text-ink/80 sm:text-[1.75rem]">{m}</p>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
            <ScrollReveal delay={0.5} className="mt-8">
              <p className="font-display text-xl font-bold text-garnet sm:text-2xl">Beanify is designed for all of it.</p>
              <Button href="/shop" arrow size="lg" className="mt-9">
                Shop the Collection
              </Button>
            </ScrollReveal>
          </div>

          <ScrollReveal className="relative lg:col-span-7" y={40} scale={0.97}>
            <ParallaxImage
              src="/images/scenes/lifestyle.webp"
              alt="A burgundy Beanify lounger beside a bookshelf and window"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[4/3] rounded-[2rem] rounded-tr-[8rem] bg-sand shadow-[0_40px_80px_-50px_rgba(36,22,26,0.5)] lg:aspect-[5/4]"
            />
            <div className="absolute -bottom-8 -left-3 hidden w-40 overflow-hidden rounded-2xl border-[6px] border-bone shadow-xl sm:block lg:-left-12 lg:w-52">
              <div className="relative aspect-square">
                <Image src="/images/products/beanify-premium/ivory-detail.webp" alt="Close-up of Beanify Premium bouclé fabric" fill sizes="208px" className="object-cover" />
              </div>
            </div>
            <p className="absolute top-6 -right-2 hidden origin-top-right rotate-90 text-[11px] font-bold tracking-[0.3em] text-garnet/70 uppercase xl:block">Lazy Sunday · Vol. 01</p>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
