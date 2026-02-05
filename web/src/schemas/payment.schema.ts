import { z } from "zod";

export const paymentSchema = z.object({
  imageUrl: z.string().url("Must be valid URL").min(1, "Image URL is required"),
  voucherCode: z.string().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
