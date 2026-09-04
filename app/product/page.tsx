import ProductCard from "@/components/ui/product-page-card";
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
              className={`text-black hover:underline ${!params.category ? "font-bold" : ""
                }`}
            >
              ALL
            </Link>
          </li>
          <li>
            <Link
              href="/product?category=Bestseller"
              className={`text-black hover:underline ${params.category === "Bestseller" ? "font-bold" : ""
                }`}
            >
              BESTSELLER
            </Link>
          </li>
          <li>
            <Link
              href="/product?category=Reading Glasses"
              className={`text-black hover:underline ${params.category === "Reading Glasses" ? "font-bold" : ""
                }`}
            >
              READING GLASSES
            </Link>
          </li>
          <li>
            <Link
              href="/product?category=Sunglasses"
              className={`text-black hover:underline ${params.category === "Sunglasses" ? "font-bold" : ""
                }`}
            >
              SUNGLASSES
            </Link>
          </li>
          <li>
            <Link
              href="/product?category=Sale"
              className={`text-black hover:underline ${params.category === "Sale" ? "font-bold" : ""
                }`}
            >
              SALE
            </Link>
          </li>
        </ul>
      </nav>
      <section className="grid gap-4 p-5 pb-10 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            articleNumber={product.articleNumber}
            price={product.price}
            imageUrl={product.image}
            slug={product.slug}
            category=""
            description=""
          />
        ))}
      </section>
    </main>
  );
}
