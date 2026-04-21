"use client";
import { useCartContext } from "@/app/providers/cart-provider";
import Link from "next/link";

export default function Header() {
  const { productsInCart, isLoaded } = useCartContext();

  const totalQuantity = productsInCart.reduce(
    (sum, product) => sum + (product.quantity || 1),
    0,
  );

  return (
    <header className="flex items-center justify-between border-b-26 border-rose-900 px-8 py-10">
      <Link
        href="/"
        className="bg-[url('/assets/images/worn-stories-logo.png')] bg-contain bg-no-repeat bg-center w-55 h-30 text-4xl text-black"
      ></Link>
      <nav className="flex gap-8">
        <Link
          href="/product"
          className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
        >
          <p>Products</p>
        </Link>
        <Link
          href="/admin"
          className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
        >
          <p data-cy="admin-link">Admin</p>
        </Link>
        <Link
          href="/cart"
          className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          data-cy="cart-link"
        >
          <p data-cy="cart-items-count-badge">
            Cart ({isLoaded ? totalQuantity : 0})
          </p>
        </Link>
      </nav>
    </header>
  );
}
