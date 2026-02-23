import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { organizerOnly } from "../middleware/role.middleware";

import {
  listApprovals,
  approval,
  reject,
  getByStatus,
} from "../controllers/approval.controller";

const router = Router();

router.get("/orders/pending", authMiddleware, organizerOnly, listApprovals);
router.get(
  "/orders/status/:status",
  authMiddleware,
  organizerOnly,
  getByStatus,
);

router.patch("/orders/:id/approve", authMiddleware, organizerOnly, approval);

router.patch("/orders/:id/reject", authMiddleware, organizerOnly, reject);

export default router;
