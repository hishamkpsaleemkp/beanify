import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-garnet text-bone shadow-[0_10px_24px_-10px_rgba(120,28,46,0.6)] hover:bg-garnet-dark hover:shadow-[0_18px_32px_-12px_rgba(120,28,46,0.65)]",
  secondary: "border border-garnet/30 text-garnet hover:border-garnet hover:bg-garnet/[0.06]",
  light: "bg-bone text-garnet shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)] hover:bg-white hover:shadow-[0_18px_32px_-14px_rgba(0,0,0,0.45)]",
  "outline-light": "border border-bone/40 text-bone hover:border-bone hover:bg-bone/10",
  ghost: "text-garnet hover:bg-garnet/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-[15px]",
  lg: "h-14 px-9 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  /** Animated arrow on the right */
  arrow?: boolean;
  /** Leading icon */
  icon?: ReactNode;
  href?: string;
  /** Opens in a new tab with rel="noopener noreferrer" */
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "children"> & { children: ReactNode };

export function Button({
  variant = "primary",
  size = "md",
  arrow,
  icon,
  href,
  external,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <ArrowRight className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" aria-hidden />}
    </>
  );

  // Anchors/links only need aria-label + onClick from the button props.
  const linkProps = {
    "aria-label": rest["aria-label"],
    onClick: rest.onClick as unknown as MouseEventHandler<HTMLAnchorElement> | undefined,
  };

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...linkProps}>
        {content}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls} {...linkProps}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}
