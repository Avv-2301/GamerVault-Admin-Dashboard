import { formatLongDateTime as formatDateTime, getBannerPositionLabel as getPositionLabel } from '../../services/helper.js'
import { FaTimes, FaEdit, FaExternalLinkAlt, FaDesktop, FaMobile, FaCheckCircle, FaClock, FaTimesCircle, FaBan } from 'react-icons/fa'

const BannerDetailDrawer = ({ isOpen, onClose, onEdit, banner }) => {
  if (!isOpen || !banner) return null

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-[rgba(16,185,129,0.2)] text-[#10b981]',
      scheduled: 'bg-[rgba(59,130,246,0.2)] text-[#3b82f6]',
      expired: 'bg-[rgba(107,114,128,0.2)] text-[#6b7280]',
      disabled: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]',
    }
    const icons = {
      active: FaCheckCircle,
      scheduled: FaClock,
      expired: FaTimesCircle,
      disabled: FaBan,
    }
    const Icon = icons[status] || FaCheckCircle
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${styles[status] || styles.active}`}>
        <Icon className="text-sm" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }



  const getDeviceIcons = (deviceTypes) => {
    return deviceTypes.map((device) => {
      if (device === 'desktop') return <FaDesktop key={device} className="text-gray-400 dark:text-[#8b8fa3] text-base" />
      if (device === 'mobile') return <FaMobile key={device} className="text-gray-400 dark:text-[#8b8fa3] text-base" />
      return null
    })
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:max-w-lg lg:max-w-2xl bg-white dark:bg-[#141b2d] border-l border-gray-200 dark:border-[#1e2742] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#141b2d] border-b border-gray-200 dark:border-[#1e2742] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
          <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold truncate flex-1 pr-3">Banner Details</h2>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors"
            >
              <FaEdit className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 dark:text-[#8b8fa3] hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
            >
              <FaTimes className="text-base sm:text-lg" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Banner Image */}
          <div>
            <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Banner Image</label>
            <div className="w-full h-48 sm:h-64 rounded-lg overflow-hidden bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441]">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1920x600'
                }}
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Title</label>
              <div className="text-gray-900 dark:text-white text-xs sm:text-sm font-medium truncate" title={banner.title}>{banner.title}</div>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Banner ID</label>
              <div className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm font-mono truncate" title={banner.id}>{banner.id}</div>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Position</label>
              <div className="text-gray-900 dark:text-white text-xs sm:text-sm">{getPositionLabel(banner.position)}</div>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Status</label>
              <div>{getStatusBadge(banner.status)}</div>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Priority</label>
              <div className="text-gray-900 dark:text-white text-xs sm:text-sm">Priority {banner.priority}</div>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Device Types</label>
              <div className="flex items-center gap-2">
                {getDeviceIcons(banner.deviceTypes)}
              </div>
            </div>
          </div>

          {/* Link Info */}
          {banner.link && (
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Link</label>
              <a
                href={banner.link}
                target={banner.target}
                rel={banner.target === '_blank' ? 'noopener noreferrer' : ''}
                className="inline-flex items-center gap-2 text-[#3b82f6] text-xs sm:text-sm hover:text-[#60a5fa] transition-colors break-all"
              >
                <span className="truncate max-w-[200px] sm:max-w-none" title={banner.link}>{banner.link}</span>
                <FaExternalLinkAlt className="text-xs flex-shrink-0" />
              </a>
            </div>
          )}

          {/* Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Start Date</label>
              <div className="text-gray-900 dark:text-white text-xs sm:text-sm">{formatDateTime(banner.startDate)}</div>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">End Date</label>
              <div className="text-gray-900 dark:text-white text-xs sm:text-sm">{formatDateTime(banner.endDate)}</div>
            </div>
          </div>

          {/* Performance */}
          <div>
            <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2 sm:mb-3">Performance</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-4">
                <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Clicks</div>
                <div className="text-gray-900 dark:text-white text-lg sm:text-xl font-bold">{banner.clicks.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-4">
                <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Impressions</div>
                <div className="text-gray-900 dark:text-white text-lg sm:text-xl font-bold">{banner.impressions.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-4">
                <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">CTR</div>
                <div className="text-gray-900 dark:text-white text-lg sm:text-xl font-bold">
                  {banner.impressions > 0
                    ? `${((banner.clicks / banner.impressions) * 100).toFixed(2)}%`
                    : '0%'}
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t border-gray-200 dark:border-[#1e2742] pt-3 sm:pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Created By</label>
                <div className="text-gray-900 dark:text-white text-xs sm:text-sm truncate" title={banner.createdBy}>{banner.createdBy}</div>
              </div>
              <div>
                <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Created At</label>
                <div className="text-gray-900 dark:text-white text-xs sm:text-sm">{formatDateTime(banner.createdAt)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BannerDetailDrawer

