import express from "express";

import {
  createEvent,
  getAllEvent,
  getEventById,
  getEventByOrganizerId,
  deleteEvent,
  updateEvent,
} from "../controllers/event.controller.js";

import { uploadLocal } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", uploadLocal.single("heroImage"), createEvent);
router.get("/", getAllEvent);
router.get("/:id", getEventById);
router.get("/organizer/:organizerId", getEventByOrganizerId);
router.delete("/:id", deleteEvent);
router.patch("/:id", updateEvent);

export default router;
