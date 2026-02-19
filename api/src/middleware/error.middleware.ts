import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.util.js";

import z, { ZodError } from "zod";

interface flattenedZodErrors {
  formErrors: string[];
  fieldErrors: Record<string, string[]>;
}

export function error(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = 500;
  let message = "Internal server error. Good luck!";

  if (error instanceof ZodError) {
    const flattened = z.flattenError(error) as flattenedZodErrors;

    const formattedError: Record<string, string> = {};

    for (const key in flattened.fieldErrors) {
      const messages = flattened.fieldErrors[key];

      formattedError[key] = messages![0]!;
    }

    return res
      .status(404)
      .json({ message: "Validation error", error: formattedError });
  }

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  console.error(error);
  res.status(statusCode).json({ message });
}
