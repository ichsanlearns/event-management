import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { organizerOnly } from "../../shared/middleware/role.middleware.js";

import {
  listApprovals,
  approval,
  reject,
  getByStatus,
} from "./approval.controller.js";

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
