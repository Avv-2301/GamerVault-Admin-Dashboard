import { useState } from 'react'
import { FaSave, FaSpinner, FaServer, FaDatabase, FaSync, FaCheckCircle, FaExclamationCircle, FaTrash } from 'react-icons/fa'
import { useToast } from '../ui/ToastContainer'

const SystemSettings = () => {
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [systemHealth] = useState({
    cache: { status: 'healthy', size: '2.4 GB', hitRate: '94.2%' },
    database: { status: 'healthy', connections: 45, responseTime: '12ms' },
    jobs: { status: 'running', active: 3, queued: 12 },
  })

  const handleClearCache = () => {
    // TODO: Implement cache clearing
    success('Cache cleared successfully')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success('System settings saved successfully')
    } catch (err) {
      error('Failed to save settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const HealthCard = ({ title, icon: Icon, data, action }) => (
    <div className="p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="text-gray-400 dark:text-[#8b8fa3] text-lg" />
          <h3 className="text-gray-800 dark:text-white text-sm font-medium">{title}</h3>
        </div>
        {data.status === 'healthy' || data.status === 'running' ? (
          <FaCheckCircle className="text-[#10b981] text-sm" />
        ) : (
          <FaExclamationCircle className="text-[#ef4444] text-sm" />
        )}
      </div>
      <div className="space-y-2">
        {Object.entries(data)
          .filter(([key]) => key !== 'status')
          .map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-[#8b8fa3] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span className="text-gray-800 dark:text-white font-medium">{value}</span>
            </div>
          ))}
      </div>
      {action && (
        <button
          type="button"
          onClick={action}
          className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
        >
          <FaTrash className="text-xs" />
          <span>Clear Cache</span>
        </button>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-gray-800 dark:text-white text-xl font-semibold mb-1">System Settings</h2>
          <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Monitor system health and manage background processes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* System Health */}
          <div>
            <h3 className="text-gray-800 dark:text-white text-sm font-medium mb-4">System Health</h3>
            <div className="grid grid-cols-3 gap-4">
              <HealthCard
                title="Cache"
                icon={FaDatabase}
                data={systemHealth.cache}
                action={handleClearCache}
              />
              <HealthCard
                title="Database"
                icon={FaServer}
                data={systemHealth.database}
              />
              <HealthCard
                title="Background Jobs"
                icon={FaSync}
                data={systemHealth.jobs}
              />
            </div>
          </div>

          {/* Cache Management */}
          <div className="border-t border-gray-200 dark:border-[#1e2742] pt-6">
            <h3 className="text-gray-800 dark:text-white text-sm font-medium mb-4">Cache Management</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
                <div>
                  <h4 className="text-gray-800 dark:text-white text-sm font-medium mb-1">Application Cache</h4>
                  <p className="text-gray-600 dark:text-[#8b8fa3] text-xs">Clear all cached application data</p>
                </div>
                <button
                  type="button"
                  onClick={handleClearCache}
                  className="px-4 py-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
                >
                  Clear Cache
                </button>
              </div>
            </div>
          </div>

          {/* Background Jobs */}
          <div className="border-t border-gray-200 dark:border-[#1e2742] pt-6">
            <h3 className="text-gray-800 dark:text-white text-sm font-medium mb-4">Background Jobs</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-800 dark:text-white text-sm font-medium">Scheduled Tasks</h4>
                  <span className="px-2 py-1 bg-[rgba(16,185,129,0.2)] text-[#10b981] text-xs rounded">Running</span>
                </div>
                <p className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-3">
                  Background jobs are running normally. {systemHealth.jobs.active} active, {systemHealth.jobs.queued} queued.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
                  >
                    View Jobs
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
                  >
                    Scheduler Settings
                  </button>
                </div>
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

export default SystemSettings

