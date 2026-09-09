import { createProductSchema, isSaleCategory } from "@/data/form";

export async function readProductForm(formData: FormData) {
  return parseProductForm(formData);
}

export function parseProductForm(formData: FormData) {
  const values = createProductSchema().parse({
    ...Object.fromEntries(formData),
    category: [...new Set(formData.getAll("category"))],
  });

  return {
    ...values,
    price: Number(values.price),

    // convert stock from form string to number
    stock: Number(values.stock),

    // Removing Sale also removes the discount.
    salePrice: isSaleCategory(values.category)
      ? Number(values.salePrice)
      : null,
  };
}
