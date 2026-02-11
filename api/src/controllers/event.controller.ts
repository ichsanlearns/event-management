import { type Request, type Response } from "express";

import { create, getAll, getById } from "../services/event.service.js";

import { redis } from "../lib/redis.lib.js";

export async function createEvent(req: Request, res: Response) {
  const data = req.body;

  const result = await create(data);

  res.status(200).json({ message: "Event has been created", data: result });
}

export async function getAllEvent(req: Request, res: Response) {
  const query = typeof req.query.search === "string" ? req.query.search : "";
  const limit = req.query.limit ? Number(req.query.limit) : 4;

  const cacheKey = `events:${limit}`;

  const cachedEvents = await redis.get(cacheKey);

  if (!query && cachedEvents) {
    return res.status(200).json({
      message: "Event fetch from cached",
      data: JSON.parse(cachedEvents),
    });
  }

  const events = await getAll(limit, query);
  await redis.set(cacheKey, JSON.stringify(events), "EX", 60 * 5);

  res.status(200).json({
    message: "Event berhasil diambil",
    data: events,
    length: events.length,
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
