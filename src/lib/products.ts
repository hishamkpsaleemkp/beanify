import { products } from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";

/**
 * Data-access layer. Everything is async so these can be swapped for API/CMS calls later
 * without touching any page or component.
 */

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return products.filter((p) => p.featured).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const same = products.filter((p) => p.id !== product.id && p.category === product.category);
  const others = products.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...same, ...others].slice(0, limit);
}

// ───────── Filter option helpers (pure, safe to use on the client) ─────────

export const CATEGORIES: ProductCategory[] = ["Bean Bags", "Loungers", "Floor Seating", "Cushions"];

const SIZE_ORDER = ["Kids", "Junior", "Medium", "Standard", "Large", "XL", "XXL", "XXXL"];

export function getSizeOptions(list: Product[]) {
  const set = new Set(list.flatMap((p) => p.sizes.map((s) => s.name)));
  return [...set].sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b));
}

export function getColorOptions(list: Product[]) {
  const map = new Map<string, string>();
  list.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
  return [...map].map(([name, hex]) => ({ name, hex }));
}

export const PRICE_RANGES = [
  { id: "all", label: "Any price", min: 0, max: Infinity },
  { id: "u2", label: "Under ₹2,000", min: 0, max: 1999 },
  { id: "2-35", label: "₹2,000 – ₹3,500", min: 2000, max: 3500 },
  { id: "35-5", label: "₹3,500 – ₹5,000", min: 3501, max: 5000 },
  { id: "o5", label: "Above ₹5,000", min: 5001, max: Infinity },
] as const;

export const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest" },
] as const;

export type SortId = (typeof SORT_OPTIONS)[number]["id"];

/** Every word in the query must appear in the product's name, category, blurb or colours. */
export function matchesQuery(query: string, p: Product) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = [p.name, p.category, p.shortDescription, ...p.colors.map((c) => c.name)].join(" ").toLowerCase();
  return q.split(/\s+/).every((word) => hay.includes(word));
}
