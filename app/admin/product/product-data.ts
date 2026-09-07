import {
  createProductSchema,
  isSaleCategory,
  type ProductCategoryOption,
} from "@/data/form";
import { db } from "@/prisma/db";

export async function readProductForm(
  formData: FormData,
  categoryAsText = false,
) {
  const categories = await db.category.findMany();
  const values = parseProductForm(formData, categories, categoryAsText);
  if (!categoryAsText) return values;

  const name = values.category ?? "";
  const category = name
    ? (categories.find(
        (category) => category.name.toLowerCase() === name.toLowerCase(),
      ) ??
      (await db.category.create({ data: { name, slug: name.toLowerCase() } })))
    : null;

  return { ...values, categoryIds: category ? [category.id] : [] };
}

export function parseProductForm(
  formData: FormData,
  categories: ProductCategoryOption[],
  categoryAsText = false,
) {
  const values = createProductSchema(categories, categoryAsText).parse({
    ...Object.fromEntries(formData),
    categoryIds: [...new Set(formData.getAll("categoryIds"))],
  });
  const onSale = categoryAsText
    ? values.category?.toLowerCase() === "sale"
    : categories.some(
        (category) =>
          isSaleCategory(category) && values.categoryIds.includes(category.id),
      );
  return {
    ...values,
    price: Number(values.price),
    // Removing Sale also removes the discount.
    salePrice: onSale ? Number(values.salePrice) : null,
  };
}
