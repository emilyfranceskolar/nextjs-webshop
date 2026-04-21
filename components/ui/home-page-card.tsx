"use client";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "../add-to-cart-button";
import { Button } from "./button";

export interface HomePageCardProps {
  id: string;
  title: string;
  articleNumber: number;
  imageUrl: string;
  price: number;
  slug: string;
  category: string | null;
  description: string;
}

export default function HomePageCard({
  id,
  title,
  articleNumber,
  imageUrl,
  price,
  slug,
  category,
  description,
}: HomePageCardProps) {
  return (
    <Card data-cy="product" className="p-0 relative">
      <Link href={`/product/${articleNumber}/${slug}`} className="block">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full object-cover block"
          />
        )}
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
        <PlusIcon />
      </Button>

      <AddToCartButton
        id={id}
        title={title}
        articleNumber={articleNumber}
        imageUrl={imageUrl}
        price={price}
        slug={slug}
        category={category}
        description={description}
        buttonText=""
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 p-4.5 sm:p-3 hover:cursor-pointer"
      />
    </Card>
  );
}
