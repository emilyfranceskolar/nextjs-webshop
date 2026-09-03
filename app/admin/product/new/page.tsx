import ProductForm from "../product-form";
import { db } from "@/prisma/db";

async function createNewProduct(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));

  if (!title || !price || price <= 0) {
    return;
  }
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const category = formData.get("category")?.toString().trim() || "";
  const articleNumberValue = Number(formData.get("articleNumber"));
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
      description,
      image,
      slug,
      articleNumber,
      ...(category && {
        categories: {
          create: {
            category: {
              connectOrCreate: {
                where: { name: category },
                create: { name: category, slug: category.toLowerCase() },
              },
            },
          },
        },
      }),
    },
  });

  return;
}

export default function NewProductPage() {
  return (
    <main className="min-h-screen grid bg-muted/30 md:grid-cols-2">
      <div className="flex justify-center w-full items-center space-y-4 text-stone-800 bg-white">
        <ProductForm action={createNewProduct} />
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
