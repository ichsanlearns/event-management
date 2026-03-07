import { Prisma } from "../../generated/prisma/client.js";
import type { Status } from "../../generated/prisma/enums.js";
import { prisma } from "../../shared/lib/prisma.lib.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import * as OrderRepository from "./order.repository.js";
import * as TicketRepository from "../../shared/repositories/ticket.repository.js";
import * as PointRepository from "../../shared/repositories/point.repository.js";

export async function create({
  orderCode,
  customerId,
  ticketId,
  quantity,
  status,
  usingPoint,
  total,
}: {
  orderCode: string;
  customerId: string;
  ticketId: string;
  quantity: number;
  status: Status;
  usingPoint: number;
  total: number;
}) {
  return prisma.$transaction(async (tx) => {
    if (total > 0) {
      const newOrder = await OrderRepository.create({
        orderCode,
        customerId,
        ticketId,
        quantity,
        status,
        usingPoint,
        total,
      });

      if (usingPoint > 0) {
        const point = await tx.point.findUnique({
          where: { user_id: customerId },
        });

        if (!point) {
          throw new AppError(400, "User point record not found");
        }

        if (point.amount < usingPoint) {
          throw new AppError(400, "Point not enough");
        }

        await PointRepository.update(customerId, -usingPoint);
      }

      await TicketRepository.update(ticketId, quantity);

      return newOrder;
    } else {
      const newOrder = await OrderRepository.create({
        orderCode,
        customerId,
        ticketId,
        quantity,
        status: "DONE",
        usingPoint,
        total,
      });

      await TicketRepository.update(ticketId, quantity);

      return newOrder;
    }
  });
}

export async function getById(id: string) {
  const order = await OrderRepository.getById(id);

  if (!order) {
    throw new AppError(404, "Order not found");
  }

  const mapped = {
    id: order.id,
    orderCode: order.order_code,
    customerId: order.customer_id,
    ticketId: order.ticket_id,
    voucherId: order.voucher_id,
    couponId: order.coupon_id,
    status: order.status,
    quantity: order.quantity,
    usingPoint: order.using_point,
    total: order.total,
    expiredAt: order.expired_at,
    payments:
      order.Payments.length > 0
        ? order.Payments.map((p) => ({
            id: p.id,
            proofImage: p.proof_image,
            amount: p.amount,
            createdAt: p.created_at,
          }))
        : null,
    voucher: order.Voucher
      ? {
          id: order.Voucher?.id,
          code: order.Voucher?.code,
          discountAmount: order.Voucher?.discount_amount,
          quota: order.Voucher?.quota,
        }
      : null,
    coupon: order.Coupon
      ? {
          id: order.Coupon?.id,
          amount: order.Coupon?.amount,
          expiredAt: order.Coupon?.expired_at,
        }
      : null,
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
    userCoupons: order.Customer.Coupon.map((c) => ({
      id: c.id,
      amount: c.amount,
      expiredAt: c.expired_at,
    })),
  };

  return mapped;
}

export async function getAll() {
  return OrderRepository.getAll();
}

export async function getByUserId(customerId: string, status: string) {
  let orders;
  if (status) {
    if (status === "active") {
      orders = await OrderRepository.getByUserId(customerId, [
        "PAID",
        "WAITING_CONFIRMATION",
        "WAITING_PAYMENT",
      ]);
    } else if (status === "need_review") {
      orders = await OrderRepository.getByUserId(customerId, ["DONE"]);
    } else {
      orders = await OrderRepository.getByUserId(customerId);
    }
  } else {
    orders = await OrderRepository.getByUserId(customerId);
  }

  const mapped = orders.map((order) => ({
    id: order.id,
    orderCode: order.order_code,
    ticketId: order.ticket_id,
    voucherId: order.voucher_id,
    status: order.status,
    quantity: order.quantity,
    usingPoint: order.using_point,
    total: order.total,
    createdAt: order.created_at,
    ticket: {
      eventId: order.Ticket.event_id,
      type: order.Ticket.type,
      price: order.Ticket.price,
      eventName: {
        id: order.Ticket.EventName.id,
        name: order.Ticket.EventName.name,
        city: order.Ticket.EventName.city,
        heroImage: order.Ticket.EventName.hero_image,
        venue: order.Ticket.EventName.venue,
        startDate: order.Ticket.EventName.start_date,
      },
    },
  }));

  return mapped;
}

