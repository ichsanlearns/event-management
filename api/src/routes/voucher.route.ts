import { Router } from "express";
import {
  createVoucher,
  getVoucher,
  getVoucherByCode,
} from "../controllers/voucher.controller";

const router = Router();

router.get("/", getVoucher);
router.post("/", createVoucher);
router.patch("/check", getVoucherByCode);

export default router;
