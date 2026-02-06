import { z } from "zod";

export const voucherSchema = z
  .object({
    code: z
      .string()
      .min(3, "Voucher code must be at least 3 characters")
      .max(50, "Voucher code is too long"),

    discountAmount: z
      .number("Discount must be a number")
      .int("Discount must be an integer")
      .positive("Discount must be greater than 0"),

    quota: z
      .number("Quota must be a number")
      .int("Quota must be an integer")
      .positive("Quota must be greater than 0"),

    startDate: z.coerce.date("Invalid start date"),

    endDate: z.coerce.date("Invalid end date"),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type VoucherInput = z.output<typeof voucherSchema>;
export type VoucherOutput = z.output<typeof voucherSchema>;
