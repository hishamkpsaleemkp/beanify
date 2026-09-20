export type NavLink = { label: string; href: string };

export const MAIN_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const MOBILE_NAV: NavLink[] = [...MAIN_NAV, { label: "FAQs", href: "/faq" }];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Bean Bags", href: "/shop?category=Bean+Bags" },
      { label: "Collections", href: "/shop" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/faq#delivery" },
      { label: "Returns", href: "/faq#returns" },
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms-and-conditions" },
    ],
  },
];
