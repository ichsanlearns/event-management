// src/routes/user.routes.ts
import { Router } from "express";
import { getUserPointAndCoupon } from "../controllers/user.controller.js";

const router = Router();

router.get("/:userId/rewards", getUserPointAndCoupon);

export default router;
