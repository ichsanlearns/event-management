import { AppError } from "../../shared/utils/app-error.util.js";
import { prisma } from "../../shared/lib/prisma.lib.js";
import { comparePassword, hashPassword } from "../../shared/utils/hash.util.js";

import * as PointRepository from "../../shared/repositories/point.repository.js";
import * as CouponRepository from "../../features/coupon/coupon.repository.js";
import * as UserRepository from "./user.repository.js";

export const getPointAndCoupon = async ({ userId }: { userId: string }) => {
  const points = await PointRepository.get({ db: prisma, userId });

  const coupons = await CouponRepository.getCouponByUserId({
    db: prisma,
    userId,
  });

  return { points, coupons };
};

export const getUser = async ({ userId }: { userId: string }) => {
  const user = await UserRepository.getById({ db: prisma, userId });

  if (!user) {
    throw new AppError(404, "User tidak ditemukan");
  }

  return user;
};

export const updateImage = async ({
  userId,
  imageUrl,
}: {
  userId: string;
  imageUrl: string;
}) => {
  return await UserRepository.updateImage({ db: prisma, userId, imageUrl });
};

export const changePassword = async ({
  userId,
  oldPassword,
  newPassword,
  confirmPassword,
  change,
}: {
  userId: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  change: boolean;
}) => {
  if (newPassword !== confirmPassword) {
    throw new AppError(400, "Confirm password wrong");
  }

  const user = await UserRepository.isExist({ db: prisma, userId });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isMatch = await comparePassword(oldPassword, user.password);

  if (!isMatch) {
    throw new AppError(400, "Password does not match");
  }

  const hashedPassword = await hashPassword(newPassword);

  if (change) {
    return UserRepository.updatePassword({
      db: prisma,
      userId,
      password: hashedPassword,
    });
  }

  return hashedPassword;
};

export const updateProfile = async ({
  userId,
  name,
  email,
  oldPassword,
  newPassword,
  confirmPassword,
}: {
  userId: string;
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const dataToUpdate: any = {
    name,
    email,
  };

  dataToUpdate.password = await changePassword({
    userId,
    oldPassword,
    newPassword,
    confirmPassword,
    change: false,
  });

  return await UserRepository.updateProfile({
    db: prisma,
    userId,
    dataToUpdate,
  });
};

export async function getById(orgId: string) {
  const org = await UserRepository.getOrgById({
    db: prisma,
    orgId,
    role: "EVENT_ORGANIZER",
  });

  const mapped = {
    name: org?.name,
    email: org?.email,
    profileImage: org?.profile_image,
    events: org?.Events.map((event) => {
      return {
        id: event.id,
        name: event.name,
        price: event.price,
        tagline: event.tagline,
        category: event.category,
        venue: event.venue,
        city: event.city,
        heroImage: event.hero_image,
        about: event.about,
        startDate: event.start_date,
        review: event.GotReviewed.map((review) => {
          return {
            id: review.id,
            comment: review.comment,
            rating: review.rating,
            createdAt: review.created_at,
            customer: {
              name: review.Customer.name,
              profileImage: review.Customer.profile_image,
            },
          };
        }),
      };
    }),
  };

  return mapped;
}
