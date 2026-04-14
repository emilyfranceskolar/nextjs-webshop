import { cn } from "@/lib/utils";
import { Geist, Inter } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
// import { FiShoppingCart } from "react-icons/fi";
import "./global.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Webbshoppen",
  description: "Dina favoritprodukter online till en bra pris...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <header className="flex gap-12 p-4 place-items-center bg-white border-b border-b-zinc-300">
          <Link href="/" className="flex grow text-4xl text-black">
            <h1>NextJS webbshop</h1>
          </Link>
          <nav className="flex gap-8 place-items-center">
            <Link
              href="/products"
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
              Cart
            </Link>
          </nav>
        </header>
        {children}
        <footer>
          <p>© 2024</p>
        </footer>
      </body>
    </html>
  );
}
