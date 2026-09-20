import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_NAV } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { GENERAL_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

const linkClass = "text-bone/75 transition-colors duration-300 hover:text-bone";

export function Footer() {
  return (
    <footer className="on-garnet relative mt-auto overflow-hidden bg-garnet text-bone">
      {/* Decorative oversized mark */}
      <Image
        src="/assets/logo-mark-light.png"
        alt=""
        width={404}
        height={574}
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-24 h-[420px] w-auto opacity-[0.06] select-none lg:h-[560px]"
      />
      <Container className="relative pt-16 pb-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo variant="light" className="h-11 sm:h-12" />
            <p className="mt-6 font-display text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              Your Space.
              <br />
              Your Story.
            </p>
            <p className="mt-5 max-w-sm text-bone/70">Premium bean bags and home living, designed to bring comfort, character and effortless style into your everyday.</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {FOOTER_NAV.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mb-5 text-xs font-bold tracking-[0.22em] text-blush uppercase">{col.title}</h2>
                <ul className="space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="mb-5 text-xs font-bold tracking-[0.22em] text-blush uppercase">Social</h2>
              <ul className="space-y-3.5">
                <li>
                  <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                    <InstagramIcon className="size-4" /> Instagram
                  </a>
                </li>
                <li>
                  <a href={whatsappUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                    <WhatsAppIcon className="size-4" /> WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-bone/20 pt-6 text-sm text-bone/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.copyrightYear} {SITE.name}. All rights reserved.
          </p>
          <p className="font-semibold text-bone/90">{SITE.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
