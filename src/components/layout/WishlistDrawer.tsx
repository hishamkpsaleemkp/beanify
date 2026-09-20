"use client";

import { motion } from "framer-motion";
import { Heart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppOrderButton } from "@/components/whatsapp/WhatsAppOrderButton";
import { products } from "@/data/products";
import { EASE_PREMIUM, formatPrice } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-store";

export function WishlistDrawer({ onClose }: { onClose: () => void }) {
  const { ids, remove } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));

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

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Your wishlist">
      <motion.div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} />
      <motion.aside
        className="absolute inset-y-0 right-0 flex w-[min(440px,100%)] flex-col bg-bone shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.55, ease: EASE_PREMIUM }}
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-6">
          <h2 className="font-display text-xl font-extrabold text-ink">
            Your Wishlist <span className="text-base font-semibold text-muted">({saved.length})</span>
          </h2>
          <button type="button" onClick={onClose} aria-label="Close wishlist" className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-garnet/[0.07]">
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {saved.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="mb-5 grid size-16 place-items-center rounded-full bg-garnet/[0.07] text-garnet">
              <Heart className="size-7" aria-hidden />
            </span>
            <p className="font-display text-2xl font-extrabold text-ink">Nothing saved yet</p>
            <p className="mt-2 text-muted">Tap the heart on any product to keep it here for later.</p>
            <Button href="/shop" arrow className="mt-7" onClick={onClose}>
              Explore the collection
            </Button>
          </div>
        ) : (
          <ul className="flex-1 space-y-5 overflow-y-auto p-6">
            {saved.map((p) => (
              <li key={p.id} className="flex gap-4">
                <Link href={`/shop/${p.slug}`} onClick={onClose} className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-sand">
                  <Image src={p.images[0]} alt={p.name} fill sizes="96px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/shop/${p.slug}`} onClick={onClose} className="font-display font-bold text-ink hover:text-garnet">
                      {p.name}
                    </Link>
                    <button type="button" onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`} className="cursor-pointer text-muted transition-colors hover:text-garnet">
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                  </div>
                  <p className="text-sm text-muted">{p.sizes.length > 1 ? "From " : ""}{formatPrice(p.price)}</p>
                  <WhatsAppOrderButton product={p} buttonSize="sm" label="Order" className="mt-auto w-fit" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </motion.aside>
    </div>
  );
}
