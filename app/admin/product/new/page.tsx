
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createNewProduct(formData: FormData) {
  "use server"

  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const slug = `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
  const articleNumber = formData.get("articleNumber") as string;

  await db.product.create({
    data: {
      title, price, description, image, slug: title.toLowerCase().replace(/\s+/g, "-"), articleNumber: Math.floor(Math.random() * 10000),
    },
  });

  revalidatePath("/admin/product/new");
  redirect("/admin");
}

export default function NewProductPage() {
  return (
    <main className="min-h-screen grid bg-muted/30 md:grid-cols-2">
      <div className="flex justify-center items-center space-y-4 text-stone-800 bg-white">
        <form action={createNewProduct} data-cy="product-form" className=" w-full max-w-md">
          <FieldGroup>
            <div>
              <FieldLegend className="text-2xl font-bold text-zinc-800">Add more products?</FieldLegend>
              <p className="text-sm text-zinc-500">Fill in the details below</p>
            </div>

            <Field className="space-y-1">
              <Label className="font-medium text-sm text-zinc-700">Title</Label>
              <Input data-cy="product-title" name="title" className="outline rounded-sm p-2 border focus:ring-2 focus:ring-red-600" />
            </Field>

            <Field className="space-y-1">
              <Label className="font-medium text-sm text-zinc-700">Category</Label>
              <Input name="category" className="outline rounded-sm" />
            </Field>

            <Field className="space-y-1">
              <Label className="font-medium text-sm text-zinc-700">Description</Label>
              <Input data-cy="product-description" name="description" className="outline rounded-sm" />
            </Field>

            <Field className="space-y-1">
              <Label className="font-medium text-sm text-zinc-700">Image</Label>
              <Input data-cy="product-image" name="image" className="outline rounded-sm" />
            </Field>

            <Field className="space-y-1">
              <Label className="font-medium text-sm text-zinc-700">Price</Label>
              <Input data-cy="product-price" name="price" className="outline rounded-sm" />
            </Field>

            <Field className="space-y-1">
              <Label className="font-medium text-sm text-zinc-700">Article Number</Label>
              <Input data-cy="product-id" name="articleNumber" className="outline rounded-sm" />
            </Field>
          </FieldGroup>

          <Field className="pt-6 pb-6" orientation="horizontal">
            <Link href="/admin">
              <Button type="button" variant="outline" className="rounded-full px-6">Cancel</Button>
            </Link>
            <Button type="submit" data-cy="admin-add-product" className="hover:bg-red-900 text-white rounded-full px-6">
              Add
            </Button>
          </Field>
        </form>
      </div>

      <div className="hidden h-screen md:block">
        <img src="/assets/images/image-new-productpage.jpg" alt="Clothes in store" className="object-cover w-full h-full" />
      </div>
    </main>
  )
}
