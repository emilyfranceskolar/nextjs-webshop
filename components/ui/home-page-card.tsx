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
    <Card data-cy="product" className="relative h-full bg-white p-0">
      <Link
        href={`/product/${articleNumber}/${slug}`}
        className="block aspect-[3/4] overflow-hidden bg-[#f1f0ec]"
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-contain block"
          />
        )}
      </Link>
      <div className="flex items-center justify-between gap-3 px-0 pb-0 pt-2 text-xs text-stone-700">
        <Link
          href={`/product/${articleNumber}/${slug}`}
          className="line-clamp-1 min-w-0 uppercase tracking-tight hover:underline"
          data-cy="product-title"
        >
          {title}
        </Link>

        <div className="shrink-0">
          <ProductPrice price={price} salePrice={salePrice} />
        </div>

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
        className="absolute right-2 top-2 h-6 w-6 rounded-sm border border-neutral-200 bg-white! p-0 text-black! shadow-sm hover:bg-neutral-100! hover:cursor-pointer"
        data-cy="product-buy-button"
      />
    </Card>
  );
}
