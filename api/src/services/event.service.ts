import { start } from "node:repl";
import { prisma } from "../lib/prisma.lib.js";
import { type EventInput } from "../types/event.type.js";

export async function create({
  name,
  price,
  tagline,
  category,
  venue,
  city,
  availableSeats,
  organizerId,
  heroImage,
  about,
  startDate,
  endDate,
}: EventInput) {
  return await prisma.event.create({
    data: {
      name,
      price,
      tagline,
      category,
      venue,
      city,
      available_seats: availableSeats,
      organizer_id: organizerId,
      hero_image: heroImage,
      about: about,
      start_date: startDate,
      end_date: endDate,
    },
  });
}

export async function getAll(limit: number, query?: string) {
  if (query) {
    return await prisma.event.findMany({
      where: {
        OR: [
          { name: { startsWith: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { Tickets: true },
    });
  }

  return await prisma.event.findMany({
    include: { Tickets: true },
    take: limit,
  });
}

export async function getById(id: string) {
  return await prisma.event.findUnique({
    where: { id },
    include: { Tickets: true },
  });
}
