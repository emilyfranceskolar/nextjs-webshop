import { CategoryCard } from "@/components/category-card";
import { db } from "@/prisma/db";
import Link from "next/link";

export default async function Home() {
  const products = await db.product.findMany({});
  const categories = ["Tops", "Bottoms", "Shoes", "Accessories"];
  const categoryImages: Record<string, string> = {
    Tops: "/assets/images/top-1.jpg",
    Bottoms: "/assets/images/bottom-1.jpg",
    Shoes: "/assets/images/shoe-1.jpg",
    Accessories: "assets/images/accessory-1.jpg",
  };

  return (
    <main className="grid gap-8 place-items-center">
      <div className="w-full bg-[url('/vintage.png')] bg-cover bg-center bg-no-repeat min-h-98">
        <p className="bg-[url('/vintage.png')]"></p>
      </div>
      <h1 className="text-3xl font-bold p-4">Shop by Category</h1>
      <section className="w-full flex justify-evenly gap-8 overflow-x-auto p-2">
        {categories.map((category) => (
          <a href={`/products?category=${category}`} key={category}>
            <CategoryCard
              category={category}
              image={categoryImages[category]}
            />
          </a>
        ))}
      </section>
      <section className="grid gap-8 place-items-center">
        <h2 className="text-3xl font-bold m-4">All Products</h2>
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2 mb-4">
          {products.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id}>
              <article key={product.id}>
                <img
                  className="object-cover rounded-lg"
                  src={product.image}
                  alt={product.title}
                />
              </article>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
