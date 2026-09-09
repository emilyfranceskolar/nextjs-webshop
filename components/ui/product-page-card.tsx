import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import AddToCartButton from "../add-to-cart-button";
import { HomePageCardProps } from "./home-page-card";
import ProductPrice from "../product-price";

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
    <Card data-cy="product" className="p-0 h-full">
      <Link
        href={`/product/${articleNumber}/${slug}`}
        className="block h-[180px] sm:h-auto sm:aspect-[3/4] overflow-hidden bg-[#f1f0ec]"
      >
        <img
          src={imageUrl}
          alt={title}
          className="sm:h-full w-full object-contain"
        />
      </Link>

      <Link href={`/product/${articleNumber}/${slug}`} className="block">
        <CardHeader className="flex flex-wrap gap-3 p-2 justify-between sm:p-4">
          <CardTitle data-cy="product-title" className="text-sm sm:text-base">{title}</CardTitle>
          <ProductPrice price={price} salePrice={salePrice} />
        </CardHeader>
      </Link>

      <p className="px-2 pb-2 sm:px-4 sm:text-sm text-red-600 font-semibold">
        {stock === 0 ? "Out of stock" : stock <= 5 ? "Only a few left in stock" : "In stock"}
      </p>

      <CardFooter className="mt-auto p-2 flex flex-wrap sm:gap-2 sm:p-4 justify-between">
        <Link className="flex-1" href={`/product/${articleNumber}/${slug}`}>
          <Button
            variant="outline"
            size="sm"
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
