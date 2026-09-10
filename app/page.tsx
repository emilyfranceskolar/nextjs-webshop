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
  const categories = ["Bestseller", "Reading Glasses", "Sunglasses", "Sale"];

  const categoryImages: Record<string, string> = {
    Bestseller: "/assets/images/Bilbao_Meadow_Green.jpg",
    "Reading Glasses": "/assets/images/Paris_Crystal_Clear.jpg",
    Sunglasses: "/assets/images/Cartagena_tortoise_1.webp",
    Sale: "/assets/images/Vienna_Yellow_Amber.jpg",
  };

  return (
    <main className="grid gap-8 place-items-center bg-[#fafaf8;]">
      <section className="relative h-dvh w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src="/assets/videos/1a42a2272c314240b3c559b3b9dedef4.mp4"
        />
        <Link
          href="/product"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-lg bg-[#526E67] px-10 py-3 text-lg font-bold whitespace-nowrap text-white transition-all duration-300 hover:cursor-pointer hover:bg-[#ddd9cd] hover:text-black lg:bottom-50"
        >
          Shop Now
        </Link>
      </section>
      <h2 className="text-2xl md:text-4xl md:p-4">Shop by Category</h2>
      <section className="grid w-full grid-cols-2 gap-2 p-2 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            className="flex-1 min-w-0"
            href={`/product?category=${category}`}
            key={category}
          >
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
              salePrice={product.salePrice}
              imageUrl={product.image}
              slug={product.slug}
              category={product.categories[0]?.category.name ?? ""}
              description={product.description}
              stock={product.stock}
            />
          ))}
        </section>
      </section>
    </main>
  );
}
