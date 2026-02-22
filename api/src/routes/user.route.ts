import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getUserPointAndCoupon,
  updateProfile,
  getMe,
  changePassword,
  uploadProfileImage,
  getOrgById,
} from "../controllers/user.controller.js";
import { uploadCloud } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.get("/rewards", authMiddleware, getUserPointAndCoupon);
router.put(
  "/profile/image",
  authMiddleware,
  uploadCloud.single("image"),
  uploadProfileImage,
);
router.get("/organizer/:id", getOrgById);

export default router;
