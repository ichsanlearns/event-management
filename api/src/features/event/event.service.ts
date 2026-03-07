import { prisma } from "../../shared/lib/prisma.lib.js";
import { type EventInput } from "../../shared/types/event.type.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import { Prisma } from "@/generated/prisma/client.js";

import * as EventRepository from "@/features/event/event.repository.js";
import * as TicketRepository from "@/shared/repositories/ticket.repository.js";
import * as OrderRepository from "@/features/order/order.repository.js";
import * as UserRepository from "@/features/user/user.repository.js";

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
    const event = await EventRepository.create({
      db: prisma,
      data: {
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
      },
    });

    if (price !== 0) {
      await TicketRepository.createMany({
        db: prisma,
        eventId: event.id,
        eventPrice: price,
        availableSeats,
      });
    } else {
      await TicketRepository.create({
        db: prisma,
        eventId: event.id,
        availableSeats,
      });
    }

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

  const events = await EventRepository.getAll({ db: prisma, limit });

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

export async function getSearch({
  query,
  category,
  location,
}: {
  query?: string;
  category?: string;
  location?: string;
}) {
  const where: Prisma.EventWhereInput = {
    ...(query && {
      OR: [
        { name: { startsWith: query, mode: "insensitive" } },
        { name: { contains: query, mode: "insensitive" } },
      ],
    }),

    ...(category && {
      category: category.toUpperCase(),
    }),

    ...(location && {
      city: {
        equals: location,
        mode: "insensitive",
      },
    }),
  };

  const events = await EventRepository.getSearch({ db: prisma, where });

  const mapped = events.map((event) => ({
    id: event.id,
    name: event.name,
    venue: event.venue,
    city: event.city,
    startDate: event.start_date,
    category: event.category,
    heroImage: event.hero_image,
    lowestPrice: event.Tickets.length ? event.Tickets[0]?.price : null,
  }));

  return mapped;
}

export async function getById(id: string) {
  const event = await EventRepository.isExist({ db: prisma, eventId: id });

  if (!event) {
    throw new AppError(404, "Event not found");
  }

  const orderCounts = await OrderRepository.getUserOrderCount({
    db: prisma,
    eventId: id,
  });

  const organizer = await UserRepository.getById({
    db: prisma,
    userId: event.organizer_id,
  });

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
    organizer: { id: organizer?.id, name: organizer?.name },
    tickets: event.Tickets.map((ticket: any) => {
      return {
        id: ticket.id,
        type: ticket.type,
        price: ticket.price,
        quota: ticket.quota,
        bought: ticket.bought,
      };
    }),
    orderCancelled: orderCounts.length,
  };

  return mapped;
}

export async function getByOrganizerId(organizerId: string) {
  const events = await EventRepository.getEventsByOrganizerId({
    db: prisma,
    organizerId,
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
  return await EventRepository.updatebyId({ db: prisma, data, id });
}

export async function remove(id: string) {
  const event = await EventRepository.isExist({ db: prisma, eventId: id });

  if (!event) {
    throw new AppError(404, "Event not found");
  }

  await EventRepository.deleteById({ db: prisma, eventId: id });

  return true;
}
