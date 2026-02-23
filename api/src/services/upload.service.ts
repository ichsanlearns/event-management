import { cloudinary } from "../lib/cloudinary.lib.js";
import streamifier from "streamifier";
import { AppError } from "../utils/app-error.util.js";

export const uploadSingleService = (
  file: Express.Multer.File,
): Promise<string> => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new AppError(500, "Cloudinary environment variables missing");
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "events",
      },
      (err, result) => {
        if (err || !result) return reject(err);
        resolve(result.secure_url);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
