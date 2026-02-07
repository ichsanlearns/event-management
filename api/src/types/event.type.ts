import type { Category } from "../generated/prisma/enums.js";

export type EventInput = {
  name: string;
  price: number;
  tagline: string;
  category: Category;
  venue: string;
  city: string;
  availableSeats: number;
  organizerId: string;
  heroImage: string;
  about: string;

  startDate: Date;
  endDate: Date;
};
