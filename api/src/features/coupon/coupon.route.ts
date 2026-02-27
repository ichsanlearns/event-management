import { Router } from "express";
import { getCouponByUserId } from "./coupon.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.get("/:userId", authMiddleware, getCouponByUserId);

export default router;
