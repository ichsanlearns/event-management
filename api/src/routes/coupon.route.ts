import { Router } from "express";
import { getCouponByUserId } from "../controllers/coupon.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/:userId", authMiddleware, getCouponByUserId);

export default router;
