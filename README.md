# Beanify — Premium Bean Bags & Home Living

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Customers browse, pick a colour/size, then **order on WhatsApp** (pre-filled message). There is no online checkout.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Configure before launch

Copy `.env.example` → `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Orders/chat number — digits only, country code first (e.g. `919876543210`). Read in `src/constants/site.ts` as `WHATSAPP_NUMBER`. |
| `NEXT_PUBLIC_SITE_URL` | Production URL — used for canonical links, sitemap, Open Graph and structured data. |

Also review `src/constants/site.ts` (email, location) — both are placeholders.

## Where things live

```
src/
├── app/                 routes: /, /shop, /shop/[slug], /about, /contact, /faq,
│                        /privacy-policy, /terms-and-conditions, sitemap, robots, 404
├── components/
│   ├── ui/              Button, Accordion, ScrollReveal, ImageReveal, SectionHeading, Logo, Rating…
│   ├── layout/          Navbar, MobileMenu, Footer, SearchDialog, WishlistDrawer, Providers
│   ├── sections/        Hero, TrustStrip, FeaturedCollection, CategorySection, LifestyleSection,
│   │                    WhyBeanify, InstagramGrid, TestimonialSlider, CTASection, PageHero, LegalPage
│   ├── shop/            ProductCard, ProductGrid, ShopBrowser (filters/sort), WishlistButton
│   ├── product/         ProductView, ImageGallery, ProductInfo, ProductDetails, WhyYoullLoveIt
│   ├── whatsapp/        WhatsAppButton (floating), WhatsAppOrderButton
│   ├── forms/           ContactForm (react-hook-form + zod)
│   └── seo/             JsonLd
├── data/                products.ts, faqs.ts, legal.ts, content.ts  ← edit copy/products here
├── lib/                 whatsapp.ts (message + URL builder), products.ts (data-access), seo.ts, utils.ts
├── constants/           site.ts, navigation.ts
├── services/            enquiry.ts (contact form → WhatsApp; swap for an API later)
└── types/               product.ts
```

### Adding / editing a product
Edit `src/data/products.ts`. Sizes carry their own price; the WhatsApp message uses the selected
colour, size, quantity and price. `src/lib/products.ts` is the only place that reads the data, so
moving to an API/CMS later means changing that one file.

### Images
No photography was supplied, so `public/images/**` holds **generated placeholder illustrations**
(`node scripts/generate-art.mjs`). Replace them with real photos (4:5 portrait works best for products and
scenes) and update the paths in `src/data/*.ts` / `src/data/content.ts` if the file extension changes.
The Beanify logo variants in `public/assets/` are generated from `beenify-logo.png` by
`node scripts/process-logo.mjs`.

## Content to confirm (placeholders)
Materials, dimensions, prices, ratings/review counts, testimonials, delivery time (5–7 days), return
window (7 days), COD wording, email/location, and the Privacy/Terms text are all **sample content** —
verify or replace them, and have the legal pages reviewed.
Star ratings are shown in the UI but deliberately left out of structured data until they are real.
"# beanify" 
