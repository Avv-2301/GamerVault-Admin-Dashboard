import { useState } from 'react'
import { FaSave, FaSpinner, FaGlobe, FaEnvelope, FaClock, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa'
import { useToast } from '../ui/ToastContainer'

const GeneralSettings = () => {
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    platformName: 'GamerVault',
    supportEmail: 'support@gamervault.com',
    defaultTimezone: 'America/New_York',
    defaultCurrency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
  })

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success('General settings saved successfully')
    } catch (err) {
      error('Failed to save settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-1">General Settings</h2>
          <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Configure basic platform information and defaults</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Platform Name */}
            <div>
              <label htmlFor="platformName" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                Platform Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaGlobe className="text-gray-400 dark:text-[#8b8fa3] text-sm" />
                </div>
                <input
                  id="platformName"
                  type="text"
                  value={formData.platformName}
                  onChange={(e) => handleFieldChange('platformName', e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                />
              </div>
              <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">The name displayed across the platform</p>
            </div>

            {/* Support Email */}
            <div>
              <label htmlFor="supportEmail" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                Support Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 dark:text-[#8b8fa3] text-sm" />
                </div>
                <input
                  id="supportEmail"
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => handleFieldChange('supportEmail', e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                />
              </div>
              <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Email address for customer support inquiries</p>
            </div>

            {/* Default Timezone */}
            <div>
              <label htmlFor="defaultTimezone" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                Default Timezone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaClock className="text-gray-400 dark:text-[#8b8fa3] text-sm" />
                </div>
                <select
                  id="defaultTimezone"
                  value={formData.defaultTimezone}
                  onChange={(e) => handleFieldChange('defaultTimezone', e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                >
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="America/Chicago">America/Chicago (CST)</option>
                  <option value="America/Denver">America/Denver (MST)</option>
                  <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Europe/Paris">Europe/Paris (CET)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                  <option value="Asia/Shanghai">Asia/Shanghai (CST)</option>
                </select>
              </div>
              <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Default timezone for date and time displays</p>
            </div>

            {/* Default Currency */}
            <div>
              <label htmlFor="defaultCurrency" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                Default Currency <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaRupeeSign className="text-gray-400 dark:text-[#8b8fa3] text-sm" />
                </div>
                <select
                  id="defaultCurrency"
                  value={formData.defaultCurrency}
                  onChange={(e) => handleFieldChange('defaultCurrency', e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                >
                  <option value="USD">USD - US Dollar ($)</option>
                  <option value="EUR">EUR - Euro (€)</option>
                  <option value="GBP">GBP - British Pound (£)</option>
                  <option value="JPY">JPY - Japanese Yen (¥)</option>
                  <option value="CAD">CAD - Canadian Dollar (C$)</option>
                  <option value="AUD">AUD - Australian Dollar (A$)</option>
                </select>
              </div>
              <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Default currency for pricing and transactions</p>
            </div>

            {/* Date Format */}
            <div>
              <label htmlFor="dateFormat" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                Date Format <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400 dark:text-[#8b8fa3] text-sm" />
                </div>
                <select
                  id="dateFormat"
                  value={formData.dateFormat}
                  onChange={(e) => handleFieldChange('dateFormat', e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
                  <option value="DD MMM YYYY">DD MMM YYYY (31 Dec 2024)</option>
                </select>
              </div>
              <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Format for displaying dates</p>
            </div>

            {/* Time Format */}
            <div>
              <label htmlFor="timeFormat" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                Time Format <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleFieldChange('timeFormat', '12h')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.timeFormat === '12h'
                      ? 'border-[#10b981] bg-[rgba(16,185,129,0.1)] text-[#10b981]'
                      : 'border-gray-300 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] hover:border-gray-400 dark:hover:border-[#3a4451]'
                  }`}
                >
                  <span className="text-sm font-medium">12 Hour</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFieldChange('timeFormat', '24h')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.timeFormat === '24h'
                      ? 'border-[#10b981] bg-[rgba(16,185,129,0.1)] text-[#10b981]'
                      : 'border-gray-300 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] hover:border-gray-400 dark:hover:border-[#3a4451]'
                  }`}
                >
                  <span className="text-sm font-medium">24 Hour</span>
                </button>
              </div>
              <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Format for displaying time</p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-[#1e2742]">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GeneralSettings

