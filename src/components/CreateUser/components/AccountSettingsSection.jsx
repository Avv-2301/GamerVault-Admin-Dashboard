import { FaUserShield, FaCheckCircle } from 'react-icons/fa'

const AccountSettingsSection = ({ formData, errors, onFieldChange }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Account Settings</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Configure user account settings and permissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            <FaUserShield className="inline mr-2 text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => onFieldChange('role', e.target.value)}
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.role ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="mt-1 text-red-500 text-xs">{errors.role}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            Select the user's role and permissions level
          </p>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => onFieldChange('status', e.target.value)}
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.status ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          >
            <option value="0">Inactive</option>
            <option value="1">Active</option>
            <option value="2">Deleted</option>
          </select>
          {errors.status && <p className="mt-1 text-red-500 text-xs">{errors.status}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            0 = Inactive, 1 = Active, 2 = Deleted
          </p>
        </div>

        {/* Verified Toggle */}
        <div className="md:col-span-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
            <div className="flex-1 min-w-0">
              <label className="text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium flex items-center gap-2">
                <FaCheckCircle className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
                Email Verification
              </label>
              <p className="text-gray-500 dark:text-[#8b8fa3] text-xs mt-1">
                Mark user's email as verified upon creation
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                checked={formData.verified}
                onChange={(e) => onFieldChange('verified', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 sm:w-11 sm:h-6 bg-[#2a3441] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#10b981] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-[#10b981]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSettingsSection

