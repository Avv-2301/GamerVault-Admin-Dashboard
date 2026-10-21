import { showError, showLoading, showSuccess } from "../toast";
import api from "../axios";
import { ENDPOINTS } from "../apiRoutes/endPoints";
import toast from "react-hot-toast";

export const addBalanceToUser = async (
  userId,
  amount,
  confirmAmount,
  password,
  reason
) => {
  const loadingToastId = showLoading("Adding Balance");
  let result = [];
  try {
    const response = await api.post(ENDPOINTS.ADDWALLETBALNCE(userId), {
      amount,
      confirmAmount,
      password,
      reason,
    });

    if (response?.data?.meta?.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Failed to add amount";
      showError(errorMessage);
      throw new Error(errorMessage);
    }
    result = response?.data;
    toast.dismiss(loadingToastId);
    showSuccess("Amount Added in User Wallet");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred during adding amount";
    showError(errorMessage);
  } finally {
    return result;
  }
};

export const deductBalanceToUser = async (
  userId,
  amount,
  confirmAmount,
  password,
  reason
) => {
  const loadingToastId = showLoading("Deducting Balance");
  let result = [];
  try {
    const response = await api.post(ENDPOINTS.DEDUCTWALLETBALANCE(userId), {
      amount,
      confirmAmount,
      password,
      reason,
    });

    if (response?.data?.meta?.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Failed to deduct amount";
      showError(errorMessage);
      throw new Error(errorMessage);
    }
    result = response?.data;
    toast.dismiss(loadingToastId);
    showSuccess("Amount deudcted from User Wallet");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred during deducting amount";
    showError(errorMessage);
  } finally {
    return result;
  }
};

export const transactions = async (filters = {}) => {
  const loadingToastId = showLoading("Getting Transactions");
  let result = [];
  try {
    const response = await api.get(ENDPOINTS.GETALLTRANSACTIONS, {
      params: filters,
    });

    if (response.data.meta.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Failed to get transactions";
      showError(errorMessage);
      throw new Error(errorMessage);
    }
    result = response?.data;
    toast.dismiss(loadingToastId);
    showSuccess("Transaction found successfully");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred during getting transactions";
    showError(errorMessage);
  } finally {
    return result;
  }
};
