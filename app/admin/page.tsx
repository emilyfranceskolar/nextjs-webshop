import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/prisma/db";
import { Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function deleteProduct(formData: FormData) {
  "use server"

  const id = Number(formData.get("articleNumber"))

  await db.product.delete({ where: { articleNumber: Number(id) } })
  revalidatePath("/admin")
}

export default async function AdminPage() {
  const products = await db.product.findMany({ orderBy: { id: "desc", }, });
  return (
    <main className="grid">
      <p className="text-3xl font-bold m-10 text-center">Our products</p>
      <section className="grid gap-4 items-stretch pl-6 pr-6 pb-6 sm:grid-cols-2 xl:grid-cols-3">
        <Link href="/admin/product/new">
          <div className="flex flex-1 gap-2 px-2 py-2 border rounded-xl w-full hover:bg-muted/50 transition h-full">
            <div className="w-24 h-28 rounded-lg border-2 border-dashed flex items-center justify-center text-sm text-muted-foreground">
              Image
            </div>

            <div className="flex flex-col flex-1 gap-2 px-2 py-4 rounded-xl h-full">
              <div className="flex-1">
                <p data-cy="product-id" className="font-bold text-sm text-stone-600 pb-2">New Product</p>
                <p data-cy="product-title" className="font-bold text-sm pb-2 text-stone-600">Title</p>
                <p data-cy="product-price" className="text-sm pb-2 text-stone-600">0kr</p>
                <p data-cy="product-description" className="text-sm max-w-xs pb-6 text-stone-600">No description</p>
              </div>
              <Button data-cy="admin-add-product" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add new product
              </Button>
            </div>
          </div>
        </Link>

        {products.map((product) => (
          <article key={product.id} data-cy="product" className="flex gap-2 px-2 py-2 border h-full rounded-xl">
            {product.image && (
              <img
                className="object-cover rounded-lg w-24 h-28"
                src={product.image}
                alt={product.title}
              />
            )}

            <div className="flex flex-col flex-1">
              <div className="pl-2 pb-2 flex-1">
                <p data-cy="product-id" className="font-bold text-sm pb-2">{product.articleNumber}</p>
                <p data-cy="product-title" className="font-bold text-sm pb-2">{product.title}</p>
                <p data-cy="product-price" className="text-sm pb-2">{product.price}kr</p>
                <p data-cy="product-description" className="text-sm max-w-xs pb-2">{product.description}</p>
              </div>

              <Dialog>
                <div className="flex gap-2 mt-auto">
                  <Link href={`/admin/product/${product.articleNumber}`}>
                    <Button variant="outline" data-cy="admin-edit-product">Edit product</Button>
                  </Link>

                  <DialogTrigger asChild>
                    <Button variant="outline" data-cy="admin-remove-product" className="hover:bg-red-200">Delete product
                    </Button>
                  </DialogTrigger>
                </div>

                <DialogContent className="sm:max-w-200">
                  <form action={deleteProduct}>
                    <input type="hidden" name="articleNumber" value={product.articleNumber} />

                    <DialogHeader>
                      <DialogTitle className="p-6 whitespace-nowrap">Are you sure you want to delete the product?</DialogTitle>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">No</Button>
                      </DialogClose>

                      <Button type="submit" data-cy="confirm-delete-button">
                        Yes
                      </Button>

                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </article>
        ))}
      </section>
    </main >
  );
}
