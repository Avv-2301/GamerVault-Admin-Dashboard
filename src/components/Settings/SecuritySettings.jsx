import { useState } from 'react'
import { FaSave, FaSpinner, FaShieldAlt, FaLock, FaUserShield, FaBan, FaToggleOn, FaToggleOff } from 'react-icons/fa'
import { useToast } from '../ui/ToastContainer'

const SecuritySettings = () => {
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecial: true,
    twoFactorEnabled: false,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    sessionTimeout: 60,
    ipWhitelist: [],
    ipBlacklist: [],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success('Security settings saved successfully')
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
          <h2 className="text-gray-800 dark:text-white text-xl font-semibold mb-1">Security Settings</h2>
          <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Configure authentication and security policies</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Policy */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaLock className="text-gray-400 dark:text-[#8b8fa3] text-lg" />
              <h3 className="text-gray-800 dark:text-white text-sm font-medium">Password Policy</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                  Minimum Password Length <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.passwordMinLength}
                  onChange={(e) => setFormData((prev) => ({ ...prev, passwordMinLength: e.target.value }))}
                  min="6"
                  max="32"
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
                  <span className="text-gray-700 dark:text-[#e0e0e0] text-sm">Require Uppercase</span>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, passwordRequireUppercase: !prev.passwordRequireUppercase }))}
                    className={`text-xl ${formData.passwordRequireUppercase ? 'text-[#10b981]' : 'text-[#6b7280]'}`}
                  >
                    {formData.passwordRequireUppercase ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
                  <span className="text-gray-700 dark:text-[#e0e0e0] text-sm">Require Lowercase</span>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, passwordRequireLowercase: !prev.passwordRequireLowercase }))}
                    className={`text-xl ${formData.passwordRequireLowercase ? 'text-[#10b981]' : 'text-[#6b7280]'}`}
                  >
                    {formData.passwordRequireLowercase ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
                  <span className="text-gray-700 dark:text-[#e0e0e0] text-sm">Require Numbers</span>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, passwordRequireNumbers: !prev.passwordRequireNumbers }))}
                    className={`text-xl ${formData.passwordRequireNumbers ? 'text-[#10b981]' : 'text-[#6b7280]'}`}
                  >
                    {formData.passwordRequireNumbers ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
                  <span className="text-gray-700 dark:text-[#e0e0e0] text-sm">Require Special Characters</span>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, passwordRequireSpecial: !prev.passwordRequireSpecial }))}
                    className={`text-xl ${formData.passwordRequireSpecial ? 'text-[#10b981]' : 'text-[#6b7280]'}`}
                  >
                    {formData.passwordRequireSpecial ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="border-t border-gray-200 dark:border-[#1e2742] pt-6">
            <div className="flex items-center gap-2 mb-4">
              <FaUserShield className="text-gray-400 dark:text-[#8b8fa3] text-lg" />
              <h3 className="text-gray-800 dark:text-white text-sm font-medium">Two-Factor Authentication</h3>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
              <div>
                <h4 className="text-gray-800 dark:text-white text-sm font-medium mb-1">Enable 2FA for Admins</h4>
                <p className="text-gray-600 dark:text-[#8b8fa3] text-xs">Require two-factor authentication for admin accounts</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                className={`text-2xl ${formData.twoFactorEnabled ? 'text-[#10b981]' : 'text-[#6b7280]'}`}
              >
                {formData.twoFactorEnabled ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
          </div>

          {/* Login Security */}
          <div className="border-t border-gray-200 dark:border-[#1e2742] pt-6">
            <div className="flex items-center gap-2 mb-4">
              <FaShieldAlt className="text-gray-400 dark:text-[#8b8fa3] text-lg" />
              <h3 className="text-gray-800 dark:text-white text-sm font-medium">Login Security</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                  Max Login Attempts <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.maxLoginAttempts}
                  onChange={(e) => setFormData((prev) => ({ ...prev, maxLoginAttempts: e.target.value }))}
                  min="3"
                  max="10"
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                />
                <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">Maximum failed login attempts before lockout</p>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                  Lockout Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.lockoutDuration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lockoutDuration: e.target.value }))}
                  min="5"
                  max="1440"
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                />
                <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">Account lockout duration after max attempts</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                  Session Timeout (minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.sessionTimeout}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sessionTimeout: e.target.value }))}
                  min="5"
                  max="480"
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                />
                <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">Automatic session expiration time</p>
              </div>
            </div>
          </div>

          {/* IP Management */}
          <div className="border-t border-gray-200 dark:border-[#1e2742] pt-6">
            <div className="flex items-center gap-2 mb-4">
              <FaBan className="text-gray-400 dark:text-[#8b8fa3] text-lg" />
              <h3 className="text-gray-800 dark:text-white text-sm font-medium">IP Access Control</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">IP Whitelist</label>
                <textarea
                  value={formData.ipWhitelist.join('\n')}
                  onChange={(e) => setFormData((prev) => ({ ...prev, ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim()) }))}
                  placeholder="192.168.1.1&#10;10.0.0.1"
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none font-mono"
                />
                <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">One IP address per line</p>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">IP Blacklist</label>
                <textarea
                  value={formData.ipBlacklist.join('\n')}
                  onChange={(e) => setFormData((prev) => ({ ...prev, ipBlacklist: e.target.value.split('\n').filter(ip => ip.trim()) }))}
                  placeholder="192.168.1.100&#10;10.0.0.50"
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none font-mono"
                />
                <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">One IP address per line</p>
              </div>
            </div>
          </div>

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

export default SecuritySettings

