import express from "express";

import { createEvent, getAllEvent, getEventById } from "../controllers/event.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { organizerOnly } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvent);
router.get("/:id", getEventById);

// router.post("/", authMiddleware, organizerOnly, (req, res) => {
//   res.json({
//     message: "Event berhasil dibuat (dummy)",
//     user: req.user,
//   });
// });

export default router;
