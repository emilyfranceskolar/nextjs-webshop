import { ProductForm } from "@/app/admin/product/product-form";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function editProduct(formData: FormData) {
    "use server"
    const id = formData.get("id") as string;
    const title = formData.get("title")?.toString().trim() || ""
    const price = Number(formData.get("price"));
    const description = formData.get("description")?.toString().trim() || ""
    const image = formData.get("image")?.toString().trim() || ""
    const category = formData.get("category")?.toString().trim() || ""
    const slug = formData.get("slug")?.toString().trim() || ""

    await db.product.update({
        where: { id },
        data: {
            title, price, description, image, category,
        },
    });

    revalidatePath("/admin");
    redirect("/admin");
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await db.product.findUnique({ where: { articleNumber: Number(id) }, });

    return (
        <main className="min-h-screen grid bg-muted/30 md:grid-cols-2">
            <div className="flex flex-col flex-1 justify-center items-center text-stone-800 bg-white">
                <ProductForm
                    action={editProduct}
                    submitLabel="Edit"
                    formTitle="Edit your product?"
                    formDescription="Change your details below"
                    initialValues={{
                        id: product?.id,
                        title: product?.title,
                        category: product?.category ?? "",
                        description: product?.description,
                        image: product?.image,
                        price: product?.price,
                        articleNumber: product?.articleNumber,
                        slug: product?.slug,
                    }}
                />
            </div>

            <div className="hidden h-screen md:block">
                <img src={product?.image} alt="Clothes in store" className="object-cover w-full h-full" />
            </div>
        </main>
    )
}
