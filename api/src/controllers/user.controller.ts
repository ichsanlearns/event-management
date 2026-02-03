import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.lib.js";

export const getUserPointAndCoupon = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const points = await prisma.point.findMany({
      where: {
        user_id: userId,
        expired_at: {
          gt: new Date(),
        },
      },
    });

    const coupons = await prisma.coupon.findMany({
      where: {
        user_id: userId,
        expired_at: {
          gt: new Date(),
        },
      },
    });

    return res.json({
      total_point: points.reduce((sum, p) => sum + p.amount, 0),
      points,
      coupons,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get rewards",
    });
  }
};

export async function getMe(req: Request, res: Response) {
  const userId = req.user!.id;

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
    return res.status(404).json({ message: "User tidak ditemukan" });
  }

  res.json(user);
}

export async function updateProfile(req: Request, res: Response) {
  const userId = req.user!.id;
  const { name, email } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      referral_code: true,
    },
  });

  res.json({
    message: "Profile berhasil diperbarui",
    user: updatedUser,
  });
}
