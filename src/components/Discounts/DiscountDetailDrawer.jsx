import { formatLongDateTime as formatDateTime } from '../../services/helper.js'
import { useEffect } from 'react'
import {
  FaTimes,
  FaGamepad,
  FaFolder,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaCalendarAlt,
  FaUserCircle,
  FaHistory,
  FaCopy,
  FaExternalLinkAlt,
  FaEdit,
  FaPause,
  FaPlay,
} from 'react-icons/fa'

const DiscountDetailDrawer = ({ isOpen, onClose, discount, onEdit, onRequestAction }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !discount) return null

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


  const auditHistory = [
    {
      action: 'Created',
      admin: discount.createdBy,
      timestamp: discount.createdAt,
      details: 'Discount created and scheduled',
    },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:max-w-lg lg:max-w-2xl bg-white dark:bg-[#141b2d] border-l border-gray-200 dark:border-[#1e2742] shadow-2xl z-50 overflow-y-auto"
        style={{
          animation: 'slideInFromRight 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#141b2d] border-b border-gray-200 dark:border-[#1e2742] px-4 sm:px-6 py-3 sm:py-5 flex items-start justify-between z-10">
          <div className="flex-1 min-w-0 pr-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
              <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold truncate">{discount.name}</h2>
              {getStatusBadge(discount.status)}
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-2 sm:ml-4 p-2 text-gray-400 dark:text-[#8b8fa3] hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors flex-shrink-0"
            aria-label="Close drawer"
          >
            <FaTimes className="text-base sm:text-lg" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Promotion Details */}
          <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-4 md:p-5">
            <h3 className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm mb-3 sm:mb-4">Promotion Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Scope</div>
                <div className="flex items-center gap-2">
                  {discount.scope === 'game' ? <FaGamepad className="text-gray-400 dark:text-[#8b8fa3] text-sm" /> : <FaFolder className="text-gray-400 dark:text-[#8b8fa3] text-sm" />}
                  <span className="text-gray-900 dark:text-white text-sm capitalize">{discount.scope}</span>
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Scope Details</div>
                <div className="text-gray-900 dark:text-white text-sm">{discount.scopeDetails}</div>
              </div>
            </div>
          </div>

          {/* Schedule Timeline */}
          <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-4 md:p-5">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">Schedule</h3>
              <FaCalendarAlt className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Start Date & Time</div>
                <div className="text-gray-900 dark:text-white text-xs sm:text-sm">{formatDateTime(discount.startDate)}</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">End Date & Time</div>
                <div className="text-gray-900 dark:text-white text-xs sm:text-sm">{formatDateTime(discount.endDate)}</div>
              </div>
              <div className="pt-2 sm:pt-3 border-t border-gray-200 dark:border-[#2a3441]">
                <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Time Zone</div>
                <div className="text-gray-900 dark:text-white text-xs sm:text-sm">Your local time</div>
              </div>
            </div>
          </div>

          {/* Games Affected */}
          {discount.gamesAffected > 0 && (
            <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-4 md:p-5">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">Affected Games</h3>
                <div className="flex items-center gap-2">
                  <FaGamepad className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
                  <span className="text-gray-600 dark:text-[#8b8fa3] text-xs">{discount.gamesAffected} games</span>
                </div>
              </div>
              {discount.gamesPreview.length > 0 ? (
                <div className="space-y-2">
                  {discount.gamesPreview.map((game, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-white dark:bg-[#141b2d] rounded-lg"
                    >
                      <span className="text-gray-900 dark:text-white text-xs sm:text-sm truncate flex-1 min-w-0">{game}</span>
                      <button className="text-gray-400 dark:text-[#8b8fa3] hover:text-[#10b981] transition-colors flex-shrink-0 ml-2 p-1">
                        <FaExternalLinkAlt className="text-xs" />
                      </button>
                    </div>
                  ))}
                  {discount.gamesAffected > discount.gamesPreview.length && (
                    <div className="text-gray-500 dark:text-[#8b8fa3] text-xs text-center pt-2">
                      +{discount.gamesAffected - discount.gamesPreview.length} more games
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm">No specific games listed</div>
              )}
            </div>
          )}

          {/* Admin Information */}
          <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-4 md:p-5">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">Created By</h3>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                {discount.createdBy.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-900 dark:text-white font-medium text-xs sm:text-sm truncate">{discount.createdBy}</div>
                <div className="text-gray-500 dark:text-[#8b8fa3] text-xs">Created on {formatDateTime(discount.createdAt)}</div>
              </div>
            </div>
          </div>

          {/* Audit History */}
          <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-4 md:p-5">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">Audit History</h3>
              <FaHistory className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <div className="space-y-2 sm:space-y-3">
              {auditHistory.map((entry, index) => (
                <div key={index} className="pb-2 sm:pb-3 border-b border-gray-200 dark:border-[#2a3441] last:border-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 mb-1">
                    <div className="text-gray-900 dark:text-white text-xs sm:text-sm font-medium">{entry.action}</div>
                    <div className="text-gray-500 dark:text-[#8b8fa3] text-xs">{formatDateTime(entry.timestamp)}</div>
                  </div>
                  <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">By {entry.admin}</div>
                  <div className="text-gray-500 dark:text-[#8b8fa3] text-xs">{entry.details}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-[#1e2742]">
            <button onClick={() => onEdit(discount)} className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors flex items-center justify-center gap-2">
              <FaEdit className="text-xs sm:text-sm" />
              <span>Edit Discount</span>
            </button>
            {discount.status === 'active' ? (
              <button onClick={() => onRequestAction('pause', discount)} className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-[#f97316] rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors flex items-center justify-center gap-2">
                <FaPause className="text-xs sm:text-sm" />
                <span>Pause</span>
              </button>
            ) : discount.status === 'disabled' ? (
              <button onClick={() => onRequestAction('resume', discount)} className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-[#10b981] rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors flex items-center justify-center gap-2">
                <FaPlay className="text-xs sm:text-sm" />
                <span>Resume</span>
              </button>
            ) : null}
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DiscountDetailDrawer

