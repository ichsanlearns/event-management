import { Router } from "express";
import { createPayment, getPayments } from "../controllers/payment.controller";

const router = Router();

router.get("/", getPayments);
router.post("/", createPayment);

export default router;
