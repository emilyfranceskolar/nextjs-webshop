import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { Geist, Inter } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
// import { FiShoppingCart } from "react-icons/fi";
import { Toaster } from "@/components/ui/sonner";
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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
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
              Cart
            </Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
