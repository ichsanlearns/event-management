import { uploadSingleUtil } from "../utils/upload.util.js";
import { prisma } from "../lib/prisma.lib.js";
import { AppError } from "../utils/app-error.util.js";
import { cloudinary } from "../lib/cloudinary.lib.js";

export async function uploadSingleService(file: Express.Multer.File) {
  if (!file) {
    throw new AppError(400, "No file provided");
  }

  const uploadResult = await uploadSingleUtil(file.path);

  const imageResult = await prisma.image.create({
    data: { url: uploadResult.secure_url },
  });

  return imageResult.url;
}

export const uploadToCloudinary = (buffer: Buffer, folder = "profile"): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [{ width: 300, height: 300, crop: "fill", gravity: "face" }],
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        },
      )
      .end(buffer);
  });
};
