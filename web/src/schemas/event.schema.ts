import { z } from "zod";

export const EventInputSchema = z
  .object({
    name: z
      .string("Event name must be a string")
      .min(1, "Event name is required"),
    price: z
      .number("Price must be a number")
      .nonnegative("Price can't be negative"),
    category: z.string("Category must be a string"),
    tagline: z.string("Tagline must be a string").min(1, "Tagline is required"),
    venue: z.string("Venue must be a string").min(1, "Venue is required"),
    city: z.string("City must be a string").min(1, "City is required"),
    availableSeats: z
      .number("Available seats must be a number")
      .int("Available seats must be an integer")
      .nonnegative("Available seats can't be negative"),
    heroImage: z.any().refine((file) => file instanceof File, {
      message: "Hero image is required",
    }),
    about: z.string("About must be a string").min(1, "About is required"),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "endDate must be after startDate",
    path: ["endDate"],
  });

export type EventInputType = z.infer<typeof EventInputSchema>;
