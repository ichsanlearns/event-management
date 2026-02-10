import multer from "multer";

import path from "node:path";
import fs from "node:fs";
import { AppError } from "../utils/app-error.util.js";

const publicDir = path.join(process.cwd(), "public");

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, publicDir);
    },

    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}-${Math.random() * 1e9}${ext}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new AppError(400, "Invalid file type"));
    }

    cb(null, true);
  },

  limits: { fileSize: 5 * 1024 * 1024, files: 5 },
});
