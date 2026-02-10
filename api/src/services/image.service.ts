import { uploadSingleUtil } from "../utils/upload.util.js";
import { prisma } from "../lib/prisma.lib.js";
import { AppError } from "../utils/app-error.util.js";

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
