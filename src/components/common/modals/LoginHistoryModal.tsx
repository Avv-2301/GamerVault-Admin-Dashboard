import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaGlobe, FaClock, FaSpinner } from "react-icons/fa";
import { apiGet } from "../../../services/api";
import { API_CONFIG } from "../../../services/config";
import type { ApiError } from "../../../services/api";
import { useAuthStore } from "../../../stores/authStore";
import { formatDateTime } from "../../../utils/helper";

interface LoginHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoginHistoryItem {
  ip_address: {
    system_ip: string;
    browser_ip: string;
  };
  last_login: string;
}

interface LoginHistoryResponse {
  userId: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  loginDetails: LoginHistoryItem[];
  totalLogins: number;
}

const LoginHistoryModal: React.FC<LoginHistoryModalProps> = ({ isOpen, onClose }) => {
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([]);
  const [totalLogins, setTotalLogins] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const fetchLoginHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!user?._id) {
        throw new Error('User ID is required');
      }
      const response = await apiGet<LoginHistoryResponse>(API_CONFIG.endpoints.auth.loginHistory(user._id));
      
      // Extract data from response
      let historyData: LoginHistoryItem[] = [];
      let total = 0;
      
      if (response.data) {
        // Check if data is wrapped in ApiResponse structure
        const responseData = response.data.data || response.data;
        
        if (responseData && typeof responseData === 'object') {
          // Extract loginDetails array
          if (Array.isArray(responseData.loginDetails)) {
            historyData = responseData.loginDetails;
          } else if (Array.isArray(responseData)) {
            // Fallback: if responseData is directly an array
            historyData = responseData;
          }
          
          // Extract totalLogins
          if (typeof responseData.totalLogins === 'number') {
            total = responseData.totalLogins;
          }
        }
      }
      
      setLoginHistory(historyData);
      setTotalLogins(total);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch login history');
      console.error('Error fetching login history:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      fetchLoginHistory();
    } else {
      // Reset state when modal closes
      setLoginHistory([]);
      setTotalLogins(0);
      setError(null);
    }
  }, [isOpen, fetchLoginHistory]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Login History</h2>
            {totalLogins > 0 && (
              <p className="text-sm text-gray-600 mt-1">Total: {totalLogins} login{totalLogins !== 1 ? 's' : ''}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FaSpinner className="animate-spin text-green-600 text-4xl mb-4" />
              <p className="text-gray-600">Loading login history...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchLoginHistory}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : loginHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-600">No login history found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {loginHistory.map((item, index) => {
                const formattedDate = formatDateTime(item.last_login);

                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <FaGlobe className="text-green-600" />
                          <span className="font-semibold text-gray-800">Browser IP:</span>
                          <span className="text-gray-700">{item.ip_address.browser_ip}</span>
                        </div>
                        {item.ip_address.system_ip && (
                          <div className="flex items-center space-x-2 mb-2 ml-6">
                            <span className="text-sm text-gray-600">System IP:</span>
                            <span className="text-sm text-gray-700">{item.ip_address.system_ip}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 mb-2">
                          <FaClock className="text-green-600" />
                          <span className="font-semibold text-gray-800">Last Login:</span>
                          <span className="text-gray-700">{formattedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LoginHistoryModal;

