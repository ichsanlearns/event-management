import { prisma } from "../../shared/lib/prisma.lib.js";
import type { PrismaClient, Prisma } from "../../generated/prisma/client.js";
import type { ReviewInput } from "../../shared/types/review.type.js";

type DB = PrismaClient | Prisma.TransactionClient;

export const create = async ({ db, data }: { db: DB; data: ReviewInput }) => {
  return await db.review.create({
    data: {
      user_id: data.userId,
      event_id: data.eventId,
      order_id: data.orderId,
      comment: data.comment,
      rating: data.rating,
    },
  });
};

export const getByEventId = async ({
  db,
  eventId,
}: {
  db: DB;
  eventId: string;
}) => {
  return await db.review.findMany({
    where: {
      event_id: eventId,
    },
  });
};
