import { type Request, type Response } from "express";

import { create, getAll, getById, getByOrganizerId, remove, updateById } from "../services/event.service.js";

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
  const query = typeof req.query.search === "string" ? req.query.search : "";
  const limit = req.query.limit ? Number(req.query.limit) : 4;

  const cacheKey = `events:${limit}`;

  const cachedEvents = await redis.get(cacheKey);

  if (!query && cachedEvents) {
    const cachedEventsData = JSON.parse(cachedEvents);

    return res.status(200).json({
      message: "Event fetch from cached",
      data: cachedEventsData,
      length: cachedEventsData.length,
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

export async function getEventByOrganizerId(req: Request, res: Response) {
  const organizerIdParam = req.params.organizerId;
  const organizerId = Array.isArray(organizerIdParam) ? organizerIdParam[0] : organizerIdParam;

  if (!organizerId) {
    return res.status(400).json({
      message: "Organizer ID is required",
    });
  }

  const cacheKey = `events:organizer:${organizerId}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    const data = JSON.parse(cached);
    return res.status(200).json({
      message: "Events fetched from cache",
      data,
      length: data.length,
    });
  }

  const events = await getByOrganizerId(organizerId);

  await redis.set(cacheKey, JSON.stringify(events), "EX", 60 * 5);

  res.status(200).json({
    message: "Events fetched by organizer",
    data: events,
    length: events.length,
  });
}

export async function updateEvent(req: Request, res: Response) {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  if (!id) {
    return res.status(400).json({ message: "ID event diperlukan" });
  }

  const validatedData = createEventSchema.partial().parse(req.body);

  const result = await updateById(id, validatedData);

  const keys = await redis.keys("events:organizer:*");
  if (keys.length > 0) {
    await redis.del(keys);
  }

  res.status(200).json({
    message: "Event updated",
    data: result,
  });
}

export async function deleteEvent(req: Request, res: Response) {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  if (!id) {
    res.status(400).json({ message: "ID event diperlukan" });
    return;
  }

  await remove(id);

  const keys = await redis.keys("events:*");
  if (keys.length > 0) {
    await redis.del(keys);
  }

  res.status(200).json({ message: "Event berhasil dihapus" });
}
