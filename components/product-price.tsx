import { getProductPrice } from "@/lib/product-price";
import { cn } from "@/lib/utils";

type ProductPriceProps = {
  price: number;
  salePrice?: number | null;
  className?: string;
  variant?: "default" | "card";
};

export default function ProductPrice({
  price,
  salePrice,
  className,
  variant = "default",
}: ProductPriceProps) {
  const currentPrice = getProductPrice({ price, salePrice });
  if (variant === "card") {
    return (
      <span
        className={cn(
          "inline-flex flex-wrap items-baseline justify-end gap-x-2 text-right",
          className,
        )}
      >
        {currentPrice < price && (
          <>
            <span className="sr-only">Regular price:</span>
            <del
              data-cy="product-regular-price"
              className="whitespace-nowrap text-stone-500"
            >
              {price} kr
            </del>
            <span className="sr-only">Sale price:</span>
          </>
        )}
        <span
          data-cy="product-price"
          className={cn(
            "whitespace-nowrap",
            currentPrice < price ? "text-red-600" : "text-black",
          )}
        >
          {currentPrice} kr
        </span>
      </span>
    );
  }
  return (
    <span
      className={cn("inline-flex flex-wrap items-baseline gap-x-2", className)}
    >
      <span
        data-cy="product-price"
        className={currentPrice < price ? "text-red-600" : "text-black"}
      >
        {currentPrice} kr
      </span>
      {currentPrice < price && (
        <>
          <span
            data-cy="product-sale-badge"
            className="rounded-lg bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700"
          >
            Sale
          </span>
          <span className="sr-only">Regular price:</span>
          <del data-cy="product-regular-price" className="text-black">
            {price} kr
          </del>
        </>
      )}
    </span>
  );
}
