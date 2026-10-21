import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa'

const AlertsList = () => {
  const allAlerts = [
    {
      icon: FaExclamationTriangle,
      type: 'critical',
      title: 'Critical: Server Load High',
      description: 'Game server #3 is experiencing 94% CPU usage. Immediate action required.',
      meta: 'Just now',
    },
    {
      icon: FaExclamationTriangle,
      type: 'warning',
      title: 'Warning: Expiring Discounts',
      description: '8 active discounts will expire in the next 24 hours. Review and extend if needed.',
      meta: '5 min ago',
    },
    {
      icon: FaExclamationTriangle,
      type: 'warning',
      title: 'Failed Scheduled Job',
      description: 'Daily backup job failed at 2:00 AM. Database backup incomplete.',
      meta: '1 hour ago',
    },
    {
      icon: FaExclamationTriangle,
      type: 'warning',
      title: 'Low Wallet Balance',
      description: 'Payment gateway wallet balance below $1,000. Consider topping up.',
      meta: '2 hours ago',
    },
    {
      icon: FaInfoCircle,
      type: 'info',
      title: 'Info: Maintenance Complete',
      description: 'Scheduled maintenance completed successfully. All systems operational.',
      meta: '3 hours ago',
    },
  ]

  const typeStyles = {
    critical: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]',
    warning: 'bg-[rgba(249,115,22,0.2)] text-[#f97316]',
    info: 'bg-[rgba(59,130,246,0.2)] text-[#3b82f6]',
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg sm:rounded-xl p-4 sm:p-6">
      <div className="mb-4 sm:mb-5">
        <h3 className="text-gray-800 dark:text-white text-base sm:text-lg mb-1">System Alerts</h3>
        <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">Critical notifications.</p>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 max-h-[200px] sm:max-h-[250px] overflow-y-auto">
        {allAlerts.slice(0, 3).map((alert, index) => (
          <div
            key={index}
            className={`flex gap-2 sm:gap-3 ${index !== Math.min(2, allAlerts.length - 1) ? 'pb-3 sm:pb-4 border-b border-gray-200 dark:border-[#1e2742]' : ''}`}
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${typeStyles[alert.type]}`}>
              <alert.icon className="text-sm sm:text-base" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-800 dark:text-white text-xs sm:text-sm font-semibold mb-1 truncate">{alert.title}</div>
              <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-1 leading-relaxed line-clamp-2">{alert.description}</div>
              <div className="text-gray-400 dark:text-[#6b7280] text-xs truncate">{alert.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlertsList

