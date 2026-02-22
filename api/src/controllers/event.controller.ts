import { type Request, type Response } from "express";

import {
  create,
  getAll,
  getById,
  getByOrganizerId,
  getSearch,
  remove,
  updateById,
} from "../services/event.service.js";

import { getAttendeesByEvent } from "../services/attendee.service.js";

import { redis } from "../lib/redis.lib.js";
import { createEventSchema } from "../validators/event.validator.js";
import { uploadSingleService } from "../services/image.service.js";
import { catchAsync } from "../utils/catch-async.util.js";

export const createEvent = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;

  const validatedData = createEventSchema.parse({
    ...req.body,
  });

  const heroImage = await uploadSingleService(file);

  const result = await create({ ...validatedData, heroImage });

  const keys = await redis.keys("events:*");
  if (keys.length > 0) {
    await redis.del(keys);
  }

  res.status(200).json({ message: "Event has been created", data: result });
});

export const getAllEvent = catchAsync(async (req: Request, res: Response) => {
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
});

export const getSearchEvent = catchAsync(
  async (req: Request, res: Response) => {
    const query = typeof req.query.search === "string" ? req.query.search : "";
    const category =
      typeof req.query.category === "string" ? req.query.category : "";
    const location =
      typeof req.query.location === "string" ? req.query.location : "";

    const events = await getSearch({ query, category, location });

    res.status(200).json({
      message: "Event berhasil diambil",
      data: events,
      length: events.length,
    });
  },
);

export const getEventById = catchAsync(async (req: Request, res: Response) => {
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
});

export const getEventByOrganizerId = catchAsync(
  async (req: Request, res: Response) => {
    const organizerIdParam = req.params.organizerId;
    const organizerId = Array.isArray(organizerIdParam)
      ? organizerIdParam[0]
      : organizerIdParam;

    if (!organizerId) {
      return res.status(400).json({
        message: "Organizer ID is required",
      });
    }

    const search =
      typeof req.query.search === "string"
        ? req.query.search.toLowerCase()
        : "";

    const events = await getByOrganizerId(organizerId);

    const filtered = search
      ? events.filter(
          (e: any) =>
            e.name.toLowerCase().includes(search) ||
            e.city?.toLowerCase().includes(search) ||
            e.venue?.toLowerCase().includes(search),
        )
      : events;

    res.status(200).json({
      message: "Events fetched by organizer",
      data: filtered,
      length: filtered.length,
    });
  },
);

export const updateEvent = catchAsync(async (req: Request, res: Response) => {
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
});

export const deleteEvent = catchAsync(async (req: Request, res: Response) => {
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
});

export async function getEventAttendees(req: Request, res: Response) {
  const eventIdParam = req.params.eventId;
  const eventId = Array.isArray(eventIdParam) ? eventIdParam[0] : eventIdParam;

  if (!eventId || typeof eventId !== "string") {
    return res.status(400).json({ message: "Event ID is required" });
  }

  const data = await getAttendeesByEvent(eventId);

  res.json({
    message: "Attendee list",
    totalAttendees: data.length,
    data,
  });
}
