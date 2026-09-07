import { getProductPrice } from "@/lib/product-price";
import { cn } from "@/lib/utils";

type ProductPriceProps = {
  price: number;
  salePrice?: number | null;
  className?: string;
};

export default function ProductPrice({
  price,
  salePrice,
  className,
}: ProductPriceProps) {
  const currentPrice = getProductPrice({ price, salePrice });
  return (
    <span
      className={cn("inline-flex flex-wrap items-baseline gap-x-2", className)}
    >
      <span data-cy="product-price">{currentPrice} kr</span>
      {currentPrice < price && (
        <>
          <span className="sr-only">Regular price:</span>
          <del data-cy="product-regular-price" className="text-red-600">
            {price} kr
          </del>
        </>
      )}
    </span>
  );
}
