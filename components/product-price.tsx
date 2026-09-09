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
