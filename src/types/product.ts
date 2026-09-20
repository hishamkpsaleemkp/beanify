export type ProductCategory = "Bean Bags" | "Loungers" | "Floor Seating" | "Cushions";

export type ProductBadge = "Bestseller" | "New" | "Popular";

export interface ProductColor {
  name: string;
  /** Swatch colour */
  hex: string;
  /** Gallery for this colour. Falls back to `Product.images` when empty. */
  images: string[];
}

export interface ProductSize {
  name: string;
  /** Short helper text, e.g. "Ideal for 1 adult" */
  detail: string;
  /** Price in INR for this size */
  price: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** One-line summary used on cards */
  shortDescription: string;
  description: string;
  /** Starting price in INR (lowest size price) */
  price: number;
  category: ProductCategory;
  badge?: ProductBadge;
  featured?: boolean;
  /** ISO date, used for the "Newest" sort */
  createdAt: string;
  /** Default gallery (first colour) */
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  /** Placeholder until real review data exists — hidden in UI + structured data when undefined */
  rating?: number;
  reviewCount?: number;
  specifications: ProductSpec[];
  material: string;
  care: string[];
  shipping: string;
  returns: string;
  highlights: { title: string; text: string }[];
  /** Optional custom closing line for the WhatsApp order message */
  whatsappMessage?: string;
}
