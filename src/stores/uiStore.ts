import { create } from 'zustand';

// UI state interface
interface UIState {
  // Sidebar state
  isSidebarOpen: boolean;
  
  // Loading states
  globalLoading: boolean;
  loadingMessage: string | null;

  // Notification/Toast state (optional, for future use)
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>;

  // Actions
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setGlobalLoading: (loading: boolean, message?: string) => void;
  addNotification: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// Create UI store
export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isSidebarOpen: false,
  globalLoading: false,
  loadingMessage: null,
  notifications: [],

  // Sidebar actions
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),

  // Loading actions
  setGlobalLoading: (loading: boolean, message?: string) =>
    set({
      globalLoading: loading,
      loadingMessage: message || null,
    }),

  // Notification actions
  addNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      useUIStore.getState().removeNotification(id);
    }, 5000);

    return id;
  },

  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));

