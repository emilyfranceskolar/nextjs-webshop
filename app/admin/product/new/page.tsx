import ProductForm from "../product-form";
import { db } from "@/prisma/db";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { readProductForm } from "../product-data";

async function createNewProduct(formData: FormData) {
  "use server";

  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  const values = await readProductForm(formData);
  const { title, price, salePrice, description, image, categoryIds } = values;
  const articleNumberValue = Number(values.articleNumber);
  const articleNumber = (
    articleNumberValue > 0
      ? articleNumberValue
      : Math.floor(Math.random() * 10000)
  ).toString();
  const slug = `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

  await db.product.create({
    data: {
      title,
      price,
      salePrice,
      description,
      image,
      slug,
      articleNumber,
      categories: { create: categoryIds.map((categoryId) => ({ categoryId })) },
    },
  });

  revalidatePath("/", "layout");
}

export default async function NewProductPage() {
  if (!(await isAdmin())) {
    redirect("/");
  }

  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <main className="min-h-screen grid bg-muted/30 md:grid-cols-2">
      <div className="flex justify-center w-full items-center space-y-4 text-stone-800 bg-white">
        <ProductForm action={createNewProduct} categories={categories} />
      </div>

      <div className="hidden h-screen md:block">
        <img
          src="/assets/images/image-new-productpage.jpg"
          alt="Clothes in store"
          className="object-cover w-full h-full"
        />
      </div>
    </main>
  );
}
