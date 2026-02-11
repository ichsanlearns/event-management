import { z } from "zod";
import { Category } from "../generated/prisma/enums.js";

export const createEventSchema = z.object({
  name: z.string().min(3, "Event must be at least 3 characters"),
  price: z.number(),
  tagline: z.string().min(10, "Event tagline too short"),
  category: z.enum(Category, "Event category is wrong"),
  venue: z.string(),
  city: z.string(),
  availableSeats: z.number(),
  organizerId: z.string(),
  heroImage: z.string(),
  about: z.string().min(20, "Event about is too short"),

  startDate: z.date("Invalid date format"),
  endDate: z.date("Invalid date format"),
});
