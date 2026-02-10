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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, publicDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${Date.now()}${ext}`);
  },
});

export const uploadProfile = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("File harus berupa gambar"));
    }
    cb(null, true);
  },
});
