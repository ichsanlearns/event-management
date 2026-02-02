import { Router } from "express";
import { getVoucherById } from "../controllers/voucher.controller.js";

const router = Router();

router.get("/", getVoucherById);

export default router;
