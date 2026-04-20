"use client";
import { useCartContext } from "@/app/providers/cart-provider";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { HomePageCardProps } from "./ui/home-page-card";

interface AddToCartButtonProps extends HomePageCardProps {
  buttonText: string | null;
  variant?: "default" | "outline";
  size?: "icon" | "lg" | null;
  className: string;
}

export default function AddToCartButton({
  id,
  title,
  articleNumber,
  image,
  price,
  slug,
  category,
  description,
  buttonText,
  variant,
  size,
  className,
}: HomePageCardProps & AddToCartButtonProps) {
  const { addToCart } = useCartContext();

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
    toast.success(
      () => <div data-cy="added-to-cart-toast">{title} has been added!</div>,
      {
        duration: 3000,
        position: "top-right",
      },
    );
  };
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={handleAddToCart}
      data-cy="product-buy-button"
    >
      <PlusIcon />
      {buttonText}
    </Button>
  );
}
