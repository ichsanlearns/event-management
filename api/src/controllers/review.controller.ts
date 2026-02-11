import type { Request, Response, NextFunction } from "express";
import { create } from "../services/review.service.js";

export async function createReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId, eventId, orderId, comment, rating } = req.body;

    const review = await create({ userId, eventId, orderId, comment, rating });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
}
