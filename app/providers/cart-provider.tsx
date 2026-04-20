"use client";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@prisma/client";
import { createContext, ReactNode, useContext } from "react";

interface CartContextType {
  productsInCart: Product[];
  addToCart: (product: Product) => void;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
}
