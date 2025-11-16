import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setAuthToken, clearAuth, type ApiError } from '../services/api';
import { apiPost } from '../services/api';
import { API_CONFIG } from '../services/config';

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  [key: string]: any;
}

// Auth state interface
interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearError: () => void;
  checkAuth: () => void;
}

// Create auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiPost<any>(
            API_CONFIG.endpoints.auth.login,
            { email, password }
          );

          // Handle different response structures
          // Option 1: response.data.data (wrapped in ApiResponse)
          // Option 2: response.data (direct response)
          // Option 3: response.data.data with token/user at root
          const responseData = response.data as any;
          let token: string | undefined;
          let user: User | undefined;

          // Try different response structures
          if (responseData.meta?.token) {
            // Token from meta: { meta: { token }, data: { user } }
            token = responseData.meta.token;
            user = responseData.data?.user || responseData.data || responseData.user;
          } else if (responseData.data) {
            // Wrapped response: { data: { token, user }, success, message }
            token = responseData.data.token;
            user = responseData.data.user || responseData.data;
          } else if (responseData.token) {
            // Direct response: { token, user, ... }
            token = responseData.token;
            user = responseData.user || responseData;
          } else if (typeof responseData === 'object') {
            // Try to extract from root level
            token = responseData.token;
            user = responseData.user || responseData;
          }

          if (token && user) {
            // Set token in API service
            setAuthToken(token);

            // Update state
            set({
              user: user as User,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error('Invalid response from server: missing token or user data');
          }
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoading: false,
            error: apiError.message || 'Login failed. Please try again.',
            isAuthenticated: false,
          });
          throw error; // Re-throw to allow component to handle
        }
      },

      // Logout action
      logout: async () => {
        const { user } = get();
        
        try {
          // Ensure user is available before making the request
          if (user?._id) {
            // Call backend logout endpoint with userId (token will be added by interceptor)
            await apiPost(API_CONFIG.endpoints.auth.logout, {
              userId: user._id,
            });
          }
        } catch (error) {
          // Even if logout fails on backend, clear local state
          console.error('Logout error:', error);
        } finally {
          // Clear API auth
          clearAuth();

          // Clear state
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      // Set user manually
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      // Set token manually
      setToken: (token: string | null) => {
        setAuthToken(token);
        set({ token, isAuthenticated: !!token });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Check authentication status
      checkAuth: () => {
        const { token, user } = get();
        const isAuthenticated = !!(token && user);
        set({ isAuthenticated });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

