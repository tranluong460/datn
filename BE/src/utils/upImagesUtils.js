import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "project-alone",
  api_key: "733913983795291",
  api_secret: "1M3Rwo_-yZGdR4wwtlTS7pXr3rw",
});

export const uploadImageToCloudinary = async (image) => {
  try {
    const uploadOptions = { folder: "datn" };

    const result = await cloudinary.uploader.upload(image.url, uploadOptions);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    throw error;
  }
};