export const patchCouponId = async ({
  couponId,
  orderId,
}: {
  couponId: string;
  orderId: string;
}) => {
  const updatedOrder = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        throw new AppError(404, "Order not found");
      }

      const coupon = await tx.coupon.findUnique({
        where: { id: couponId },
      });

      if (!coupon) {
        throw new AppError(404, "Coupon not found");
      }

      const deletedCoupon = await tx.coupon.findUnique({
        where: { id: couponId, deleted_at: { not: null } },
      });

      if (deletedCoupon) {
        throw new AppError(400, "Coupon is already used");
      }

      await tx.coupon.update({
        where: { id: couponId },
        data: {
          deleted_at: new Date(),
        },
      });

      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          coupon_id: couponId,
          total: { decrement: coupon.amount },
        },
        select: {
          id: true,
          voucher_id: true,
          coupon_id: true,
          customer_id: true,
          ticket_id: true,
          status: true,
          total: true,
          order_code: true,
          quantity: true,
          using_point: true,
          expired_at: true,
          created_at: true,
          Voucher: {
            select: {
              id: true,
              code: true,
              discount_amount: true,
              quota: true,
            },
          },
          Coupon: {
            select: { id: true, amount: true, expired_at: true },
          },
          Ticket: {
            select: {
              event_id: true,
              type: true,
              price: true,
              EventName: {
                select: { name: true, city: true, hero_image: true },
              },
            },
          },
          Customer: {
            select: {
              Coupon: { select: { id: true, amount: true, expired_at: true } },
            },
          },
        },
      });

      return updatedOrder;
    },
  );
  const mapped = {
    id: updatedOrder.id,
    orderCode: updatedOrder.order_code,
    customerId: updatedOrder.customer_id,
    ticketId: updatedOrder.ticket_id,
    voucherId: updatedOrder.voucher_id,
    couponId: updatedOrder.coupon_id,
    status: updatedOrder.status,
    quantity: updatedOrder.quantity,
    usingPoint: updatedOrder.using_point,
    total: updatedOrder.total,
    expiredAt: updatedOrder.expired_at,
    createdAt: updatedOrder.created_at,
    voucher: {
      id: updatedOrder.Voucher?.id,
      code: updatedOrder.Voucher?.code,
      discountAmount: updatedOrder.Voucher?.discount_amount,
      quota: updatedOrder.Voucher?.quota,
    },
    coupon: {
      id: updatedOrder.Coupon?.id,
      amount: updatedOrder.Coupon?.amount,
      expiredAt: updatedOrder.Coupon?.expired_at,
    },
    ticket: {
      eventId: updatedOrder.Ticket.event_id,
      type: updatedOrder.Ticket.type,
      price: updatedOrder.Ticket.price,
      eventName: {
        name: updatedOrder.Ticket.EventName.name,
        city: updatedOrder.Ticket.EventName.city,
        heroImage: updatedOrder.Ticket.EventName.hero_image,
      },
    },
    userCoupons: updatedOrder.Customer.Coupon.map((c) => ({
      id: c.id,
      amount: c.amount,
      expiredAt: c.expired_at,
    })),
  };

  return mapped;
};

export async function deleteById(orderId: string) {
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const order = await tx.order.findUnique({ where: { id: orderId } });

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    if (order.status !== "WAITING_PAYMENT") {
      throw new AppError(400, "Order cannot be cancelled");
    }

    await tx.order.update({
      where: { id: orderId },
      data: {
        deleted_at: new Date(),
        status: "CANCELED",
      },
    });

    await tx.ticket.update({
      where: { id: order.ticket_id },
      data: {
        bought: { decrement: order.quantity },
      },
    });

    if (order.voucher_id) {
      await tx.voucher.update({
        where: { id: order.voucher_id },
        data: {
          quota: { increment: 1 },
        },
      });
    }

    if (order.coupon_id) {
      await tx.coupon.update({
        where: { id: order.coupon_id },
        data: {
          deleted_at: null,
        },
      });
    }

    if (order.using_point > 0) {
      await tx.point.update({
        where: { user_id: order.customer_id },
        data: {
          amount: { increment: order.using_point },
        },
      });
    }
  });
}

export async function getRevenueByWeek(organizerId: string) {
  const result = await prisma.$queryRaw<
    { week_start: Date; total_revenue: number; total_tickets: number }[]
  >`
WITH weeks AS (
  SELECT generate_series(
    DATE_TRUNC('week', NOW()) - INTERVAL '3 weeks',
    DATE_TRUNC('week', NOW()),
    INTERVAL '1 week'
  ) AS week_start
)
SELECT 
  w.week_start,
  COALESCE(SUM(o.total), 0)::INTEGER AS total_revenue,
  COALESCE(SUM(o.quantity), 0)::INTEGER AS total_tickets
FROM weeks w
LEFT JOIN orders o
  ON DATE_TRUNC('week', o.created_at) = w.week_start
  AND o.status = 'PAID'
LEFT JOIN tickets t
  ON o.ticket_id = t.id
LEFT JOIN events e
  ON t.event_id = e.id
  AND  e.organizer_id = ${organizerId}
GROUP BY w.week_start
ORDER BY w.week_start ASC;
`;

  const mapped = result.map((r) => ({
    weekStart: r.week_start,
    totalRevenue: Number(r.total_revenue),
    totalTickets: Number(r.total_tickets),
  }));

  return mapped;
}
