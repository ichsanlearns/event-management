import type { PrismaClient, Prisma } from "@/generated/prisma/client.js";

type DB = PrismaClient | Prisma.TransactionClient;

export const create = async ({
  db,
  userId,
  amount,
  expiredAt,
}: {
  db: DB;
  userId: string;
  amount: number;
  expiredAt: Date;
}) => {
  return await db.point.create({
    data: {
      user_id: userId,
      amount: amount,
      expired_at: expiredAt,
    },
  });
};

export const update = async ({
  db,
  userId,
  amount,
  expiredAt,
}: {
  db: DB;
  userId: string;
  amount: number;
  expiredAt?: Date;
}) => {
  await db.point.update({
    where: { user_id: userId },
    data: {
      amount: { increment: amount },
      ...(expiredAt && { expired_at: expiredAt }),
    },
  });
};
