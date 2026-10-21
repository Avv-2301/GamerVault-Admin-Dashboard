import api from "../axios";
import { ENDPOINTS } from "../apiRoutes/endPoints";
import { showError, showLoading, showSuccess } from "../toast";
import { getMessage } from "../helper";
import toast from "react-hot-toast";

const BANNER_REQUEST_TIMEOUT = 60_000;

export const getAllBanners = async () => {
  const loadingToastId = showLoading("Getting banners...");
  try {
    const response = await api.get(ENDPOINTS.GETALLBANNERS, { timeout: BANNER_REQUEST_TIMEOUT });
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || "Failed to load banners");
    showSuccess("Banners fetched successfully");
    return response.data?.data?.banners || [];
  } catch (error) {
    showError(getMessage(error, "Failed to load banners"));
    throw error;
  } finally {
    toast.dismiss(loadingToastId);
  }
};

export const getBannerById = async (bannerId) => {
  try {
    const response = await api.get(ENDPOINTS.GETBANNERBYID(bannerId), { timeout: BANNER_REQUEST_TIMEOUT });
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || "Failed to load banner");
    return response.data?.data;
  } catch (error) {
    showError(getMessage(error, "Failed to load banner"));
    throw error;
  }
};

export const createBanner = async (payload) => {
  try {
    const response = await api.post(ENDPOINTS.CREATEBANNER, payload, { timeout: BANNER_REQUEST_TIMEOUT });
    if (Number(response?.data?.meta?.code) !== 201) throw new Error(response?.data?.meta?.message || "Failed to create banner");
    showSuccess(response?.data?.meta?.message || "Banner created successfully");
    return response.data?.data;
  } catch (error) {
    showError(getMessage(error, "Failed to create banner"));
    throw error;
  }
};

export const updateBanner = async (bannerId, payload) => {
  try {
    const response = await api.put(ENDPOINTS.UPDATEBANNER(bannerId), payload, { timeout: BANNER_REQUEST_TIMEOUT });
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || "Failed to update banner");
    showSuccess(response?.data?.meta?.message || "Banner updated successfully");
    return response.data?.data;
  } catch (error) {
    showError(getMessage(error, "Failed to update banner"));
    throw error;
  }
};

export const deleteBanner = async (bannerId, password) => {
  try {
    const response = await api.delete(ENDPOINTS.DELETEBANNER(bannerId), { data: { password } });
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || "Failed to delete banner");
    showSuccess(response?.data?.meta?.message || "Banner deleted successfully");
    return response.data?.data;
  } catch (error) {
    showError(getMessage(error, "Failed to delete banner"));
    throw error;
  }
};

export const pauseBanner = async (bannerId, password) => {
  try {
    const response = await api.put(ENDPOINTS.PAUSEBANNER(bannerId), { password });
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || "Failed to pause banner");
    showSuccess(response?.data?.meta?.message || "Banner paused successfully");
    return response.data?.data;
  } catch (error) {
    showError(getMessage(error, "Failed to pause banner"));
    throw error;
  }
};

export const resumeBanner = async (bannerId, password) => {
  try {
    const response = await api.put(ENDPOINTS.RESUMEBANNER(bannerId), { password });
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || "Failed to resume banner");
    showSuccess(response?.data?.meta?.message || "Banner status updated successfully");
    return response.data?.data;
  } catch (error) {
    showError(getMessage(error, "Failed to resume banner"));
    throw error;
  }
};
