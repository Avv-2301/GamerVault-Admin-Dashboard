import { useState } from 'react'
import { FaSave, FaSpinner, FaExclamationTriangle, FaToggleOn, FaToggleOff } from 'react-icons/fa'
import { useToast } from '../ui/ToastContainer'
import Modal from '../ui/Modal'

const PlatformSettings = () => {
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
  const [formData, setFormData] = useState({
    gameStoreEnabled: true,
    homepageBannerEnabled: true,
    featuredGamesEnabled: true,
    maintenanceMode: false,
    maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.',
  })

  const handleToggle = (field) => {
    if (field === 'maintenanceMode' && !formData.maintenanceMode) {
      setShowMaintenanceModal(true)
    } else {
      setFormData((prev) => ({ ...prev, [field]: !prev[field] }))
    }
  }

  const handleConfirmMaintenance = () => {
    setFormData((prev) => ({ ...prev, maintenanceMode: true }))
    setShowMaintenanceModal(false)
    error('Maintenance mode enabled. The platform is now inaccessible to users.')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success('Platform settings saved successfully')
    } catch (err) {
      error('Failed to save settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const ToggleButton = ({ enabled, onClick, label, description, warning }) => (
    <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-gray-900 dark:text-white text-sm font-medium">{label}</h3>
          {warning && (
            <span className="px-2 py-0.5 bg-[rgba(239,68,68,0.2)] text-[#ef4444] text-xs rounded">
              Warning
            </span>
          )}
        </div>
        <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">{description}</p>
      </div>
      <button
        type="button"
        onClick={onClick}
        className={`ml-4 text-2xl transition-colors ${
          enabled ? 'text-[#10b981]' : 'text-[#6b7280]'
        }`}
      >
        {enabled ? <FaToggleOn /> : <FaToggleOff />}
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-1">Platform Settings</h2>
          <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Control platform features and display options</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ToggleButton
            enabled={formData.gameStoreEnabled}
            onClick={() => handleToggle('gameStoreEnabled')}
            label="Enable Game Store"
            description="Allow users to browse and purchase games from the store"
          />

          <ToggleButton
            enabled={formData.homepageBannerEnabled}
            onClick={() => handleToggle('homepageBannerEnabled')}
            label="Enable Homepage Banners"
            description="Display promotional banners on the homepage"
          />

          <ToggleButton
            enabled={formData.featuredGamesEnabled}
            onClick={() => handleToggle('featuredGamesEnabled')}
            label="Enable Featured Games"
            description="Show featured games section on the homepage"
          />

          <div className="border-t border-gray-200 dark:border-[#1e2742] pt-4">
            <ToggleButton
              enabled={formData.maintenanceMode}
              onClick={() => handleToggle('maintenanceMode')}
              label="Maintenance Mode"
              description="Temporarily disable platform access for all users. Use with extreme caution."
              warning={true}
            />
            {formData.maintenanceMode && (
              <div className="mt-4 p-4 bg-[rgba(239,68,68,0.1)] border border-[#ef4444] rounded-lg">
                <div className="flex items-start gap-3">
                  <FaExclamationTriangle className="text-[#ef4444] text-lg mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-[#ef4444] text-sm font-medium mb-2">Maintenance Mode Active</h4>
                    <p className="text-[#8b8fa3] text-xs mb-3">
                      The platform is currently inaccessible to users. Only administrators can access the system.
                    </p>
                    <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs font-medium mb-2">
                      Maintenance Message
                    </label>
                    <textarea
                      value={formData.maintenanceMessage}
                      onChange={(e) => setFormData((prev) => ({ ...prev, maintenanceMessage: e.target.value }))}
                      rows={3}
                      className="w-full bg-white dark:bg-[#141b2d] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 py-2 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-[#1e2742]">
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

      {/* Maintenance Mode Confirmation Modal */}
      <Modal
        isOpen={showMaintenanceModal}
        onClose={() => setShowMaintenanceModal(false)}
        title="Enable Maintenance Mode"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-[rgba(239,68,68,0.1)] border border-[#ef4444] rounded-lg">
            <FaExclamationTriangle className="text-[#ef4444] text-xl mt-0.5" />
            <div>
              <h4 className="text-[#ef4444] font-semibold mb-2">Warning: Critical Action</h4>
              <p className="text-[#8b8fa3] text-sm">
                Enabling maintenance mode will make the platform inaccessible to all users except administrators.
                This action should only be used during scheduled maintenance windows.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setShowMaintenanceModal(false)}
              className="px-4 py-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmMaintenance}
              className="px-4 py-2 bg-[#ef4444] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Enable Maintenance Mode
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PlatformSettings

