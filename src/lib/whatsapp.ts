import { SITE, WHATSAPP_NUMBER } from "@/constants/site";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

export interface OrderSelection {
  product: Product;
  color: string;
  size: string;
  quantity: number;
  /** Unit price for the selected size */
  price: number;
}

/** Builds a wa.me link. `message` is URL-encoded here. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function buildOrderMessage({ product, color, size, quantity, price }: OrderSelection) {
  const lines = [
    "Hi Beanify 👋",
    "",
    "I'm interested in ordering:",
    "",
    `Product: ${product.name}`,
    `Color: ${color}`,
    `Size: ${size}`,
    `Quantity: ${quantity}`,
    `Price: ${formatPrice(price)}`,
  ];
  if (quantity > 1) lines.push(`Total: ${formatPrice(price * quantity)}`);
  lines.push(`Link: ${SITE.url}/shop/${product.slug}`, "", product.whatsappMessage ?? "Please share the next steps for ordering.");
  return lines.join("\n");
}

export function orderUrl(selection: OrderSelection) {
  return whatsappUrl(buildOrderMessage(selection));
}

/** Default selection (first colour, first size) — used for quick-order buttons on cards. */
export function quickOrderUrl(product: Product) {
  const size = product.sizes[0];
  return orderUrl({ product, color: product.colors[0].name, size: size.name, quantity: 1, price: size.price });
}

export const GENERAL_MESSAGE = "Hi Beanify 👋\n\nI'd like to know more about your bean bags.";

export function buildContactMessage(values: { name: string; phone?: string; email?: string; message: string }) {
  const lines = ["Hi Beanify 👋", "", values.message, "", `Name: ${values.name}`];
  if (values.phone) lines.push(`Phone: ${values.phone}`);
  if (values.email) lines.push(`Email: ${values.email}`);
  return lines.join("\n");
}
