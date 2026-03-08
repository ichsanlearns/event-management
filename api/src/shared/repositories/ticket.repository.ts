import { Types } from "../../generated/prisma/enums.js";
import type { dB } from "../types/db.type.js";

export const update = async ({
  db,
  ticketId,
  quantity,
}: {
  db: dB;
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
  db: dB;
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
  db: dB;
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
