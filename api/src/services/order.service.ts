import type { Status } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.lib.js";

export async function create(
  orderCode: string,
  customerId: string,
  ticketId: string,
  quantity: number,
  status: Status,
  usingPoint: number,
  total: number,
) {
  return prisma.order.create({
    data: {
      order_code: orderCode,
      customer_id: customerId,
      ticket_id: ticketId,
      quantity,
      status,
      using_point: usingPoint,
      total,
    },
  });
}

export async function getById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      TicketsType: { include: { EventName: true } },
    },
  });
}

export async function getAll() {
  return prisma.order.findMany();
}
