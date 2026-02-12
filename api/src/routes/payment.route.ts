import { Router } from "express";
import {
  createPayment,
  getPayments,
} from "../controllers/payment.controller.js";
import { uploadLocal } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", getPayments);
router.post("/", uploadLocal.single("singleImage"), createPayment);

export default router;
