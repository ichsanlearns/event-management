import { Router } from "express";
import { createPayment, getPayments } from "../controllers/payment.controller.js";
import { uploadCloud } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", getPayments);
router.post("/", uploadCloud.single("singleImage"), createPayment);

export default router;
