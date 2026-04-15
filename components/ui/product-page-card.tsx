import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  slug: string;
}

export default function ProductCard({
  title,
  imageUrl,
  price,
  slug,
}: ProductCardProps) {
  return (
    <Card className="p-0">
      <Link href={`/products/${slug}`} className="block">
        <img src={imageUrl} alt={title} className="relative w-full mt-0" />
      </Link>
      <Link href={`/products/${slug}`} className="block">
        <CardHeader className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          <p>{price}kr</p>
        </CardHeader>
      </Link>
      <CardFooter className="flex gap-2 justify-between">
        <Link
          className="flex-1"
          href={`/products/${slug}`} //ändra länken sen
        >
          <Button
            variant="outline"
            size="lg"
            className="w-full hover:cursor-pointer"
          >
            View Details
          </Button>
        </Link>
        <Button
          asChild
          variant="default"
          size="lg"
          className="flex-1 !bg-black !text-white"
        >
          <Link
            href="/cart" //ändra länken sen
          >
            Add to Cart
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
