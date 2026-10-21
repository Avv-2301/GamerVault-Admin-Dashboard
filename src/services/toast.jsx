import toast from "react-hot-toast";
import { FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaSpinner, FaTimes } from "react-icons/fa";

// Custom toast component styles
const toastStyles = {
  success: {
    container: "bg-white dark:bg-[#141b2d] border-l-4 border-[#10b981] shadow-lg shadow-[#10b981]/20",
    iconBg: "bg-[#10b981]/10",
    icon: "text-[#10b981]",
    text: "text-gray-900 dark:text-white",
  },
  error: {
    container: "bg-white dark:bg-[#141b2d] border-l-4 border-[#ef4444] shadow-lg shadow-[#ef4444]/20",
    iconBg: "bg-[#ef4444]/10",
    icon: "text-[#ef4444]",
    text: "text-gray-900 dark:text-white",
  },
  warning: {
    container: "bg-white dark:bg-[#141b2d] border-l-4 border-[#f59e0b] shadow-lg shadow-[#f59e0b]/20",
    iconBg: "bg-[#f59e0b]/10",
    icon: "text-[#f59e0b]",
    text: "text-gray-900 dark:text-white",
  },
  info: {
    container: "bg-white dark:bg-[#141b2d] border-l-4 border-[#3b82f6] shadow-lg shadow-[#3b82f6]/20",
    iconBg: "bg-[#3b82f6]/10",
    icon: "text-[#3b82f6]",
    text: "text-gray-900 dark:text-white",
  },
  loading: {
    container: "bg-white dark:bg-[#141b2d] border-l-4 border-[#6366f1] shadow-lg shadow-[#6366f1]/20",
    iconBg: "bg-[#6366f1]/10",
    icon: "text-[#6366f1]",
    text: "text-gray-900 dark:text-white",
  },
};

const clearCurrentToasts = () => toast.remove();

// Custom toast component
const CustomToast = ({ type, message, icon: Icon, onClose }) => {
  const styles = toastStyles[type] || toastStyles.info;
  
  return (
    <div className={`${styles.container} rounded-lg border border-gray-200 dark:border-[#1e2742] min-w-[320px] max-w-md backdrop-blur-sm`}>
      <div className="flex items-start gap-4 p-4">
        <div className={`${styles.iconBg} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}>
          {Icon}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className={`${styles.text} text-sm font-medium leading-relaxed`}>
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-gray-400 dark:text-[#8b8fa3] hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors mt-0.5"
            aria-label="Close"
          >
            <FaTimes className="text-xs" />
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Display an error toast notification
 * @param {string} message - The error message to display
 * @param {object} options - Additional toast options
 */
export const showError = (message, options = {}) => {
  clearCurrentToasts();
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } transform transition-all duration-300 ease-in-out`}
      >
        <CustomToast
          type="error"
          message={message}
          icon={<FaExclamationCircle className="text-[#ef4444] text-lg" />}
          onClose={() => toast.dismiss(t.id)}
        />
      </div>
    ),
    {
      duration: 5000,
      position: "top-right",
      ...options,
    }
  );
};

/**
 * Display a warning toast notification
 * @param {string} message - The warning message to display
 * @param {object} options - Additional toast options
 */
export const showWarning = (message, options = {}) => {
  clearCurrentToasts();
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } transform transition-all duration-300 ease-in-out`}
      >
        <CustomToast
          type="warning"
          message={message}
          icon={<FaExclamationTriangle className="text-[#f59e0b] text-lg" />}
          onClose={() => toast.dismiss(t.id)}
        />
      </div>
    ),
    {
      duration: 5000,
      position: "top-right",
      ...options,
    }
  );
};

/**
 * Display an info toast notification
 * @param {string} message - The info message to display
 * @param {object} options - Additional toast options
 */
export const showInfo = (message, options = {}) => {
  clearCurrentToasts();
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } transform transition-all duration-300 ease-in-out`}
      >
        <CustomToast
          type="info"
          message={message}
          icon={<FaInfoCircle className="text-[#3b82f6] text-lg" />}
          onClose={() => toast.dismiss(t.id)}
        />
      </div>
    ),
    {
      duration: 5000,
      position: "top-right",
      ...options,
    }
  );
};

/**
 * Display a success toast notification
 * @param {string} message - The success message to display
 * @param {object} options - Additional toast options
 */
export const showSuccess = (message, options = {}) => {
  clearCurrentToasts();
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } transform transition-all duration-300 ease-in-out`}
      >
        <CustomToast
          type="success"
          message={message}
          icon={<FaCheckCircle className="text-[#10b981] text-lg" />}
          onClose={() => toast.dismiss(t.id)}
        />
      </div>
    ),
    {
      duration: 5000,
      position: "top-right",
      ...options,
    }
  );
};

/**
 * Display a loading toast notification
 * @param {string} message - The loading message to display
 * @param {object} options - Additional toast options
 * @returns {string} Toast ID that can be used to dismiss or update the toast
 */
export const showLoading = (message, options = {}) => {
  clearCurrentToasts();
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } transform transition-all duration-300 ease-in-out`}
      >
        <CustomToast
          type="loading"
          message={message}
          icon={<FaSpinner className="text-[#6366f1] text-lg animate-spin" />}
          onClose={() => toast.dismiss(t.id)}
        />
      </div>
    ),
    {
      duration: Infinity, // Loading toasts don't auto-dismiss
      position: "top-right",
      ...options,
    }
  );
};
