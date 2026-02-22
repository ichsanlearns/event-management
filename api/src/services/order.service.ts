import type { Status } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.lib.js";
import { AppError } from "../utils/app-error.util.js";

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
    const newOrder = await tx.order.create({
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

    await tx.point.update({
      where: { user_id: customerId },
      data: { amount: { decrement: usingPoint } },
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

  if (!order) {
    throw new AppError(404, "Event not found");
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
    voucher: {
      id: order.Voucher?.id,
      code: order.Voucher?.code,
      discountAmount: order.Voucher?.discount_amount,
      quota: order.Voucher?.quota,
    },
    coupon: {
      id: order.Coupon?.id,
      amount: order.Coupon?.amount,
      expiredAt: order.Coupon?.expired_at,
    },
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
  return prisma.order.findMany();
}

export async function getByUserId(customerId: string, status: string) {
  let orders;
  if (status) {
    if (status === "active") {
      orders = await prisma.order.findMany({
        where: {
          customer_id: customerId,
          status: { in: ["PAID", "WAITING_CONFIRMATION", "WAITING_PAYMENT"] },
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
      });
    } else if (status === "need_review") {
      orders = await prisma.order.findMany({
        where: {
          customer_id: customerId,
          status: "DONE",
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
      });
    } else {
      orders = await prisma.order.findMany({
        where: {
          customer_id: customerId,
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
    }
  } else {
    orders = await prisma.order.findMany({
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
    });
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
  const updatedOrder = await prisma.$transaction(async (tx) => {
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
            Coupon: { select: { id: true, amount: true, expired_at: true } },
          },
        },
      },
    });

    return updatedOrder;
  });
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
  await prisma.$transaction(async (tx) => {
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
