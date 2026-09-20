import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROOM_CATEGORIES } from "@/data/content";

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
  sizes: string;
}

function CategoryCard({ title, image, href, sizes }: CategoryCardProps) {
  return (
    <Link href={href} className="group relative block size-full overflow-hidden rounded-2xl bg-sand">
      <Image
        src={image}
        alt={`${title} with a Beanify bean bag`}
        fill
        sizes={sizes}
        className="object-cover object-[50%_62%] transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.06]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-garnet/75 opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-bone sm:p-6">
        <h3 className="font-display text-xl leading-tight font-extrabold tracking-tight transition-transform duration-500 ease-premium group-hover:-translate-y-1 sm:text-2xl lg:text-3xl">{title}</h3>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-bone text-garnet transition-transform duration-500 ease-premium group-hover:-rotate-45 sm:size-12">
          <ArrowRight className="size-5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

const LAYOUT = [
  "col-span-2 aspect-[16/11] md:col-span-3 md:aspect-[4/3]",
  "col-span-1 aspect-[4/5] md:col-span-3 md:aspect-[4/3]",
  "col-span-1 aspect-[4/5] md:col-span-2",
  "col-span-1 aspect-[4/5] md:col-span-2",
  "col-span-1 aspect-[4/5] md:col-span-2",
];
const SIZES = [
  "(min-width: 768px) 50vw, 100vw",
  "(min-width: 768px) 50vw, 50vw",
  "(min-width: 768px) 33vw, 50vw",
  "(min-width: 768px) 33vw, 50vw",
  "(min-width: 768px) 33vw, 50vw",
];

export function CategorySection() {
  return (
    <section className="bg-sand/60 py-20 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Shop by space" title="Comfort for Every Corner." description="From quiet reading nooks to late-night gaming setups — find the Beanify that fits the way you live." />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6 lg:mt-16">
          {ROOM_CATEGORIES.map((c, i) => (
            <ScrollReveal key={c.title} delay={(i % 3) * 0.08} className={LAYOUT[i]}>
              <CategoryCard {...c} sizes={SIZES[i]} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
