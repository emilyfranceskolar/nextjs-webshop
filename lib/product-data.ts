import { createProductSchema, isSaleCategory } from "@/data/form";

export async function readProductForm(formData: FormData) {
  return parseProductForm(formData);
}

export async function parseProductForm(formData: FormData) {
  const rawData = Object.fromEntries(formData);

  const values = createProductSchema().parse({
    ...rawData,
    price: Number(rawData.price),
    stock: Number(rawData.stock),
    salePrice: rawData.salePrice ? Number(rawData.salePrice) : undefined,
    category: [...new Set(formData.getAll("category"))],
  });

  return {
    ...values,
    // Removing Sale also removes the discount.
    salePrice: isSaleCategory(values.category)
      ? Number(values.salePrice)
      : null,
  };
}
