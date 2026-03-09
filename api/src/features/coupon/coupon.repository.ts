import type { dB } from "../../shared/types/db.type.js";

export const create = async ({
  db,
  userId,
  referrerId,
  amount,
  expiredAt,
}: {
  db: dB;
  userId: string;
  referrerId: string;
  amount: number;
  expiredAt: Date;
}) => {
  return await db.coupon.create({
    data: {
      user_id: userId,
      referrer_id: referrerId,
      amount: amount,
      expired_at: expiredAt,
    },
  });
};

export const getCouponByUserId = async ({
  db,
  userId,
}: {
  db: dB;
  userId: string;
}) => {
  return await db.coupon.findMany({
    where: {
      user_id: userId,
      expired_at: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
      user_id: true,
      amount: true,
      expired_at: true,
      referrer_id: true,
    },
    orderBy: { expired_at: "asc" },
  });
};
