"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import AddToCartButton from "../add-to-cart-button";
import ProductPrice from "../product-price";

export interface HomePageCardProps {
  id: string;
  title: string;
  articleNumber: string;
  imageUrl: string;
  price: number;
  salePrice?: number | null;
  slug: string;
  category: string | null;
  description: string;
  stock: number;
}

export default function HomePageCard({
  id,
  title,
  articleNumber,
  imageUrl,
  price,
  salePrice,
  slug,
  category,
  description,
  stock,
}: HomePageCardProps) {
  return (
    <Card data-cy="product" className="p-0 relative h-full bg-[#f1f0ec]">
      <Link
        href={`/product/${articleNumber}/${slug}`}
        className="block aspect-[3/4] overflow-hidden"
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-contain block"
          />
        )}
      </Link>
      <div className="flex flex-wrap items-baseline justify-between gap-2 p-4 text-stone-600 font-semibold">
        <Link
          href={`/product/${articleNumber}/${slug}`}
          className="hover:underline"
          data-cy="product-title"
        >
          {title}
        </Link>
        <ProductPrice price={price} salePrice={salePrice} />
      </div>


      <AddToCartButton
        id={id}
        title={title}
        articleNumber={articleNumber}
        imageUrl={imageUrl}
        price={price}
        salePrice={salePrice}
        slug={slug}
        category={category}
        description={description}
        stock={stock}
        disabled={stock === 0}
        buttonText=""
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 p-4.5 sm:p-3 hover:cursor-pointer"
        data-cy="product-buy-button"
      />
    </Card>
  );
}
