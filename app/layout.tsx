import Footer from "@/components/footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { Geist, Inter } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
// import { FiShoppingCart } from "react-icons/fi";
import { Toaster } from "@/components/ui/sonner";
import "./global.css";
import { CartProvider } from "./providers/cart-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Worn Stories",
  description: "Dina favoritprodukter online till en bra pris...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
