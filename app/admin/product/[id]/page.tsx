import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function editProduct(formData: FormData) {
    "use server"

    console.log("FORM ID:", formData.get("id"));

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const category = formData.get("category") as string;
    const slug = formData.get("slug") as string;

    await db.product.update({
        where: { id },
        data: {
            title, price, description, image, category, slug,
        },
    });

    revalidatePath("/admin");
    redirect("/admin");
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await db.product.findUnique({ where: { id }, });

    return (
        <main className="min-h-screen grid bg-muted/30 md:grid-cols-2">
            <div className="flex justify-center items-center space-y-4 text-stone-800 bg-white">
                <form action={editProduct} data-cy="product-form" className=" w-full max-w-md">
                    <FieldGroup>
                        <div>
                            <FieldLegend className="text-2xl font-bold text-zinc-800">Edit your product?</FieldLegend>
                            <p className="text-sm text-zinc-500">Change your details below</p>
                        </div>

                        <input type="hidden" name="id" value={id} className="outline rounded-sm p-2 border focus:ring-2 focus:ring-red-600" />
                        <input type="hidden" name="slug" value={product?.slug ?? ""} className="outline rounded-sm p-2 border focus:ring-2 focus:ring-red-600" />

                        <Field className="space-y-1">
                            <Label className="font-medium text-sm text-zinc-700">Title</Label>
                            <Input data-cy="product-title" name="title" defaultValue={product?.title} className="outline rounded-sm p-2 border focus:ring-2 focus:ring-red-600" />
                        </Field>

                        <Field className="space-y-1">
                            <Label className="font-medium text-sm text-zinc-700">Category</Label>
                            <Input name="category" defaultValue={product?.category ?? ""} className="outline rounded-sm" />
                        </Field>

                        <Field className="space-y-1">
                            <Label className="font-medium text-sm text-zinc-700">Description</Label>
                            <Input data-cy="product-description" name="description" defaultValue={product?.description} className="outline rounded-sm" />
                        </Field>

                        <Field className="space-y-1">
                            <Label className="font-medium text-sm text-zinc-700">Image</Label>
                            <Input data-cy="product-image" name="image" defaultValue={product?.image} className="outline rounded-sm" />
                        </Field>

                        <Field className="space-y-1">
                            <Label className="font-medium text-sm text-zinc-700">Price</Label>
                            <Input data-cy="product-price" name="price" defaultValue={product?.price} className="outline rounded-sm" />
                        </Field>

                        <Field className="space-y-1">
                            <Label className="font-medium text-sm text-zinc-700">Article Number</Label>
                            <Input data-cy="product-id" name="articleNumber" defaultValue={product?.articleNumber} className="outline rounded-sm" />
                        </Field>
                    </FieldGroup>

                    <Field className="pt-6 pb-6" orientation="horizontal">
                        <Button variant="outline" className="rounded-full px-6">Cancel</Button>
                        <Button type="submit" data-cy="admin-edit-product" value={id} className="hover:bg-red-900 text-white rounded-full px-6">
                            Edit
                        </Button>
                    </Field>
                </form>
            </div>

            <div className="hidden h-screen md:block">
                <img src={product?.image} alt="Clothes in store" className="object-cover w-full h-full" />
            </div>
        </main>
    )
}
