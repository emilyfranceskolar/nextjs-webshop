import { db } from "@/prisma/db";
import { isAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ProductForm from "../product-form";
import { readProductForm } from "../product-data";

async function editProduct(formData: FormData) {
  "use server";

  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }
  const { id, title, price, salePrice, description, image, categoryIds } =
    await readProductForm(formData, true);
  if (!id) throw new Error("Product ID is required");

  await db.product.update({
    where: { id },
    data: {
      title,
      price,
      salePrice,
      description,
      image,
      categories: {
        deleteMany: {},
        create: categoryIds.map((categoryId) => ({ categoryId })),
      },
    },
  });

  revalidatePath("/", "layout");
  return;
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) {
    redirect("/");
  }

  const { id } = await params;
  const product = await db.product.findUnique({
    where: { articleNumber: id },
    include: {
      categories: {
        include: { category: true },
      },
    },
  });

  if (!product) return <p>Product not found!</p>;

  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <main className="min-h-screen grid bg-muted/30 md:grid-cols-2">
      <div className="flex flex-col p-4 flex-1 justify-center items-center text-stone-800 bg-white">
        <ProductForm
          action={editProduct}
          categories={categories}
          categoryAsText
          initialValues={{
            id: product.id,
            title: product?.title,
            categoryIds: product.categories.map(({ categoryId }) => categoryId),
            category: product.categories[0]?.category.name ?? "",
            description: product?.description,
            image: product?.image,
            price: product?.price.toString(),
            salePrice: product.salePrice?.toString() ?? "",
            articleNumber: product?.articleNumber,
            slug: product?.slug,
          }}
        />
      </div>

      <div className="hidden h-screen md:block">
        <img
          src={product?.image}
          alt="Clothes in store"
          className="object-cover w-full h-full"
        />
      </div>
    </main>
  );
}
