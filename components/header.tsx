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
      className={`relative z-50 flex flex-wrap items-center md:justify-between lg:justify-between bg-white transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-2.5 border-bg-[#526e67] ${isHomePage ? "sticky top-0" : ""
        } ${isScrolled
          ? "justify-center items-center px-4 py-3 border-b-10"
          : "px-10 py-4 border-b-26"
        }`}
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
          className={`underline-offset-8 decoration-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-900 ${pathName === "/product"
            ? "text-rose-900 underline decoration-rose-900"
            : "text-zinc-600 hover:text-rose-900 hover:underline decoration-rose-900"
            }`}
        >
          Products
        </Link>
        <Link
          href="/checkout"
          data-cy="cart-link"
          className={`underline-offset-8 decoration-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-900 ${pathName === "/checkout"
              ? "text-rose-900 underline decoration-rose-900"
              : "text-zinc-600 hover:text-rose-900 hover:underline decoration-rose-900"
            }`}
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
