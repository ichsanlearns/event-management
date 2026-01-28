import express from "express";

import * as eventController from "../controllers/event.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { organizerOnly } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", eventController.getAll);
router.get("/:id", eventController.getById);

router.post("/", authMiddleware, organizerOnly, (req, res) => {
  res.json({
    message: "Event berhasil dibuat (dummy)",
    user: req.user,
  });
});

export default router;
