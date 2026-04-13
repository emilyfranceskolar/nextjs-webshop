import ProductCard from "@/components/ui/product-card";

export default function ProductPage() {
  return (
    <main className="grid gap-4 place-items-center">
      <h1 className="text-2xl font-bold mt-10">Products</h1>
      <section className="grid grid-cols-4 gap-4 p-4">
        <ProductCard
          title="Product 1"
          description="More details about Product 1."
          price={999}
          imageUrl="/assets/images/test.avif"
        />
        <ProductCard
          title="Product 2"
          description="More details about Product 2."
          price={1999}
          imageUrl="/assets/images/test.avif"
        />
        <ProductCard
          title="Product 3"
          description="More details about Product 3."
          price={2999}
          imageUrl="/assets/images/test.avif"
        />
        <ProductCard
          title="Product 4"
          description="More details about Product 4."
          price={3999}
          imageUrl="/assets/images/test.avif"
        />
        <ProductCard
          title="Product 5"
          description="More details about Product 5."
          price={4999}
          imageUrl="/assets/images/test.avif"
        />
        <ProductCard
          title="Product 6"
          description="More details about Product 6."
          price={5999}
          imageUrl="/assets/images/test.avif"
        />
        <ProductCard
          title="Product 7"
          description="More details about Product 7."
          price={6999}
          imageUrl="/assets/images/test.avif"
        />
        <ProductCard
          title="Product 8"
          description="More details about Product 8."
          price={7999}
          imageUrl="/assets/images/test.avif"
        />
      </section>
    </main>
  );
}
