import type { Request, Response } from "express";
import { upload } from "./multer.middleware";

export const runMulter = (
  fieldName: string,
  req: Request,
  res: Response,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
