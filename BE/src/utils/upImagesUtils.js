import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImageToCloudinary = async (image) => {
  try {
    const uploadOptions = { folder: "datn" };

    const result = await cloudinary.uploader.upload(image.url, uploadOptions);
    return result.secure_url;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
