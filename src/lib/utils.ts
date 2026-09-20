import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** 2999 → "₹2,999" */
export function formatPrice(amount: number) {
  return inr.format(amount);
}

/** Shared easing for the premium, unhurried feel used across animations. */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
