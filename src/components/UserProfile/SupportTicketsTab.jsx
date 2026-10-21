import { formatDate } from '../../services/helper.js'
import { useNavigate } from 'react-router-dom'
import {
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationCircle,
  FaArrowRight,
} from 'react-icons/fa'

const SupportTicketsTab = ({ userId }) => {
  const navigate = useNavigate()

  // Mock data - replace with API call
  const mockTickets = [
    {
      id: 'TKT-001',
      category: 'Technical Issue',
      subject: 'Game not launching after update',
      status: 'open',
      priority: 'high',
      lastUpdated: '2024-05-20T14:30:00',
      createdAt: '2024-05-19T10:00:00',
    },
    {
      id: 'TKT-002',
      category: 'Billing',
      subject: 'Refund request for duplicate purchase',
      status: 'in-progress',
      priority: 'medium',
      lastUpdated: '2024-05-18T16:45:00',
      createdAt: '2024-05-17T09:30:00',
    },
    {
      id: 'TKT-003',
      category: 'Account',
      subject: 'Password reset not working',
      status: 'resolved',
      priority: 'low',
      lastUpdated: '2024-05-15T11:20:00',
      createdAt: '2024-05-14T14:15:00',
    },
    {
      id: 'TKT-004',
      category: 'Technical Issue',
      subject: 'Game crashes on startup',
      status: 'closed',
      priority: 'high',
      lastUpdated: '2024-05-10T09:00:00',
      createdAt: '2024-05-08T15:30:00',
    },
  ]


  const getStatusBadge = (status) => {
    const badges = {
      open: {
        icon: FaExclamationCircle,
        bg: 'bg-[rgba(239,68,68,0.2)]',
        text: 'text-[#ef4444]',
        label: 'Open',
      },
      'in-progress': {
        icon: FaClock,
        bg: 'bg-[rgba(249,115,22,0.2)]',
        text: 'text-[#f97316]',
        label: 'In Progress',
      },
      resolved: {
        icon: FaCheckCircle,
        bg: 'bg-[rgba(16,185,129,0.2)]',
        text: 'text-[#10b981]',
        label: 'Resolved',
      },
      closed: {
        icon: FaTimesCircle,
        bg: 'bg-[rgba(107,114,128,0.2)]',
        text: 'text-[#6b7280]',
        label: 'Closed',
      },
    }

    const badge = badges[status] || badges.open
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="text-xs" />
        {badge.label}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const badges = {
      high: {
        bg: 'bg-[rgba(239,68,68,0.2)]',
        text: 'text-[#ef4444]',
        label: 'High',
      },
      medium: {
        bg: 'bg-[rgba(249,115,22,0.2)]',
        text: 'text-[#f97316]',
        label: 'Medium',
      },
      low: {
        bg: 'bg-[rgba(107,114,128,0.2)]',
        text: 'text-[#6b7280]',
        label: 'Low',
      },
    }

    const badge = badges[priority] || badges.medium

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    )
  }

  const handleViewTicket = (ticketId) => {
    // Navigate to support module with ticket ID
    navigate(`/dashboard/support?ticket=${ticketId}`)
  }

  if (mockTickets.length === 0) {
    return (
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-12 text-center">
        <FaTicketAlt className="text-4xl text-gray-400 dark:text-[#8b8fa3] mx-auto mb-4" />
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-2">No Support Tickets</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">This user has no support tickets.</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden max-w-full">
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-[700px]">
          <thead className="bg-gray-50 dark:bg-[#1e2742] sticky top-0 z-10">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Ticket ID
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden md:table-cell">
                Category
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Subject
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Priority
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Status
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden sm:table-cell">
                Last Updated
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-gray-200 dark:border-[#1e2742] hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors"
              >
                <td className="px-2 sm:px-4 py-3 sm:py-4">
                  <code className="text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm">{ticket.id}</code>
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4 hidden md:table-cell">
                  <span className="text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm">{ticket.category}</span>
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4">
                  <div className="text-gray-800 dark:text-white text-xs sm:text-sm font-medium max-w-md truncate">{ticket.subject}</div>
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4">{getPriorityBadge(ticket.priority)}</td>
                <td className="px-2 sm:px-4 py-3 sm:py-4">{getStatusBadge(ticket.status)}</td>
                <td className="px-2 sm:px-4 py-3 sm:py-4 text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm hidden sm:table-cell">{formatDate(ticket.lastUpdated)}</td>
                <td className="px-2 sm:px-4 py-3 sm:py-4">
                  <button
                    onClick={() => handleViewTicket(ticket.id)}
                    className="flex items-center gap-1 sm:gap-2 text-[#10b981] hover:text-[#059669] transition-colors"
                  >
                    <span className="text-xs sm:text-sm">View</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SupportTicketsTab

