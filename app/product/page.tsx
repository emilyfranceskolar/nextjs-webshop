import ProductGrid from "@/components/product-grid";
import { getProductPrice } from "@/lib/product-price";
import { db } from "@/prisma/db";
import Link from "next/link";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const products = await db.product.findMany({
    where: params.category
      ? {
          categories: {
            some: {
              category: {
                name: params.category,
              },
            },
          },
        }
      : undefined,
  });

  const visibleProducts =
    params.category === "Sale"
      ? products.filter((product) => getProductPrice(product) < product.price)
      : products;

  return (
    <main className="grid gap-4 place-items-center select-none">
      <h1 className="text-3xl font-bold m-10">
        {params.category || "Products"}
      </h1>
      <nav className="pl-4 pr-4 text-xs md:text-md lg:text-lg">
        <ul className="flex justify-evenly gap-3 font-xs sm:gap-10 font-md md:gap-15 font-lg lg:gap-25 font-xl">
          <li>
            <Link
              href="/product"
              className={`text-black hover:underline ${
                !params.category ? "font-bold" : ""
              }`}
            >
              ALL
            </Link>
          </li>
          <li>
            <Link
              href="/product?category=Bestseller"
              className={`text-black hover:underline ${
                params.category === "Bestseller" ? "font-bold" : ""
              }`}
            >
              BESTSELLER
            </Link>
          </li>
          <li>
            <Link
              href="/product?category=Reading Glasses"
              className={`text-black hover:underline ${
                params.category === "Reading Glasses" ? "font-bold" : ""
              }`}
            >
              READING GLASSES
            </Link>
          </li>
          <li>
            <Link
              href="/product?category=Sunglasses"
              className={`text-black hover:underline ${
                params.category === "Sunglasses" ? "font-bold" : ""
              }`}
            >
              SUNGLASSES
            </Link>
          </li>
          <li>
            <Link
              href="/product?category=Sale"
              className={`text-black hover:underline ${
                params.category === "Sale" ? "font-bold" : ""
              }`}
            >
              SALE
            </Link>
          </li>
        </ul>
      </nav>
      {visibleProducts.length === 0 && (
        <p className="py-10">
          {params.category === "Sale"
            ? "No products are on sale right now."
            : "No products found."}
        </p>
      )}
      <ProductGrid
        products={visibleProducts.map((product) => ({
          id: product.id,
          title: product.title,
          articleNumber: product.articleNumber,
          price: product.price,
          salePrice: product.salePrice,
          imageUrl: product.image,
          slug: product.slug,
          stock: product.stock,
          category: "",
          description: "",
        }))}
      />
    </main>
  );
}
