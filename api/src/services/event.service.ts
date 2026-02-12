import { start } from "node:repl";
import { prisma } from "../lib/prisma.lib.js";
import { type EventInput } from "../types/event.type.js";
import { AppError } from "../utils/app-error.util.js";

export async function create({ name, price, tagline, category, venue, city, availableSeats, organizerId, heroImage, about, startDate, endDate }: EventInput) {
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

export async function getAll(page: number, limit: number, query?: string) {
  // SEARCH (tidak dipagination dulu, biar aman)
  if (query) {
    const data = await prisma.event.findMany({
      where: {
        OR: [{ name: { contains: query, mode: "insensitive" } }],
      },
      select: { id: true, name: true },
    });

    return {
      data,
      total: data.length,
    };
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.event.findMany({
      include: { Tickets: true },
      take: limit,
      skip,
      orderBy: { start_date: "desc" },
    }),
    prisma.event.count(),
  ]);

  const mapped = data.map((event: any) => ({
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
    tickets: event.Tickets.map((ticket: any) => ({
      id: ticket.id,
      type: ticket.type,
      price: ticket.price,
      quota: ticket.quota,
      bought: ticket.bought,
    })),
  }));

  return {
    data: mapped,
    total,
  };
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
