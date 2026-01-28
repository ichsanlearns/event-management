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
