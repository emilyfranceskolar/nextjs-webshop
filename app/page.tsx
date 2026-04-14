import { db } from "@/prisma/db";
import Link from "next/link";

export default async function Home() {
  const products = await db.product.findMany();

  return (
    <main className="grid gap-4 place-items-center">
      <p>Det här är startsidan. Här ska alla produkterna visas.</p>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <article>
              <img
                className="aspect-square object-center"
                src={product.image}
              />
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}
