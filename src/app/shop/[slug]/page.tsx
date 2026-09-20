import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductView } from "@/components/product/ProductView";
import { WhyYoullLoveIt } from "@/components/product/WhyYoullLoveIt";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/products";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const title = `${product.name} — Premium ${product.category === "Bean Bags" ? "Bean Bag" : product.category}`;
  const description = `${product.shortDescription}. From ${formatPrice(product.price)} in ${product.colors.length} colours. Order ${product.name} on WhatsApp.`;
  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title, description, url: `/shop/${product.slug}`, images: [{ url: product.images[0], width: 960, height: 1200, alt: product.name }] },
    twitter: { card: "summary_large_image", title, description, images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product, 4);

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.name, path: `/shop/${product.slug}` },
          ]),
        ]}
      />

      <Container className="pt-6 pb-6 lg:pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-garnet">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/shop" className="hover:text-garnet">Shop</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-ink">{product.name}</li>
          </ol>
        </nav>
      </Container>

      <Container className="pb-16 lg:pb-24">
        <ProductView product={product} details={<ProductDetails product={product} />} />
      </Container>

      <WhyYoullLoveIt product={product} />

      <section className="py-16 pb-32 md:pb-24 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Keep exploring" title="You may also love." />
          <div className="mt-10 lg:mt-14">
            <ProductGrid products={related} columns={4} />
          </div>
        </Container>
      </section>
    </>
  );
}
