import type { Status } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.lib.js";
import { AppError } from "../utils/app-error.util.js";

export async function create(
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
        expired_at: new Date(Date.now() + 2 * 60 * 60 * 1000),
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
  const order = await prisma.order.findUnique({
    where: { id },
    select: {
      id: true,
      customer_id: true,
      status: true,
      total: true,
      order_code: true,
      quantity: true,
      using_point: true,
      expired_at: true,
      Ticket: {
        select: {
          event_id: true,
          type: true,
          price: true,
          EventName: { select: { name: true, city: true, hero_image: true } },
        },
      },
    },
  });

  if (!order) {
    throw new AppError(404, "Event not found");
  }

  const mapped = {
    id: order.id,
    customerId: order.customer_id,
    status: order.status,
    total: order.total,
    orderCode: order.order_code,
    quantity: order.quantity,
    usingPoint: order.using_point,
    expiredAt: order.expired_at,
    ticket: {
      eventId: order.Ticket.event_id,
      type: order.Ticket.type,
      price: order.Ticket.price,
      eventName: {
        name: order.Ticket.EventName.name,
        city: order.Ticket.EventName.city,
        heroImage: order.Ticket.EventName.hero_image,
      },
    },
  };

  return mapped;
}

export async function getAll() {
  return prisma.order.findMany();
}

export async function getByUserId(customerId: string) {
  const orders = await prisma.order.findMany({
    where: { customer_id: customerId },
    select: {
      id: true,
      order_code: true,
      ticket_id: true,
      voucher_id: true,
      status: true,
      quantity: true,
      using_point: true,
      total: true,
    },
  });

  const mapped = orders.map((order) => ({
    id: order.id,
    orderCode: order.order_code,
    ticketId: order.ticket_id,
    voucherId: order.voucher_id,
    status: order.status,
    quantity: order.quantity,
    usingPoint: order.using_point,
    total: order.total,
  }));

  return mapped;
}
