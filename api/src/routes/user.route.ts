import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserPointAndCoupon, updateProfile, getMe, changePassword, updateProfileImage } from "../controllers/user.controller.js";
import { uploadProfile } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.get("/rewards", authMiddleware, getUserPointAndCoupon);
router.put("/profile/image", authMiddleware, uploadProfile.single("image"), updateProfileImage);

export default router;
