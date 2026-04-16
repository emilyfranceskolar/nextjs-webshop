import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { ProductCardProps } from "./product-page-card";

export interface HomePageCardProps extends ProductCardProps {}

export default function HomePageCard({
  title,
  articleNumber,
  imageUrl,
  price,
  slug,
}: HomePageCardProps) {
  return (
    <Card data-cy="product" className="p-0 relative">
      <Link href={`/product/${articleNumber}/${slug}`} className="block">
        <img src={imageUrl} alt={title} className="w-full object-cover" />
      </Link>
      <Link
        href={`/product/${articleNumber}/${slug}`}
        className="absolute bottom-4 left-4 text-md text-stone-600 font-semibold hover:underline"
        data-cy="product-title"
      >
        {title}
      </Link>
      <p
        data-cy="product-price"
        className="absolute bottom-3.5 right-4 text-stone-600 text-md font-semibold"
      >
        {price}kr
      </p>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 p-4.5 sm:p-3 hover:cursor-pointer"
      >
        <Link
          data-cy="product-buy-button"
          href="" //ändra länken sen
        >
          <PlusIcon />
        </Link>
      </Button>
    </Card>
  );
}
