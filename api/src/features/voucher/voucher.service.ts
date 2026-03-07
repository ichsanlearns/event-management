import { prisma } from "../../shared/lib/prisma.lib.js";
import { AppError } from "../../shared/utils/app-error.util.js";

import * as voucherRepository from "./voucher.repository.js";
import * as orderRepository from "../order/order.repository.js";

export async function create(
  eventId: string,
  code: string,
  discountAmount: number,
  quota: number,
  startDate: string,
  endDate: string,
) {
  return await voucherRepository.create({
    db: prisma,
    eventId,
    code,
    discountAmount,
    quota,
    startDate,
    endDate,
  });
}

export async function getAll() {
  return await voucherRepository.getAll({ db: prisma });
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
  await prisma.$transaction(async (tx) => {
    const result = await voucherRepository.updateMany({
      db: tx,
      eventId,
      code,
    });

    if (result.count === 1) {
      const voucherPick = await voucherRepository.getByCode({
        db: tx,
        code,
        eventId,
      });

      if (!voucherPick) {
        throw new AppError(400, "Voucher can't be found");
      }

      await orderRepository.updateTotal({
        db: tx,
        orderId,
        voucherId: voucherPick?.id,
        discountAmount: voucherPick?.discount_amount,
      });

      return voucherPick;
    }

    const voucherError = await voucherRepository.isExist({ db: tx, code });

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

  const updatedOrder = await orderRepository.getOrderUpdatedVoucher({
    db: prisma,
    orderId,
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
