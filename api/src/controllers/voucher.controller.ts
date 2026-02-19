import { type NextFunction, type Request, type Response } from "express";
import { create, get, getByCode } from "../services/voucher.service.js";

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

export async function getVoucherByCode(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const code = typeof req.body.code === "string" ? req.body.code : "";
    const eventId =
      typeof req.body.eventId === "string" ? req.body.eventId : "";

    const voucher = await getByCode({ code, eventId });

    if (!voucher) {
      return res.status(200).json({ message: "Voucher not found" });
    }

    res
      .status(200)
      .json({ message: "Successfully used voucher", data: voucher });
  } catch (error) {
    next(error);
  }
}
