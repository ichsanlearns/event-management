import type { Role } from "../../generated/prisma/enums.js";
import type { dB } from "../../shared/types/db.type.js";

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

export const isExist = async ({ db, userId }: { db: dB; userId: string }) => {
  return await db.user.findUnique({
    where: { id: userId },
  });
};

export const getById = async ({ db, userId }: { db: dB; userId: string }) => {
  return await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      referral_code: true,
      Points: true,
    },
  });
};

export const getOrgById = async ({
  db,
  orgId,
  role,
}: {
  db: dB;
  orgId: string;
  role: Role;
}) => {
  return await db.user.findFirst({
    where: { id: orgId, role },
    select: {
      name: true,
      email: true,
      profile_image: true,
      Events: {
        select: {
          id: true,
          name: true,
          price: true,
          tagline: true,
          category: true,
          venue: true,
          city: true,
          hero_image: true,
          about: true,
          start_date: true,
          GotReviewed: {
            select: {
              id: true,
              comment: true,
              rating: true,
              created_at: true,
              Customer: { select: { name: true, profile_image: true } },
            },
          },
        },
      },
    },
  });
};

export const findByEmail = async ({ db, email }: { db: dB; email: string }) => {
  return await db.user.findUnique({
    where: { email },
  });
};

export const updateProfile = async ({
  db,
  userId,
  dataToUpdate,
}: {
  db: dB;
  userId: string;
  dataToUpdate: { name: string; email: string; password: string };
}) => {
  await db.user.update({
    where: { id: userId },
    data: dataToUpdate,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      referral_code: true,
    },
  });
};

export const updateImage = async ({
  db,
  userId,
  imageUrl,
}: {
  db: dB;
  userId: string;
  imageUrl: string;
}) => {
  return await db.user.update({
    where: { id: userId },
    data: { profile_image: imageUrl },
  });
};

export const updatePassword = async ({
  db,
  userId,
  password,
}: {
  db: dB;
  userId: string;
  password: string;
}) => {
  return await db.user.update({
    where: { id: userId },
    data: { password },
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
