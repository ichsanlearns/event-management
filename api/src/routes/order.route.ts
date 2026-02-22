import { Router } from "express";
import {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  patchCouponByOrderId,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.get("/customer/:userid", getOrdersByUserId);
router.patch("/:id/coupon", patchCouponByOrderId);
router.delete("/:id", deleteOrderById);

export default router;
