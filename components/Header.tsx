"use client";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";

export default function Header() {
  const { productsInCart } = useCart();

  return (
    <header className="flex items-center justify-between border-b-26 border-rose-900 px-8 py-10">
      <Link
        href="/"
        className="bg-[url('/assets/images/worn-stories-logo.png')] bg-contain bg-no-repeat bg-c w-55 h-30 text-4xl text-black"
      ></Link>
      <nav className="flex gap-8">
        <Link
          href="/product"
          className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
        >
          Products
        </Link>
        <Link
          href="/admin"
          className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
        >
          Admin
        </Link>
        <Link
          href="/cart"
          className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
        >
          Cart ({productsInCart.length})
        </Link>
      </nav>
    </header>
  );
}
