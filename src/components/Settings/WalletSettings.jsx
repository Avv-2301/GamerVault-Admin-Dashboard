import { useState } from 'react'
import { FaSave, FaSpinner, FaWallet, FaToggleOn, FaToggleOff, FaExclamationCircle } from 'react-icons/fa'
import { useToast } from '../ui/ToastContainer'

const WalletSettings = () => {
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    walletEnabled: true,
    minBalance: '0',
    maxBalance: '10000',
    dailyTopUpLimit: '1000',
    adminAdjustmentLimit: '5000',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success('Wallet settings saved successfully')
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
          <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-1">Wallet Settings</h2>
          <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Configure user wallet features and limits</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Enable Wallet */}
          <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <FaWallet className="text-gray-400 dark:text-[#8b8fa3] text-lg" />
                <h3 className="text-gray-900 dark:text-white text-sm font-medium">Enable Wallet Feature</h3>
              </div>
              <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">Allow users to maintain a wallet balance for purchases</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, walletEnabled: !prev.walletEnabled }))}
              className={`ml-4 text-2xl transition-colors ${
                formData.walletEnabled ? 'text-[#10b981]' : 'text-[#6b7280]'
              }`}
            >
              {formData.walletEnabled ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>

          {formData.walletEnabled && (
            <>
              {/* Balance Limits */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                    Minimum Balance <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 dark:text-[#8b8fa3] text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      value={formData.minBalance}
                      onChange={(e) => setFormData((prev) => ({ ...prev, minBalance: e.target.value }))}
                      min="0"
                      step="0.01"
                      className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-8 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                    />
                  </div>
                  <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Minimum allowed wallet balance</p>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                    Maximum Balance <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 dark:text-[#8b8fa3] text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      value={formData.maxBalance}
                      onChange={(e) => setFormData((prev) => ({ ...prev, maxBalance: e.target.value }))}
                      min="0"
                      step="0.01"
                      className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-8 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                    />
                  </div>
                  <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Maximum allowed wallet balance</p>
                </div>
              </div>

              {/* Daily Top-up Limit */}
              <div>
                <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                  Daily Top-up Limit <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 dark:text-[#8b8fa3] text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={formData.dailyTopUpLimit}
                    onChange={(e) => setFormData((prev) => ({ ...prev, dailyTopUpLimit: e.target.value }))}
                    min="0"
                    step="0.01"
                    className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-8 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                  />
                </div>
                <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Maximum amount users can add to wallet per day</p>
              </div>

              {/* Admin Adjustment Limit */}
              <div>
                <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                  Admin Manual Adjustment Limit <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 dark:text-[#8b8fa3] text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={formData.adminAdjustmentLimit}
                    onChange={(e) => setFormData((prev) => ({ ...prev, adminAdjustmentLimit: e.target.value }))}
                    min="0"
                    step="0.01"
                    className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-8 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                  />
                </div>
                <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Maximum amount admins can manually adjust per transaction</p>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 p-4 bg-[rgba(245,158,11,0.1)] border border-[#f59e0b] rounded-lg">
                <FaExclamationCircle className="text-[#f59e0b] text-lg mt-0.5" />
                <div>
                  <h4 className="text-[#f59e0b] text-sm font-medium mb-1">Safety Warning</h4>
                  <p className="text-[#8b8fa3] text-xs">
                    Wallet balance limits affect user experience and financial operations. Changes require careful consideration and may impact active users.
                  </p>
                </div>
              </div>
            </>
          )}

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

export default WalletSettings

