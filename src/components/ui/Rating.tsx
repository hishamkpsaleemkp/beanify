import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}

export function Rating({ rating, count, size = "md", className }: RatingProps) {
  const filled = Math.round(rating);
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex" role="img" aria-label={`Rated ${rating} out of 5`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={cn(size === "sm" ? "size-3.5" : "size-4", i < filled ? "fill-garnet text-garnet" : "text-line")} aria-hidden />
        ))}
      </div>
      {count !== undefined && (
        <span className={cn("text-muted", size === "sm" ? "text-xs" : "text-sm")}>
          {rating.toFixed(1)} · {count} reviews
        </span>
      )}
    </div>
  );
}
