"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn, EASE_PREMIUM } from "@/lib/utils";
import { GENERAL_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

/** Floating "Chat with Beanify" button, fixed bottom-right on every page. */
export function WhatsAppButton() {
  const pathname = usePathname();
  // Product pages have a sticky bottom order bar on mobile — hide the floating button there.
  const onProductPage = pathname.startsWith("/shop/") && pathname !== "/shop/";

  // On the home page the phone hero has its own CTAs at the bottom of the first screen —
  // keep the floating button out of the way until the visitor scrolls past it.
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 320));
  const hideOnHero = pathname === "/" && !scrolled;

  return (
    <motion.div
      className={cn("fixed right-4 bottom-5 z-40 sm:right-6 md:bottom-6", onProductPage && "max-md:hidden")}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7, ease: EASE_PREMIUM }}
    >
      <div className={cn("transition-all duration-500 ease-premium", hideOnHero && "max-md:pointer-events-none max-md:translate-y-4 max-md:opacity-0")}>
        <a
          href={whatsappUrl(GENERAL_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Beanify on WhatsApp"
          className="group relative grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 ease-premium hover:scale-105 active:scale-95 md:size-[60px]"
        >
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp" aria-hidden />
          <WhatsAppIcon className="relative size-7 md:size-8" />
          <span
            role="tooltip"
            className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold whitespace-nowrap text-bone opacity-0 shadow-lg transition-all duration-300 ease-premium group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block"
          >
            Chat with Beanify
          </span>
        </a>
      </div>
    </motion.div>
  );
}
