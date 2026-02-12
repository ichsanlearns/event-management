import type { Request, Response } from "express";
import { create, getByEventId } from "../services/review.service.js";
import { catchAsync } from "../utils/catch-async.util.js";

export const createReview = catchAsync(async (req: Request, res: Response) => {
  const { userId, eventId, orderId, comment, rating } = req.body;

  const review = await create({
    userId,
    eventId,
    orderId,
    comment,
    rating,
  });

  res.status(201).json(review);
});

export const getReviewByEventId = catchAsync(
  async (req: Request, res: Response) => {
    const { eventId } = req.params as { eventId: string };

    const review = await getByEventId(eventId);

    res.status(200).json(review);
  },
);
