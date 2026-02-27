import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import {
  getUserPointAndCoupon,
  updateProfile,
  getMe,
  changePassword,
  uploadProfileImage,
  getOrgById,
} from "./user.controller.js";
import { uploadCloud } from "../../shared/middleware/upload.middleware.js";

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
