import type { Request, Response } from "express";
import { approveOrder, getApprovalQueue, rejectOrder } from "../services/approval.service.js";

export async function listApprovals(req: Request, res: Response) {
  try {
    const organizerId = req.user?.id;
    if (!organizerId) return res.status(401).json({ error: "Unauthorized" });

    const data = await getApprovalQueue(organizerId);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function approval(req: Request, res: Response) {
  try {
    const organizerId = req.user?.id;
    const orderId = req.params.id;

    if (!organizerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({ error: "Invalid order id" });
    }

    const result = await approveOrder(orderId, organizerId);

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function reject(req: Request, res: Response) {
  try {
    const organizerId = req.user?.id;
    const orderId = req.params.id;

    if (!organizerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({ error: "Invalid order id" });
    }

    const result = await rejectOrder(orderId, organizerId);

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
