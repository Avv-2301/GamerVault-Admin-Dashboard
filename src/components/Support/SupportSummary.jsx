import { FaTicketAlt, FaClock, FaExclamationTriangle, FaCheckCircle, FaHourglassHalf, FaBan } from 'react-icons/fa'

const SupportSummary = ({ filters }) => {
  // Mock summary data - replace with actual API call
  const summaryData = {
    open: 23,
    pending: 12,
    resolved: 1247,
    highPriority: 8,
    avgResponseTime: '2.3h',
    overdue: 3,
  }

  const summaryCards = [
    {
      label: 'Open Tickets',
      value: summaryData.open.toLocaleString(),
      icon: FaTicketAlt,
      color: 'text-[#ef4444]',
      bgColor: 'bg-[rgba(239,68,68,0.1)]',
      clickable: true,
    },
    {
      label: 'Pending Tickets',
      value: summaryData.pending.toLocaleString(),
      icon: FaHourglassHalf,
      color: 'text-[#f59e0b]',
      bgColor: 'bg-[rgba(245,158,11,0.1)]',
      clickable: true,
    },
    {
      label: 'Resolved Tickets',
      value: summaryData.resolved.toLocaleString(),
      icon: FaCheckCircle,
      color: 'text-[#10b981]',
      bgColor: 'bg-[rgba(16,185,129,0.1)]',
      clickable: true,
    },
    {
      label: 'High Priority',
      value: summaryData.highPriority.toLocaleString(),
      icon: FaExclamationTriangle,
      color: 'text-[#ef4444]',
      bgColor: 'bg-[rgba(239,68,68,0.1)]',
      clickable: true,
    },
    {
      label: 'Avg Response Time',
      value: summaryData.avgResponseTime,
      icon: FaClock,
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[rgba(59,130,246,0.1)]',
      clickable: false,
    },
    {
      label: 'Overdue Tickets',
      value: summaryData.overdue.toLocaleString(),
      icon: FaBan,
      color: 'text-[#ef4444]',
      bgColor: 'bg-[rgba(239,68,68,0.1)]',
      clickable: true,
    },
  ]

  const handleCardClick = (card) => {
    if (card.clickable) {
      // TODO: Apply filter based on card
      console.log('Filter by:', card.label)
    }
  }

  return (
    <div className="grid grid-cols-6 gap-4">
      {summaryCards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            className={`bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-4 hover:border-gray-300 dark:hover:border-[#2a3441] transition-colors ${
              card.clickable ? 'cursor-pointer' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                <Icon className={`${card.color} text-lg`} />
              </div>
            </div>
            <div className="text-gray-900 dark:text-white text-2xl font-bold mb-1">{card.value}</div>
            <div className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">{card.label}</div>
          </div>
        )
      })}
    </div>
  )
}

export default SupportSummary

