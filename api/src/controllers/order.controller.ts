import { type Request, type Response } from "express";
import { create, getAll, getById } from "../services/order.service.js";

export async function createOrder(req: Request, res: Response) {
  try {
    const {
      orderCode,
      customerId,
      ticketId,
      quantity,
      status,
      usingPoint,
      total,
    } = req.body;

    console.info(req.body);

    const order = await create(
      orderCode,
      customerId,
      ticketId,
      quantity,
      status,
      usingPoint,
      total,
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const order = await getById(req.params.id as string);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to get order" });
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await getAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to get orders" });
  }
}
