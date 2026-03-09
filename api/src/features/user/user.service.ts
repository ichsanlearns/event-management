import { AppError } from "@/shared/utils/app-error.util.js";
import { prisma } from "../../shared/lib/prisma.lib.js";
import { comparePassword, hashPassword } from "@/shared/utils/hash.util.js";

export const getPointAndCoupon = async ({ userId }: { userId: string }) => {
  const points = await prisma.point.findMany({
    where: {
      user_id: userId,
      expired_at: {
        gt: new Date(),
      },
    },
    orderBy: { expired_at: "asc" },
  });

  const coupons = await prisma.coupon.findMany({
    where: {
      user_id: userId,
      expired_at: {
        gt: new Date(),
      },
    },
    orderBy: { expired_at: "asc" },
  });

  return { points, coupons };
};

export const getUser = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.findUnique({
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
  return await prisma.user.update({
    where: { id: userId },
    data: { profile_image: imageUrl },
  });
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

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isMatch = await comparePassword(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(400, "Password does not match");
  }

  const hashedPassword = await hashPassword(newPassword);

  if (change) {
    return await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
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

  return await prisma.user.update({
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

export async function getById(orgId: string) {
  const org = await prisma.user.findFirst({
    where: { id: orgId, role: "EVENT_ORGANIZER" },
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
