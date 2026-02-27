import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.util.js";

export function notFound(req: Request, res: Response, next: NextFunction) {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
}
