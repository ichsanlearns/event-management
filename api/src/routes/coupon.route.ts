import { Router } from "express";
import { getCouponByUserId } from "../controllers/coupon.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:userId", authMiddleware, getCouponByUserId);

export default router;
