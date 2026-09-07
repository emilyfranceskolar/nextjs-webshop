import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import AddToCartButton from "../add-to-cart-button";
import { HomePageCardProps } from "./home-page-card";

interface ProductCardProps extends HomePageCardProps {
  stock: number;
}

export default function ProductCard({
  id,
  title,
  articleNumber,
  imageUrl,
  price,
  slug,
  stock,

}: ProductCardProps) {
  return (
    <Card data-cy="product" className="p-0">
      <Link href={`/product/${articleNumber}/${slug}`} className="block">
        <img src={imageUrl} alt={title} className="relative w-full mt-0" />
      </Link>
      <Link href={`/product/${articleNumber}/${slug}`} className="block">
        <CardHeader className="flex p-4 justify-between">
          <CardTitle data-cy="product-title">{title}</CardTitle>
          <p data-cy="product-price">{price}kr</p>
        </CardHeader>
      </Link>

      <p className="px-4 pb-2 text-red-600 font-semibold">
        {stock === 0 ? "Slut i lager" : stock <= 5 ? "Endast några kvar i lager" : "I lager"}
      </p>

      <CardFooter className="flex gap-2 justify-between">
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
