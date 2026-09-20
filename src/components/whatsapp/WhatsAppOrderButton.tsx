import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { orderUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

interface WhatsAppOrderButtonProps {
  product: Product;
  /** Defaults to the first colour / size */
  color?: string;
  sizeName?: string;
  quantity?: number;
  label?: string;
  variant?: "primary" | "secondary" | "light";
  buttonSize?: "sm" | "md" | "lg";
  className?: string;
}

/** Opens WhatsApp in a new tab with the selected product details pre-filled. */
export function WhatsAppOrderButton({
  product,
  color,
  sizeName,
  quantity = 1,
  label = "Order on WhatsApp",
  variant = "primary",
  buttonSize = "md",
  className,
}: WhatsAppOrderButtonProps) {
  const size = product.sizes.find((s) => s.name === sizeName) ?? product.sizes[0];
  const href = orderUrl({
    product,
    color: color ?? product.colors[0].name,
    size: size.name,
    quantity,
    price: size.price,
  });
  return (
    <Button href={href} external variant={variant} size={buttonSize} icon={<WhatsAppIcon className="size-5" />} className={className}>
      {label}
    </Button>
  );
}
