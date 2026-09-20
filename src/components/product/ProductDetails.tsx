import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

/** Product information accordion (server-rendered content, client-side open/close). */
export function ProductDetails({ product }: { product: Product }) {
  const items: AccordionItem[] = [
    { id: "description", title: "Description", content: <p>{product.description}</p> },
    {
      id: "specifications",
      title: "Specifications",
      content: (
        <dl className="divide-y divide-line">
          {product.specifications.map((s) => (
            <div key={s.label} className="flex justify-between gap-6 py-2.5 first:pt-0 last:pb-0">
              <dt className="font-semibold text-ink">{s.label}</dt>
              <dd className="text-right">{s.value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    { id: "material", title: "Material", content: <p>{product.material}</p> },
    {
      id: "dimensions",
      title: "Dimensions",
      content: (
        <ul className="space-y-2">
          {product.sizes.map((s) => (
            <li key={s.name}>
              <span className="font-semibold text-ink">{s.name}</span> — {s.detail} <span className="text-garnet">({formatPrice(s.price)})</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "care",
      title: "Care Instructions",
      content: (
        <ul className="list-disc space-y-1.5 pl-5 marker:text-garnet">
          {product.care.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ),
    },
    { id: "shipping", title: "Shipping", content: <p>{product.shipping}</p> },
    { id: "returns", title: "Returns", content: <p>{product.returns}</p> },
  ];
  return <Accordion items={items} defaultOpenId="description" />;
}
