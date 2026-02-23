import multer from "multer";
import { AppError } from "../utils/app-error.util.js";

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];

  if (!allowed.includes(file.mimetype)) {
    return cb(
      new AppError(400, "Invalid file type. Only JPG, PNG, WEBP allowed."),
    );
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 }, // ⚠️ must be below Vercel limit
  fileFilter,
});
