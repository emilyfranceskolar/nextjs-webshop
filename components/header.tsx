"use client";
import { useCartContext } from "@/app/providers/cart-provider";
import { Handbag, Package } from "lucide-react";
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
      className={`relative z-50 flex flex-wrap items-center md:justify-between lg:justify-between bg-white transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-2.5  ${
        isHomePage ? "sticky top-0" : ""
      } ${
        isScrolled ? "justify-center items-center px-4 py-3  " : "px-10 py-4"
      }`}
    >
      <div className="flex flex-1 justify-center items-center md:justify-start lg:justify-start">
        <Link
          href="/"
          className={`bg-[url('/assets/images/glajjan-logo1.png')] block bg-contain bg-no-repeat bg-center md:bg-left text-4xl text-black transition-all duration-300 ${
            isScrolled ? "w-40 h-20" : "w-66 h-42"
          }`}
          aria-label="Home"
        ></Link>
      </div>

      <nav className="flex justify-center flex-1 mt-6 gap-8 text-sm md:text-lg md:justify-end lg:justify-end ">
        <Link
          href="/product"
          className={`flex items-center gap-1 bg-zinc-50 hover:bg-[#f1f1ef] p-2 rounded-lg shadow-sm text-sm tracking-[0.15em] ${pathName === "/product font-serif"}`}
        >
          <Package size={24} />
          PRODUCTS
        </Link>

        <AccountPanel />

        <Link
          href="/checkout"
          data-cy="cart-link"
          aria-label={`Shopping cart with ${isLoaded ? totalQuantity : 0} items`}
          className={`flex items-center gap-1 bg-zinc-50 hover:bg-[#f1f1ef] p-2 rounded-lg shadow-sm text-sm tracking-[0.15em] ${pathName === "/checkout"} font-serif`}
        >
          <Handbag size={24} />
          CART
          <span
            data-cy="cart-items-count-badge"
            className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e1e1d4] px-1 text-xs font-medium text-black"
          >
            {isLoaded ? totalQuantity : 0}
          </span>
        </Link>
      </nav>
    </header>
  );
}
