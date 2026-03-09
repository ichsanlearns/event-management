import { prisma } from "../../shared/lib/prisma.lib.js";
import { Status } from "../../generated/prisma/client.js";
import type { dB } from "../../shared/types/db.type.js";

export const create = async ({
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
}) => {
  await prisma.order.create({
    data: {
      order_code: orderCode,
      customer_id: customerId,
      ticket_id: ticketId,
      quantity,
      expired_at: new Date(Date.now() + 2 * 60 * 60 * 1000),
      status,
      using_point: usingPoint,
      total: total - usingPoint,
    },
  });
};

export const getById = async (id: string) => {
  return await prisma.order.findUnique({
    where: { id },
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
      Payments: {
        select: {
          id: true,
          proof_image: true,
          amount: true,
          created_at: true,
        },
        orderBy: { created_at: "desc" },
      },
      Voucher: {
        select: { id: true, code: true, discount_amount: true, quota: true },
      },
      Coupon: {
        select: { id: true, amount: true, expired_at: true },
      },
      Ticket: {
        select: {
          event_id: true,
          type: true,
          price: true,
          EventName: { select: { name: true, city: true, hero_image: true } },
        },
      },
      Customer: {
        select: {
          Coupon: {
            where: { deleted_at: null },
            select: { id: true, amount: true, expired_at: true },
          },
        },
      },
    },
  });
};

export const getOrderUpdatedVoucher = async ({
  db,
  orderId,
}: {
  db: dB;
  orderId: string;
}) => {
  return await db.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      voucher_id: true,
      customer_id: true,
      status: true,
      total: true,
      order_code: true,
      quantity: true,
      using_point: true,
      expired_at: true,
      Voucher: {
        select: { id: true, code: true, discount_amount: true, quota: true },
      },
      Ticket: {
        select: {
          event_id: true,
          type: true,
          price: true,
          EventName: { select: { name: true, city: true, hero_image: true } },
        },
      },
      Customer: {
        select: {
          Coupon: { select: { id: true, amount: true, expired_at: true } },
        },
      },
    },
  });
};

export const getUserOrderCount = async ({
  db,
  eventId,
}: {
  db: dB;
  eventId: string;
}) => {
  return await db.order.findMany({
    where: { Ticket: { event_id: eventId }, deleted_at: { not: null } },
  });
};

export const isExist = async ({ db, orderId }: { db: dB; orderId: string }) => {
  return await db.order.findUnique({
    where: { id: orderId },
  });
};

export const findWithCustomerEvent = async ({
  db,
  orderId,
}: {
  db: dB;
  orderId: string;
}) => {
  return await db.order.findUnique({
    where: { id: orderId },
    include: {
      Customer: true,
      Ticket: { include: { EventName: true } },
    },
  });
};

export const updateStatus = async ({
  db,
  orderId,
  status,
}: {
  db: dB;
  orderId: string;
  status: Status;
}) => {
  return db.order.update({
    where: { id: orderId },
    data: {
      status,
      ...(status === "WAITING_CONFIRMATION" && {
        expired_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      }),
    },
  });
};

export const updateTotal = async ({
  db,
  orderId,
  voucherId,
  discountAmount,
}: {
  db: dB;
  orderId: string;
  voucherId: string;
  discountAmount: number;
}) => {
  return await db.order.update({
    where: { id: orderId },
    data: {
      voucher_id: voucherId,
      total: { decrement: discountAmount },
    },
  });
};

export const getAll = async () => {
  await prisma.order.findMany();
};

export const getByUserId = async (customerId: string, status?: Status[]) => {
  return await prisma.order.findMany({
    where: {
      customer_id: customerId,
      ...(status && status.length > 0 && { status: { in: status } }),
    },
    select: {
      id: true,
      order_code: true,
      ticket_id: true,
      voucher_id: true,
      status: true,
      quantity: true,
      using_point: true,
      total: true,
      created_at: true,
      Ticket: {
        select: {
          event_id: true,
          type: true,
          price: true,
          EventName: {
            select: {
              id: true,
              name: true,
              city: true,
              hero_image: true,
              venue: true,
              start_date: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
};
