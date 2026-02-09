import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserPointAndCoupon, updateProfile, getMe, changePassword } from "../controllers/user.controller.js";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.get("/rewards", authMiddleware, getUserPointAndCoupon);

export default router;
