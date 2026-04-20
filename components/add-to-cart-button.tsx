"use client";
import { useCart } from "@/hooks/use-cart";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { HomePageCardProps } from "./ui/home-page-card";

interface AddToCartButtonProps extends HomePageCardProps {
  buttonText: string | null;
  variant?: "default" | "outline";
  size?: "icon" | "lg" | null;
  className: string;
  dataCy: string;
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
  dataCy = "add-to-cart-button",
}: HomePageCardProps & AddToCartButtonProps) {
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
    <Button
      className={className}
      variant={variant}
      size={size}
      data-cy={dataCy}
      onClick={handleAddToCart}
    >
      <PlusIcon />
      {buttonText}
    </Button>
  );
}
