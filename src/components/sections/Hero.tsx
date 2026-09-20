"use client";

import { motion } from "framer-motion";
import { ArrowDown, House, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/icons";
import { EASE_PREMIUM } from "@/lib/utils";

const LINES = ["Sit.", "Relax.", "Repeat."];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* soft background wash */}
      <div aria-hidden className="pointer-events-none absolute top-24 -right-56 -z-10 size-[560px] rounded-full bg-blush/40 blur-3xl" />

      <Container className="grid grid-cols-1 min-h-[calc(100svh-68px)] items-center gap-12 pt-8 pb-20 lg:min-h-[calc(100svh-80px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-6 lg:pb-24">
        {/* ── Copy ── */}
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-garnet uppercase"
          >
            <span aria-hidden className="h-px w-8 bg-garnet" />
            Premium Home Comfort
          </motion.p>

          <h1 className="font-display-heading text-[clamp(4rem,11.5vw,8.75rem)] leading-[0.9]" aria-label="Sit. Relax. Repeat.">
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE_PREMIUM }}
          >
            <p className="mt-7 font-display text-xl leading-snug font-bold text-garnet sm:text-2xl">Comfort that belongs in your space.</p>
            <p className="mt-4 max-w-[30rem] text-base leading-relaxed text-muted sm:text-lg">
              Premium bean bags designed to bring comfort, character and effortless style into your everyday living.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/shop?category=Bean+Bags" size="lg" arrow>
                Shop Bean Bags
              </Button>
              <Button href="/shop" size="lg" variant="secondary">
                Explore Collection
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm font-medium text-muted">
              <WhatsAppIcon className="size-4 text-garnet" />
              Choose your favourite and order directly on WhatsApp.
            </p>
          </motion.div>
        </div>

        {/* ── Image ── */}
        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none lg:justify-self-end">
          <motion.div
            className="relative mx-auto w-full max-w-[560px]"
            initial={{ opacity: 0, x: 48, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE_PREMIUM }}
          >
            <div aria-hidden className="absolute -inset-x-3 top-6 -bottom-3 rounded-t-[999px] rounded-b-[2rem] bg-garnet/10" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand shadow-[0_40px_80px_-40px_rgba(120,28,46,0.5)]">
              <Image
                src="/images/scenes/hero.webp"
                alt="A burgundy Beanify bean bag in a sunlit living room"
                fill
                preload
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 560px, 92vw"
                className="object-cover"
              />
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute top-[16%] -left-3 z-10 sm:-left-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: EASE_PREMIUM }}
            >
              <div className="animate-float flex items-center gap-3 rounded-2xl border border-white/60 bg-bone/90 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(36,22,26,0.4)] backdrop-blur-md">
                <span className="grid size-10 place-items-center rounded-full bg-garnet text-bone">
                  <Sparkles className="size-5" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block font-display text-sm font-bold text-ink">Premium Comfort</span>
                  <span className="block text-xs text-muted">Crafted to last</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-2 bottom-[10%] z-10 sm:-right-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease: EASE_PREMIUM }}
            >
              <div className="animate-float-slow flex items-center gap-3 rounded-2xl border border-white/60 bg-bone/90 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(36,22,26,0.4)] backdrop-blur-md">
                <span className="grid size-10 place-items-center rounded-full bg-garnet text-bone">
                  <House className="size-5" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block font-display text-sm font-bold text-ink">Made for</span>
                  <span className="block font-display text-sm font-bold text-garnet">Everyday Living</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.a
        href="#explore"
        aria-label="Scroll to explore"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-garnet/80 uppercase transition-colors hover:text-garnet md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        Scroll to explore
        <ArrowDown className="animate-nudge size-4" aria-hidden />
      </motion.a>
    </section>
  );
}
