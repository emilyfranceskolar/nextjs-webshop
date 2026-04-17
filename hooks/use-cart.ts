"use client";

import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export function useCart() {
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("cart");
    if (storedProducts) {
      setProductsInCart(JSON.parse(storedProducts));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(productsInCart));
    }
  }, [productsInCart, isLoaded]);

  const addToCart = (product: Product) => {
    const updatedProducts = [...productsInCart, product];
    setProductsInCart(updatedProducts);
  };
  return { productsInCart, addToCart, isLoaded };
}
