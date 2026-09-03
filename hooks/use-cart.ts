"use client";

import type { Product } from "@/generated/prisma";
import { useCallback, useEffect, useState } from "react";

export type CartProduct = Product & { quantity: number };

export function useCart() {
  const [productsInCart, setProductsInCart] = useState<CartProduct[]>([]);
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

  const addToCart = useCallback((product: Product) => {
    setProductsInCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);

      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setProductsInCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId ? { ...product, quantity } : product,
      ),
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setProductsInCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setProductsInCart([]);
  }, []);

  return {
    productsInCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isLoaded,
  };
}
