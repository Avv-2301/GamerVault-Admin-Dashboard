import api from "../axios";
import { ENDPOINTS } from "../apiRoutes/endPoints";
import { showLoading, showSuccess, showError } from "../toast";
import toast from "react-hot-toast";

/**
 *  @description This api is to call login
 */
export const login = async (payload) => {
  const loadingToastId = showLoading("Signing in...");
  let result = [];
  try {
    const response = await api.post(ENDPOINTS.LOGIN, payload);

    if (response?.data?.meta?.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage = response?.data?.meta?.message || "Login Failed";
      showError(errorMessage);
      throw new Error(errorMessage);
    }

    result = response?.data;
    toast.dismiss(loadingToastId);
    showSuccess("Login successful!");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred during login";
    showError(errorMessage);
    throw error;
  } finally {
    return result;
  }
};

export const getAdminSession = async () => {
  try {
    const response = await api.get("/admin/session");
    return response?.data?.data || null;
  } catch {
    return null;
  }
};

/**
 * @description Log out the current admin session
 */
export const logout = async () => {
  try {
    const response = await api.post(ENDPOINTS.LOGOUT);

    if (response?.data?.meta?.code !== 200) {
      const errorMessage = response?.data?.meta?.message || "Logout failed";
      throw new Error(errorMessage);
    }

    showSuccess("Logged out successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.meta?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred while logging out";
    showError(errorMessage);
    throw error;
  }
};

/**
 * @description This api is to call user login history
 */
export const userLoginHistory = async (userId) => {
  const loadingToastId = showLoading("Fetching History...");
  let result = [];
  try {
    const response = await api.get(ENDPOINTS.LOGINHISTORY(userId));

    if (response?.data?.meta?.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Failed to get Login History";
      showError(errorMessage);
      throw new Error(errorMessage);
    }
    result = response?.data;
    toast.dismiss(loadingToastId);
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage = "An error occurred while getting login history.";
    showError(errorMessage);
  } finally {
    return result;
  }
};

/**
 * @description This function is used to call update password api
 */
export const changePassword = async (userId, payload) => {
  const loadingToastId = showLoading("Updating Password...");
  let result = [];
  try {
    const response = await api.put(ENDPOINTS.CHANGEPASSWORD(userId), payload);

    if (response?.data?.meta?.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Failed to Update Password";
      showError(errorMessage);
      throw new Error(errorMessage);
    }

    result = response?.data?.data || response?.data;
    toast.dismiss(loadingToastId);
    showSuccess("Password updated successfully!");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.meta?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred while updating password.";
    showError(errorMessage);
    throw error;
  } finally {
    return result;
  }
};
