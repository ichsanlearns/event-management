import { type Request, type Response } from "express";
import { create, get, getById } from "../services/voucher.service.js";

export async function createVoucher(req: Request, res: Response) {
  try {
    const { eventId, code, discountAmount, quota, startDate, endDate } =
      req.body;

    const voucher = await create(
      eventId,
      code,
      discountAmount,
      quota,
      startDate,
      endDate,
    );

    res.status(200).json({ message: "Voucher successfully created", voucher });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create voucher" });
  }
}

export async function getVoucher(req: Request, res: Response) {
  try {
    const voucher = await get();

    res.status(200).json({ message: "Event voucher fetched", data: voucher });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to fetch data" });
  }
}

export async function getVoucherById(req: Request, res: Response) {
  try {
    const id = typeof req.body.id === "string" ? req.body.id : "";

    const voucher = await getById(id);

    if (!voucher) {
      return res.status(200).json({ message: "Voucher not found" });
    }

    res.status(200).json(voucher);
  } catch (error) {
    res.json(error);
  }
}
