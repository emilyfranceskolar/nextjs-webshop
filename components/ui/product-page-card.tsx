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
    <Card data-cy="relative flex h-full flex-col overflow-visible rounded-none border-0 bg-transparent p-0 shadow-none">
      <Link
        href={`/product/${articleNumber}/${slug}`}
        className="group relative block aspect-square overflow-hidden bg-[#f3f3f1]"
      >
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-contain p-7 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <Link href={`/product/${articleNumber}/${slug}`} className="block">
        <CardHeader className="flex flex-wrap gap-2 p-4 justify-between">
          <CardTitle data-cy="product-title">{title}</CardTitle>
          <ProductPrice price={price} salePrice={salePrice} />
        </CardHeader>
      </Link>
      <p className="px-4 pb-2 text-red-600 font-semibold">
        {stock === 0 ? "Out of stock" : stock <= 5 ? "Only a few left in stock" : "In stock"}
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
