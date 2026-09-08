import {
  createProductSchema,
  isSaleCategory,
  type ProductCategoryOption,
} from "@/data/form";
import { db } from "@/prisma/db";

export async function readProductForm(formData: FormData) {
  const categories = await db.category.findMany();
  return parseProductForm(formData, categories);
}

export function parseProductForm(
  formData: FormData,
  categories: ProductCategoryOption[],
) {
  const values = createProductSchema(categories).parse({
    ...Object.fromEntries(formData),
    category: [...new Set(formData.getAll("category"))],
  });
  return {
    ...values,
    price: Number(values.price),
    // Removing Sale also removes the discount.
    salePrice: isSaleCategory(values.category, categories)
      ? Number(values.salePrice)
      : null,
  };
}
