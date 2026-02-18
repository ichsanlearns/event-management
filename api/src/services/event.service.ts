import { prisma } from "../lib/prisma.lib.js";
import { type EventInput } from "../types/event.type.js";
import { AppError } from "../utils/app-error.util.js";
import { Types } from "../generated/prisma/enums.js";

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
  return await prisma.$transaction(async () => {
    const event = await prisma.event.create({
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

    await prisma.ticket.createMany({
      data: [
        {
          event_id: event.id,
          type: Types.EARLYBIRD,
          price: Math.floor(Number(event.price) * 0.7),
          quota: 50,
        },
        {
          event_id: event.id,
          type: Types.REGULER,
          price: Number(event.price),
          quota: 200,
        },
        {
          event_id: event.id,
          type: Types.VIP,
          price: Math.floor(Number(event.price) * 1.8),
          quota: 30,
        },
      ],
    });
    return event;
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
    orderBy: {
      start_date: "desc",
    },
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

export async function getByOrganizerId(organizerId: string) {
  const events = await prisma.event.findMany({
    where: {
      organizer_id: organizerId,
    },
    include: {
      Tickets: true,
    },
    orderBy: {
      start_date: "desc",
    },
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
      tickets: event.Tickets.map((ticket: any) => ({
        id: ticket.id,
        type: ticket.type,
        price: ticket.price,
        quota: ticket.quota,
        bought: ticket.bought,
      })),
    };
  });

  return mapped;
}

export async function updateById(id: string, data: any) {
  return prisma.event.update({
    where: { id },
    data: {
      name: data.name,
      price: data.price,
      tagline: data.tagline,
      category: data.category,
      venue: data.venue,
      city: data.city,
      available_seats: data.availableSeats,
      hero_image: data.heroImage,
      about: data.about,
      start_date: data.startDate,
      end_date: data.endDate,
    },
  });
}

export async function remove(id: string) {
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    throw new AppError(404, "Event not found");
  }

  await prisma.event.delete({
    where: { id },
  });

  return true;
}
