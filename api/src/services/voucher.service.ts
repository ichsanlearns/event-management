import { prisma } from "../lib/prisma.lib.js";

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

export async function getById(code: string) {
  return prisma.voucher.findUnique({ where: { code } });
}
