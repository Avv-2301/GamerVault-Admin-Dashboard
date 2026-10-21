import { showError, showLoading, showSuccess } from "../toast";
import api from "../axios";
import { ENDPOINTS } from "../apiRoutes/endPoints";
import toast from "react-hot-toast";

export const getAllUsers = async (filters = {}) => {
  const loadingToastId = showLoading("Getting All Users...");
  let result = [];
  try {
    const response = await api.get(ENDPOINTS.GETUSERS, {
      params: filters,
    });

    if (response?.data?.meta?.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Getting Users Failed";
      showError(errorMessage);
      throw new Error(errorMessage);
    }

    result = response?.data;
    toast.dismiss(loadingToastId);
    showSuccess("Users Fetched");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred during getting users";
    showError(errorMessage);
  } finally {
    return result;
  }
};

export const getUserById = async (userId) => {
  const loadingToastId = showLoading("Getting User...");
  let result = [];
  try {
    const response = await api.get(ENDPOINTS.GETUSERSBYID(userId));
    if (response?.data?.meta?.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Getting User Failed";
      showError(errorMessage);
      throw new Error(errorMessage);
    }
    result = response?.data;
    toast.dismiss(loadingToastId);
    showSuccess("User Fetched");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred during getting user";
    showError(errorMessage);
  } finally {
    return result;
  }
};

export const getUserGames = async (userId) => {
  try {
    const response = await api.get(ENDPOINTS.GETUSERGAMES(userId));
    return response?.data;
  } catch (error) {
    showError(error?.response?.data?.meta?.message || error?.message || "Could not load owned games");
    return null;
  }
};

export const getUserWallet = async (userId) => {
  try {
    const response = await api.get(ENDPOINTS.GETUSERWALLET(userId));
    return response?.data;
  } catch (error) {
    showError(error?.response?.data?.meta?.message || error?.message || "Could not load wallet details");
    return null;
  }
};

export const getUserLoginHistory = async (userId) => {
  try {
    const response = await api.get(ENDPOINTS.LOGINHISTORY(userId));
    return response?.data;
  } catch (error) {
    showError(error?.response?.data?.meta?.message || error?.message || "Could not load login activity");
    return null;
  }
};

export const forceLogoutUser = async (userId) => {
  try {
    const response = await api.post(ENDPOINTS.FORCELOGOUTUSER(userId));
    if (response?.data?.meta?.code === 200) showSuccess("All user sessions have been logged out");
    else showError(response?.data?.meta?.message || "Could not log out user sessions");
    return response?.data;
  } catch (error) {
    showError(error?.response?.data?.meta?.message || error?.message || "Could not log out user sessions");
    return null;
  }
};

export const userTransaction = async (userId, filters = {}) => {
  const loadingToastId = showLoading("Getting Transactions");
  let result = null;
  try {
    const response = await api.get(ENDPOINTS.GETUSERTRANSACTION(userId), {
      params: filters,
    });
    if (response?.data?.meta?.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Getting User Transaction Failed";
      showError(errorMessage);
      throw new Error(errorMessage);
    }
    result = response?.data;
    toast.dismiss(loadingToastId);
    showSuccess("User Transaction Found");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred during getting user";
    showError(errorMessage);
  } finally {
    return result;
  }
};

export const resetUserPassword = async (userId, newPassword, adminPassword) => {
  const loadingToastId = showLoading("Changing User Password...");
  try {
    const response = await api.put(ENDPOINTS.RESETUSERPASSWORD(userId), {
      newPassword,
      adminPassword,
    });
    if (response?.data?.meta?.code !== 200) {
      const message = response?.data?.meta?.message || "Password change failed";
      showError(message);
      return null;
    }
    showSuccess("User password changed successfully");
    return response.data;
  } catch (error) {
    showError(
      error?.response?.data?.meta?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while changing the user password"
    );
    return null;
  } finally {
    toast.dismiss(loadingToastId);
  }
};
