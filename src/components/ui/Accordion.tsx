"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { cn, EASE_PREMIUM } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string | null;
  /** Open the item whose id matches the URL hash (e.g. /faq#delivery) */
  syncHash?: boolean;
  className?: string;
}

export function Accordion({ items, defaultOpenId = null, syncHash, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const uid = useId();

  useEffect(() => {
    if (!syncHash) return;
    const raf = requestAnimationFrame(() => {
      const hash = window.location.hash.slice(1);
      if (hash && items.some((i) => i.id === hash)) {
        setOpenId(hash);
        document.getElementById(hash)?.scrollIntoView({ block: "center" });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [syncHash, items]);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${uid}-${item.id}-panel`;
        return (
          <div key={item.id} id={item.id} className="scroll-mt-28">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span className={cn("font-display text-lg leading-snug font-bold transition-colors duration-300 sm:text-xl", open ? "text-garnet" : "text-ink group-hover:text-garnet")}>
                  {item.title}
                </span>
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    open ? "border-garnet bg-garnet text-bone" : "border-line text-garnet group-hover:border-garnet",
                  )}
                >
                  <Plus className={cn("size-4 transition-transform duration-300 ease-premium", open && "rotate-45")} aria-hidden />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                  className="overflow-hidden"
                >
                  <div className="pr-12 pb-6 leading-relaxed text-muted">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
