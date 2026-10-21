import { FaEnvelope, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const BasicInfoSection = ({
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  onFieldChange,
  onTogglePassword,
  onToggleConfirmPassword,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Basic Information</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Enter the user's basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Name */}
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
              <FaUser className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors text-xs sm:text-sm" />
            </div>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder="Enter full name"
              maxLength={100}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
          </div>
          {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            {formData.name.length}/100 characters
          </p>
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
              <FaEnvelope className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors text-xs sm:text-sm" />
            </div>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onFieldChange('email', e.target.value.toLowerCase())}
              placeholder="user@example.com"
              maxLength={100}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
          </div>
          {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            {formData.email.length}/100 characters
          </p>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
              <FaLock className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors text-xs sm:text-sm" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => onFieldChange('password', e.target.value)}
              placeholder="Enter password"
              maxLength={100}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-11 pr-9 sm:pr-11 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 dark:text-[#8b8fa3] hover:text-gray-600 dark:hover:text-[#e0e0e0] transition-colors"
            >
              {showPassword ? (
                <FaEyeSlash className="text-xs sm:text-sm" />
              ) : (
                <FaEye className="text-xs sm:text-sm" />
              )}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-red-500 text-xs">{errors.password}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            Minimum 8 characters, maximum 100 characters
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
              <FaLock className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors text-xs sm:text-sm" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
              placeholder="Confirm password"
              maxLength={100}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-11 pr-9 sm:pr-11 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
            <button
              type="button"
              onClick={onToggleConfirmPassword}
              className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 dark:text-[#8b8fa3] hover:text-gray-600 dark:hover:text-[#e0e0e0] transition-colors"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-xs sm:text-sm" />
              ) : (
                <FaEye className="text-xs sm:text-sm" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BasicInfoSection

