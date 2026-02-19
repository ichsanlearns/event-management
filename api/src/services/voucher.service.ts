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
  const voucherPicked = await prisma.$transaction(async () => {
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
        data: { voucher_id: voucherPick?.id },
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

  const mapped = {
    id: voucherPicked!.id,
    code: voucherPicked!.code,
    discountAmount: voucherPicked!.discount_amount,
    quota: voucherPicked!.quota,
  };

  return mapped;
}
