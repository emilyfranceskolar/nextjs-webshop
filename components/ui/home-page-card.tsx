"use client";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { toast } from "sonner";
import AddToCartButton from "../add-to-cart-button";

export interface HomePageCardProps {
  id: string;
  title: string;
  articleNumber: number;
  image: string;
  price: number;
  slug: string;
  category: string | null;
  description: string;
}

export default function HomePageCard({
  id,
  title,
  articleNumber,
  image,
  price,
  slug,
  category,
  description,
}: HomePageCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      articleNumber,
      image,
      price,
      slug,
      category,
      description,
    });
    toast.success(`${title} added to cart!`, {
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <Card data-cy="product" className="p-0 relative">
      <Link href={`/product/${articleNumber}/${slug}`} className="block">
        <img src={image} alt={title} className="w-full object-cover" />
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
      <AddToCartButton
        id={id}
        title={title}
        articleNumber={articleNumber}
        image={image}
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
