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
    where: params.category ? { category: params.category } : undefined,
  });

  return (
    <main className="grid gap-4 place-items-center select-none">
      <h1 className="text-3xl font-bold m-10">
        {params.category || "Products"}
      </h1>
      <nav>
        <ul className="flex justify-evenly gap-3 font-xs sm:gap-10 font-md md:gap-15 font-lg lg:gap-25 font-xl">
          <li>
            <Link
              href="/products"
              className={`text-black hover:underline ${
                !params.category ? "font-bold" : ""
              }`}
            >
              ALL
            </Link>
          </li>
          <li>
            <Link
              href="/products?category=Tops"
              className={`text-black hover:underline ${
                params.category === "Tops" ? "font-bold" : ""
              }`}
            >
              TOPS
            </Link>
          </li>
          <li>
            <Link
              href="/products?category=Bottoms"
              className={`text-black hover:underline ${
                params.category === "Bottoms" ? "font-bold" : ""
              }`}
            >
              BOTTOMS
            </Link>
          </li>
          <li>
            <Link
              href="/products?category=Shoes"
              className={`text-black hover:underline ${
                params.category === "Shoes" ? "font-bold" : ""
              }`}
            >
              SHOES
            </Link>
          </li>
          <li>
            <Link
              href="/products?category=Accessories"
              className={`text-black hover:underline ${
                params.category === "Accessories" ? "font-bold" : ""
              }`}
            >
              ACCESSORIES
            </Link>
          </li>
        </ul>
      </nav>
      <section className="grid gap-4 p-5 pb-10 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            articleNumber={product.articleNumber}
            price={product.price}
            imageUrl={product.image}
            slug={product.slug}
          />
        ))}
      </section>
    </main>
  );
}
