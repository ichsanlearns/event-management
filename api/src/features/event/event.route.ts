import express from "express";

import {
  createEvent,
  getAllEvent,
  getEventById,
  getEventByOrganizerId,
  deleteEvent,
  updateEvent,
  getSearchEvent,
} from "./event.controller.js";

import { getEventAttendees } from "./event.controller.js";

import { uploadCloud } from "../../shared/middleware/upload.middleware.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { organizerOnly } from "../../shared/middleware/role.middleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getAllEvent);
router.get("/search", getSearchEvent);
router.get("/:id", getEventById);

/* ORGANIZER ONLY */

router.post(
  "/",
  authMiddleware,
  organizerOnly,
  uploadCloud.single("heroImage"),
  createEvent,
);

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
