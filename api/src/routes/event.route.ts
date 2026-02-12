import express from "express";

import {
  createEvent,
  getAllEvent,
  getEventById,
  getEventByOrganizerId,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvent);
router.get("/:id", getEventById);
router.get("/organizer/:organizerId", getEventByOrganizerId);

export default router;
