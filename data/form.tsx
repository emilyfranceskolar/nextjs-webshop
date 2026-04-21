import { z } from "zod";

export const customerSchema = z.object({
  email: z.email({ error: "Enter an email" }),
  name: z.string().min(1, { error: "Enter a first name" }),
  address: z.string().min(1, { error: "Enter an address" }),
  postalCode: z.coerce
    .number<number>()
    .min(1, { error: "Enter a ZIP/ postal code" }),
  city: z.string().min(1, { error: "Enter a city" }),
  phoneNr: z.string().min(1, { error: "Enter a phone number" }),
});

export type Customer = z.infer<typeof customerSchema>;
