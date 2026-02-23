import { type Request, type Response } from "express";
import { create, get } from "../services/payment.service.js";
import { uploadSingleService } from "../services/image.service.js";

import { runMulter } from "../middleware/multer.promise.js";
import { AppError } from "../utils/app-error.util.js";

export async function createPayment(req: Request, res: Response) {
  try {
    await runMulter("proofImage", req, res);

    if (!req.file) {
      throw new AppError(400, "Payment proof image is required");
    }

    const file = req.file as Express.Multer.File;
    const { orderId, amount, method, status } = req.body;

    const proofImage = await uploadSingleService(file, "payments");

    const payment = await create(orderId, amount, method, status, proofImage);

    res.status(201).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
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
