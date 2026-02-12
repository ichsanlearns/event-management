import { z } from "zod";

/**
 * Flexible date for edit mode
 * support:
 * - datetime-local string
 * - ISO string
 * - Date
 */
const EditDateSchema = z.union([z.date(), z.string().min(1)]);

export const EditEventSchema = z
  .object({
    name: z.string().min(1).optional(),

    price: z.number().nonnegative().optional(),

    category: z.string().optional(),

    tagline: z.string().optional(),

    venue: z.string().optional(),

    city: z.string().optional(),

    availableSeats: z.number().int("Available seats must be integer").nonnegative().optional(),

    organizerId: z.string().uuid().optional(),

    heroImage: z.string().url().optional(),

    about: z.string().optional(),

    startDate: EditDateSchema.optional(),

    endDate: EditDateSchema.optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate as any) >= new Date(data.startDate as any);
    },
    {
      message: "endDate must be after startDate",
      path: ["endDate"],
    },
  );

export type EditEventType = z.infer<typeof EditEventSchema>;
