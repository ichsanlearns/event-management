import { type Request, type Response } from "express";
import { create, get } from "../services/payment.service.js";

export async function createPayment(req: Request, res: Response) {
  try {
    const { orderId, amount, method, status, proofImage, paidAt, confirmedAt } =
      req.body;
    const payment = await create(
      orderId,
      amount,
      method,
      status,
      proofImage,
      paidAt,
      confirmedAt,
    );
    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create payment" });
  }
}

export async function getPayments(req: Request, res: Response) {
  try {
    const payments = await get();
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get payments" });
  }
}
