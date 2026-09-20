"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import {
  CATEGORIES,
  getColorOptions,
  getSizeOptions,
  matchesQuery,
  PRICE_RANGES,
  SORT_OPTIONS,
  type SortId,
} from "@/lib/products";
import { cn, EASE_PREMIUM } from "@/lib/utils";

const SIZE_OPTIONS = getSizeOptions(products);
const COLOR_OPTIONS = getColorOptions(products);

interface FilterState {
  category: string;
  sizes: string[];
  colors: string[];
  price: string;
  sort: SortId;
  q: string;
}

const csv = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-line py-6 first:pt-0 last:border-0">
      <legend className="mb-4 float-left w-full text-xs font-bold tracking-[0.2em] text-muted uppercase">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

function FilterPanel({ f, update, onClear }: { f: FilterState; update: (patch: Record<string, string | null>) => void; onClear: () => void }) {
  const toggle = (key: "size" | "color", list: string[], value: string) => {
    const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
    update({ [key]: next.length ? next.join(",") : null });
  };
  const hasFilters = f.category !== "all" || f.sizes.length || f.colors.length || f.price !== "all" || f.q;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-xl font-extrabold text-ink">Filters</h2>
        {hasFilters && (
          <button type="button" onClick={onClear} className="cursor-pointer text-sm font-semibold text-garnet underline-offset-4 hover:underline">
            Clear all
          </button>
        )}
      </div>

      <FilterGroup title="Category">
        <ul className="space-y-1">
          {["all", ...CATEGORIES].map((c) => {
            const active = f.category === c;
            return (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ category: c === "all" ? null : c })}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-[15px] font-semibold transition-colors",
                    active ? "bg-garnet text-bone" : "text-ink/80 hover:bg-garnet/[0.06]",
                  )}
                >
                  {c === "all" ? "All products" : c}
                  {active && <Check className="size-4" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((s) => {
            const active = f.sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={() => toggle("size", f.sizes, s)}
                className={cn(
                  "h-10 min-w-12 cursor-pointer rounded-full border px-4 text-sm font-semibold transition-all duration-300",
                  active ? "border-garnet bg-garnet text-bone" : "border-line text-ink hover:border-garnet",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2.5">
          {COLOR_OPTIONS.map((c) => {
            const active = f.colors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={active}
                aria-label={c.name}
                title={c.name}
                onClick={() => toggle("color", f.colors, c.name)}
                className={cn("grid size-9 cursor-pointer place-items-center rounded-full border-2 p-0.5 transition-all duration-300", active ? "border-garnet" : "border-transparent hover:border-garnet/40")}
              >
                <span className="grid size-full place-items-center rounded-full border border-black/10" style={{ background: c.hex }}>
                  {active && <Check className="size-3.5 text-white mix-blend-difference" aria-hidden />}
                </span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <ul className="space-y-1">
          {PRICE_RANGES.map((r) => {
            const active = f.price === r.id;
            return (
              <li key={r.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ price: r.id === "all" ? null : r.id })}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-[15px] font-medium text-ink/85 hover:bg-garnet/[0.06]"
                >
                  <span className={cn("grid size-5 place-items-center rounded-full border-2 transition-colors", active ? "border-garnet" : "border-line")}>
                    <span className={cn("size-2.5 rounded-full bg-garnet transition-transform duration-300", active ? "scale-100" : "scale-0")} />
                  </span>
                  {r.label}
                </button>
              </li>
            );
          })}
        </ul>
      </FilterGroup>
    </div>
  );
}

export function ShopBrowser() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const f: FilterState = {
    category: sp.get("category") ?? "all",
    sizes: csv(sp.get("size")),
    colors: csv(sp.get("color")),
    price: sp.get("price") ?? "all",
    sort: (SORT_OPTIONS.find((s) => s.id === sp.get("sort"))?.id ?? "featured") as SortId,
    q: sp.get("q") ?? "",
  };

  const update = (patch: Record<string, string | null>) => {
    const params = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) params.set(k, v);
      else params.delete(k);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const clearAll = () => router.replace(f.sort !== "featured" ? `${pathname}?sort=${f.sort}` : pathname, { scroll: false });

  const key = sp.toString();
  const list = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === f.price) ?? PRICE_RANGES[0];
    const result = products.filter(
      (p) =>
        (f.category === "all" || p.category === f.category) &&
        (!f.sizes.length || p.sizes.some((s) => f.sizes.includes(s.name))) &&
        (!f.colors.length || p.colors.some((c) => f.colors.includes(c.name))) &&
        p.price >= range.min &&
        p.price <= range.max &&
        matchesQuery(f.q, p),
    );
    const sorted = [...result];
    if (f.sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (f.sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (f.sort === "newest") sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const activeCount = (f.category !== "all" ? 1 : 0) + f.sizes.length + f.colors.length + (f.price !== "all" ? 1 : 0);

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12">
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <FilterPanel f={f} update={update} onClear={clearAll} />
        </div>
      </aside>

      <div className="min-w-0">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            <span className="font-bold text-ink">{list.length}</span> {list.length === 1 ? "product" : "products"}
            {f.q && (
              <>
                {" "}
                for “{f.q}”{" "}
                <button type="button" onClick={() => update({ q: null })} className="ml-1 cursor-pointer font-semibold text-garnet hover:underline">
                  Clear
                </button>
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-white/60 px-5 text-sm font-semibold text-ink lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              Filters{activeCount ? ` (${activeCount})` : ""}
            </button>
            <label className="relative">
              <span className="sr-only">Sort by</span>
              <select
                value={f.sort}
                onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}
                className="h-11 cursor-pointer appearance-none rounded-full border border-line bg-white/60 pr-11 pl-5 text-sm font-semibold text-ink transition-colors hover:border-garnet"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-garnet" aria-hidden />
            </label>
          </div>
        </div>

        {/* Category quick chips (mobile / tablet) */}
        <div className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:hidden">
          {["all", ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={f.category === c}
              onClick={() => update({ category: c === "all" ? null : c })}
              className={cn(
                "h-10 shrink-0 cursor-pointer rounded-full border px-5 text-sm font-semibold transition-all duration-300",
                f.category === c ? "border-garnet bg-garnet text-bone" : "border-line text-ink",
              )}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed border-line px-6 py-20 text-center">
            <p className="font-display text-2xl font-extrabold text-ink">No matches — yet.</p>
            <p className="mt-2 max-w-sm text-muted">Try removing a filter, or tell us what you&apos;re after on WhatsApp and we&apos;ll help you find it.</p>
            <Button onClick={clearAll} variant="secondary" className="mt-6">
              Clear filters
            </Button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4 lg:gap-y-12">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                >
                  <ProductCard product={p} sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 50vw" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheetOpen(false)} />
            <motion.div
              className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col rounded-t-3xl bg-bone"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            >
              <div className="flex shrink-0 items-center justify-end px-4 pt-3">
                <button type="button" onClick={() => setSheetOpen(false)} aria-label="Close filters" className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-garnet/[0.07]">
                  <X className="size-5" aria-hidden />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 pb-4">
                <FilterPanel f={f} update={update} onClear={clearAll} />
              </div>
              <div className="shrink-0 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <Button onClick={() => setSheetOpen(false)} size="lg" className="w-full">
                  Show {list.length} {list.length === 1 ? "product" : "products"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
