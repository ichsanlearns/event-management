import { prisma } from "../../shared/lib/prisma.lib.js";

import * as CouponRepository from "./coupon.repository.js";

export const getByUserId = async (userId: string) => {
  const vouchers = await CouponRepository.getCouponByUserId({
    db: prisma,
    userId,
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
