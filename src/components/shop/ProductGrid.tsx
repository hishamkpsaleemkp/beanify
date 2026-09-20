import { ProductCard } from "@/components/shop/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  /** Desktop column count. Mobile is always 2 columns. */
  columns?: 3 | 4;
  className?: string;
}

/** Server-rendered grid with staggered scroll reveals (used on the home page and related products). */
export function ProductGrid({ products, columns = 3, className }: ProductGridProps) {
  const sizes =
    columns === 4
      ? "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
      : "(min-width: 1024px) 33vw, 50vw";
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:gap-x-7 lg:gap-y-12",
        columns === 3 ? "lg:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {products.map((p, i) => (
        <ScrollReveal key={p.id} delay={(i % columns) * 0.08} className="h-full">
          <ProductCard product={p} sizes={sizes} />
        </ScrollReveal>
      ))}
    </div>
  );
}
