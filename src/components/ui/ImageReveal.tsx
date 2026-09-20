"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn, EASE_PREMIUM } from "@/lib/utils";

interface BaseProps {
  src: string;
  alt: string;
  sizes: string;
  /** Classes for the outer (clipping) container — put aspect ratio / rounding here */
  className?: string;
  imgClassName?: string;
}

/** Image that is unveiled (clip + gentle scale settle) when it scrolls into view. */
export function ImageReveal({ src, alt, sizes, className, imgClassName, delay = 0 }: BaseProps & { delay?: number }) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease: EASE_PREMIUM }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.5, delay, ease: EASE_PREMIUM }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className={cn("object-cover", imgClassName)} />
      </motion.div>
    </motion.div>
  );
}

/** Image with a very subtle vertical drift while scrolling (kept intentionally small). */
export function ParallaxImage({ src, alt, sizes, className, imgClassName }: BaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y }}>
        <Image src={src} alt={alt} fill sizes={sizes} className={cn("object-cover", imgClassName)} />
      </motion.div>
    </div>
  );
}
