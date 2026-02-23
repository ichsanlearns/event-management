import express from "express";

import {
  createEvent,
  getAllEvent,
  getEventById,
  getEventByOrganizerId,
  deleteEvent,
  updateEvent,
  getSearchEvent,
} from "../controllers/event.controller";

import { getEventAttendees } from "../controllers/event.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { organizerOnly } from "../middleware/role.middleware";

const router = express.Router();

/* PUBLIC */
router.get("/", getAllEvent);
router.get("/search", getSearchEvent);
router.get("/:id", getEventById);

/* ORGANIZER ONLY */

router.post("/", createEvent);
router.patch("/:id", authMiddleware, organizerOnly, updateEvent);

router.get("/organizer/:organizerId", getEventByOrganizerId);

router.delete("/:id", deleteEvent);
router.patch("/:id", updateEvent);

router.get(
  "/:eventId/attendees",
  authMiddleware,
  organizerOnly,
  getEventAttendees,
);

export default router;
