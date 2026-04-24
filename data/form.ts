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

export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Required"),
  category: z.string().optional(),
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
      return !Number.isNaN(parsed) && parsed > 0;
    }, "Invalid price"),
  articleNumber: z.string().optional(),
  slug: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;