"use client";

import type { Product } from "@/generated/client";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export type CartProduct = Product & { quantity: number };

const subscribeToHydration = () => () => {};
const emptyCart: CartProduct[] = [];

export function useCart() {
  const isLoaded = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [productsInCart, setProductsInCart] = useState<CartProduct[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedProducts = JSON.parse(localStorage.getItem("cart") ?? "[]");
      return Array.isArray(storedProducts) ? storedProducts : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(productsInCart));
    }
  }, [productsInCart, isLoaded]);

  const addToCart = useCallback((product: Product) => {
    setProductsInCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);

      if (existingProduct) {
        if (existingProduct.quantity >= product.stock) {
          return prevCart;
        }

        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setProductsInCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: Math.min(Math.max(quantity, 1), product.stock),
            }
          : product,
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
    productsInCart: isLoaded ? productsInCart : emptyCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isLoaded,
  };
}
