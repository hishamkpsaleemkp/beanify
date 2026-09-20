import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <Container className="grid min-h-[70svh] place-items-center py-20 text-center">
        <div>
          <Image src="/assets/logo-mark.png" alt="" width={404} height={574} className="mx-auto mb-8 h-20 w-auto opacity-90" />
          <p className="text-xs font-bold tracking-[0.24em] text-garnet uppercase">Error 404</p>
          <h1 className="font-display-heading mt-4 text-[clamp(3rem,9vw,6.5rem)] text-ink">This spot&apos;s empty.</h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-muted">The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back to something comfortable.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg" arrow>
              Back to Home
            </Button>
            <Button href="/shop" size="lg" variant="secondary">
              Shop Beanify
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
