import { CategoryCard } from "@/components/category-card";
import HomePageCard from "@/components/ui/home-page-card";
import { db } from "@/prisma/db";
import Link from "next/link";

export default async function Home() {
  const product = await db.product.findMany({
    include: {
      categories: {
        include: { category: true },
      },
    },
  });
  const categories = ["Tops", "Bottoms", "Shoes", "Accessories"];
  const categoryImages: Record<string, string> = {
    BestSeller: "/assets/images/top-1.jpg",
    ReadingGlasses: "/assets/images/bottom-1.jpg",
    SunGlasses: "/assets/images/shoe-1.jpg",
    Sale: "/assets/images/accessory-1.jpg",
  };

  return (
    <main className="grid gap-8 place-items-center">
      <section className="relative md:w-full lg:w-full overflow-hidden">
        <h1 className="absolute hidden md:flex justify-center w-full text-center text-[6rem] font-bold text-white top-15">
          Your next pair <br />
          of Glajjan
        </h1>
        <img
          src="/assets/images/hero-image.jpg"
          alt="Greeter"
          className="md:object-cover lg:object-cover overflow-hidden w-full md:h-240 lg:h-240"
        />
        <button className="absolute py-3 px-10 rounded-lg text-white font-bold bg-[#8b0836] lg:bottom-50 left-1/2 -translate-x-1/2 translate-y-1/2 hover:cursor-pointer hover:bg-[#ddd9cd] hover:text-black transition-all duration-300">
          <Link href="/product" className="text-lg">
            Shop Now
          </Link>
        </button>
      </section>
      <h2 className="text-2xl md:text-4xl md:p-4">Shop by Category</h2>
      <section className="w-full flex justify-evenly gap-8 overflow-x-auto p-2">
        {categories.map((category) => (
          <Link href={`/product?category=${category}`} key={category}>
            <CategoryCard
              category={category}
              image={categoryImages[category]}
            />
          </Link>
        ))}
      </section>
      <section className="grid gap-8 place-items-center">
        <h2 className="text-xl md:text-3xl m-4">All Products</h2>
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2 mb-4">
          {product.map((product) => (
            <HomePageCard
              key={product.id}
              id={product.id.toString()}
              title={product.title}
              articleNumber={product.articleNumber}
              price={product.price}
              imageUrl={product.image}
              slug={product.slug}
              category={product.categories[0]?.category.name ?? ""}
              description={product.description}
            />
          ))}
        </section>
      </section>
    </main>
  );
}
