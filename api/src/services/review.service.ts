import { prisma } from "../lib/prisma.lib.js";
import type { ReviewInput } from "../types/review.type.js";

export async function create(data: ReviewInput) {
  await prisma.$transaction(async (tx) => {
    await tx.review.create({
      data: {
        user_id: data.userId,
        event_id: data.eventId,
        order_id: data.orderId,
        comment: data.comment,
        rating: data.rating,
      },
    });

    await tx.point.update({
      where: {
        user_id: data.userId,
      },
      data: {
        amount: {
          increment: 50,
        },
      },
    });
  });
}

export async function getByEventId(eventId: string) {
  return await prisma.review.findMany({
    where: {
      event_id: eventId,
    },
  });
}
