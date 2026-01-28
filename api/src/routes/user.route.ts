import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserPointAndCoupon } from "../controllers/user.controller.js";

const router = Router();

router.get("/rewards", authMiddleware, getUserPointAndCoupon);

export default router;
