import { z } from "zod";

export const createEventSchema = z
  .object({
    name: z.string().min(3, "Event must be at least 3 characters"),

    price: z.coerce.number().nonnegative("Price cannot be negative"),

    tagline: z.string().min(1, "Event tagline too short"),

    category: z.string(),

    venue: z.string().min(1, "Venue is required"),
    city: z.string().min(1, "City is required"),

    availableSeats: z.coerce
      .number()
      .int("Available seats must be an integer")
      .nonnegative("Available seats cannot be negative"),

    organizerId: z.string(),

    about: z.string().min(1, "Event about is too short"),

    startDate: z.coerce.date(),

    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
