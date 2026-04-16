import { HomeButton } from "@/components/home-button";
import { db } from "@/prisma/db";


export default async function AdminPage() {
  const products = await db.product.findMany({});
  return (
    <main className="grid gap-4 place-items-center">
      <p className="text-3xl font-bold m-10">Our products</p>
      <section className="grid w-full gap-6 p-4 sm:grid-cols-2 xl:grid-cols-4">{products.map((product) => (
        <article key={product.id} data-cy="product-id" className="flex justify-center gap-6 mb-4">
          <img
            className="object-cover rounded-lg w-24 h-auto"
            src={product.image}
            alt={product.title}
          />
          <div className="grid items-center">
            <p data-cy="product-title" className="flex justify-center font-bold text-sm">{product.title}</p>
            <p data-cy="product-price" className="flex justify-center text-sm">{product.price}kr</p>
            {/* <Link href={""} data-cy="admin-edit-product"><HomeButton className="hover:bg-green-100 w-full">Add product</HomeButton></Link> */}
            <HomeButton className=" hover:bg-yellow-100 text-xs">Edit product</HomeButton>
            <HomeButton className=" hover:bg-red-200 text-xs">Delete product</HomeButton>
          </div>
        </article>

      ))}
      </section>
    </main>
  );
}
