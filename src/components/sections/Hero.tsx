"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/icons";
import { EASE_PREMIUM } from "@/lib/utils";

const LINES = ["Sit.", "Relax.", "Repeat."];

/**
 * Three blocks laid out with CSS grid so the order can differ per breakpoint:
 *  - mobile:  headline → image → actions (image + main CTA land in the first screen)
 *  - desktop: headline + actions stacked in the left column, image spanning both rows on the right
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* soft background wash */}
      <div aria-hidden className="pointer-events-none absolute top-24 -right-56 -z-10 size-[560px] rounded-full bg-blush/40 blur-3xl" />

      <Container className="grid min-h-[calc(100svh-68px)] grid-cols-1 content-center gap-y-6 pt-5 pb-10 sm:gap-y-8 sm:pt-8 sm:pb-14 md:grid-cols-[1.05fr_0.95fr] lg:grid-cols-[0.8fr_1.2fr] md:gap-x-6 md:gap-y-0 md:pt-6 md:pb-12 lg:min-h-[calc(100svh-80px)] lg:gap-x-8 lg:pb-14">
        {/* ── 1. Headline ── */}
        <div className="relative z-10 text-center md:col-start-1 md:row-start-1 md:self-end">
          <h1 className="font-display-heading text-[clamp(3.5rem,15.5vw,5.5rem)] leading-[0.9] sm:text-[clamp(4rem,11.5vw,8.75rem)] lg:text-[clamp(4rem,9vw,8rem)]" aria-label="Sit. Relax. Repeat.">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.1em]" aria-hidden>
                <motion.span
                  className={i === 2 ? "block text-garnet" : "block text-ink"}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: EASE_PREMIUM }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE_PREMIUM }}
            className="mt-3 font-display text-lg leading-snug font-bold text-balance text-garnet sm:mt-7 sm:text-2xl"
          >
            Comfort that belongs in your space.
          </motion.p>
        </div>

        {/* ── 2. Image ── */}
        <div className="relative mx-auto -mt-6 w-full max-w-[420px] sm:-mt-4 sm:max-w-[560px] md:col-start-2 md:-mt-10 md:ml-12 md:row-span-2 md:row-start-1 md:max-w-[520px] md:justify-self-end md:self-center lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE_PREMIUM }}
          >
            {/* The cutout has extra empty space on its right, so nudge it right to centre the product visually */}
            <Image
              src="/images/brown-hero.png"
              alt="Burgundy Beanify bean bag with a matching cushion and pouf"
              width={505}
              height={494}
              preload
              sizes="(min-width: 1024px) 740px, (min-width: 640px) 520px, 420px"
              className="h-auto w-full translate-x-[6%]"
            />
          </motion.div>
        </div>

        {/* ── 3. Actions ── */}
        <motion.div
          className="relative z-10 flex flex-col pt-3 text-center sm:pt-0 md:col-start-1 md:row-start-2 md:self-start"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE_PREMIUM }}
        >
          <div className="order-1 grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 md:order-2 md:mt-9">
            <Button href="/shop?category=Bean+Bags" size="lg" arrow className="h-12 w-full sm:h-14 sm:w-auto">
              Shop Bean Bags
            </Button>
            <Button href="/shop" size="lg" variant="secondary" className="h-12 w-full sm:h-14 sm:w-auto">
              Explore Collection
            </Button>
          </div>
          <p className="order-2 mx-auto mt-5 max-w-[30rem] text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-lg md:order-1 md:mt-4">
            Premium bean bags designed to bring comfort, character and effortless style into your everyday living.
          </p>
          {/* <p className="order-3 mt-4 flex items-center justify-center gap-2 text-[13px] font-medium text-muted sm:mt-6 sm:text-sm">
            <WhatsAppIcon className="size-4 shrink-0 text-garnet" />
            Choose your favourite and order directly on WhatsApp.
          </p> */}
        </motion.div>
      </Container>
    </section>
  );
}
