/**
 * Centralized API Service with Axios Interceptors
 * 
 * This module provides a configured axios instance with:
 * - Automatic authentication token injection
 * - Centralized error handling
 * - Request/response logging (development only)
 * - Automatic token refresh and logout on 401
 * 
 * @example
 * // Basic usage
 * import api, { apiGet, apiPost } from '@/services/api';
 * import { API_CONFIG } from '@/services/config';
 * 
 * // GET request
 * const response = await apiGet<User[]>(API_CONFIG.endpoints.users.list);
 * const users = response.data.data;
 * 
 * // POST request
 * const response = await apiPost<User>(API_CONFIG.endpoints.users.create, userData);
 * const newUser = response.data.data;
 * 
 * // Error handling
 * try {
 *   await apiPost('/endpoint', data);
 * } catch (error) {
 *   const apiError = error as ApiError;
 *   console.error(apiError.message);
 * }
 * 
 * @module services/api
 */

import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// Get API base URL from environment variable or use default
// Gateway is at localhost:3000, no /api suffix needed
const getBaseURL = (): string => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
};

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor - Add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Add token to Authorization header if it exists
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle responses and errors
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    // If the API returns data in a nested structure, extract it
    // Adjust this based on your API response structure
    if (response.data && typeof response.data === 'object') {
      return response;
    }

    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('[API Error]', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }

    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear stored token
      clearAuth();

      // Logout from auth store (dynamic import to avoid circular dependency)
      import('../stores/authStore').then(async ({ useAuthStore }) => {
        await useAuthStore.getState().logout();
      });

      // Redirect to login page
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }

      return Promise.reject({
        message: 'Your session has expired. Please login again.',
        statusCode: 401,
      } as ApiError);
    }

    // Handle 403 Forbidden - No permission
    if (error.response?.status === 403) {
      return Promise.reject({
        message: error.response.data?.message || 'You do not have permission to perform this action.',
        statusCode: 403,
        errors: error.response.data?.errors,
      } as ApiError);
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      return Promise.reject({
        message: error.response.data?.message || 'The requested resource was not found.',
        statusCode: 404,
      } as ApiError);
    }

    // Handle 422 Validation Error
    if (error.response?.status === 422) {
      return Promise.reject({
        message: error.response.data?.message || 'Validation error occurred.',
        statusCode: 422,
        errors: error.response.data?.errors,
      } as ApiError);
    }

    // Handle 500 Server Error
    if (error.response?.status === 500) {
      return Promise.reject({
        message: error.response.data?.message || 'Internal server error. Please try again later.',
        statusCode: 500,
      } as ApiError);
    }

    // Handle Network Error (no response from server)
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        statusCode: 0,
      } as ApiError);
    }

    // Handle other errors
    return Promise.reject({
      message: error.response.data?.message || error.message || 'An unexpected error occurred.',
      statusCode: error.response.status,
      errors: error.response.data?.errors,
    } as ApiError);
  }
);

// Export the configured axios instance
export default api;

// Export helper functions for common HTTP methods
export const apiGet = <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> => {
  return api.get<ApiResponse<T>>(url, config);
};

export const apiPost = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiResponse<T>>> => {
  return api.post<ApiResponse<T>>(url, data, config);
};

export const apiPut = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiResponse<T>>> => {
  return api.put<ApiResponse<T>>(url, data, config);
};

export const apiPatch = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ApiResponse<T>>> => {
  return api.patch<ApiResponse<T>>(url, data, config);
};

export const apiDelete = <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> => {
  return api.delete<ApiResponse<T>>(url, config);
};

// Export function to set auth token manually (useful after login)
export const setAuthToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Export function to get auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Export function to clear auth (logout)
export const clearAuth = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

