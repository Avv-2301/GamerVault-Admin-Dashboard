import { validatePasswordForm } from '../../services/helper'
import { useState } from "react";
import { FaKey } from "react-icons/fa";
import Modal from "../ui/Modal";

const ChangeUserPasswordModal = ({ isOpen, onClose, user, onConfirm, isLoading = false }) => {
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
    adminPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});


  const handleChangePassword = async () => {
    const validationErrors = validatePasswordForm(passwordData)
    setPasswordErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const changed = await onConfirm({
      newPassword: passwordData.newPassword,
      adminPassword: passwordData.adminPassword,
    });
    if (changed) handleClose();
  };

  const handleClose = () => {
    setPasswordData({
      newPassword: "",
      confirmPassword: "",
      adminPassword: "",
    });
    setPasswordErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
    if (passwordErrors[field]) {
      setPasswordErrors({ ...passwordErrors, [field]: "" });
    }
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Change Password"
      subtitle="Directly change the user's password. This action requires admin authentication."
    >
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-4">
          <div className="text-gray-800 dark:text-white font-medium mb-1">
            {user.name?.toUpperCase()}
          </div>
          <div className="text-gray-600 dark:text-[#8b8fa3] text-sm">
            {user.email}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4">
          {/* Left Column - New Password and Confirm Password */}
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-2 block">
                New Password <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                placeholder="Enter new password"
                className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                  passwordErrors.newPassword
                    ? "border-[#ef4444]"
                    : "border-gray-200 dark:border-[#2a3441]"
                } text-gray-800 dark:text-[#e0e0e0] px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#10b981]`}
              />
              {passwordErrors.newPassword && (
                <p className="text-[#ef4444] text-xs mt-1">
                  {passwordErrors.newPassword}
                </p>
              )}
              <p className="text-gray-500 dark:text-[#8b8fa3] text-xs mt-1">
                Minimum 8 characters
              </p>
            </div>

            <div>
              <label className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-2 block">
                Confirm Password <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm new password"
                className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                  passwordErrors.confirmPassword
                    ? "border-[#ef4444]"
                    : "border-gray-200 dark:border-[#2a3441]"
                } text-gray-800 dark:text-[#e0e0e0] px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#10b981]`}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-[#ef4444] text-xs mt-1">
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Admin Password */}
          <div>
            <label className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-2 block">
              Admin Password <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="password"
              value={passwordData.adminPassword}
              onChange={(e) =>
                handleInputChange("adminPassword", e.target.value)
              }
              placeholder="Your password"
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                passwordErrors.adminPassword
                  ? "border-[#ef4444]"
                  : "border-gray-200 dark:border-[#2a3441]"
              } text-gray-800 dark:text-[#e0e0e0] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#10b981]`}
            />
            {passwordErrors.adminPassword && (
              <p className="text-[#ef4444] text-xs mt-1">
                {passwordErrors.adminPassword}
              </p>
            )}
            <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-2.5 mt-2">
              <p className="text-gray-600 dark:text-[#8b8fa3] text-xs leading-relaxed">
                <span className="text-[#10b981] font-medium inline-flex items-center gap-1">
                  <FaKey className="text-[10px]" />
                  Security Required
                </span>
                <br />
                <span className="text-[11px]">
                  Enter your admin password to authorize this action.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleChangePassword}
            disabled={isLoading}
            className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeUserPasswordModal;
