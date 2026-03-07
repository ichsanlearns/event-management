import { Prisma, PrismaClient } from "@/generated/prisma/client.js";

type DB = PrismaClient | Prisma.TransactionClient;

export const getCouponByUserId = async ({
  db,
  userId,
}: {
  db: DB;
  userId: string;
}) => {
  return await db.coupon.findMany({
    where: { user_id: userId },
    select: {
      id: true,
      user_id: true,
      amount: true,
      expired_at: true,
      referrer_id: true,
    },
  });
};
