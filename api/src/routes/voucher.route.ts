import { Router } from "express";
import {
  createVoucher,
  getVoucher,
  getVoucherById,
} from "../controllers/voucher.controller.js";

const router = Router();

router.get("/", getVoucher);
router.post("/", createVoucher);
router.post("/check", getVoucherById);

export default router;
