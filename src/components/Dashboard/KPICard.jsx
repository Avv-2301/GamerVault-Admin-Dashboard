import { createElement } from 'react'

const KPICard = ({ icon, label, value, change, changeType = 'positive', iconColor = 'green' }) => {
  const iconColors = {
    green: 'bg-[rgba(16,185,129,0.2)]',
    purple: 'bg-[rgba(139,92,246,0.2)]',
    orange: 'bg-[rgba(249,115,22,0.2)]',
    red: 'bg-[rgba(239,68,68,0.2)]',
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg sm:rounded-xl p-4 sm:p-5 flex gap-3 sm:gap-4 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-200/30 dark:hover:shadow-black/30">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColors[iconColor]}`}>
        {createElement(icon, { className: 'text-xl sm:text-2xl' })}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-1 sm:mb-2 truncate">{label}</div>
        <div className="text-gray-800 dark:text-white text-xl sm:text-2xl font-bold mb-1 truncate">{value}</div>
        {change && <div className={`text-xs ${changeType === 'positive' ? 'text-[#10b981]' : 'text-[#ef4444]'} truncate`}>{change}</div>}
      </div>
    </div>
  )
}

export default KPICard

