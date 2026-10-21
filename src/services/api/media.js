import api from "../axios";
import { ENDPOINTS } from "../apiRoutes/endPoints";
import { compressImageToBlob } from "../helper";

export const uploadImageToCloudinary = async (file, folder, options) => {
  const compressedImage = await compressImageToBlob(file, options);
  const formData = new FormData();
  formData.append("image", compressedImage, "image.webp");
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
