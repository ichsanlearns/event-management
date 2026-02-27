// import multer from "multer";

// import path from "node:path";
// import fs from "node:fs";
// import { AppError } from "../utils/app-error.util.js";

// // const publicDir = path.join(process.cwd(), "public");
// const tmpDir = path.join("/tmp", "uploads");

// if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

// /* ================================
//    CLOUDINARY UPLOAD (PROFILE)
// ================================ */
// export const uploadCloud = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
//   fileFilter: (_req, file, cb) => {
//     const allowed = ["image/jpeg", "image/png", "image/webp"];

//     if (!allowed.includes(file.mimetype)) {
//       return cb(new AppError(400, "Invalid file type"));
//     }

//     cb(null, true);
//   },
// });

// /* ================================
//    LOCAL UPLOAD (OPTIONAL)
// ================================ */
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
//     cb(null, tmpDir);
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

/* ------------------------------------ x ----------------------------------- */

import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { AppError } from "../utils/app-error.util.js";

const tmpDir = path.join("/tmp", "uploads");

// Ensure the tmp directory exists
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

/* ================================
   CLOUDINARY UPLOAD (PROFILE)
   → Memory storage for direct upload
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
   TEMP FILE UPLOAD (GENERAL PURPOSE)
   → Disk storage in /tmp for serverless
================================ */
const tmpStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, tmpDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random()}${ext}`);
  },
});

export const uploadTmp = multer({
  storage: tmpStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new AppError(400, "File must be an image"));
    }
    cb(null, true);
  },
});

/* ================================
   PROFILE UPLOAD
   → Disk storage in /tmp with smaller size
================================ */
const profileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, tmpDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${Date.now()}${ext}`);
  },
});

export const uploadProfile = multer({
  storage: profileStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new AppError(400, "File must be an image"));
    }
    cb(null, true);
  },
});
