"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_PREMIUM } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Start offset in px (fade + translateY) */
  y?: number;
  /** Start scale (1 = no scale) */
  scale?: number;
  once?: boolean;
}

/** Fades + lifts content into place the first time it scrolls into view. */
export function ScrollReveal({ children, className, delay = 0, y = 28, scale = 1, once = true }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  );
}
