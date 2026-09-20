/**
 * Central site configuration.
 * Change the WhatsApp number in `.env.local` (NEXT_PUBLIC_WHATSAPP_NUMBER) — digits only,
 * country code first, no "+" or spaces. Example (India): 919876543210
 */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918921979636").replace(/\D/g, "");

export const SITE = {
  name: "Beanify",
  legalName: "Beanify",
  tagline: "Your Space. Your Story.",
  instagramTitle: "Beanify | Home & Living",
  title: "Beanify | Premium Bean Bags & Home Living",
  description:
    "Discover premium bean bags designed for comfort, style and modern living. Shop Beanify and bring your favourite space to life.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_IN",
  currency: "INR",
  email: "hello@beanify.in", // placeholder — replace with the real address
  location: "Perinthalmanna, Malappuram, Kerala 679322",
  address: { locality: "Perinthalmanna", district: "Malappuram", region: "Kerala", postalCode: "679322", country: "IN" },
  instagram: { handle: "@beanify.online", url: "https://www.instagram.com/beanify.online/" },
  copyrightYear: 2026,
} as const;
