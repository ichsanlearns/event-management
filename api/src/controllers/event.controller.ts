import { type Request, type Response } from "express";

import * as eventService from "../services/event.service.js";

export async function getAll(req: Request, res: Response) {
  const query =
    typeof req.query.search === "string" ? req.query.search : undefined;

  const limit = req.query.limit ? Number(req.query.limit) : 4;

  const events = await eventService.getAll(limit, query);
  res.status(200).json({ message: "Event berhasil diambil", data: events });
}

export async function getById(req: Request, res: Response) {
  const id = req.params.id;

  if (!id || typeof id !== "string") {
    res.status(400).json({ message: "Tolong masukkan ID event" });
    return;
  }

  const event = await eventService.getById(id);

  if (!event) {
    res.status(404).json({ message: "Event tidak ditemukan" });
    return;
  }

  res.status(200).json({ message: "Event berhasil diambil", data: event });
}
