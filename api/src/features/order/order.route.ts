import { Router } from "express";

import {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getOrderById,
  getOrderRevenueByWeek,
  getOrdersByUserId,
  patchCouponByOrderId,
} from "./order.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import {
  organizerOnly,
  customerOnly,
} from "../../shared/middleware/role.middleware.js";

const router = Router();

router.post("/", authMiddleware, customerOnly, createOrder);
router.get("/", authMiddleware, organizerOnly, getAllOrders);
router.get("/:organizerId/revenue", getOrderRevenueByWeek);
router.get("/:id", authMiddleware, getOrderById);
router.get(
  "/customer/:userid",
  authMiddleware,
  customerOnly,
  getOrdersByUserId,
);
router.patch("/:id/coupon", patchCouponByOrderId);
router.delete("/:id", deleteOrderById);

export default router;
