"use client";

import { useState } from "react";
import HomePageCard from "./ui/home-page-card";

interface Product {
  id: string;
  title: string;
  articleNumber: string;
  price: number;
  salePrice: number | null;
  imageUrl: string;
  slug: string;
  category: string;
  description: string;
  stock: number;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2 mb-4">
        {visibleProducts.map((product) => (
          <HomePageCard key={product.id}{...product} />
        ))}
      </section>

      {products.length > 4 && (
        <button onClick={() => setShowAll(!showAll)} className="mb-8 rounded-lg bg-[#526E67] px-6 py-2 font-semibold text-white transition hover:bg-[#7C9A92] hover:text-black hover:cursor-pointer">
          {showAll ? "Show less" : "Show More"}
        </button>
      )}
    </>
  );
}