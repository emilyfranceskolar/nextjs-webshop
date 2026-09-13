import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import AddToCartButton from "../add-to-cart-button";
import { HomePageCardProps } from "./home-page-card";
import ProductPrice from "../product-price";
import ProductSaleBadge from "../product-sale-badge";

interface ProductCardProps extends HomePageCardProps {
  stock: number;
}

export default function ProductCard({
  id,
  title,
  articleNumber,
  imageUrl,
  price,
  salePrice,
  slug,
  stock,
}: ProductCardProps) {
  return (
    <Card data-cy="product" className="relative h-full bg-[#f1f0ec] p-0">
      <ProductSaleBadge price={price} salePrice={salePrice} />
      <Link
        href={`/product/${articleNumber}/${slug}`}
        className="group block aspect-square overflow-hidden bg-[#f1f0ec]"
      >
        <img
          src={imageUrl}
          alt={title}
          className="block h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </Link>
      <Link href={`/product/${articleNumber}/${slug}`} className="block min-w-0 hover:underline">
        <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2 p-4 text-stone-600 font-semibold">
          <CardTitle data-cy="product-title" className="min-w-0">
            {title}
          </CardTitle>
          <ProductPrice
            price={price}
            salePrice={salePrice}
            variant="card"
            className="max-w-32 justify-self-end"
          />
        </CardHeader>
      </Link>
      <p className="px-4 pb-2 text-red-600 font-semibold">
        {stock === 0
          ? "Out of stock"
          : stock <= 5
            ? "Only a few left in stock"
            : "In stock"}
      </p>

      <CardFooter className="mt-auto flex flex-wrap gap-2 justify-between">
        <Link className="flex-1" href={`/product/${articleNumber}/${slug}`}>
          <Button
            variant="outline"
            size="lg"
            className="w-full hover:cursor-pointer"
          >
            View Details
          </Button>
        </Link>

        <AddToCartButton
          id={id}
          title={title}
          articleNumber={articleNumber}
          imageUrl={imageUrl}
          price={price}
          salePrice={salePrice}
          slug={slug}
          category=""
          description=""
          stock={stock}
          disabled={stock === 0}
          size="lg"
          buttonText="Add to Cart"
          className="flex-1 bg-black! text-white! hover:cursor-pointer"
        />
      </CardFooter>
    </Card>
  );
}
