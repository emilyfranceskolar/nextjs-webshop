import ProductCard from "@/components/ui/product-page-card";
import { db } from "@/prisma/db";

export default function ProductPage() {
  const products = db.product.findMany({});

  return (
    <main className="grid gap-4 place-items-center">
      <h1 className="text-2xl font-bold mt-10">Products</h1>
      <section className="grid grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            imageUrl={product.image}
          />
        ))}
      </section>
    </main>
  );
}
