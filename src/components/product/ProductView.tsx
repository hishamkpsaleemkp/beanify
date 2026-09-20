"use client";

import { useState, type ReactNode } from "react";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { WhatsAppIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils";
import { orderUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

/** Owns the selected colour / size / quantity so the gallery, info panel and mobile bar stay in sync. */
export function ProductView({ product, details }: { product: Product; details: ReactNode }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const color = product.colors[colorIndex];
  const size = product.sizes[sizeIndex];
  const images = color.images.length ? color.images : product.images;
  const href = orderUrl({ product, color: color.name, size: size.name, quantity, price: size.price });

  return (
    <>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ImageGallery key={color.name} images={images} name={product.name} colorName={color.name} productId={product.id} badge={product.badge} />
        </div>
        <ProductInfo
          product={product}
          colorIndex={colorIndex}
          sizeIndex={sizeIndex}
          quantity={quantity}
          onColor={setColorIndex}
          onSize={setSizeIndex}
          onQuantity={setQuantity}
        >
          {details}
        </ProductInfo>
      </div>

      {/* Sticky mobile order bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bone/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 leading-tight">
            <p className="font-display text-xl font-extrabold text-garnet">{formatPrice(size.price * quantity)}</p>
            <p className="truncate text-xs text-muted">
              {color.name} · {size.name} · Qty {quantity}
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-garnet px-5 font-semibold whitespace-nowrap text-bone shadow-[0_10px_24px_-10px_rgba(120,28,46,0.6)] transition-transform active:scale-[0.98]"
          >
            <WhatsAppIcon className="size-5" />
            Buy on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
