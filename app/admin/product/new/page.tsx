
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLegend, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";



async function createNewProduct(formData: FormData) {
  "use server"

  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const slug = formData.get("slug") as string;

  await db.product.create({
    data: {
      title, price, description, image, slug, articleNumber: Math.floor(Math.random() * 10000).toString(),

    },
  });

  revalidatePath("/admin");
}

export default function NewProductPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md text-stone-800">
        <form>
          <FieldGroup>
            <FieldLegend className="pt-6">Add more products?</FieldLegend>

            <Field>
              <Label className="font-bold">Title</Label>
              <Input name="title" className="outline rounded-sm" />
            </Field>

            <Field>
              <Label className="font-bold">Category</Label>
              <Input name="title" className="outline rounded-sm" />
            </Field>

            <Field>
              <Label className="font-bold">Description</Label>
              <Input name="title" className="outline rounded-sm" />
            </Field>

            <Field>
              <Label className="font-bold">Image</Label>
              <Input name="title" className="outline rounded-sm" />
            </Field>

            <Field>
              <Label className="font-bold">Price</Label>
              <Input name="title" className="outline rounded-sm" />
            </Field>

            <Field>
              <Label className="font-bold">Article Number</Label>
              <Input name="title" className="outline rounded-sm" />
            </Field>
          </FieldGroup>

          <Field className="pt-6 pb-6" orientation="horizontal">
            <Button variant="outline">Cancel</Button>
            <Button type="submit" data-cy="admin-add-product" className="hover:bg-green-700">
              Add
            </Button>
          </Field>

        </form>
      </div>
    </main >
  )
}
