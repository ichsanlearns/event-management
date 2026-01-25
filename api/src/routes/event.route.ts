import express from "express";

import * as eventController from "../controllers/event.controller.js";

const router = express.Router();

router.get("/", eventController.getAll);
router.get("/:id", eventController.getById);

export default router;