import { Router } from "express";
import { createOrder, getAllOrders, getOrderById, getOrdersByUserId } from "../controllers/order.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { organizerOnly, customerOnly } from "../middleware/role.middleware.js";

const router = Router();

/* CUSTOMER ONLY */
router.post("/", authMiddleware, customerOnly, createOrder);

router.get("/customer/:userid", authMiddleware, customerOnly, getOrdersByUserId);

/* ORGANIZER ONLY */
router.get("/", authMiddleware, organizerOnly, getAllOrders);

router.get("/:id", authMiddleware, getOrderById);

export default router;
