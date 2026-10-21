import { FaImage, FaCheckCircle, FaClock, FaTimesCircle, FaBan } from 'react-icons/fa'

const BannersSummary = ({ banners = [] }) => {
  const summaryData = {
    total: banners.length,
    active: banners.filter((banner) => banner.status === 'active').length,
    scheduled: banners.filter((banner) => banner.status === 'scheduled').length,
    expired: banners.filter((banner) => banner.status === 'expired').length,
    disabled: banners.filter((banner) => banner.status === 'disabled').length,
  }

  const summaryCards = [
    {
      label: 'Total Banners',
      value: summaryData.total.toLocaleString(),
      icon: FaImage,
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[rgba(59,130,246,0.1)]',
    },
    {
      label: 'Active',
      value: summaryData.active.toLocaleString(),
      icon: FaCheckCircle,
      color: 'text-[#10b981]',
      bgColor: 'bg-[rgba(16,185,129,0.1)]',
    },
    {
      label: 'Scheduled',
      value: summaryData.scheduled.toLocaleString(),
      icon: FaClock,
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[rgba(59,130,246,0.1)]',
    },
    {
      label: 'Expired',
      value: summaryData.expired.toLocaleString(),
      icon: FaTimesCircle,
      color: 'text-[#6b7280]',
      bgColor: 'bg-[rgba(107,114,128,0.1)]',
    },
    {
      label: 'Disabled',
      value: summaryData.disabled.toLocaleString(),
      icon: FaBan,
      color: 'text-[#ef4444]',
      bgColor: 'bg-[rgba(239,68,68,0.1)]',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6 max-w-full overflow-x-hidden">
      {summaryCards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-3 sm:p-4 hover:border-gray-300 dark:hover:border-[#2a3441] transition-colors"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${card.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`${card.color} text-base sm:text-lg`} />
              </div>
            </div>
            <div className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold mb-1">{card.value}</div>
            <div className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium truncate">{card.label}</div>
          </div>
        )
      })}
    </div>
  )
}

export default BannersSummary

