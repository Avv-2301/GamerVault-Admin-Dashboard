import toast from 'react-hot-toast';

/**
 * Notification helper functions for displaying toast notifications
 * Uses react-hot-toast for consistent UI feedback
 */

/**
 * Show success notification
 * @param message - Success message to display
 * @param duration - Duration in milliseconds (default: 3000)
 */
export const showSuccess = (message: string, duration: number = 3000): void => {
  toast.success(message, {
    duration,
    position: 'top-right',
    style: {
      background: '#10b981',
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10b981',
    },
  });
};

/**
 * Show error/failed notification
 * @param message - Error message to display
 * @param duration - Duration in milliseconds (default: 4000)
 */
export const showError = (message: string, duration: number = 4000): void => {
  toast.error(message, {
    duration,
    position: 'top-right',
    style: {
      background: '#ef4444',
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#ef4444',
    },
  });
};

/**
 * Show warning notification
 * @param message - Warning message to display
 * @param duration - Duration in milliseconds (default: 3500)
 */
export const showWarning = (message: string, duration: number = 3500): void => {
  toast(message, {
    duration,
    position: 'top-right',
    icon: '⚠️',
    style: {
      background: '#f59e0b',
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#f59e0b',
    },
  });
};

/**
 * Show info notification
 * @param message - Info message to display
 * @param duration - Duration in milliseconds (default: 3000)
 */
export const showInfo = (message: string, duration: number = 3000): void => {
  toast(message, {
    duration,
    position: 'top-right',
    icon: 'ℹ️',
    style: {
      background: '#3b82f6',
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#3b82f6',
    },
  });
};

/**
 * Show loading notification (returns toast ID to dismiss)
 * @param message - Loading message to display
 * @returns Toast ID that can be used with toast.dismiss(id) or toast.success/error(id, message)
 */
export const showLoading = (message: string = 'Loading...'): string => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#6b7280',
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
    },
  });
};

/**
 * Dismiss all notifications
 */
export const dismissAll = (): void => {
  toast.dismiss();
};

