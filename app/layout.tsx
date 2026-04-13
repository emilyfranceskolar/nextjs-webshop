import { Inter } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Webbshoppen",
  description: "Dina favoritprodukter online till en bra pris...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Link href="/">
            <h1>NextJS webbshop</h1>
          </Link>
        </header>
        {children}
        <footer>
          <p>© 2024</p>
        </footer>
      </body>
    </html>
  );
}
