import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ColorDots } from "@/components/ui/ColorDots";
import { WishlistButton } from "@/components/shop/WishlistButton";
import { WhatsAppOrderButton } from "@/components/whatsapp/WhatsAppOrderButton";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  /** Responsive `sizes` hint for next/image */
  sizes?: string;
  preload?: boolean;
}

export function ProductCard({
  product,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  preload,
}: ProductCardProps) {
  return (
    <article className="group relative flex h-full flex-col transition-transform duration-500 ease-premium hover:-translate-y-1.5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
        <Image
          src={product.images[0]}
          alt={`${product.name} in ${product.colors[0].name}`}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-garnet px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-bone uppercase sm:text-[11px]">
            {product.badge}
          </span>
        )}
        <WishlistButton productId={product.id} productName={product.name} className="absolute top-3 right-3 z-10" />
        {/* Hover CTA (desktop) */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-3 items-center justify-between rounded-full bg-bone/95 px-5 py-3 text-sm font-semibold text-garnet opacity-0 shadow-lg backdrop-blur transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100 md:flex">
          View Product
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-display text-base leading-tight font-bold text-ink sm:text-lg">
          <Link href={`/shop/${product.slug}`} className="after:absolute after:inset-0 after:z-[1] after:content-['']">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-muted sm:text-sm">{product.shortDescription}</p>
        <p className="mt-2.5 font-display text-lg font-bold text-garnet sm:text-xl">
          <span className="text-xs font-semibold text-muted sm:text-[13px]">{product.sizes.length > 1 ? "From " : ""}</span>
          {formatPrice(product.price)}
        </p>
        <div className="mt-2.5 flex items-center gap-2 text-xs text-muted">
          <span className="hidden sm:inline">Available in</span>
          <ColorDots colors={product.colors} />
        </div>
        <div className="relative z-10 mt-auto pt-4">
          <WhatsAppOrderButton
            product={product}
            buttonSize="sm"
            variant="secondary"
            label="Order on WhatsApp"
            className="w-full px-3 text-[13px] sm:text-sm"
          />
        </div>
      </div>
    </article>
  );
}
