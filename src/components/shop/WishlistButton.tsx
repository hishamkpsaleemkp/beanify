"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-store";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  variant?: "icon" | "text";
  className?: string;
}

export function WishlistButton({ productId, productName, variant = "icon", className }: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const saved = has(productId);

  if (variant === "text") {
    return (
      <button
        type="button"
        onClick={() => toggle(productId)}
        aria-pressed={saved}
        className={cn(
          "group inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full border px-7 text-[15px] font-semibold transition-all duration-300 ease-premium hover:-translate-y-0.5",
          saved ? "border-garnet bg-garnet/[0.06] text-garnet" : "border-line text-ink hover:border-garnet hover:text-garnet",
          className,
        )}
      >
        <Heart className={cn("size-5 transition-transform duration-300 group-active:scale-75", saved && "fill-garnet")} aria-hidden />
        {saved ? "Saved to Wishlist" : "Add to Wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      className={cn(
        "grid size-9 cursor-pointer place-items-center rounded-full bg-bone/90 text-garnet shadow-sm backdrop-blur transition-all duration-300 ease-premium hover:scale-110 active:scale-90",
        className,
      )}
    >
      <Heart className={cn("size-[18px]", saved && "fill-garnet")} aria-hidden />
    </button>
  );
}
