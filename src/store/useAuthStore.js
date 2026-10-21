import { create } from "zustand";

// Keep only non-sensitive session state in memory. The JWT lives in an HttpOnly cookie.
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingSession: true,

  login: (user) =>
    set({ user, isAuthenticated: true, isCheckingSession: false }),
  finishSessionCheck: () => set({ isCheckingSession: false }),
  logout: () =>
    set({ user: null, isAuthenticated: false, isCheckingSession: false }),
}));
