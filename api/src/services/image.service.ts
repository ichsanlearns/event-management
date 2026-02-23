import { cloudinary } from "../lib/cloudinary.lib.js";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder = "profile",
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [
            { width: 300, height: 300, crop: "fill", gravity: "face" },
          ],
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        },
      )
      .end(buffer);
  });
};
