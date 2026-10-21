import { FaHistory, FaCheckCircle, FaExclamationCircle, FaCog } from 'react-icons/fa'

const AuditTrialsSummary = ({ stats = {} }) => {
  const cards = [
    { label: 'Total Actions', value: stats.totalLogs || 0, icon: FaHistory, color: 'text-[#3b82f6]', bg: 'bg-[rgba(59,130,246,0.1)]' },
    { label: 'Today', value: stats.todayLogs || 0, icon: FaHistory, color: 'text-[#10b981]', bg: 'bg-[rgba(16,185,129,0.1)]' },
    { label: 'Successful', value: stats.successfulLogs || 0, icon: FaCheckCircle, color: 'text-[#10b981]', bg: 'bg-[rgba(16,185,129,0.1)]' },
    { label: 'Failed', value: stats.failedLogs || 0, icon: FaExclamationCircle, color: 'text-[#ef4444]', bg: 'bg-[rgba(239,68,68,0.1)]' },
    { label: 'Settings Changes', value: stats.settingsChanges || 0, icon: FaCog, color: 'text-[#3b82f6]', bg: 'bg-[rgba(59,130,246,0.1)]' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}><Icon className={`${color} text-lg`} /></div>
          </div>
          <div className="text-gray-900 dark:text-white text-2xl font-bold mb-1">{Number(value).toLocaleString()}</div>
          <div className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default AuditTrialsSummary
