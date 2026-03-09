import { type Request, type Response } from "express";
import { prisma } from "../../shared/lib/prisma.lib.js";
import { comparePassword, hashPassword } from "../../shared/utils/hash.util.js";
import { uploadToCloudinary } from "../../shared/services/image.service.js";
import { catchAsync } from "../../shared/utils/catch-async.util.js";
import {
  changePassword,
  getById,
  getUser,
  updateImage,
  updateProfile,
} from "./user.service.js";

import { getPointAndCoupon } from "./user.service.js";
import { AppError } from "@/shared/utils/app-error.util.js";

export const getUserPointAndCoupon = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.id as string;

    const { points, coupons } = await getPointAndCoupon({ userId });

    return res.json({
      total_point: points.reduce((sum, p) => sum + p.amount, 0),
      points,
      coupons,
    });
  },
);

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const user = await getUser({ userId });

  res.json(user);
});

export const uploadProfileImage = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "File tidak ditemukan" });
    }

    const userId = req.user!.id;

    const imageUrl = await uploadToCloudinary(req.file.buffer, "profile");

    await updateImage({ userId, imageUrl });

    res.json({
      message: "Upload berhasil",
      profile_image: imageUrl,
    });
  },
);

export const updateUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { name, email, oldPassword, newPassword, confirmPassword } = req.body;

    const updatedUser = await updateProfile({
      userId,
      name,
      email,
      oldPassword,
      newPassword,
      confirmPassword,
    });

    res.json({
      message: "Profile berhasil diperbarui",
      user: updatedUser,
    });
  },
);

export async function changeUserPassword(req: Request, res: Response) {
  const userId = req.user!.id;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  await await changePassword({
    userId,
    oldPassword,
    newPassword,
    confirmPassword,
    change: true,
  });

  res.status(200).json({ message: "Password berhasil diubah" });
}

export const getOrgById = catchAsync(async (req: Request, res: Response) => {
  const orgId = req.params.id as string;

  const org = await getById(orgId);

  res.status(200).json({
    message: "Get org by id success",
    data: org,
  });
});
