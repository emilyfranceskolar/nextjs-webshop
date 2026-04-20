import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import AddToCartButton from "../add-to-cart-button";

export interface ProductCardProps {
  title: string;
  articleNumber: string;
  price: number;
  imageUrl: string;
  slug: string;
}

export default function ProductCard({
  title,
  articleNumber,
  imageUrl,
  price,
  slug,
}: ProductCardProps) {
  return (
    <Card data-cy="product" className="p-0">
      <Link href={`/product/${articleNumber}/${slug}`} className="block">
        <img src={imageUrl} alt={title} className="relative w-full mt-0" />
      </Link>
      <Link href={`/product/${articleNumber}/${slug}`} className="block">
        <CardHeader className="flex justify-between">
          <CardTitle data-cy="product-title">{title}</CardTitle>
          <p data-cy="product-price">{price}kr</p>
        </CardHeader>
      </Link>
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
          id={articleNumber}
          title={title}
          articleNumber={articleNumber}
          image={imageUrl}
          price={price}
          slug={slug}
          category={null}
          description={""}
          size="lg"
          buttonText="Add to Cart"
          className="flex-1 bg-black! text-white! hover:cursor-pointer"
        />
      </CardFooter>
    </Card>
  );
}
