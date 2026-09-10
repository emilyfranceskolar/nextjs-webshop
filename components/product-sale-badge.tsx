import { getSalePercentage } from "@/lib/product-price";
import { cn } from "@/lib/utils";

export default function ProductSaleBadge({
  price,
  salePrice,
  className,
}: {
  price: number;
  salePrice?: number | null;
  className?: string;
}) {
  const percentage = getSalePercentage({ price, salePrice });
  if (percentage === null) return null;

  return (
    <span
      data-cy="product-sale-badge"
      className={cn(
        "pointer-events-none absolute right-2 top-2 z-10 bg-white px-2 py-1 text-xs font-medium text-red-600 shadow-sm",
        className,
      )}
    >
      SALE {percentage}%
    </span>
  );
}
