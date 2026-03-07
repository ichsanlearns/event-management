import { prisma } from "../lib/prisma.lib.js";
import type { PrismaClient, Prisma } from "@/generated/prisma/client.js";
import type { EventInput } from "../types/event.type.js";
import { Types } from "../../generated/prisma/enums.js";

type DB = PrismaClient | Prisma.TransactionClient;

export const update = async ({
  db,
  ticketId,
  quantity,
}: {
  db: DB;
  ticketId: string;
  quantity: number;
}) => {
  await db.ticket.update({
    where: { id: ticketId },
    data: { bought: { increment: quantity } },
  });
};

export const create = async ({
  db,
  eventId,
  availableSeats,
}: {
  db: DB;
  eventId: string;
  availableSeats: number;
}) => {
  await db.ticket.create({
    data: {
      event_id: eventId,
      type: Types.VIP,
      price: 0,
      quota: availableSeats,
    },
  });
};

export const createMany = async ({
  db,
  eventId,
  eventPrice,
  availableSeats,
}: {
  db: DB;
  eventId: string;
  eventPrice: number;
  availableSeats: number;
}) => {
  await db.ticket.createMany({
    data: [
      {
        event_id: eventId,
        type: Types.EARLYBIRD,
        price: Math.floor(Number(eventPrice) * 0.7),
        quota: Math.floor(availableSeats * (1 / 4)),
      },
      {
        event_id: eventId,
        type: Types.REGULER,
        price: Number(eventPrice),
        quota: Math.floor(availableSeats * (2 / 4)),
      },
      {
        event_id: eventId,
        type: Types.VIP,
        price: Math.floor(Number(eventPrice) * 1.8),
        quota: Math.floor(availableSeats * (1 / 4)),
      },
    ],
  });
};
