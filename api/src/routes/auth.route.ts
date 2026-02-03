import express from "express";

import { login, register, me } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.get("/me", authMiddleware, me);

export default router;
