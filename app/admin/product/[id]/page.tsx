import { isAdmin } from "@/lib/admin";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readProductForm } from "../product-data";
import ProductForm from "../product-form";

async function editProduct(formData: FormData) {
  "use server";

  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  const { id, title, price, salePrice, stock, description, image, category } =
    await readProductForm(formData);

  if (!id) {
    throw new Error("Product ID is required");
  }

  await db.product.update({
    where: { id },
    data: {
      title,
      price,
      salePrice,
      stock,
      description,
      image,
      categories: {
        deleteMany: {},
        create: category.map((category) => ({
          category: {
            connectOrCreate: {
              where: { name: category.toString() },
              create: {
                name: category.toString(),
                slug: category.toString().toLowerCase(),
              },
            },
          },
        })),
      },
    },
  });

  revalidatePath("/", "layout");
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
        include: {
          category: true,
        },
      },
    },
  });

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <main className="min-h-screen grid bg-muted/30 md:grid-cols-2">
      <div className="flex flex-col p-4 flex-1 justify-center items-center text-stone-800 bg-white">
        <ProductForm
          action={editProduct}
          initialValues={{
            id: product.id,
            title: product.title,
            category: product.categories.map((item) => item.category.name),
            description: product?.description,
            image: product?.image,
            price: product.price,
            stock: product.stock,
            salePrice: product.salePrice ?? undefined,
            articleNumber: product?.articleNumber,
            slug: product?.slug,
          }}
        />
      </div>

      <div className="hidden h-screen md:block">
        <img
          src={product.image}
          alt="Glajjan"
          className="object-cover w-full h-full"
        />
      </div>
    </main>
  );
}
