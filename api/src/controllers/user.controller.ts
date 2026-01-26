import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.lib.js";

export const getUserPointAndCoupon = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;

    const points = await prisma.point.findMany({
      where: { user_id: userId },
    });

    const coupons = await prisma.coupon.findMany({
      where: { user_id: userId },
    });

    return res.json({
      points,
      coupons,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get rewards",
    });
  }
};
