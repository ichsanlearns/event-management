import { prisma } from "../lib/prisma.lib.js";
import type { ReviewInput } from "../types/review.type.js";

export async function create(data: ReviewInput) {
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: {
        id: data.orderId,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "DONE") {
      throw new Error("Event not completed yet");
    }

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

    await tx.order.update({
      where: {
        id: data.orderId,
      },
      data: {
        status: "REVIEWED",
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
