import express from "express";

import { createEvent, getAllEvent, getEventById, getEventByOrganizerId, deleteEvent, updateEvent } from "../controllers/event.controller.js";

import { getEventAttendees } from "../controllers/event.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { organizerOnly } from "../middleware/role.middleware.js";

import { uploadLocal } from "../middleware/upload.middleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getAllEvent);
router.get("/:id", getEventById);

/* ORGANIZER ONLY */

router.post("/", authMiddleware, organizerOnly, uploadLocal.single("heroImage"), createEvent);
router.patch("/:id", authMiddleware, organizerOnly, updateEvent);
router.patch("/:id", authMiddleware, organizerOnly, updateEvent);

router.get("/organizer/:organizerId", getEventByOrganizerId);

router.get("/:eventId/attendees", authMiddleware, organizerOnly, getEventAttendees);

export default router;
