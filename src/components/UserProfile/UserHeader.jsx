import { useState, useEffect } from "react";
import {
  FaBan,
  FaUnlock,
  FaKey,
  FaWallet,
  FaTag,
  FaHistory,
  FaCopy,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import AddWalletModal from "../Modals/AddWalletModal";
import BlockUserModal from "../Modals/BlockUserModal";
import UnblockUserModal from "../Modals/UnblockUserModal";
import ChangeUserPasswordModal from "../Modals/ChangeUserPasswordModal";
import { formatDate } from "../../services/helper";
import { addBalanceToUser } from "../../services/api/transactions";
import { resetUserPassword } from "../../services/api/users";

const UserHeader = ({ userId, user, handleRefresh }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [isAddWalletModalOpen, setIsAddWalletModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [user?.profilePhoto]);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getStatusBadge = (status) => {
    const normalizedStatus = String(status ?? "0").toLowerCase();
    const badges = {
      "0": {
        bg: "bg-[rgba(148,163,184,0.2)]",
        text: "text-slate-500",
        icon: FaClock,
        label: "Inactive",
      },
      "1": {
        bg: "bg-[rgba(16,185,129,0.2)]",
        text: "text-[#10b981]",
        icon: FaCheckCircle,
        label: "Active",
      },
      "2": {
        bg: "bg-[rgba(239,68,68,0.2)]",
        text: "text-[#ef4444]",
        icon: FaBan,
        label: "Deleted",
      },
      "3": {
        bg: "bg-[rgba(249,115,22,0.2)]",
        text: "text-[#f97316]",
        icon: FaClock,
        label: "Banned",
      },
      active: {
        bg: "bg-[rgba(16,185,129,0.2)]",
        text: "text-[#10b981]",
        icon: FaCheckCircle,
        label: "Active",
      },
      inactive: {
        bg: "bg-[rgba(148,163,184,0.2)]",
        text: "text-slate-500",
        icon: FaClock,
        label: "Inactive",
      },
      blocked: {
        bg: "bg-[rgba(239,68,68,0.2)]",
        text: "text-[#ef4444]",
        icon: FaBan,
        label: "Deleted",
      },
      banned: {
        bg: "bg-[rgba(249,115,22,0.2)]",
        text: "text-[#f97316]",
        icon: FaClock,
        label: "Banned",
      },
    };

    const badge = badges[normalizedStatus] || badges.inactive;
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
      >
        <Icon className="text-xs" />
        {badge.label}
      </span>
    );
  };

  const handleBlockUser = (blockData) => {
    // TODO: Implement block user API call
    console.log("Block user:", userId, blockData);
    setIsBlockModalOpen(false);
  };

  const handleUnblockUser = () => {
    // TODO: Implement unblock user API call
    console.log("Unblock user:", userId);
  };

  const handleChangePassword = async (passwordData) => {
    setLoading(true);
    try {
      const response = await resetUserPassword(
        userId,
        passwordData.newPassword,
        passwordData.adminPassword
      );
      if (response?.meta?.code === 200) {
        setIsResetPasswordModalOpen(false);
        handleRefresh();
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAddWalletBalance = async (walletData) => {
    setLoading(true);
    const { amount, confirmAmount, adminPassword, reason } = walletData;
    try {
      const response = await addBalanceToUser(
        userId,
        amount,
        confirmAmount,
        adminPassword,
        reason,
      );
      if (response?.meta?.code === 200) {
        setIsAddWalletModalOpen(false);
        handleRefresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6 mb-6">
        <div className="text-center text-gray-600 dark:text-[#8b8fa3]">
          Loading user data...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 max-w-full overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* User Summary Card (Left) */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-semibold text-xl sm:text-2xl flex-shrink-0 overflow-hidden">
              {user?.profile?.profilePhoto && !imageError ? (
                <img
                  src={user?.profile?.profilePhoto}
                  alt={user?.name || "User"}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h2 className="text-gray-800 dark:text-white text-xl sm:text-2xl font-bold truncate">
                  {user?.name?.toUpperCase() || "N/A"}
                </h2>
                {getStatusBadge(user?.status || "active")}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm truncate">
                  {user?.email || "N/A"}
                </span>
                {user?.email && (
                  <button
                    onClick={() => copyToClipboard(user.email, "email")}
                    className="text-gray-500 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white transition-colors"
                    title="Copy email"
                  >
                    {copiedField === "email" ? (
                      <FaCheckCircle className="text-xs text-[#10b981]" />
                    ) : (
                      <FaCopy className="text-xs" />
                    )}
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gray-600 dark:text-[#8b8fa3] text-xs">
                  User ID:
                </span>
                <code className="text-gray-800 dark:text-[#e0e0e0] text-xs bg-gray-100 dark:bg-[#1e2742] px-2 py-0.5 rounded">
                  {user?._id || userId || "N/A"}
                </code>
                {(user?.id || user?._id) && (
                  <button
                    onClick={() => copyToClipboard(user._id, "id")}
                    className="text-gray-500 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white transition-colors"
                    title="Copy User ID"
                  >
                    {copiedField === "id" ? (
                      <FaCheckCircle className="text-xs text-[#10b981]" />
                    ) : (
                      <FaCopy className="text-xs" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-gray-200 dark:border-[#1e2742]">
            <div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">
                Wallet Balance
              </div>
              <div className="text-gray-800 dark:text-white text-lg sm:text-xl font-bold">
                &#8377;{user?.balance ? Number(user.balance).toLocaleString() : "0.00"}
              </div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">
                Last Login
              </div>
              <div className="text-gray-800 dark:text-white text-xs sm:text-sm">
                {formatDate(user?.last_login)}
              </div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">
                Account Created
              </div>
              <div className="text-gray-800 dark:text-white text-xs sm:text-sm">
                {formatDate(user?.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Panel (Right) */}
        <div className="lg:w-64 flex-shrink-0 w-full lg:w-auto">
          <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-4">
            <h3 className="text-gray-800 dark:text-white text-xs sm:text-sm font-semibold mb-3">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2">
              {user?.status === "1" ? (
                <button
                  onClick={() => setIsBlockModalOpen(true)}
                  className="flex items-center gap-2 bg-[#ef4444] hover:bg-[#dc2626] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                >
                  <FaBan className="text-xs sm:text-sm" />
                  <span>Block User</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsUnblockModalOpen(true)}
                  className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                >
                  <FaUnlock className="text-xs sm:text-sm" />
                  <span>Unblock User</span>
                </button>
              )}

              <button
                onClick={() => setIsResetPasswordModalOpen(true)}
                className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
              >
                <FaKey className="text-xs sm:text-sm" />
                <span>Change Password</span>
              </button>

              <button
                onClick={() => setIsAddWalletModalOpen(true)}
                className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
              >
                <FaWallet className="text-xs sm:text-sm" />
                <span>Add Wallet Balance</span>
              </button>

              <button className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors">
                <FaTag className="text-xs sm:text-sm" />
                <span>Assign Discount</span>
              </button>

              <button className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors">
                <FaHistory className="text-xs sm:text-sm" />
                <span>View Audit Logs</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Block User Modal */}
      <BlockUserModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        user={user}
        onConfirm={handleBlockUser}
      />

      {/* Unblock User Modal */}
      <UnblockUserModal
        isOpen={isUnblockModalOpen}
        onClose={() => setIsUnblockModalOpen(false)}
        user={user}
        onConfirm={handleUnblockUser}
      />

      {/* Change Password Modal */}
      <ChangeUserPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        user={user}
        onConfirm={handleChangePassword}
        isLoading={loading}
      />

      {/* Add Wallet Balance Modal */}
      <AddWalletModal
        isOpen={isAddWalletModalOpen}
        onClose={() => setIsAddWalletModalOpen(false)}
        user={user}
        onConfirm={handleAddWalletBalance}
      />
    </div>
  );
};

export default UserHeader;
