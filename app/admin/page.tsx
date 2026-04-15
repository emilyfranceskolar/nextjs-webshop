import { HomeButton } from "@/components/home-button";
import { db } from "@/prisma/db";
import Link from "next/link";


export default async function AdminPage() {
  const products = await db.product.findMany({});
  return (
    <main className="grid gap-4 place-items-center">
      <p>Det här är Adminsidan.</p>

       <section className="grid w-full gap-6 p-4 mb-4 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                  <article key={product.id} className="flex gap-4">
                    <img
                      className="object-cover rounded-lg w-24 h-auto"
                      src={product.image}
                      alt={product.title}
                    />
                    <div className="grid items-center">
                      <Link href={""} data-cy="admin-edit-product"><HomeButton className="hover:bg-green-100 w-full">Add product</HomeButton></Link>
                      <HomeButton className=" hover:bg-yellow-100">Edit product</HomeButton>
                      <HomeButton className=" hover:bg-red-200">Delete product</HomeButton>
                    </div>
                  </article>
               
              ))}
            </section>
    </main>
  );
}
