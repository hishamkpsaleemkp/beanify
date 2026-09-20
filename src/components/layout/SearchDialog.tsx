"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/data/products";
import { matchesQuery } from "@/lib/products";
import { EASE_PREMIUM, formatPrice } from "@/lib/utils";

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const results = useMemo(() => (query.trim() ? products.filter((p) => matchesQuery(query, p)) : products.filter((p) => p.featured).slice(0, 4)), [query]);

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search products">
      <motion.div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
      <motion.div
        className="relative mx-auto mt-[8vh] w-[min(680px,calc(100%-2rem))] overflow-hidden rounded-3xl bg-bone shadow-2xl"
        initial={{ opacity: 0, y: -24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
            router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop");
          }}
          className="flex items-center gap-3 border-b border-line px-5"
        >
          <Search className="size-5 shrink-0 text-muted" aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bean bags, loungers, colours…"
            aria-label="Search products"
            className="h-16 w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-muted/70"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-muted hover:bg-garnet/[0.07] hover:text-garnet">
            <X className="size-5" aria-hidden />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          <p className="px-3 pt-2 pb-3 text-xs font-bold tracking-[0.18em] text-muted uppercase">{query.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular right now"}</p>
          {results.length === 0 ? (
            <p className="px-3 pb-6 text-muted">Nothing matched “{query}”. Try “lounger”, “burgundy” or “kids”.</p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <Link href={`/shop/${p.slug}`} onClick={onClose} className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-sand/70">
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-sand">
                      <Image src={p.images[0]} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display font-bold text-ink">{p.name}</span>
                      <span className="block truncate text-sm text-muted">{p.category} · {p.colors.map((c) => c.name).join(", ")}</span>
                    </span>
                    <span className="font-display font-bold text-garnet">{formatPrice(p.price)}</span>
                    <ArrowRight className="size-4 text-garnet opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}
