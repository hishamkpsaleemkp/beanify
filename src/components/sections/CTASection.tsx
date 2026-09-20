"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EASE_PREMIUM } from "@/lib/utils";

const BEAN = "rounded-[62%_38%_57%_43%/55%_45%_55%_45%]";

function Bean({ className, delay = 0, duration = 9, outline }: { className: string; delay?: number; duration?: number; outline?: boolean }) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute ${BEAN} ${outline ? "border-2 border-bone/15" : "bg-bone/[0.07]"} ${className}`}
      animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

interface CTASectionProps {
  title?: React.ReactNode;
  description?: string;
  cta?: { label: string; href: string; external?: boolean };
}

export function CTASection({
  title = (
    <>
      Your New Favourite
      <br />
      Spot Is Waiting.
    </>
  ),
  description = "Bring home comfort that looks as good as it feels.",
  cta = { label: "Explore Beanify", href: "/shop" },
}: CTASectionProps) {
  return (
    <section className="pb-20 lg:pb-28">
      <Container>
        <motion.div
          className="on-garnet relative isolate overflow-hidden rounded-[2rem] bg-garnet px-6 py-20 text-center text-bone sm:rounded-[3rem] sm:px-12 lg:py-28"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
        >
          <Bean className="-top-16 -left-12 size-56 sm:size-72" />
          <Bean className="top-1/2 -right-16 size-64 sm:size-80" delay={1.5} duration={11} outline />
          <Bean className="-bottom-20 left-[18%] size-52" delay={0.8} duration={10} outline />
          <Bean className="top-10 right-[22%] hidden size-20 sm:block" delay={2} duration={7} />
          <Bean className="bottom-12 left-10 hidden size-14 sm:block" delay={0.4} duration={8} />

          <div className="relative mx-auto max-w-3xl">
            <h2 className="font-display-heading text-[clamp(2.5rem,6.4vw,5.25rem)]">{title}</h2>
            <p className="mx-auto mt-6 max-w-md text-lg text-bone/85">{description}</p>
            <Button href={cta.href} external={cta.external} variant="light" size="lg" arrow className="mt-10">
              {cta.label}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
