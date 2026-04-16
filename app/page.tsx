import { CategoryCard } from "@/components/category-card";
import HomePageCard from "@/components/ui/home-page-card";
import { db } from "@/prisma/db";

export default async function Home() {
  const product = await db.product.findMany({});
  const categories = ["Tops", "Bottoms", "Shoes", "Accessories"];
  const categoryImages: Record<string, string> = {
    Tops: "/assets/images/top-1.jpg",
    Bottoms: "/assets/images/bottom-1.jpg",
    Shoes: "/assets/images/shoe-1.jpg",
    Accessories: "/assets/images/accessory-1.jpg",
  };

  return (
    <main className="grid gap-8 place-items-center">
      <div className="w-full bg-[url('/vintage.png')] bg-cover bg-center bg-no-repeat min-h-98">
        <p className="bg-[url('/vintage.png')]"></p>
      </div>
      <h1 className="text-4xl p-4">Shop by Category</h1>
      <section className="w-full flex justify-evenly gap-8 overflow-x-auto p-2">
        {categories.map((category) => (
          <a href={`/product?category=${category}`} key={category}>
            <CategoryCard
              category={category}
              image={categoryImages[category]}
            />
          </a>
        ))}
      </section>
      <section className="grid gap-8 place-items-center">
        <h2 className="text-3xl m-4">Products in right now</h2>
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2 mb-4">
          {product.map((product) => (
            <HomePageCard
              key={product.id}
              title={product.title}
              articleNumber={product.articleNumber}
              price={product.price}
              imageUrl={product.image}
              slug={product.slug}
            />
          ))}
        </section>
      </section>
    </main>
  );
}
