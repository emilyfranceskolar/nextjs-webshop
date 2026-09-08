import { db } from "@/prisma/db";
import { isAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ProductForm from "../product-form";

async function editProduct(formData: FormData) {
  "use server";

  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }
  const id = formData.get("id") as string;
  const title = formData.get("title")?.toString().trim() || "";
  const price = Number(formData.get("price"));

  // stock for admin inventory management
  const stock = Number(formData.get("stock"));

  // stock validation for admin inventory management
  if (!Number.isInteger(stock) || stock < 0) {
    return;
  }

  const description = formData.get("description")?.toString().trim() || "";
  const image = formData.get("image")?.toString().trim() || "";
  const categories = formData.getAll("category");
  const slug = formData.get("slug")?.toString().trim() || "";

  await db.product.update({
    where: { id },
    data: {
      title,
      price,

      // update stock in database
      stock,

      description,
      image,
      categories: {
        deleteMany: {},
        create: categories.map((category) => ({
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

  revalidatePath("/admin");
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

  return (
    <main className="min-h-screen grid bg-muted/30 md:grid-cols-2">
      <div className="flex flex-col p-4 flex-1 justify-center items-center text-stone-800 bg-white">
        <ProductForm
          action={editProduct}
          initialValues={{
            id: product.id,
            title: product?.title,
            category: product.categories.map((item) => item.category.name),
            description: product?.description,
            image: product?.image,
            price: product?.price.toString(),

            // load current stock into edit form
            stock: product.stock.toString(),

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
