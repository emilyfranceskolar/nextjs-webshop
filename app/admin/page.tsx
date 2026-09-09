import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/prisma/db";
import { isAdmin } from "@/lib/admin";
import { Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminNavigation from "./admin-navigation";
import ProductPrice from "@/components/product-price";
import { getProductPrice } from "@/lib/product-price";

async function deleteProduct(formData: FormData) {
  "use server";

  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  await db.product.deleteMany({ where: { id } });
  revalidatePath("/admin");
}

export default async function AdminPage() {
  if (!(await isAdmin())) {
    redirect("/");
  }

  const products = await db.product.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  const missingSalePrices = products.filter(
    (product) =>
      product.categories.some(({ category }) => category.name === "Sale") &&
      getProductPrice(product) === product.price,
  );

  return (
    <main className="grid pt-6">
      <AdminNavigation currentPage="products" />

      <p className="text-3xl font-bold m-10 text-center">Our products</p>

      {missingSalePrices.length > 0 && (
        <aside className="mx-6 mb-6 rounded-lg bg-amber-50 p-4 text-amber-900">
          <p>These products need a valid sale price to appear in Sale:</p>

          <ul className="mt-2 list-inside list-disc">
            {missingSalePrices.map((product) => (
              <li key={product.id}>
                <Link
                  className="underline"
                  href={`/admin/product/${product.articleNumber}`}
                >
                  Edit {product.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <section className="grid gap-4 items-stretch pl-6 pr-6 pb-6 sm:grid-cols-2 xl:grid-cols-3">
        <Link href="/admin/product/new" className="flex flex-wrap gap-4 p-4 border rounded-xl w-full min-h-[280px] bg-muted/50 transition">
          <div className="w-24 h-28 rounded-lg border-2 border-dashed flex items-center justify-center text-sm text-muted-foreground">
            Image
          </div>

          <div className="flex flex-col rounded-xl flex-1">
            <p
              data-cy="product-id"
              className="font-bold text-sm text-stone-600 pb-2"
            >
              Article Number:
            </p>

            <p
              data-cy="product-title"
              className="text-sm pb-2 text-stone-600"
            >
              <span className="font-bold">Title:</span>
            </p>

            <p
              data-cy="product-category"
              className="text-sm pb-2 text-stone-600"
            >
              <span className="font-bold">Category:</span>
            </p>

            <p
              data-cy="product-price"
              className="text-sm pb-2 text-stone-600"
            >
              <span className="font-bold">Price:</span>
            </p>

            <p
              data-cy="product-stock"
              className="text-sm max-w-xs pb-2 text-stone-600"
            >
              <span className="font-bold">Stock:</span>
            </p>
            <p
              data-cy="product-description"
              className="text-sm max-w-xs pb-4 text-stone-600"
            >
              <span className="font-bold">Description:</span>
            </p>

            <div className="flex mt-auto gap-2 text-white">
              <Button data-cy="admin-add-product" className="bg-[#526E67] hover:bg-[#7C9A92] hover:text-white" variant="outline">
                <Plus className="h-4 w-4" />
                Add new product
              </Button>
            </div>
          </div>
        </Link>

        {products.map((product) => (
          <article
            key={product.id}
            data-cy="product"
            className="relative flex gap-4 rounded-xl border p-4 min-h-[280px]"
          >
            {product.image && (
              <img
                className="object-cover rounded-lg w-24 h-28"
                src={product.image}
                alt={product.title}
              />
            )}

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="space-y-2">
                <p data-cy="product-id" className="text-sm">
                  <span className="font-bold">Article Number:</span>{" "}
                  {product.articleNumber}
                </p>

                <p data-cy="product-title" className="text-sm">
                  <span className="font-bold">Title:</span> {product.title}
                </p>

                <p data-cy="product-category" className="text-sm">
                  <span className="font-bold">Category:</span>{" "}
                  {product.categories
                    .map((item) => item.category.name)
                    .join(", ") || "No category"}
                </p>

                <div className="flex items-center gap-1 text-sm">
                  <span className="font-bold">Price:</span>

                  <ProductPrice
                    price={product.price}
                    salePrice={product.salePrice}
                  />
                </div>

                <p
                  data-cy="product-stock"
                  className={`text-sm font-semibold ${product.stock <= 2 ? "text-red-600" : "text-black"
                    }`}
                >
                  Stock: {product.stock}
                </p>

                <p data-cy="product-description" className="max-w-xs text-sm">
                  <span className="font-bold">Description:</span>{" "}
                  {product.description}
                </p>
              </div>

              <Dialog>
                <div className="mt-auto flex gap-2 pt-4">
                  <Link href={`/admin/product/${product.articleNumber}`}>
                    <Button variant="outline" data-cy="admin-edit-product">
                      Edit product
                    </Button>
                  </Link>

                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      data-cy="admin-remove-product"
                      className="hover:bg-red-200"
                    >
                      Delete product
                    </Button>
                  </DialogTrigger>
                </div>

                <DialogContent className="sm:max-w-200">
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />

                    <DialogHeader>
                      <DialogTitle className="p-6 whitespace-nowrap">
                        Are you sure you want to delete the product?
                      </DialogTitle>
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
