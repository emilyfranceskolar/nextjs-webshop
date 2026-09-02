"use client";
import { useCartContext } from "@/app/providers/cart-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AccountPanel from "./account-panel";

export default function Header() {
  const { productsInCart, isLoaded } = useCartContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalQuantity = productsInCart.reduce(
    (sum, product) => sum + (product.quantity || 1),
    0,
  );

  return (
    <header
      className={`flex flex-wrap relative items-center md:justify-between lg:justify-between border-rose-900 bg-white z-50 transition-all duration-300 ${isHomePage ? "sticky top-0" : ""
        } ${isScrolled ? "justify-center items-center px-4 py-3 border-b-10" : "px-10 py-4 border-b-26"}`}
    >
      <div className="flex flex-1 justify-center items-center md:justify-start lg:justify-start">

        <Link
          href="/"
          className={`bg-[url('/assets/images/glajjan-logo1.png')] block bg-contain bg-no-repeat bg-center md:bg-left text-4xl text-black transition-all duration-300 ${isScrolled ? "w-40 h-20" : "w-66 h-42"
            }`} aria-label="Home"
        ></Link>
      </div>

      <nav className="flex justify-center flex-1 mt-6 gap-8 text-sm md:text-lg md:justify-end lg:justify-end ">
        <Link
          href="/product"
          className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
        >
          Products
        </Link>
        <Link
          href="/checkout"
          data-cy="cart-link"
          className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
        >
          Cart (
          <span data-cy="cart-items-count-badge">
            {isLoaded ? totalQuantity : 0}
          </span>
          )
        </Link>
        <AccountPanel />
      </nav>
    </header>
  );
}
