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
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
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
// export const uploadLocal = multer({
//   storage: multer.diskStorage({
//     destination: "public",
//     filename: (_req, file, cb) => {
//       const ext = file.originalname.split(".").pop();
//       cb(null, `${Date.now()}-${Math.random()}.${ext}`);
//     },
//   }),
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, publicDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `profile-${Date.now()}${ext}`);
//   },
// });

// export const uploadProfile = multer({
//   storage,
//   limits: {
//     fileSize: 2 * 1024 * 1024, // 2MB
//   },
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith("image/")) {
//       cb(new Error("File harus berupa gambar"));
//     }
//     cb(null, true);
//   },
// });
