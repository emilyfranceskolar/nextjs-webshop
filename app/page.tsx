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
      <section className="relative w-full">
        <h1 className="absolute flex justify-center w-full text-center text-[8rem] font-bold text-white top-15">
          Every Item <br />
          Tells A Story
        </h1>
        <img
          src="/assets/images/greeter.jpg"
          alt="Greeter"
          className="object-cover overflow-hidden w-full h-240"
        />
        <button className="absolute py-3 px-10 rounded-lg text-white font-bold bg-[#8b0836] bottom-50 left-1/2 -translate-x-1/2 translate-y-1/2 hover:cursor-pointer hover:bg-[#ddd9cd] hover:text-black transition-all duration-300">
          <Link href="/product" className="text-lg">
            Shop Now
          </Link>
        </button>
      </section>
      <h2 className="text-4xl p-4">Shop by Category</h2>
      <section className="w-full flex justify-evenly gap-8 overflow-x-auto p-2">
        {categories.map((category) => (
          <Link href={`/products?category=${category}`} key={category}>
            <CategoryCard
              category={category}
              image={categoryImages[category]}
            />
          </Link>
        ))}
      </section>
      <section className="grid gap-8 place-items-center">
        <h2 className="text-3xl m-4">Products in right now</h2>
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
