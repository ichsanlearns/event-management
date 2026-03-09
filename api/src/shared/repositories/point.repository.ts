import type { dB } from "../types/db.type.js";

export const create = async ({
  db,
  userId,
  amount,
  expiredAt,
}: {
  db: dB;
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
  db: dB;
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

export const get = async ({ db, userId }: { db: dB; userId: string }) => {
  return await db.point.findMany({
    where: {
      user_id: userId,
      expired_at: {
        gt: new Date(),
      },
    },
    orderBy: { expired_at: "asc" },
  });
};
