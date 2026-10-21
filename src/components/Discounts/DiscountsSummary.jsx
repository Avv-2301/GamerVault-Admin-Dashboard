import {
  FaTag,
  FaClock,
  FaHistory,
  FaRupeeSign,
} from 'react-icons/fa'

const DiscountsSummary = ({ discounts = [] }) => {
  const activeDiscounts = discounts.filter((discount) => discount.status === 'active')
  const summaryData = {
    activeDiscounts: { value: activeDiscounts.length, change: '', changeType: 'neutral' },
    scheduledDiscounts: { value: discounts.filter((discount) => discount.status === 'scheduled').length, change: '', changeType: 'neutral' },
    expiredDiscounts: { value: discounts.filter((discount) => discount.status === 'expired').length, change: '', changeType: 'neutral' },
    revenueImpact: { value: '—', change: 'Revenue data unavailable', changeType: 'neutral' },
  }

  const cards = [
    {
      icon: FaTag,
      label: 'Active Discounts',
      value: summaryData.activeDiscounts.value,
      change: summaryData.activeDiscounts.change,
      changeType: summaryData.activeDiscounts.changeType,
      iconColor: 'green',
      clickable: false,
    },
    {
      icon: FaClock,
      label: 'Scheduled Discounts',
      value: summaryData.scheduledDiscounts.value,
      change: summaryData.scheduledDiscounts.change,
      changeType: summaryData.scheduledDiscounts.changeType,
      iconColor: 'blue',
      clickable: false,
    },
    {
      icon: FaHistory,
      label: 'Expired Discounts',
      value: summaryData.expiredDiscounts.value,
      change: summaryData.expiredDiscounts.change,
      changeType: summaryData.expiredDiscounts.changeType,
      iconColor: 'gray',
      clickable: false,
    },
    {
      icon: FaRupeeSign,
      label: 'Revenue Impact',
      value: summaryData.revenueImpact.value,
      change: summaryData.revenueImpact.change,
      changeType: summaryData.revenueImpact.changeType,
      iconColor: 'green',
      clickable: false,
    },
  ]

  const iconColors = {
    green: 'bg-[rgba(16,185,129,0.2)]',
    blue: 'bg-[rgba(59,130,246,0.2)]',
    gray: 'bg-[rgba(107,114,128,0.2)]',
  }

  const changeColors = {
    positive: 'text-[#10b981]',
    negative: 'text-[#ef4444]',
    neutral: 'text-[#8b8fa3]',
    warning: 'text-[#f97316]',
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 max-w-full overflow-x-hidden">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className={`bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-3 sm:p-4 md:p-5 flex gap-2 sm:gap-3 md:gap-4 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 ${
              card.clickable ? 'cursor-pointer hover:border-[#10b981]/50' : ''
            }`}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColors[card.iconColor]}`}>
              <Icon className="text-xl sm:text-2xl" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1 sm:mb-2 truncate">{card.label}</div>
              <div className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-1">{card.value}</div>
              <div className={`text-xs ${changeColors[card.changeType]} truncate`}>{card.change}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DiscountsSummary

