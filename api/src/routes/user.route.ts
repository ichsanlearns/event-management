import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserPointAndCoupon, updateProfile, getMe } from "../controllers/user.controller.js";

const router = Router();

router.get("/rewards", authMiddleware, getUserPointAndCoupon);
router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateProfile);

export default router;
