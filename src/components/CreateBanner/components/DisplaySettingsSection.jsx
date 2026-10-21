import { FaDesktop, FaMobile, FaTablet, FaSortAmountDown } from 'react-icons/fa'

const DisplaySettingsSection = ({ formData, errors, onFieldChange, onArrayChange }) => {
  const handleDeviceToggle = (device) => {
    const currentDevices = formData.deviceTypes || []
    if (currentDevices.includes(device)) {
      onArrayChange('deviceTypes', currentDevices.filter((d) => d !== device))
    } else {
      onArrayChange('deviceTypes', [...currentDevices, device])
    }
  }

  const deviceOptions = [
    { value: 'desktop', label: 'Desktop', icon: FaDesktop },
    { value: 'mobile', label: 'Mobile', icon: FaMobile },
    { value: 'tablet', label: 'Tablet', icon: FaTablet },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Display Settings</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Configure how and where the banner will be displayed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Device Types */}
        <div className="md:col-span-2">
          <label className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Device Types <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {deviceOptions.map((device) => {
              const DeviceIcon = device.icon
              const isSelected = formData.deviceTypes?.includes(device.value)
              return (
                <button
                  key={device.value}
                  type="button"
                  onClick={() => handleDeviceToggle(device.value)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-[#10b981] bg-[rgba(16,185,129,0.1)] text-[#10b981]'
                      : 'border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] hover:border-gray-300 dark:hover:border-[#3a4451]'
                  }`}
                >
                  <DeviceIcon className="text-base sm:text-lg" />
                  <span className="text-xs sm:text-sm font-medium">{device.label}</span>
                </button>
              )
            })}
          </div>
          {errors.deviceTypes && <p className="mt-1 text-red-500 text-xs">{errors.deviceTypes}</p>}
          <p className="mt-2 text-gray-500 dark:text-[#8b8fa3] text-xs">
            Select which device types this banner should be displayed on
          </p>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Priority <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSortAmountDown className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              id="priority"
              type="number"
              value={formData.priority}
              onChange={(e) => onFieldChange('priority', e.target.value)}
              min="1"
              max="10"
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.priority ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
          </div>
          {errors.priority && <p className="mt-1 text-red-500 text-xs">{errors.priority}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            Priority determines display order (1 = highest priority, 10 = lowest)
          </p>
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {[
              { value: 'active', label: 'Active', color: 'text-[#10b981]' },
              { value: 'scheduled', label: 'Scheduled', color: 'text-[#3b82f6]' },
              { value: 'disabled', label: 'Disabled', color: 'text-[#ef4444]' },
            ].map((status) => (
              <button
                key={status.value}
                type="button"
                onClick={() => onFieldChange('status', status.value)}
                className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 transition-all ${
                  formData.status === status.value
                    ? `border-[#10b981] bg-[rgba(16,185,129,0.1)] ${status.color}`
                    : 'border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] hover:border-gray-300 dark:hover:border-[#3a4451]'
                }`}
              >
                <span className="text-xs sm:text-sm font-medium">{status.label}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-gray-500 dark:text-[#8b8fa3] text-xs">
            Active banners are displayed immediately. Scheduled banners will activate on the start date.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DisplaySettingsSection

