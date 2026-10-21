import { formatDate } from '../../services/helper.js'
import { FaBan, FaUserShield, FaClock, FaInfinity } from 'react-icons/fa'

const BlockHistoryTab = ({ userId }) => {
  // Mock data - replace with API call
  const mockHistory = [
    {
      id: 1,
      actionType: 'block',
      admin: { name: 'Alex Morgan', email: 'alex.morgan@gamervault.com' },
      reason: 'Violation of terms of service - Spam activity',
      startDate: '2024-05-15T10:00:00',
      endDate: '2024-05-22T10:00:00',
      isPermanent: false,
      status: 'active',
    },
    {
      id: 2,
      actionType: 'ban',
      admin: { name: 'Sarah Johnson', email: 'sarah.j@gamervault.com' },
      reason: 'Fraudulent transaction detected',
      startDate: '2024-04-10T14:30:00',
      endDate: null,
      isPermanent: true,
      status: 'expired',
    },
    {
      id: 3,
      actionType: 'block',
      admin: { name: 'Mike Chen', email: 'mike.chen@gamervault.com' },
      reason: 'Temporary suspension for review',
      startDate: '2024-03-01T09:00:00',
      endDate: '2024-03-08T09:00:00',
      isPermanent: false,
      status: 'expired',
    },
  ]


  const getActionTypeBadge = (type) => {
    const badges = {
      block: {
        bg: 'bg-[rgba(249,115,22,0.2)]',
        text: 'text-[#f97316]',
        label: 'Block',
        icon: FaBan,
      },
      ban: {
        bg: 'bg-[rgba(239,68,68,0.2)]',
        text: 'text-[#ef4444]',
        label: 'Ban',
        icon: FaBan,
      },
    }

    const badge = badges[type] || badges.block
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="text-xs" />
        {badge.label}
      </span>
    )
  }

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[rgba(239,68,68,0.2)] text-[#ef4444]">
          Active
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[rgba(107,114,128,0.2)] text-[#6b7280]">
        Expired
      </span>
    )
  }

  if (mockHistory.length === 0) {
    return (
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-12 text-center">
        <FaBan className="text-4xl text-gray-400 dark:text-[#8b8fa3] mx-auto mb-4" />
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-2">No Block/Ban History</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">This user has no disciplinary actions recorded.</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden max-w-full">
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="bg-gray-50 dark:bg-[#1e2742] sticky top-0 z-10">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Action Type
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden md:table-cell">
                Admin
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Reason
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden sm:table-cell">
                Start Date
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden lg:table-cell">
                End Date
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden lg:table-cell">
                Duration
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((record) => (
              <tr
                key={record.id}
                className="border-b border-gray-200 dark:border-[#1e2742] hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors"
              >
                <td className="px-2 sm:px-4 py-3 sm:py-4">{getActionTypeBadge(record.actionType)}</td>
                <td className="px-2 sm:px-4 py-3 sm:py-4 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      {record.admin.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-gray-800 dark:text-white text-xs sm:text-sm font-medium truncate">{record.admin.name}</div>
                      <div className="text-gray-500 dark:text-[#8b8fa3] text-xs truncate">{record.admin.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4">
                  <div className="text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm max-w-md truncate">{record.reason}</div>
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4 text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm hidden sm:table-cell">{formatDate(record.startDate)}</td>
                <td className="px-2 sm:px-4 py-3 sm:py-4 text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm hidden lg:table-cell">
                  {record.isPermanent ? (
                    <span className="inline-flex items-center gap-1 text-gray-500 dark:text-[#8b8fa3]">
                      <FaInfinity className="text-xs" />
                      Permanent
                    </span>
                  ) : (
                    formatDate(record.endDate)
                  )}
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4 text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm hidden lg:table-cell">
                  {record.isPermanent ? (
                    <span className="text-gray-500 dark:text-[#8b8fa3]">Permanent</span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <FaClock className="text-xs text-gray-500 dark:text-[#8b8fa3]" />
                      {Math.ceil((new Date(record.endDate) - new Date(record.startDate)) / (1000 * 60 * 60 * 24))} days
                    </span>
                  )}
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4">{getStatusBadge(record.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BlockHistoryTab

