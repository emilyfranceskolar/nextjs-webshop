import { Button } from "@/components/ui/button";
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <article data-cy="product" className="relative h-full">
      <Link
        href={`/product/${articleNumber}/${slug}`}
        className="group block aspect-[4/5] overflow-hidden bg-[#f3f3f1]"
      >
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-contain p-7 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <Link href={`/product/${articleNumber}/${slug}`} className="block">
        <CardHeader className="flex items-center justify-between gap-3 px-0 pb-0 pt-2">
          <CardTitle data-cy="product-title" className="line-clamp-1 text-[10px] font-normal uppercase leading-none tracking-tight">
            {title}
          </CardTitle>

          <div className="shrink-0 text-[10px] leading-none">
            <ProductPrice price={price} salePrice={salePrice} />
          </div>
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

        <div className="absolute right-2 top-2 z-10">
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
            className="h-6 w-6 rounded-none bg-white! p-0 text-black! shadow-sm hover:bg-neutral-100!"
          />
        </div>
      </CardFooter>
    </article>
  );
}
