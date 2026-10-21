import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import Modal from "../ui/Modal";
import { useToast } from "../ui/ToastContainer";
import { useAuthStore } from "../../store/useAuthStore";
import { changePassword } from "../../services/api/auth";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { success, error } = useToast();
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const loggedInState = useAuthStore.getState()?.user;
  const userId = loggedInState?._id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await changePassword(userId, data);
      console.log(response)

      if (response?.meta?.code === 200) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setShowPasswords({
      new: false,
      confirm: false,
    });
    onClose();
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Change Password"
      subtitle="Update your account password to keep your account secure"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* New Password */}
        <div className="space-y-2">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium"
          >
            New Password <span className="text-[#ef4444]">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaKey
                className={`text-gray-500 dark:text-[#8b8fa3] transition-colors ${
                  errors.newPassword ? "text-[#ef4444]" : ""
                }`}
              />
            </div>
            <input
              id="newPassword"
              type={showPasswords.new ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
              })}
              placeholder="Enter your new password"
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.newPassword ? "border-[#ef4444]" : "border-gray-300 dark:border-[#2a3441]"
              } text-gray-900 dark:text-[#e0e0e0] pl-11 pr-11 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 dark:text-[#8b8fa3] hover:text-[#10b981] transition-colors"
            >
              {showPasswords.new ? (
                <FaEyeSlash className="text-sm" />
              ) : (
                <FaEye className="text-sm" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-[#ef4444] text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium"
          >
            Confirm New Password <span className="text-[#ef4444]">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaKey
                className={`text-gray-500 dark:text-[#8b8fa3] transition-colors ${
                  errors.confirmPassword ? "text-[#ef4444]" : ""
                }`}
              />
            </div>
            <input
              id="confirmPassword"
              type={showPasswords.confirm ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your new password",
              })}
              placeholder="Confirm your new password"
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.confirmPassword ? "border-[#ef4444]" : "border-gray-300 dark:border-[#2a3441]"
              } text-gray-900 dark:text-[#e0e0e0] pl-11 pr-11 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 dark:text-[#8b8fa3] hover:text-[#10b981] transition-colors"
            >
              {showPasswords.confirm ? (
                <FaEyeSlash className="text-sm" />
              ) : (
                <FaEye className="text-sm" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[#ef4444] text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#1e2742]">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg font-medium text-sm hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <FaKey className="text-sm" />
                <span>Change Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
