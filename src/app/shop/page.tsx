import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { Container } from "@/components/ui/Container";
import { getProducts } from "@/lib/products";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shop Bean Bags, Loungers & Floor Seating",
  description: "Browse Beanify's premium bean bags, loungers, floor seating and cushions. Pick your colour and size, then order in minutes on WhatsApp.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }])} />
      <PageHero eyebrow="The Collection" title="Shop Beanify" description="Comfort designed for every space." />
      <Container className="py-10 lg:py-16">
        {/* The fallback is a plain server-rendered grid so the catalogue is in the HTML for crawlers. */}
        <Suspense
          fallback={
            <div className="lg:pl-[298px]">
              <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4 lg:gap-y-12">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 50vw" />
                ))}
              </div>
            </div>
          }
        >
          <ShopBrowser />
        </Suspense>
      </Container>
    </>
  );
}
