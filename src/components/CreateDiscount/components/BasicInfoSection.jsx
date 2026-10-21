const BasicInfoSection = ({ formData, errors, onFieldChange }) => (
  <div className="space-y-4 sm:space-y-6">
    <div>
      <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Basic Information</h2>
      <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Enter the basic details about the promotion</p>
    </div>

    <div>
      <label htmlFor="name" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
        Promotion Name <span className="text-red-500">*</span>
      </label>
      <input
        id="name"
        type="text"
        value={formData.name}
        onChange={(event) => onFieldChange('name', event.target.value)}
        placeholder="e.g., Summer Promotion 2026"
        className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'} text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
      />
      {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
      <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">A descriptive name for admins to identify this promotion.</p>
    </div>
  </div>
)

export default BasicInfoSection
