import api from "../axios";
import { ENDPOINTS } from "../apiRoutes/endPoints";
import { showError, showLoading, showSuccess } from "../toast";
import toast from "react-hot-toast";

export const createGame = async (payload) => {
  const loadingToastId = showLoading("Creating Game...");
  let result = [];
  try {
    const response = await api.post(ENDPOINTS.CREATEGAME, payload);

    if (response?.data?.meta?.code !== 201) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Game Creation failed";
      showError(errorMessage);
      throw new Error(errorMessage);
    }

    result = response?.data;
    toast.dismiss(loadingToastId);
    showSuccess(response?.data?.meta?.message || "Game created successfully!");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.meta?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred while creating game";
    showError(errorMessage);
    throw error;
  } finally {
    return result;
  }
};

export const getAllGames = async (filters = {}) => {
  const loadingToastId = showLoading("Geting All Games");
  let result = [];
  try {
    const response = await api.get(ENDPOINTS.GETALLGAME, {
      params: filters,
    });

    if (response?.data?.meta?.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Getting Games Failed";
      showError(errorMessage);
      throw new Error(errorMessage);
    }

    result = response?.data;
    toast.dismiss(loadingToastId);
    showSuccess("Games fetched SuccessFully");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.meta?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred while creating game";
    showError(errorMessage);
  } finally {
    return result;
  }
};

export const getGameById = async (gameId) => {
  try {
    const response = await api.get(ENDPOINTS.GETGAMEBYID(gameId));
    if (response?.data?.meta?.code !== 200) {
      throw new Error(response?.data?.meta?.message || "Failed to get game details");
    }
    return response.data;
  } catch (error) {
    showError(
      error?.response?.data?.meta?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to get game details"
    );
    throw error;
  }
};

export const getGameBySlug = async (slug) => {
  try {
    const response = await api.get(ENDPOINTS.GETGAMEBYSLUG(slug));
    if (response?.data?.meta?.code !== 200) {
      throw new Error(response?.data?.meta?.message || "Failed to get game details");
    }
    return response.data;
  } catch (error) {
    showError(
      error?.response?.data?.meta?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to get game details"
    );
    throw error;
  }
};

export const updateGame = async (gameId, payload) => {
  try {
    const response = await api.put(ENDPOINTS.UPDATEGAMEBYID(gameId), payload);
    if (response?.data?.meta?.code !== 200) {
      throw new Error(response?.data?.meta?.message || "Failed to update game");
    }
    showSuccess(response?.data?.meta?.message || "Game updated successfully");
    return response.data;
  } catch (error) {
    showError(
      error?.response?.data?.meta?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update game"
    );
    throw error;
  }
};

export const deleteGame = async (gameId, password) => {
  try {
    const response = await api.delete(ENDPOINTS.DELETEGAMEBYID(gameId), {
      data: { password },
    });
    if (response?.data?.meta?.code !== 200) {
      throw new Error(response?.data?.meta?.message || "Failed to delete game");
    }
    showSuccess(response?.data?.meta?.message || "Game deleted successfully");
    return response.data;
  } catch (error) {
    showError(
      error?.response?.data?.meta?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete game"
    );
    throw error;
  }
};

export const changeGameVisibility = async (gameId, isActive) => {
  const loadingToastId = showLoading("Changing Visibility...");
  let result = [];
  try {
    const response = await api.put(ENDPOINTS.UPDATEGAMEVISIBILITY(gameId), {
      isActive: isActive,
    });

    if (response?.data?.meta?.code !== 200) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        response?.data?.meta?.message || "Failed to Change Game Visibility";
      showError(errorMessage);
      throw new Error(errorMessage);
    }
    result = response?.data;
    toast.dismiss(loadingToastId);
    showSuccess("Game Visibility Changed");
  } catch (error) {
    toast.dismiss(loadingToastId);
    const errorMessage =
      error?.response?.data?.meta?.message ||
      error?.response?.data?.message ||
      "An error occurred while changing game visibility";
    showError(errorMessage);
  } finally {
    return result;
  }
};
