"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { MOBILE_NAV } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { cn, EASE_PREMIUM } from "@/lib/utils";
import { GENERAL_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
  onWishlist: () => void;
  wishlistCount: number;
}

export function MobileMenu({ open, onClose, onSearch, onWishlist, wishlistCount }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="on-garnet fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-garnet text-bone lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
        >
          <div className="flex h-[68px] shrink-0 items-center justify-between px-5 sm:px-8">
            <Logo variant="light" onClick={onClose} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-bone/30 text-bone transition-colors hover:bg-bone/10"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5 py-8 sm:px-8">
            <ul className="space-y-1">
              {MOBILE_NAV.map((link, i) => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE_PREMIUM }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block py-1.5 font-display text-[clamp(2.5rem,12vw,4.25rem)] leading-[1.05] font-extrabold tracking-tight transition-colors",
                          active ? "text-blush" : "text-bone hover:text-blush",
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="space-y-6 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_PREMIUM }}
          >
            <Button href="/shop" variant="light" size="lg" arrow className="w-full" onClick={onClose}>
              Shop Now
            </Button>
            <div className="flex items-center justify-between border-t border-bone/20 pt-5">
              <div className="flex items-center gap-2">
                <button type="button" onClick={onSearch} className="flex h-11 cursor-pointer items-center gap-2 rounded-full border border-bone/30 px-4 text-sm font-semibold hover:bg-bone/10">
                  <Search className="size-4" aria-hidden /> Search
                </button>
                <button type="button" onClick={onWishlist} className="flex h-11 cursor-pointer items-center gap-2 rounded-full border border-bone/30 px-4 text-sm font-semibold hover:bg-bone/10">
                  <Heart className="size-4" aria-hidden /> Wishlist{wishlistCount ? ` (${wishlistCount})` : ""}
                </button>
              </div>
              <div className="flex items-center gap-1">
                <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Beanify on Instagram" className="grid size-11 place-items-center rounded-full hover:bg-bone/10">
                  <InstagramIcon className="size-5" />
                </a>
                <a href={whatsappUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="grid size-11 place-items-center rounded-full hover:bg-bone/10">
                  <WhatsAppIcon className="size-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
