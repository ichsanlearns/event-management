import { type Request, type Response, type NextFunction } from "express";
import { Role } from "../generated/prisma/enums.js";

export function organizerOnly(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== Role.EVENT_ORGANIZER) {
    return res.status(403).json({
      message: "Akses ditolak. Organizer only",
    });
  }

  next();
}

export function customerOnly(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== Role.CUSTOMER) {
    return res.status(403).json({
      message: "Akses ditolak. Customer only",
    });
  }

  next();
}
