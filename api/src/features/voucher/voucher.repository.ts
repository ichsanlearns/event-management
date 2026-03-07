import { prisma } from "@/shared/lib/prisma.lib.js";
import type { PrismaClient, Prisma } from "@/generated/prisma/client.js";

type DB = PrismaClient | Prisma.TransactionClient;

export const create = async ({
  db,
  eventId,
  code,
  discountAmount,
  quota,
  startDate,
  endDate,
}: {
  db: DB;
  eventId: string;
  code: string;
  discountAmount: number;
  quota: number;
  startDate: string;
  endDate: string;
}) => {
  return await prisma.voucher.create({
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

export const getAll = async ({ db }: { db: DB }) => {
  return await db.voucher.findMany();
};

export const isExist = async ({ db, code }: { db: DB; code: string }) => {
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
  db: DB;
  eventId: string;
  code: string;
}) => {
  return await db.voucher.updateMany({
    where: { code, event_id: eventId, quota: { gt: 0 } },
    data: { quota: { decrement: 1 } },
  });
};

export const getByCode = async ({
  db,
  code,
  eventId,
}: {
  db: DB;
  code: string;
  eventId: string;
}) => {
  return await db.voucher.findUnique({
    where: { code, event_id: eventId },
    select: { id: true, code: true, discount_amount: true, quota: true },
  });
};
