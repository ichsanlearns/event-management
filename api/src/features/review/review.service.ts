import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../shared/lib/prisma.lib.js";
import type { ReviewInput } from "../../shared/types/review.type.js";

import * as OrderRepository from "../order/order.repository.js";
import * as ReviewRepository from "../review/review.repository.js";
import * as PointRepository from "../../shared/repositories/point.repository.js";

export async function create(data: ReviewInput) {
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const order = await OrderRepository.isExist({
      db: tx,
      orderId: data.orderId,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "DONE") {
      throw new Error("Event not completed yet");
    }

    await ReviewRepository.create({ db: tx, data });

    await PointRepository.update({ db: tx, userId: data.userId, amount: -50 });

    await OrderRepository.updateStatus({
      db: tx,
      orderId: data.orderId,
      status: "REVIEWED",
    });
  });
}

export async function getByEventId(eventId: string) {
  return await ReviewRepository.getByEventId({ db: prisma, eventId });
}
