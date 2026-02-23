import type { Response, Request } from "express";
import { catchAsync } from "../utils/catch-async.util";
import { getByUserId } from "../services/coupon.service";
import { AppError } from "../utils/app-error.util";

export const getCouponByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(401, "Unauthorized");
    }

    const coupon = await getByUserId(userId);

    if (coupon.length === 0) {
      throw new AppError(404, "Coupon not found");
    }

    res.status(200).json({
      message: "Coupon retrieved successfully",
      data: coupon,
    });
  },
);
