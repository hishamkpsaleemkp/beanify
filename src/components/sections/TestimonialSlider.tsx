"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/data/content";
import { cn, EASE_PREMIUM } from "@/lib/utils";

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 70 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -70 }),
};

export function TestimonialSlider() {
  const n = TESTIMONIALS.length;
  const [[index, dir], setPage] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const paginate = (d: number) => setPage(([i]) => [(i + d + n) % n, d]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setPage(([i]) => [(i + 1) % n, 1]), 7000);
    return () => clearInterval(t);
  }, [paused, n]);

  const t = TESTIMONIALS[index];

  return (
    <section className="bg-sand/60 py-20 lg:py-32" aria-roledescription="carousel" aria-label="Customer testimonials">
      <Container>
        <SectionHeading align="center" eyebrow="Loved by our customers" title="Comfort, in their words." />

        <div
          className="relative mx-auto mt-12 max-w-4xl text-center lg:mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Quote aria-hidden className="mx-auto mb-6 size-12 fill-garnet/15 text-garnet/15" />
          <div className="relative min-h-[300px] sm:min-h-[260px] lg:min-h-[240px]">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={index}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) paginate(1);
                  else if (info.offset.x > 60) paginate(-1);
                }}
                className="cursor-grab active:cursor-grabbing"
                aria-live="off"
              >
                <div className="mb-6 flex justify-center gap-1" role="img" aria-label="Rated 5 out of 5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-5 fill-garnet text-garnet" aria-hidden />
                  ))}
                </div>
                <blockquote className="font-display text-[1.4rem] leading-snug font-bold tracking-tight text-ink sm:text-3xl lg:text-[2.1rem]">“{t.quote}”</blockquote>
                <figcaption className="mt-7 text-muted">
                  <span className="font-display font-bold text-garnet">— {t.name}</span>
                  <span className="mx-2">·</span>
                  {t.place}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button type="button" onClick={() => paginate(-1)} aria-label="Previous testimonial" className="grid size-11 cursor-pointer place-items-center rounded-full border border-garnet/30 text-garnet transition-all duration-300 hover:bg-garnet hover:text-bone active:scale-90">
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setPage([i, i > index ? 1 : -1])}
                  className={cn("h-2 cursor-pointer rounded-full transition-all duration-500 ease-premium", i === index ? "w-8 bg-garnet" : "w-2 bg-garnet/25 hover:bg-garnet/50")}
                />
              ))}
            </div>
            <button type="button" onClick={() => paginate(1)} aria-label="Next testimonial" className="grid size-11 cursor-pointer place-items-center rounded-full border border-garnet/30 text-garnet transition-all duration-300 hover:bg-garnet hover:text-bone active:scale-90">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
