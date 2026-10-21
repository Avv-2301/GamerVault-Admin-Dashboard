import api from "../axios";
import { ENDPOINTS } from "../apiRoutes/endPoints";

/**
 * Get all notifications
 * @param {object} filters - Optional filters for notifications
 * @returns {Promise<Array>} Array of notifications
 */
export const getNotifications = async (filters = {}) => {
  let result = [];
  try {
    const response = await api.get(ENDPOINTS.GETNOTIFICATIONS, {
      params: filters,
    });

    if (response?.data?.meta?.code !== 200) {
      const errorMessage =
        response?.data?.meta?.message || "Failed to get notifications";
      throw new Error(errorMessage);
    }

    result = response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
    result = [];
  } finally {
    return result;
  }
};

/**
 * Mark a notification as read
 * @param {string|number} notificationId - The notification ID
 * @returns {Promise<boolean>} Success status
 */
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.patch(
      ENDPOINTS.MARKNOTIFICATIONREAD(notificationId)
    );

    if (response?.data?.meta?.code !== 200) {
      const errorMessage =
        response?.data?.meta?.message || "Failed to mark notification as read";
      throw new Error(errorMessage);
    }

    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
};

/**
 * Mark all notifications as read
 * @returns {Promise<boolean>} Success status
 */
export const markAllNotificationsAsRead = async () => {
  try {
    const response = await api.patch(ENDPOINTS.MARKALLNOTIFICATIONSREAD);

    if (response?.data?.meta?.code !== 200) {
      const errorMessage =
        response?.data?.meta?.message ||
        "Failed to mark all notifications as read";
      throw new Error(errorMessage);
    }

    return true;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return false;
  }
};

/**
 * Delete a notification
 * @param {string|number} notificationId - The notification ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteNotification = async (notificationId) => {
  try {
    const response = await api.delete(
      ENDPOINTS.DELETENOTIFICATION(notificationId)
    );

    if (response?.data?.meta?.code !== 200) {
      const errorMessage =
        response?.data?.meta?.message || "Failed to delete notification";
      throw new Error(errorMessage);
    }

    return true;
  } catch (error) {
    console.error("Error deleting notification:", error);
    return false;
  }
};
