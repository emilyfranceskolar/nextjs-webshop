import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import AddToCartButton from "../add-to-cart-button";
import { HomePageCardProps } from "./home-page-card";
import ProductPrice from "../product-price";
import ProductSaleBadge from "../product-sale-badge";
import Image from "next/image";

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
  category,
  description,
  stock,
}: ProductCardProps) {
  return (
    <Card data-cy="product" className="relative h-full rounded-none bg-[#f1f0ec] p-0">
      <ProductSaleBadge price={price} salePrice={salePrice} />
      <Link
        href={`/product/${articleNumber}/${slug}`}
        className="group block aspect-square overflow-hidden bg-[#f1f0ec]"
      >
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="block h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </Link>

      <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2 p-4 text-stone-600 font-semibold">
        <CardTitle data-cy="product-title" className="min-w-0">
          <Link
            href={`/product/${articleNumber}/${slug}`}
            className="hover:underline"
          >
            {title}
          </Link>
        </CardTitle>

        <ProductPrice
          price={price}
          salePrice={salePrice}
          variant="card"
          className="max-w-32 justify-self-end"
        />
      </CardHeader >

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
        className="absolute right-2 top-2 h-6 w-6 rounded-sm border border-neutral-200 bg-white! p-0 text-black! shadow-sm hover:cursor-pointer hover:bg-neutral-100!"
        data-cy="product-buy-button"
      />

    </Card >
  );
}
