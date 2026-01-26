import { prisma } from "../lib/prisma.lib.js";

export function getUserPoints(userId: string) {
  return prisma.point.findMany({
    where: {
      user_id: userId,
      deleted_at: null,
      expired_at: {
        gt: new Date(),
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export function getUserCoupons(userId: string) {
  return prisma.coupon.findMany({
    where: {
      user_id: userId,
      deleted_at: null,
      expired_at: {
        gt: new Date(),
      },
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      Referrer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}
