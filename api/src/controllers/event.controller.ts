import { type Request, type Response } from "express";

import { create, getAll, getById } from "../services/event.service.js";

import { redis } from "../lib/redis.lib.js";
import { createEventSchema } from "../validators/event.validator.js";

export async function createEvent(req: Request, res: Response) {
  const validatedData = createEventSchema.parse({
    ...req.body,
  });

  const result = await create(validatedData);

  const keys = await redis.keys("events:*");
  if (keys.length > 0) {
    await redis.del(keys);
  }

  res.status(200).json({ message: "Event has been created", data: result });
}

export async function getAllEvent(req: Request, res: Response) {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 4;
  const query = typeof req.query.search === "string" ? req.query.search : "";

  const result = await getAll(page, limit, query);

  res.status(200).json({
    message: "Event berhasil diambil",
    data: result.data,
    meta: result.meta,
  });
}

export async function getEventById(req: Request, res: Response) {
  const id = req.params.id;

  if (!id || typeof id !== "string") {
    res.status(400).json({ message: "Tolong masukkan ID event" });
    return;
  }

  const event = await getById(id);

  if (!event) {
    res.status(404).json({ message: "Event tidak ditemukan" });
    return;
  }

  res.status(200).json({ message: "Event berhasil diambil", data: event });
}
