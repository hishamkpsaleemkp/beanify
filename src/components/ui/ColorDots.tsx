import { cn } from "@/lib/utils";
import type { ProductColor } from "@/types/product";

export function ColorDots({ colors, className }: { colors: ProductColor[]; className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1.5", className)} aria-label="Available colours">
      {colors.map((c) => (
        <li key={c.name} title={c.name}>
          <span className="block size-3.5 rounded-full border border-black/15" style={{ background: c.hex }}>
            <span className="sr-only">{c.name}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
