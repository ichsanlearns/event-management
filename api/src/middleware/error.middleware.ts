import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.util.js";

export function error(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = 500;
  let message = "Internal server error. Good luck!";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  console.error(error);
  res.status(statusCode).json({ message });
}
