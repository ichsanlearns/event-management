import type { dB } from "../../shared/types/db.type.js";

export const create = async ({
  db,
  eventId,
  code,
  discountAmount,
  quota,
  startDate,
  endDate,
}: {
  db: dB;
  eventId: string;
  code: string;
  discountAmount: number;
  quota: number;
  startDate: string;
  endDate: string;
}) => {
  return await db.voucher.create({
    data: {
      event_id: eventId,
      code,
      discount_amount: discountAmount,
      quota,
      start_date: new Date(startDate),
      end_date: new Date(endDate),
    },
  });
};

export const getAll = async ({ db }: { db: dB }) => {
  return await db.voucher.findMany();
};

export const isExist = async ({ db, code }: { db: dB; code: string }) => {
  return await db.voucher.findUnique({
    where: { code },
    select: { event_id: true, quota: true },
  });
};

export const updateMany = async ({
  db,
  eventId,
  code,
}: {
  db: dB;
  eventId: string;
  code: string;
}) => {
  return await db.voucher.updateMany({
    where: { code, event_id: eventId, quota: { gt: 0 } },
    data: { quota: { decrement: 1 } },
  });
};

export const updateQuota = async ({
  db,
  voucherId,
  quantity,
}: {
  db: dB;
  voucherId: string;
  quantity: number;
}) => {
  return await db.voucher.update({
    where: { id: voucherId },
    data: { quota: { increment: quantity } },
  });
};

export const getByCode = async ({
  db,
  code,
  eventId,
}: {
  db: dB;
  code: string;
  eventId: string;
}) => {
  return await db.voucher.findUnique({
    where: { code, event_id: eventId },
    select: { id: true, code: true, discount_amount: true, quota: true },
  });
};
