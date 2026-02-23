import { type Request, type Response } from "express";
import { create, get } from "../services/payment.service.js";
import { uploadToCloudinary } from "../services/image.service.js";
import { AppError } from "../utils/app-error.util.js";

export async function createPayment(req: Request, res: Response) {
  try {
    const file = req.file?.buffer;
    const { orderId, amount, method, status } = req.body;

    if (!file) {
      throw new AppError(400, "File cant be found");
    }

    const proofImage = await uploadToCloudinary(file, "proofImage");

    const payment = await create(orderId, amount, method, status, proofImage);

    res.status(201).json({ message: "Payment created successfully", payment });
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
