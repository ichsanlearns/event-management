import { prisma } from "../lib/prisma.lib.js";
import { AppError } from "../utils/app-error.util.js";
import { cloudinary } from "../lib/cloudinary.lib.js";

/* ================================
   CLOUDINARY BUFFER UPLOAD
================================ */
export const uploadToCloudinary = (
  buffer: Buffer,
  folder = "uploads",
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            return reject(new AppError(500, "Cloudinary upload failed"));
          }
          resolve(result.secure_url);
        },
      )
      .end(buffer); // 🔥 THIS is serverless-safe
  });
};

/* ================================
   SINGLE IMAGE UPLOAD SERVICE
================================ */
export async function uploadSingleService(
  file: Express.Multer.File,
  folder = "uploads",
) {
  if (!file) {
    throw new AppError(400, "No file provided");
  }

  // upload buffer to cloudinary
  const secureUrl = await uploadToCloudinary(file.buffer, folder);

  // store to DB
  const imageResult = await prisma.image.create({
    data: {
      url: secureUrl,
    },
  });

  return imageResult.url;
}
