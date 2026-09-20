"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { Heart, Menu, Search } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MAIN_NAV } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-store";

// Loaded on demand — keeps them out of the initial bundle.
const SearchDialog = dynamic(() => import("@/components/layout/SearchDialog").then((m) => m.SearchDialog));
const WishlistDrawer = dynamic(() => import("@/components/layout/WishlistDrawer").then((m) => m.WishlistDrawer));

function IconButton({ label, onClick, children, badge }: { label: string; onClick: () => void; children: React.ReactNode; badge?: number }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative grid size-11 cursor-pointer place-items-center rounded-full text-ink transition-colors duration-300 hover:bg-garnet/[0.07] hover:text-garnet"
    >
      {children}
      {!!badge && (
        <span className="absolute top-1.5 right-1.5 grid min-w-4 place-items-center rounded-full bg-garnet px-1 text-[10px] leading-4 font-bold text-bone">
          {badge}
        </span>
      )}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const { ids } = useWishlist();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 16));

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-500 ease-premium",
          scrolled ? "border-line/80 bg-bone/80 shadow-[0_10px_30px_-22px_rgba(36,22,26,0.35)] backdrop-blur-xl" : "border-transparent bg-bone/70",
        )}
      >
        <Container className={cn("flex items-center justify-between transition-[height] duration-500 ease-premium", scrolled ? "h-16" : "h-[68px] lg:h-20")}>
          <Logo preload />

          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            {MAIN_NAV.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[15px] font-semibold transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:rounded-full after:bg-garnet after:transition-transform after:duration-500 after:ease-premium after:content-['']",
                    active ? "text-garnet after:scale-x-100" : "text-ink/80 after:scale-x-0 hover:text-garnet hover:after:scale-x-100",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 lg:flex">
              <IconButton label="Search products" onClick={() => setSearchOpen(true)}>
                <Search className="size-5" aria-hidden />
              </IconButton>
              <IconButton label={`Wishlist${ids.length ? `, ${ids.length} saved` : ""}`} onClick={() => setWishOpen(true)} badge={ids.length}>
                <Heart className="size-5" aria-hidden />
              </IconButton>
              <Button href="/shop" size="sm" arrow className="ml-3">
                Shop Now
              </Button>
            </div>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="grid size-11 cursor-pointer place-items-center rounded-full text-garnet transition-colors hover:bg-garnet/[0.07] lg:hidden"
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </div>
        </Container>
      </header>

      {/* Rendered outside <header>: backdrop-filter would otherwise trap `position: fixed` children. */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }}
        onWishlist={() => {
          setMenuOpen(false);
          setWishOpen(true);
        }}
        wishlistCount={ids.length}
      />
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
      {wishOpen && <WishlistDrawer onClose={() => setWishOpen(false)} />}
    </>
  );
}
