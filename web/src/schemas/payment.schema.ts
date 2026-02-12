import { z } from "zod";

export const paymentSchema = z.object({
  proofImage: z.instanceof(File, { message: "Proof image is required" }),
  voucherCode: z.string().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
