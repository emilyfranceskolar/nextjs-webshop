import { z } from "zod";

// validering och schemat för customer form
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

// validering och schemat för bilder
export const imageSchema = z
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
  }, "Invalid image URL");
export type Image = z.infer<typeof imageSchema>;

// validering och schemat för priset coerce för att tvinga input att bli ett nummer
export const priceSchema = z.coerce.number().min(1, "Price must be at least 1");

export type Price = z.infer<typeof priceSchema>;

// The same four choices as main, independent of local test data.
export const productCategoryNames = [
  "Bestseller",
  "Reading Glasses",
  "Sunglasses",
  "Sale",
];
export function isSaleCategory(names: string[]) {
  return names.includes("Sale");
}

// validering och schemat för produkter
export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Required"),
  category: z.array(z.string()).min(1, "Select at least one category"),
  description: z.string().min(1, "Required"),
  image: imageSchema,
  price: priceSchema,
  salePrice: z.string().optional(),
  articleNumber: z.string().optional(),
  slug: z.string().optional(),
});

// schemat för skapa produkt = samma som productSchema minus id
// export const createProductSchema = productSchema.omit({ id: true });

export type ProductFormValues = z.infer<typeof productSchema>;

// Validate the same category choices and prices in the browser and server actions.
export function createProductSchema() {
  return productSchema.superRefine((product, context) => {
    if (product.category.some((name) => !productCategoryNames.includes(name))) {
      context.addIssue({
        code: "custom",
        path: ["category"],
        message: "Select an existing category",
      });
    }
    const salePrice = Number(product.salePrice);
    if (
      isSaleCategory(product.category) &&
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
