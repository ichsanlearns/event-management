import { Router } from "express";
import { createReview, getReviewByEventId } from "./review.controller.js";

const router = Router();

router.post("/", createReview);
router.get("/event/:eventId", getReviewByEventId);

export default router;
