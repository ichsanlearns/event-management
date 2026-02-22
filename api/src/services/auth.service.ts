import { prisma } from "../lib/prisma.lib.js";
import { Role } from "../generated/prisma/enums.js";

export async function createUser(name: string, email: string, hashedPassword: string, role: Role, referralCode: string, referredBy?: string) {
  return prisma.$transaction(async (tx) => {
    // Create user baru
    const newUser = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        referral_code: referralCode,
      },
    });

    await tx.point.create({
      data: {
        user_id: newUser.id,
        amount: 0,
        expired_at: new Date(),
      },
    });

    // Jika pakai referral
    if (referredBy) {
      const referrer = await tx.user.findUnique({
        where: { referral_code: referredBy },
      });

      if (referrer) {
        //  Coupon untuk user baru
        await tx.coupon.create({
          data: {
            user_id: newUser.id,
            referrer_id: referrer.id,
            amount: 10000,
            expired_at: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          },
        });

        //  Point untuk referrer
        await tx.point.create({
          data: {
            user_id: referrer.id,
            amount: 10000,
            expired_at: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          },
        });
      }
    }

    return newUser;
  });
}

export async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findByReferral(referralCode: string) {
  return prisma.user.findUnique({
    where: { referral_code: referralCode },
  });
}
