import { start } from "node:repl";
import { prisma } from "../lib/prisma.lib.js";
import { type EventInput } from "../types/event.type.js";
import { AppError } from "../utils/app-error.util.js";

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
      select: { id: true, name: true },
    });
  }

  const events = await prisma.event.findMany({
    include: { Tickets: true },
    take: limit,
  });

  const mapped = events.map((event: any) => {
    return {
      id: event.id,
      name: event.name,
      price: event.price,
      tagline: event.tagline,
      category: event.category,
      venue: event.venue,
      city: event.city,
      availableSeats: event.available_seats,
      organizerId: event.organizer_id,
      heroImage: event.hero_image,
      about: event.about,
      startDate: event.start_date,
      endDate: event.end_date,
      tickets: event.Tickets.map((ticket: any) => {
        return {
          id: ticket.id,
          type: ticket.type,
          price: ticket.price,
          quota: ticket.quota,
          bought: ticket.bought,
        };
      }),
    };
  });

  return mapped;
}

export async function getById(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: { Tickets: true },
  });

  if (!event) {
    throw new AppError(404, "Event not found");
  }

  const mapped = {
    id: event.id,
    name: event.name,
    price: event.price,
    tagline: event.tagline,
    category: event.category,
    venue: event.venue,
    city: event.city,
    availableSeats: event.available_seats,
    organizerId: event.organizer_id,
    heroImage: event.hero_image,
    about: event.about,
    startDate: event.start_date,
    endDate: event.end_date,
    tickets: event.Tickets.map((ticket: any) => {
      return {
        id: ticket.id,
        type: ticket.type,
        price: ticket.price,
        quota: ticket.quota,
        bought: ticket.bought,
      };
    }),
  };

  return mapped;
}
