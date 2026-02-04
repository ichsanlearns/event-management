import type { Status } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.lib.js";

export function create(
  orderCode: string,
  customerId: string,
  ticketId: string,
  quantity: number,
  status: Status,
  usingPoint: number,
  total: number,
) {
  return prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        order_code: orderCode,
        customer_id: customerId,
        ticket_id: ticketId,
        quantity,
        expired_at: new Date(Date.now() + 48 * 60 * 60 * 1000),
        status,
        using_point: usingPoint,
        total,
      },
    });

    await tx.ticket.update({
      where: { id: ticketId },
      data: { bought: { increment: quantity } },
    });

    return newOrder;
  });
}

export async function getById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      Ticket: { include: { EventName: true } },
    },
  });
}

export async function getAll() {
  return prisma.order.findMany();
}
