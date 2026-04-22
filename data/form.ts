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
