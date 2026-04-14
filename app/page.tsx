import { BrandBadge } from "@/components/brands-badge";
import { CategoryCard } from "@/components/category-card";
import { TrendingCard } from "@/components/trending-card";

export default function Home() {
  return (
    <main className="gap-2 items-center">
      <div className="min-w-screen bg-[url('/vintage.png')] bg-cover bg-center bg-no-repeat min-h-48">
        <p className="bg-[url('/vintage.png')]"></p>
      </div>
      <section className="w-full flex gap-8 overflow-x-auto p-8">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </section>
      <section className="min-w-screen  bg-indigo-100 p-4">
        <h2 className="text-2xl">Brands</h2>
        <div className="flex gap-2 justify-center overflow-x-auto">
          <BrandBadge />
          <BrandBadge />
          <BrandBadge />
          <BrandBadge />
          <BrandBadge />
          <BrandBadge />
          <BrandBadge />
        </div>
      </section>
      <section>
        <h1 className="text-3xl p-4">Trending items</h1>
        <div className="flex flex-wrap gap-6 p-4 ">
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
        </div>
      </section>
    </main>
  );
}
