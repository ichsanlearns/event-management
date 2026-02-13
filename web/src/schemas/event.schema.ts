import { z } from "zod";

/**
 * Reusable helpers
 */
const DateSchema = z.union([z.date(), z.string().datetime()]);

export const EventInputSchema = z
  .object({
    name: z.string().min(1, "Event name is required"),
    price: z.number().nonnegative("Price must be ≥ 0"),
    category: z.string(),
    tagline: z.string().min(1),
    venue: z.string().min(1),
    city: z.string().min(1),
    availableSeats: z
      .number()
      .int("Available seats must be an integer")
      .nonnegative(),
    heroImage: z.file(),
    about: z.string().min(1),
    startDate: DateSchema,
    endDate: DateSchema,
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "endDate must be after startDate",
    path: ["endDate"],
  });

export type EventInputType = z.infer<typeof EventInputSchema>;
