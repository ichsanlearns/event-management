import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { organizerOnly } from "../middleware/role.middleware.js";

import { listApprovals, approval, reject, getByStatus } from "../controllers/approval.controller.js";

const router = Router();

/* Organizer approval menu */

router.get("/orders/pending", authMiddleware, organizerOnly, listApprovals);
router.get("/orders/status/:status", organizerOnly, getByStatus);

router.patch("/orders/:id/approve", authMiddleware, organizerOnly, approval);

router.patch("/orders/:id/reject", authMiddleware, organizerOnly, reject);

export default router;
