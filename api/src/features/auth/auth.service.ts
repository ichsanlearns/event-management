import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../shared/lib/prisma.lib.js";
import { Role } from "../../generated/prisma/enums.js";

import * as UserRepository from "../user/user.repository.js";
import * as PointRepository from "../../shared/repositories/point.repository.js";
import * as CouponRepository from "../../features/coupon/coupon.repository.js";

export async function createUser(
  name: string,
  email: string,
  hashedPassword: string,
  role: Role,
  referralCode: string,
  referredBy?: string,
) {
  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // Create user
    const newUser = await UserRepository.create({
      db: tx,
      name,
      email,
      hashedPassword,
      role,
      referralCode,
    });

    // Jika pakai referral
    if (referredBy) {
      const referrer = await UserRepository.findByReferralCode({
        db: tx,
        referralCode: referredBy,
      });

      if (!referrer) {
        throw new Error("Referral code tidak valid");
      }

      if (referrer.id === newUser.id) {
        throw new Error("Tidak bisa menggunakan referral sendiri");
      }

      if (referrer) {
        const expiredAt = new Date();
        expiredAt.setMonth(expiredAt.getMonth() + 3);

        // POINT UNTUK REFERRER
        await PointRepository.update({
          db: tx,
          userId: referrer.id,
          amount: 10000,
          expiredAt,
        });

        // COUPON UNTUK USER BARU
        await CouponRepository.create({
          db: tx,
          userId: newUser.id,
          referrerId: referrer.id,
          amount: 10000,
          expiredAt,
        });
      }
    }

    return newUser;
  });
}

export async function findByEmail(email: string) {
  return await UserRepository.findByEmail({ db: prisma, email });
}

export async function findByReferral(referralCode: string) {
  return await UserRepository.findByReferralCode({ db: prisma, referralCode });
}
