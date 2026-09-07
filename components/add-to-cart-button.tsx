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
  disabled?: boolean;
}

export default function AddToCartButton({
  id,
  title,
  articleNumber,
  imageUrl,
  price,
  slug,
  description,
  stock,
  disabled,
  buttonText,
  variant,
  size,
  className,

}: HomePageCardProps & AddToCartButtonProps) {
  const { addToCart, productsInCart } = useCartContext();

  const handleAddToCart = () => {

    if (disabled || stock === 0) {
      toast.error("Produkten är slut i lager");
      return;

    }

    const existingProduct = productsInCart.find((p) => p.id === id);

    if (existingProduct && existingProduct.quantity >= stock) {
      toast.error(`Endast ${stock} st finns i lager`);
      return;
    }


    addToCart({
      id,
      title,
      articleNumber,
      image: imageUrl,
      price,
      slug,
      description,
      stock,
      quantity: 1,
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
      disabled={disabled || stock === 0} data-cy="product-buy-button"
    >
      <PlusIcon />
      {buttonText}
    </Button>
  );
}
