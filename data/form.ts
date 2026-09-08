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

// Keep main's checkbox choices available even before they exist in the database.
const defaultCategoryNames = [
  "Bestseller",
  "Reading Glasses",
  "Sunglasses",
  "Sale",
];

export function getProductCategoryNames(categories: ProductCategoryOption[]) {
  return [
    ...new Set([
      ...defaultCategoryNames,
      ...categories.map(({ name }) => name),
    ]),
  ];
}

export function isSaleCategory(
  names: string[],
  categories: ProductCategoryOption[],
) {
  return names.some(
    (name) =>
      name.toLowerCase() === "sale" ||
      categories.some(
        (category) =>
          category.name === name && category.slug.toLowerCase() === "sale",
      ),
  );
}

export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Required"),
  category: z.array(z.string()).min(1, "Select at least one category"),
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

// Validate the same category choices and prices in the browser and server actions.
export function createProductSchema(categories: ProductCategoryOption[]) {
  const categoryNames = getProductCategoryNames(categories);
  return productSchema.superRefine((product, context) => {
    if (product.category.some((name) => !categoryNames.includes(name))) {
      context.addIssue({
        code: "custom",
        path: ["category"],
        message: "Select an existing category",
      });
    }
    const salePrice = Number(product.salePrice);
    if (
      isSaleCategory(product.category, categories) &&
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
