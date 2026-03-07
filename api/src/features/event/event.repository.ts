import { Prisma, PrismaClient } from "@/generated/prisma/client.js";
import type { EventInput } from "@/shared/types/event.type.js";

type DB = PrismaClient | Prisma.TransactionClient;

export const create = async ({ db, data }: { db: DB; data: EventInput }) => {
  return await db.event.create({
    data: {
      name: data.name,
      price: data.price,
      tagline: data.tagline,
      category: data.category,
      venue: data.venue,
      city: data.city,
      available_seats: data.availableSeats,
      organizer_id: data.organizerId,
      hero_image: data.heroImage,
      about: data.about,
      start_date: data.startDate,
      end_date: data.endDate,
    },
  });
};

export const updatebyId = async ({
  db,
  data,
  id,
}: {
  db: DB;
  id: string;
  data: any;
}) => {
  await db.event.update({
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
};

export const deleteById = async ({
  db,
  eventId,
}: {
  db: DB;
  eventId: string;
}) => {
  await db.event.delete({
    where: { id: eventId },
  });
};

export const getAll = async ({ db, limit }: { db: DB; limit: number }) => {
  return await db.event.findMany({
    include: { Tickets: true },
    take: limit,
    orderBy: {
      start_date: "asc",
    },
  });
};

export const isExist = async ({ db, eventId }: { db: DB; eventId: string }) => {
  return await db.event.findUnique({
    where: { id: eventId },
    include: { Tickets: true },
  });
};

export const getEventsByOrganizerId = async ({
  db,
  organizerId,
}: {
  db: DB;
  organizerId: string;
}) => {
  return await db.event.findMany({
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
};

export const getSearch = async ({
  db,
  where,
}: {
  db: DB;
  where: Prisma.EventWhereInput;
}) => {
  return await db.event.findMany({
    ...(where && { where }),
    select: {
      id: true,
      name: true,
      venue: true,
      city: true,
      start_date: true,
      category: true,
      hero_image: true,
      Tickets: {
        select: { price: true },
        orderBy: { price: "asc" },
      },
    },
  });
};
