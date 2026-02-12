import { cloudinary } from "../lib/cloudinary.lib.js";
import fs from "node:fs/promises";
import { AppError } from "./app-error.util.js";

async function uploadToCloudinary(filePath: string) {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);

    return uploadResult;
  } catch (error) {
    throw new AppError(400, "Failed to upload image to Cloudinary");
  } finally {
    console.log("uploaddone");

    await fs.unlink(filePath);
  }
}

export async function uploadSingleUtil(filePath: string) {
  const singleResult = await uploadToCloudinary(filePath);
  return singleResult;
}
