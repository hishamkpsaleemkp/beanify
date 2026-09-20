import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/layout/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { SITE } from "@/constants/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["bean bags", "premium bean bags", "bean bag India", "loungers", "floor seating", "home living", "Beanify"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: SITE.title,
    description: SITE.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Beanify — Your Space. Your Story." }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F9F6EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable}`}>
      <body className="flex min-h-svh flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-garnet focus:px-5 focus:py-3 focus:text-bone"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
