import { useForm } from "react-hook-form";
import { FaGift, FaRupeeSign, FaKey, FaInfoCircle } from "react-icons/fa";
import Modal from "../ui/Modal";

const BonusModal = ({ isOpen, onClose, user, onConfirm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      amount: "",
      reason: "",
      note: "",
      adminPassword: "",
    },
  });

  const watchedAmount = watch("amount");

  const reasons = [
    "Customer Support Refund",
    "Promotional Credit",
    "Compensation",
    "System Error Correction",
    "Other",
  ];

  const onSubmit = (data) => {
    onConfirm({
      amount: Number(data.amount),
      reason: data.reason,
      note: data.note,
      adminPassword: data.adminPassword,
    });
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Bonus Credit"
      subtitle="Grant promotional credit to user. This action requires admin authentication."
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* User Info Card */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-[#1e2742] dark:to-[#2a3441] border border-gray-200 dark:border-[#2a3441] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-900 dark:text-white font-semibold text-lg mb-1">
                {user?.name?.toUpperCase()}
              </div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-sm">{user?.email}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Current Balance</div>
              <div className="text-gray-900 dark:text-white text-2xl font-bold">
                ₹{parseFloat(user?.balance || 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Information Banner */}
        <div className="bg-[rgba(139,92,246,0.1)] border border-[#8b5cf6] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-[#8b5cf6] text-lg flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[#8b5cf6] font-medium text-sm mb-1">
                Bonus Credit Information
              </div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs leading-relaxed">
                This action will add bonus credit to the user's wallet. All
                transactions are logged and audited. Bonus credits are promotional
                and may have specific terms and conditions.
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4">
          {/* Left Column - Amount and Details */}
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-2 block flex items-center gap-2">
                <FaRupeeSign className="text-[#8b5cf6]" />
                Bonus Amount <span className="text-[#ef4444]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#8b8fa3] text-lg">
                  ₹
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  {...register("amount", {
                    required: "Amount is required",
                    min: {
                      value: 0.01,
                      message: "Amount must be greater than 0",
                    },
                    validate: (value) => {
                      const numValue = parseFloat(value);
                      if (isNaN(numValue) || numValue <= 0) {
                        return "Amount must be a valid positive number";
                      }
                      return true;
                    },
                  })}
                  placeholder="0.00"
                  className={`w-full bg-white dark:bg-[#1e2742] border ${
                    errors.amount ? "border-[#ef4444]" : "border-gray-200 dark:border-[#2a3441]"
                  } text-gray-800 dark:text-[#e0e0e0] px-4 pl-8 py-3 rounded-lg text-lg font-medium focus:outline-none focus:border-[#8b5cf6]`}
                />
              </div>
              {errors.amount && (
                <p className="text-[#ef4444] text-xs mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-2 block">
                Reason <span className="text-[#ef4444]">*</span>
              </label>
              <select
                {...register("reason", {
                  required: "Reason is required",
                })}
                className={`w-full bg-white dark:bg-[#1e2742] border ${
                  errors.reason ? "border-[#ef4444]" : "border-gray-200 dark:border-[#2a3441]"
                } text-gray-800 dark:text-[#e0e0e0] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#8b5cf6]`}
              >
                <option value="">Select reason</option>
                {reasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
              {errors.reason && (
                <p className="text-[#ef4444] text-xs mt-1">
                  {errors.reason.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-2 block">
                Note (Optional)
              </label>
              <textarea
                {...register("note")}
                placeholder="Additional notes..."
                rows="3"
                className="w-full bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#8b5cf6] resize-none"
              />
            </div>
          </div>

          {/* Right Column - Admin Password */}
          <div>
            <label className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-2 block">
              Admin Password <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="password"
              {...register("adminPassword", {
                required: "Admin password is required",
              })}
              placeholder="Your password"
              className={`w-full bg-white dark:bg-[#1e2742] border ${
                errors.adminPassword ? "border-[#ef4444]" : "border-gray-200 dark:border-[#2a3441]"
              } text-gray-800 dark:text-[#e0e0e0] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#8b5cf6]`}
            />
            {errors.adminPassword && (
              <p className="text-[#ef4444] text-xs mt-1">
                {errors.adminPassword.message}
              </p>
            )}
            <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-2.5 mt-2">
              <p className="text-gray-600 dark:text-[#8b8fa3] text-xs leading-relaxed">
                <span className="text-[#8b5cf6] font-medium inline-flex items-center gap-1">
                  <FaKey className="text-[10px]" />
                  Security Required
                </span>
                <br />
                <span className="text-[11px]">
                  Enter your admin password to authorize this transaction.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        {watchedAmount &&
          !isNaN(parseFloat(watchedAmount)) &&
          parseFloat(watchedAmount) > 0 && (
            <div className="bg-gradient-to-r from-[rgba(139,92,246,0.1)] to-[rgba(139,92,246,0.05)] border border-[#8b5cf6] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">New Balance</div>
                  <div className="text-gray-900 dark:text-white text-xl font-bold">
                    ₹
                    {(
                      parseFloat(user?.balance || 0) +
                      parseFloat(watchedAmount || 0)
                    ).toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Bonus Amount</div>
                  <div className="text-[#8b5cf6] text-xl font-bold">
                    +₹{parseFloat(watchedAmount || 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] text-white px-4 py-3 rounded-lg font-medium transition-all shadow-lg shadow-[#8b5cf6]/20 flex items-center justify-center gap-2"
          >
            <FaGift className="text-sm" />
            <span>Grant Bonus</span>
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BonusModal;
