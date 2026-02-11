import multer from "multer";

import path from "node:path";
import fs from "node:fs";
import { AppError } from "../utils/app-error.util.js";

const publicDir = path.join(process.cwd(), "public");

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

/* ================================
   CLOUDINARY UPLOAD (PROFILE)
================================ */
export const uploadCloud = multer({
  storage: multer.memoryStorage(), // 🔥 WAJIB
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new AppError(400, "Invalid file type"));
    }

    cb(null, true);
  },
});

/* ================================
   LOCAL UPLOAD (OPTIONAL)
================================ */
// kalau masih mau simpan ke public
export const uploadLocal = multer({
  storage: multer.diskStorage({
    destination: "public",
    filename: (_req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      cb(null, `${Date.now()}-${Math.random()}.${ext}`);
    },
  }),
});
