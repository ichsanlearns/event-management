import { Router } from "express";
import {
  createPayment,
  getPayments,
} from "../controllers/payment.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", getPayments);
router.post("/", upload.single("singleImage"), createPayment);

export default router;
