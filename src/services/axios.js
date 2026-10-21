import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const axiosInstance  = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || '',
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    const responseCode = Number(response.data?.meta?.code);
    if ([401, 403].includes(responseCode)) {
      redirectToLogin();
    }
    return response;
  },
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

function redirectToLogin() {
  useAuthStore.getState().logout();
  if (window.location.pathname !== "/") {
    window.location.assign("/");
  }
}

export default axiosInstance;
