import { type Request, type Response } from "express";
import { getById } from "../services/voucher.service.js";

export async function getVoucherById(req: Request, res: Response) {
  try {
    const id = typeof req.body.id === "string" ? req.body.id : "";

    const voucher = await getById(id);

    if (!voucher) {
      return res.status(200).json({ message: "voucher tidak ada" });
    }

    res.status(200).json(voucher);
  } catch (error) {
    res.json(error);
  }
}
