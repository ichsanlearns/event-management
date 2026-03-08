import type { Role } from "@/generated/prisma/enums.js";
import type { dB } from "@/shared/types/db.type.js";

export const create = async ({
  db,
  name,
  email,
  hashedPassword,
  role,
  referralCode,
}: {
  db: dB;
  name: string;
  email: string;
  hashedPassword: string;
  role: Role;
  referralCode: string;
}) => {
  return await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      referral_code: referralCode,
    },
  });
};

export const getById = async ({ db, userId }: { db: dB; userId: string }) => {
  return await db.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true },
  });
};

export const findByEmail = async ({ db, email }: { db: dB; email: string }) => {
  return await db.user.findUnique({
    where: { email },
  });
};

export const findByReferralCode = async ({
  db,
  referralCode,
}: {
  db: dB;
  referralCode: string;
}) => {
  return await db.user.findUnique({
    where: { referral_code: referralCode },
  });
};
