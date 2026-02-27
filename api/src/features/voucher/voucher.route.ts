import { Router } from "express";
import {
  createVoucher,
  getVoucher,
  getVoucherByCode,
} from "./voucher.controller.js";

const router = Router();

router.get("/", getVoucher);
router.post("/", createVoucher);
router.patch("/check", getVoucherByCode);

export default router;
