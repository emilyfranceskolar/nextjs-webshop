import { z } from "zod";

export const customerSchema = z.object({
  email: z.email({ error: "Enter an email" }),
  name: z.string().min(1, { error: "Enter a first name" }),
  address: z.string().min(1, { error: "Enter an address" }),
  postalCode: z.string().regex(/^\d{5}$/, {
    error: "Enter a valid ZIP / postal code",
  }),
  city: z.string().min(1, { error: "Enter a city" }),
  phoneNr: z.string().regex(/^(?:\+46|0)[1-9]\d{7,9}(\s|-)?$/, {
    error: "Enter a valid Swedish phone number",
  }),
});

export type Customer = z.infer<typeof customerSchema>;

export type ProductCategoryOption = { id: string; name: string; slug: string };

export function isSaleCategory(category: ProductCategoryOption) {
  return (
    category.slug.toLowerCase() === "sale" ||
    category.name.toLowerCase() === "sale"
  );
}

export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Required"),
  categoryIds: z.array(z.string().min(1)),
  category: z.string().trim().optional(),
  description: z.string().min(1, "Required"),
  image: z
    .string()
    .min(1, "Required")
    .refine((value) => {
      if (value.startsWith("/") && value.match(/\.(jpg|jpeg|png|webp)$/i)) {
        return true;
      }
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    }, "Invalid image URL"),
  price: z
    .string()
    .min(1, "Required")
    .refine((val) => {
      const parsed = Number(val);
      return Number.isFinite(parsed) && parsed > 0;
    }, "Invalid price"),
  salePrice: z.string().optional(),
  articleNumber: z.string().optional(),
  slug: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// Use the database categories for the same validation in the form and on the server.
export function createProductSchema(
  categories: ProductCategoryOption[],
  categoryAsText = false,
) {
  return productSchema.superRefine((product, context) => {
    if (!categoryAsText && product.categoryIds.length === 0) {
      context.addIssue({
        code: "custom",
        path: ["categoryIds"],
        message: "Select at least one category",
      });
    }
    if (
      !categoryAsText &&
      product.categoryIds.some(
        (id) => !categories.some((category) => category.id === id),
      )
    ) {
      context.addIssue({
        code: "custom",
        path: ["categoryIds"],
        message: "Select an existing category",
      });
    }
    const onSale = categoryAsText
      ? product.category?.toLowerCase() === "sale"
      : categories.some(
          (category) =>
            isSaleCategory(category) &&
            product.categoryIds.includes(category.id),
        );
    const salePrice = Number(product.salePrice);
    if (
      onSale &&
      (!Number.isFinite(salePrice) ||
        salePrice <= 0 ||
        salePrice >= Number(product.price))
    ) {
      context.addIssue({
        code: "custom",
        path: ["salePrice"],
        message:
          "Enter a sale price greater than 0 and lower than the regular price",
      });
    }
  });
}
