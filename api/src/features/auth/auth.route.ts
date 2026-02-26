import express from "express";

import {
  login,
  register,
  me,
  forgotPassword,
  resetPassword,
} from "./auth.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.get("/me", authMiddleware, me);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

export default router;
