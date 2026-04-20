import { z } from "zod";

export const formSchema = z.object({
  email: z.email(),
  firstName: z
    .string()
    .min(2, { error: "First name must be at least 2 characters." })
    .max(14, { error: "First name must be at most 14 characters." }),
  lastName: z
    .string()
    .min(2, { error: "Last name must be at least 2 characters." })
    .max(14, { error: "Last name must be at most 14 characters." }),
  address: z
    .string()
    .min(5, { error: "Address must be at least 5 characters." })
    .max(14, { error: "Address must be at most 14 characters." }),
  address2: z
    .string()
    .min(2, { error: "Address must be at least 5 characters." })
    .max(14, { error: "Address must be at most 14 characters." }),
  city: z.string().min(5).max(18),
  postalCode: z.coerce.number().min(5).max(8),

  phoneNr: z.coerce.number().min(10).max(13),
});

export type Payment = z.infer<typeof formSchema>;
