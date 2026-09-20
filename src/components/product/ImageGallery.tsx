"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { WishlistButton } from "@/components/shop/WishlistButton";
import { cn, EASE_PREMIUM } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  name: string;
  colorName: string;
  productId: string;
  badge?: string;
}

const LABELS = ["Front view", "In the room", "Fabric detail"];

/** Thumbnails + large image with cross-fade and hover zoom. Re-mount (via `key`) to reset on colour change. */
export function ImageGallery({ images, name, colorName, productId, badge }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const go = (d: number) => setActive((i) => (i + d + images.length) % images.length);

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-4">
      <div
        className="group relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden rounded-2xl bg-sand lg:rounded-3xl"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--ox", `${((e.clientX - r.left) / r.width) * 100}%`);
          e.currentTarget.style.setProperty("--oy", `${((e.clientY - r.top) / r.height) * 100}%`);
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_PREMIUM }}
          >
            <Image
              src={images[active]}
              alt={`${name} in ${colorName} — ${LABELS[active] ?? `view ${active + 1}`}`}
              fill
              preload={active === 0}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover transition-transform duration-700 ease-premium [transform-origin:var(--ox,50%)_var(--oy,50%)] lg:group-hover:scale-[1.6]"
            />
          </motion.div>
        </AnimatePresence>

        {badge && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-garnet px-3.5 py-1.5 text-[11px] font-bold tracking-[0.16em] text-bone uppercase">{badge}</span>
        )}
        <WishlistButton productId={productId} productName={name} className="absolute top-4 right-4 z-10 size-11" />

        {images.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute top-1/2 left-3 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-bone/90 text-garnet shadow transition-all hover:scale-110 lg:opacity-0 lg:group-hover:opacity-100">
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute top-1/2 right-3 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-bone/90 text-garnet shadow transition-all hover:scale-110 lg:opacity-0 lg:group-hover:opacity-100">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        )}
      </div>

      <ul className="flex gap-3 lg:w-20 lg:flex-col" aria-label="Product images">
        {images.map((src, i) => (
          <li key={src} className="w-20 shrink-0 lg:w-full">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${LABELS[i] ?? `image ${i + 1}`}`}
              aria-current={i === active}
              className={cn(
                "relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-xl border-2 bg-sand transition-all duration-300",
                i === active ? "border-garnet" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
