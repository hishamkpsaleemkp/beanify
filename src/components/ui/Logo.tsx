import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "garnet" | "light";
  /** Tailwind height class, width follows the logo's aspect ratio */
  className?: string;
  preload?: boolean;
  onClick?: () => void;
}

export function Logo({ variant = "garnet", className, preload, onClick }: LogoProps) {
  return (
    <Link href="/" aria-label="Beanify — home" className="inline-flex shrink-0" onClick={onClick}>
      <Image
        src={variant === "light" ? "/assets/logo-light.png" : "/assets/logo.png"}
        alt="Beanify"
        width={1733}
        height={574}
        sizes="200px"
        preload={preload}
        className={cn("h-9 w-auto sm:h-10", className)}
      />
    </Link>
  );
}
