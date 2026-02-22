import { prisma } from "../lib/prisma.lib.js";

export const getByUserId = async (userId: string) => {
  const vouchers = await prisma.coupon.findMany({
    where: { user_id: userId },
    select: {
      id: true,
      user_id: true,
      amount: true,
      expired_at: true,
      referrer_id: true,
    },
  });

  const mapped = vouchers.map((voucher) => ({
    id: voucher.id,
    userId: voucher.user_id,
    amount: voucher.amount,
    expiredAt: voucher.expired_at,
    referrerId: voucher.referrer_id,
  }));

  return mapped;
};

export const updateByOrderId = async ({
  couponId,
  orderId,
}: {
  couponId: string;
  orderId: string;
}) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { coupon_id: couponId },
  });
};
