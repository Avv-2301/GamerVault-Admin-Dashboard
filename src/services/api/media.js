import api from "../axios";
import { ENDPOINTS } from "../apiRoutes/endPoints";

export const uploadImageToCloudinary = async (file, folder) => {
  if (!(file instanceof File)) throw new Error("Choose an image file to upload.");
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Choose a JPEG, PNG, or WebP image.");
  }
  if (file.size > 25 * 1024 * 1024) {
    throw new Error("The selected image must be 25 MB or smaller.");
  }

  const formData = new FormData();
  formData.append("image", file, file.name);
  formData.append("folder", folder);

  const response = await api.post(ENDPOINTS.UPLOADIMAGE, formData, {
    timeout: 60_000,
  });
  if (Number(response?.data?.meta?.code) !== 200) {
    throw new Error(response?.data?.meta?.message || "Image upload failed.");
  }
  const url = response.data?.data?.url;
  if (!url) throw new Error("The image URL was not returned by the server.");
  return url;
};
