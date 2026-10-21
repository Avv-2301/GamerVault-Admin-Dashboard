import { useState } from 'react'
import { FaSave, FaSpinner, FaBell, FaEnvelope, FaToggleOn, FaToggleOff } from 'react-icons/fa'
import { useToast } from '../ui/ToastContainer'

const NotificationsSettings = () => {
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    emailNotifications: {
      transactionAlerts: true,
      discountExpiration: true,
      userRegistration: false,
      systemAlerts: true,
    },
    adminAlerts: {
      highValueTransactions: true,
      failedPayments: true,
      systemErrors: true,
      securityAlerts: true,
    },
  })

  const handleToggle = (category, field) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field],
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success('Notification settings saved successfully')
    } catch (err) {
      error('Failed to save settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const ToggleRow = ({ label, description, enabled, onClick }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
      <div className="flex-1">
        <h4 className="text-gray-800 dark:text-white text-sm font-medium mb-1">{label}</h4>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs">{description}</p>
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
          <h2 className="text-gray-800 dark:text-white text-xl font-semibold mb-1">Notification Settings</h2>
          <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Configure email notifications and admin alerts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaEnvelope className="text-gray-400 dark:text-[#8b8fa3] text-lg" />
              <h3 className="text-gray-800 dark:text-white text-sm font-medium">Email Notifications</h3>
            </div>
            <div className="space-y-3">
              <ToggleRow
                label="Transaction Alerts"
                description="Receive email notifications for all transactions"
                enabled={formData.emailNotifications.transactionAlerts}
                onClick={() => handleToggle('emailNotifications', 'transactionAlerts')}
              />
              <ToggleRow
                label="Discount Expiration Alerts"
                description="Get notified when discounts are about to expire"
                enabled={formData.emailNotifications.discountExpiration}
                onClick={() => handleToggle('emailNotifications', 'discountExpiration')}
              />
              <ToggleRow
                label="User Registration"
                description="Receive notifications for new user registrations"
                enabled={formData.emailNotifications.userRegistration}
                onClick={() => handleToggle('emailNotifications', 'userRegistration')}
              />
              <ToggleRow
                label="System Alerts"
                description="Critical system notifications and updates"
                enabled={formData.emailNotifications.systemAlerts}
                onClick={() => handleToggle('emailNotifications', 'systemAlerts')}
              />
            </div>
          </div>

          {/* Admin Alerts */}
          <div className="border-t border-gray-200 dark:border-[#1e2742] pt-6">
            <div className="flex items-center gap-2 mb-4">
              <FaBell className="text-gray-400 dark:text-[#8b8fa3] text-lg" />
              <h3 className="text-gray-800 dark:text-white text-sm font-medium">Admin Alerts</h3>
            </div>
            <div className="space-y-3">
              <ToggleRow
                label="High Value Transactions"
                description="Alert for transactions exceeding $1,000"
                enabled={formData.adminAlerts.highValueTransactions}
                onClick={() => handleToggle('adminAlerts', 'highValueTransactions')}
              />
              <ToggleRow
                label="Failed Payments"
                description="Notifications for failed payment attempts"
                enabled={formData.adminAlerts.failedPayments}
                onClick={() => handleToggle('adminAlerts', 'failedPayments')}
              />
              <ToggleRow
                label="System Errors"
                description="Critical system errors and exceptions"
                enabled={formData.adminAlerts.systemErrors}
                onClick={() => handleToggle('adminAlerts', 'systemErrors')}
              />
              <ToggleRow
                label="Security Alerts"
                description="Suspicious activity and security events"
                enabled={formData.adminAlerts.securityAlerts}
                onClick={() => handleToggle('adminAlerts', 'securityAlerts')}
              />
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

export default NotificationsSettings

