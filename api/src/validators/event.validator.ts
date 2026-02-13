import { z } from "zod";
import { Category } from "../generated/prisma/enums.js";

export const createEventSchema = z.object({
  name: z.string().min(3, "Event must be at least 3 characters"),
  price: z.coerce.number(),
  tagline: z.string().min(1, "Event tagline too short"),
  category: z.enum(Category, "Event category is wrong"),
  venue: z.string(),
  city: z.string(),
  availableSeats: z.coerce.number(),
  organizerId: z.string(),
  about: z.string().min(1, "Event about is too short"),

  startDate: z.coerce.date("Invalid date format"),
  endDate: z.coerce.date("Invalid date format"),
});
