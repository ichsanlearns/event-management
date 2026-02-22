import express from "express";

import {
  createEvent,
  getAllEvent,
  getEventById,
  getEventByOrganizerId,
  deleteEvent,
  updateEvent,
  getSearchEvent,
} from "../controllers/event.controller.js";

import { getEventAttendees } from "../controllers/event.controller.js";

import { uploadLocal } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", uploadLocal.single("heroImage"), createEvent);
router.get("/", getAllEvent);
router.get("/:id", getEventById);
router.get("/organizer/:organizerId", getEventByOrganizerId);
router.delete("/:id", deleteEvent);
router.patch("/:id", updateEvent);
router.get("/:eventId/attendees", getEventAttendees);
router.get("/search", getSearchEvent);

export default router;
