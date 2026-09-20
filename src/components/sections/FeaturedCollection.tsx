import { ProductGrid } from "@/components/shop/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts } from "@/lib/products";

export async function FeaturedCollection() {
  const products = await getFeaturedProducts(6);
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="The Collection"
          title="Find Your Comfort."
          description={"Designed to fit your space.\nMade to become your favourite spot."}
        />
        <div className="mt-14 lg:mt-20">
          <ProductGrid products={products} columns={3} />
        </div>
        <ScrollReveal className="mt-14 flex justify-center">
          <Button href="/shop" variant="secondary" size="lg" arrow>
            View All Products
          </Button>
        </ScrollReveal>
      </Container>
    </section>
  );
}
