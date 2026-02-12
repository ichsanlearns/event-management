import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.get("/customer/:userid", getOrderByUserId);

export default router;
