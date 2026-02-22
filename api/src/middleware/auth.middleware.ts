import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app-error.util.js";
import type { JwtPayload } from "../types/jwt.type.js";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new AppError(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError(401, "Token expired"));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new AppError(401, "Invalid token"));
    }

    return next(new AppError(401, "Unauthorized"));
  }
}
