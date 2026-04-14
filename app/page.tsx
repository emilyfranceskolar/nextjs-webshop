import { BrandBadge } from "@/components/brands-badge";
import { CategoryCard } from "@/components/category-card";
import { HomeButton } from "@/components/home-button";
import { TrendingCard } from "@/components/trending-card";

export default function Home() {
  return (
    <main className="p-4">
      <div className="w-full bg-[url('/vintage.png')] bg-cover bg-center bg-no-repeat min-h-48">
        <p className="bg-[url('/vintage.png')]"></p>
      </div>
      <h1 className="text-3xl p-4 pt-6 pb-4">Shop by Category</h1>
      <section className="w-full flex gap-8 overflow-x-auto p-2 mb-4">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </section>
      <section className="bg-indigo-200 p-2">
        <h2 className="text-3xl p-4">Brands</h2>
        <div className="flex gap-12 justify-start overflow-x-auto p-2 mb-4">
          <BrandBadge />
          <BrandBadge />
          <BrandBadge />
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
        <div className="flex justify-between items-center p-4">
          <h1 className="text-3xl pt-6 pb-4">Trending items</h1>
          <HomeButton />
        </div>
        <div className="flex gap-8 overflow-x-auto p-2 pb-4 mb-4">
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
