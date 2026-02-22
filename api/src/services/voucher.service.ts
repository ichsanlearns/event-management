import { prisma } from "../lib/prisma.lib.js";
import { AppError } from "../utils/app-error.util.js";

export async function create(
  eventId: string,
  code: string,
  discountAmount: number,
  quota: number,
  startDate: string,
  endDate: string,
) {
  return prisma.voucher.create({
    data: {
      event_id: eventId,
      code,
      discount_amount: discountAmount,
      quota,
      start_date: new Date(startDate),
      end_date: new Date(endDate),
    },
  });
}

export async function get() {
  return prisma.voucher.findMany();
}

export async function getByCode({
  code,
  eventId,
  orderId,
}: {
  code: string;
  eventId: string;
  orderId: string;
}) {
  await prisma.$transaction(async () => {
    const result = await prisma.voucher.updateMany({
      where: { code, event_id: eventId, quota: { gt: 0 } },
      data: { quota: { decrement: 1 } },
    });

    if (result.count === 1) {
      const voucherPick = await prisma.voucher.findUnique({
        where: { code, event_id: eventId },
        select: { id: true, code: true, discount_amount: true, quota: true },
      });

      if (!voucherPick) {
        throw new AppError(400, "Voucher can't be found");
      }

      await prisma.order.update({
        where: { id: orderId },
        data: {
          voucher_id: voucherPick?.id,
          total: { decrement: voucherPick?.discount_amount },
        },
      });

      return voucherPick;
    }

    const voucherError = await prisma.voucher.findUnique({
      where: { code },
      select: { event_id: true, quota: true },
    });

    if (!voucherError) {
      throw new AppError(404, "Voucher not found for this event");
    }

    if (voucherError.event_id != eventId) {
      throw new AppError(400, "Voucher cant be used for this event");
    }

    if (voucherError.quota === 0) {
      throw new AppError(400, "Voucher already used up");
    }
  });

  const updatedOrder = await prisma.order.findUnique({
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

  if (!updatedOrder) {
    throw new AppError(404, "Order not found");
  }

  const mapped = {
    id: updatedOrder.id,
    voucherId: updatedOrder.voucher_id,
    customerId: updatedOrder.customer_id,
    status: updatedOrder.status,
    total: updatedOrder.total,
    orderCode: updatedOrder.order_code,
    quantity: updatedOrder.quantity,
    usingPoint: updatedOrder.using_point,
    expiredAt: updatedOrder.expired_at,
    voucher: {
      id: updatedOrder.Voucher?.id,
      code: updatedOrder.Voucher?.code,
      discountAmount: updatedOrder.Voucher?.discount_amount,
      quota: updatedOrder.Voucher?.quota,
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
    coupon: updatedOrder.Customer.Coupon.map((c) => ({
      id: c.id,
      amount: c.amount,
      expiredAt: c.expired_at,
    })),
  };

  return mapped;
}
