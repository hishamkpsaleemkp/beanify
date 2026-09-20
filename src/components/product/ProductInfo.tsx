"use client";

import { Check, Minus, Plus, ShieldCheck, Truck, Undo2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { WishlistButton } from "@/components/shop/WishlistButton";
import { Rating } from "@/components/ui/Rating";
import { WhatsAppOrderButton } from "@/components/whatsapp/WhatsAppOrderButton";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
  colorIndex: number;
  sizeIndex: number;
  quantity: number;
  onColor: (i: number) => void;
  onSize: (i: number) => void;
  onQuantity: (q: number) => void;
  /** Server-rendered accordion, slotted below the CTAs */
  children?: ReactNode;
}

export function ProductInfo({ product, colorIndex, sizeIndex, quantity, onColor, onSize, onQuantity, children }: ProductInfoProps) {
  const color = product.colors[colorIndex];
  const size = product.sizes[sizeIndex];

  return (
    <div>
      <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="text-xs font-bold tracking-[0.22em] text-garnet uppercase hover:underline">
        {product.category}
      </Link>
      <h1 className="font-display-heading mt-3 text-[clamp(2.4rem,5vw,3.75rem)] text-ink">{product.name}</h1>

      {product.rating !== undefined && <Rating rating={product.rating} count={product.reviewCount} className="mt-4" />}

      <p className="mt-6 font-display text-3xl font-extrabold tracking-tight text-garnet sm:text-4xl" aria-live="polite">
        {formatPrice(size.price)}
      </p>
      <p className="mt-4 text-lg leading-relaxed font-medium text-ink/80 sm:text-xl">{product.shortDescription}.</p>

      {/* Colour */}
      <div className="mt-8" role="radiogroup" aria-label="Colour">
        <p className="mb-3 text-sm font-semibold text-ink">
          Color: <span className="font-medium text-muted">{color.name}</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((c, i) => {
            const active = i === colorIndex;
            return (
              <button
                key={c.name}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={c.name}
                title={c.name}
                onClick={() => onColor(i)}
                className={cn("grid size-11 cursor-pointer place-items-center rounded-full border-2 p-1 transition-all duration-300", active ? "border-garnet" : "border-transparent hover:border-garnet/40")}
              >
                <span className="grid size-full place-items-center rounded-full border border-black/10" style={{ background: c.hex }}>
                  {active && <Check className="size-4 text-white mix-blend-difference" aria-hidden />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div className="mt-7" role="radiogroup" aria-label="Size">
        <p className="mb-3 text-sm font-semibold text-ink">
          Size: <span className="font-medium text-muted">{size.name}</span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((s, i) => {
            const active = i === sizeIndex;
            return (
              <button
                key={s.name}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onSize(i)}
                className={cn(
                  "min-w-24 cursor-pointer rounded-2xl border px-5 py-3 text-left transition-all duration-300",
                  active ? "border-garnet bg-garnet/[0.06] shadow-[inset_0_0_0_1px_var(--color-garnet)]" : "border-line hover:border-garnet/50",
                )}
              >
                <span className="block font-display font-bold text-ink">{s.name}</span>
                <span className="block text-xs text-muted">{formatPrice(s.price)}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-muted">{size.detail}</p>
      </div>

      {/* Quantity */}
      <div className="mt-7">
        <p className="mb-3 text-sm font-semibold text-ink">Quantity</p>
        <div className="inline-flex items-center rounded-full border border-line">
          <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => onQuantity(quantity - 1)} className="grid size-12 cursor-pointer place-items-center rounded-full text-garnet transition-colors hover:bg-garnet/[0.07] disabled:cursor-not-allowed disabled:opacity-30">
            <Minus className="size-4" aria-hidden />
          </button>
          <output className="w-10 text-center font-display text-lg font-bold" aria-live="polite">
            {quantity}
          </output>
          <button type="button" aria-label="Increase quantity" disabled={quantity >= 10} onClick={() => onQuantity(quantity + 1)} className="grid size-12 cursor-pointer place-items-center rounded-full text-garnet transition-colors hover:bg-garnet/[0.07] disabled:cursor-not-allowed disabled:opacity-30">
            <Plus className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <WhatsAppOrderButton product={product} color={color.name} sizeName={size.name} quantity={quantity} label="Buy on WhatsApp" buttonSize="lg" className="flex-1" />
        <WishlistButton productId={product.id} productName={product.name} variant="text" className="h-14" />
      </div>
      <p className="mt-3 text-sm text-muted">Your selection opens pre-filled in WhatsApp — no online payment needed. We&apos;ll confirm the rest in chat.</p>

      <ul className="mt-7 grid grid-cols-1 gap-3 border-y border-line py-6 text-sm text-ink/80 sm:grid-cols-3">
        {[
          { icon: Truck, text: "Delivery across India" },
          { icon: Undo2, text: "7-day damage returns" },
          { icon: ShieldCheck, text: "Premium materials" },
        ].map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5">
            <Icon className="size-5 shrink-0 text-garnet" aria-hidden />
            {text}
          </li>
        ))}
      </ul>

      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
