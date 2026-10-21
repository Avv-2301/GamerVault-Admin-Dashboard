import { formatLoginTimestamp as formatTimestamp } from '../../services/helper.js'
import Pagination from "../Common/Pagination";
import { useState, useEffect } from "react";
import {
  FaHistory,
  FaDesktop,
  FaMobile,
  FaTablet,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import Modal from "../ui/Modal";
import { useToast } from "../ui/ToastContainer";
import { userLoginHistory } from "../../services/api/auth";
import { useAuthStore } from "../../store/useAuthStore";

const LoginHistoryModal = ({ isOpen, onClose }) => {
  const { error } = useToast();
  const [loginHistory, setLoginHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(loginHistory.length / itemsPerPage);
  const paginatedLoginHistory = loginHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const loggedInState = useAuthStore.getState().user;
  const userId = loggedInState?._id;

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
      fetchLoginHistory();
    }
  }, [isOpen]);

  const fetchLoginHistory = async () => {
    setIsLoading(true);
    try {
      const response = await userLoginHistory(userId);

      if (response?.meta?.code === 200) {
        setLoginHistory(response?.data?.loginDetails);
      } else {
        setLoginHistory([]);
      }
    } catch (error) {
      console.log(error);
      setLoginHistory([]);
    } finally {
      setIsLoading(false);
    }
  };



  const handleClose = () => {
    setCurrentPage(1);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Login History"
      subtitle="View your recent login sessions and account activity"
      maxWidth="max-w-3xl"
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : loginHistory?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FaHistory className="text-gray-500 dark:text-[#8b8fa3] text-4xl mb-4" />
          <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">No login history available</p>
        </div>
      ) : (
        <div className="space-y-3">
          {paginatedLoginHistory?.map((session, index) => {
            const DeviceIcon = session.deviceIcon || FaDesktop;
            const isCurrent = index === 0;
            return (
              <div
                key={session._id || session.id || index}
                className={`bg-white dark:bg-[#1e2742] border ${
                  isCurrent ? "border-[#10b981]" : "border-gray-200 dark:border-[#2a3441]"
                } rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-[#252d42] transition-colors`}
              >
                <div className="flex items-start gap-4">
                  {/* Device Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isCurrent
                        ? "bg-[rgba(16,185,129,0.2)] text-[#10b981]"
                        : "bg-gray-100 dark:bg-[#2a3441] text-gray-600 dark:text-[#8b8fa3]"
                    }`}
                  >
                    <DeviceIcon className="text-lg" />
                  </div>

                  {/* Session Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-gray-900 dark:text-white font-semibold text-sm">
                            {session.device ?? "Asus Tuf"}
                          </h3>
                          {isCurrent && (
                            <span className="px-2 py-0.5 bg-[rgba(16,185,129,0.2)] text-[#10b981] text-xs rounded-full font-medium">
                              Current Session
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <FaCheckCircle className="text-[#10b981] text-xs" />
                            <span className="text-xs text-[#10b981]">
                              Success
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-2">
                          {session.browser ?? "Google"}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">
                          <FaClock className="text-xs" />
                          <span>{formatTimestamp(session.last_login)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location and IP */}
                    <div className="flex items-center gap-4 text-xs flex-wrap">
                      {session?.ip_address?.browser_ip && (
                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-[#8b8fa3]">
                          <FaMapMarkerAlt className="text-xs" />
                          <span>
                            Browser IP: {session.ip_address.browser_ip}
                          </span>
                        </div>
                      )}
                      {session?.ip_address?.system_ip && (
                        <div className="text-gray-500 dark:text-[#6b7280]">
                          System IP: {session.ip_address.system_ip}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && loginHistory.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={loginHistory.length} itemsPerPage={itemsPerPage} itemLabel="login history" onPageChange={setCurrentPage} showPageSize={false} showOnlyWhenNeeded />}
    </Modal>
  );
};

export default LoginHistoryModal;
