import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const pages = ["/", "/shop", "/about", "/contact", "/faq", "/privacy-policy", "/terms-and-conditions"];
  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: (path === "/" || path === "/shop" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "/" ? 1 : path === "/shop" ? 0.9 : 0.6,
    })),
    ...products.map((p) => ({
      url: absoluteUrl(`/shop/${p.slug}`),
      lastModified: new Date(p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
