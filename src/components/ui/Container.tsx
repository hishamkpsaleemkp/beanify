import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = { as?: T } & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Container<T extends ElementType = "div">({ as, className, ...props }: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cn("mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12", className)} {...props} />;
}
