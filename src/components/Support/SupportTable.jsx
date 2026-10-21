import { formatDateTime, getSupportCategoryLabel as getCategoryLabel } from '../../services/helper.js'
import Pagination from "../Common/Pagination";
import { useState, useMemo } from 'react'
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaBan,
  FaCircle,
  FaUserCheck,
  FaUserPlus,
} from 'react-icons/fa'
import EmptyState from './EmptyState'

// Mock support tickets data
const mockTickets = [
  {
    id: 'TICKET-001',
    userId: 'USR-001',
    user: { name: 'John Smith', email: 'johns@example.com', initials: 'JS' },
    category: 'payment',
    priority: 'high',
    status: 'open',
    assignedTo: null,
    subject: 'Payment failed for game purchase',
    lastUpdated: new Date('2024-12-20T10:30:00'),
    createdAt: new Date('2024-12-20T09:15:00'),
    firstResponseTime: null,
    resolutionTime: null,
    isOverdue: false,
  },
  {
    id: 'TICKET-002',
    userId: 'USR-002',
    user: { name: 'Emma Wilson', email: 'emmaw@example.com', initials: 'EW' },
    category: 'game',
    priority: 'medium',
    status: 'assigned',
    assignedTo: { name: 'Alex Morgan', email: 'alex.morgan@gamervault.com' },
    subject: 'Game not launching after update',
    lastUpdated: new Date('2024-12-20T09:45:00'),
    createdAt: new Date('2024-12-19T14:20:00'),
    firstResponseTime: '1.2h',
    resolutionTime: null,
    isOverdue: false,
  },
  {
    id: 'TICKET-003',
    userId: 'USR-003',
    user: { name: 'Michael Brown', email: 'michaelb@example.com', initials: 'MB' },
    category: 'account',
    priority: 'critical',
    status: 'in-progress',
    assignedTo: { name: 'John Doe', email: 'john.doe@gamervault.com' },
    subject: 'Account locked after suspicious activity',
    lastUpdated: new Date('2024-12-20T08:30:00'),
    createdAt: new Date('2024-12-20T08:00:00'),
    firstResponseTime: '0.5h',
    resolutionTime: null,
    isOverdue: true,
  },
  {
    id: 'TICKET-004',
    userId: 'USR-004',
    user: { name: 'Sarah Davis', email: 'sarahd@example.com', initials: 'SD' },
    category: 'technical',
    priority: 'low',
    status: 'resolved',
    assignedTo: { name: 'Jane Smith', email: 'jane.smith@gamervault.com' },
    subject: 'Unable to download purchased game',
    lastUpdated: new Date('2024-12-19T16:30:00'),
    createdAt: new Date('2024-12-19T15:00:00'),
    firstResponseTime: '0.8h',
    resolutionTime: '1.5h',
    isOverdue: false,
  },
  {
    id: 'TICKET-005',
    userId: 'USR-005',
    user: { name: 'David Lee', email: 'davidl@example.com', initials: 'DL' },
    category: 'billing',
    priority: 'high',
    status: 'open',
    assignedTo: null,
    subject: 'Refund request for duplicate purchase',
    lastUpdated: new Date('2024-12-20T07:15:00'),
    createdAt: new Date('2024-12-20T07:00:00'),
    firstResponseTime: null,
    resolutionTime: null,
    isOverdue: false,
  },
  {
    id: 'TICKET-006',
    userId: 'USR-006',
    user: { name: 'Lisa Chen', email: 'lisac@example.com', initials: 'LC' },
    category: 'game',
    priority: 'medium',
    status: 'closed',
    assignedTo: { name: 'Alex Morgan', email: 'alex.morgan@gamervault.com' },
    subject: 'Game save data corrupted',
    lastUpdated: new Date('2024-12-18T12:00:00'),
    createdAt: new Date('2024-12-18T10:00:00'),
    firstResponseTime: '0.5h',
    resolutionTime: '2.0h',
    isOverdue: false,
  },
  {
    id: 'TICKET-007',
    userId: 'USR-007',
    user: { name: 'Robert Taylor', email: 'robertt@example.com', initials: 'RT' },
    category: 'account',
    priority: 'low',
    status: 'assigned',
    assignedTo: { name: 'John Doe', email: 'john.doe@gamervault.com' },
    subject: 'Password reset not working',
    lastUpdated: new Date('2024-12-19T18:45:00'),
    createdAt: new Date('2024-12-19T18:00:00'),
    firstResponseTime: '0.3h',
    resolutionTime: null,
    isOverdue: false,
  },
  {
    id: 'TICKET-008',
    userId: 'USR-008',
    user: { name: 'Jennifer Martinez', email: 'jenniferm@example.com', initials: 'JM' },
    category: 'payment',
    priority: 'critical',
    status: 'in-progress',
    assignedTo: { name: 'Jane Smith', email: 'jane.smith@gamervault.com' },
    subject: 'Charged twice for same transaction',
    lastUpdated: new Date('2024-12-20T11:00:00'),
    createdAt: new Date('2024-12-20T10:30:00'),
    firstResponseTime: '0.2h',
    resolutionTime: null,
    isOverdue: false,
  },
]

const SupportTable = ({ filters, selectedTickets, onSelectionChange, onViewDetails }) => {
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(filteredAndSortedTickets.map((ticket) => ticket.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectTicket = (ticketId) => {
    if (selectedTickets.includes(ticketId)) {
      onSelectionChange(selectedTickets.filter((id) => id !== ticketId))
    } else {
      onSelectionChange([...selectedTickets, ticketId])
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      open: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]',
      assigned: 'bg-[rgba(59,130,246,0.2)] text-[#3b82f6]',
      'in-progress': 'bg-[rgba(59,130,246,0.2)] text-[#3b82f6]',
      resolved: 'bg-[rgba(16,185,129,0.2)] text-[#10b981]',
      closed: 'bg-[rgba(107,114,128,0.2)] text-[#6b7280]',
    }
    const icons = {
      open: FaCircle,
      assigned: FaUserCheck,
      'in-progress': FaClock,
      resolved: FaCheckCircle,
      closed: FaBan,
    }
    const Icon = icons[status] || FaCircle
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${styles[status] || styles.open}`}>
        <Icon className="text-xs" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const styles = {
      low: 'bg-[rgba(107,114,128,0.2)] text-[#6b7280]',
      medium: 'bg-[rgba(245,158,11,0.2)] text-[#f59e0b]',
      high: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]',
      critical: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444] border border-[#ef4444]',
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${styles[priority] || styles.low}`}>
        {priority}
      </span>
    )
  }


  // Filter and sort tickets
  const filteredAndSortedTickets = useMemo(() => {
    let filtered = [...mockTickets]

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.id.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.userId.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.subject.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter((ticket) => ticket.status === filters.status)
    }

    if (filters.priority !== 'all') {
      filtered = filtered.filter((ticket) => ticket.priority === filters.priority)
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter((ticket) => ticket.category === filters.category)
    }

    if (filters.assignedTo !== 'all') {
      if (filters.assignedTo === 'unassigned') {
        filtered = filtered.filter((ticket) => !ticket.assignedTo)
      } else {
        filtered = filtered.filter(
          (ticket) => ticket.assignedTo && ticket.assignedTo.email.includes(filters.assignedTo)
        )
      }
    }

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField]
        let bValue = b[sortField]

        if (sortField === 'lastUpdated' || sortField === 'createdAt') {
          aValue = aValue.getTime()
          bValue = bValue.getTime()
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }

        if (typeof aValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }

        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      })
    }

    return filtered
  }, [filters, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTickets.length / itemsPerPage)
  const paginatedTickets = filteredAndSortedTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="inline ml-1 text-gray-400 dark:text-[#8b8fa3]" />
    return sortDirection === 'asc' ? (
      <FaSortUp className="inline ml-1 text-[#10b981]" />
    ) : (
      <FaSortDown className="inline ml-1 text-[#10b981]" />
    )
  }


  // Show empty state if no tickets
  if (filteredAndSortedTickets.length === 0) {
    return (
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden">
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden max-w-full">
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="bg-gray-50 dark:bg-[#1e2742]">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedTickets.length === paginatedTickets.length && paginatedTickets.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => handleSort('id')}
              >
                Ticket ID {getSortIcon('id')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Assigned To
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => handleSort('lastUpdated')}
              >
                Last Updated {getSortIcon('lastUpdated')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => handleSort('createdAt')}
              >
                Created {getSortIcon('createdAt')}
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#1e2742]">
            {paginatedTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className={`hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors ${
                  selectedTickets.includes(ticket.id) ? 'bg-green-50 dark:bg-[rgba(16,185,129,0.1)]' : ''
                } ${ticket.isOverdue ? 'border-l-4 border-l-[#ef4444]' : ''}`}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedTickets.includes(ticket.id)}
                    onChange={() => handleSelectTicket(ticket.id)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                  />
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="text-gray-900 dark:text-white font-medium text-sm font-mono">{ticket.id}</div>
                    <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mt-0.5 truncate max-w-[150px]" title={ticket.subject}>
                      {ticket.subject}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-xs font-semibold">
                      {ticket.user.initials}
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white text-sm font-medium">{ticket.user.name}</div>
                      <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">{ticket.user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-[#1e2742] text-gray-700 dark:text-[#8b8fa3] text-xs rounded capitalize">
                    {getCategoryLabel(ticket.category)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {getPriorityBadge(ticket.priority)}
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(ticket.status)}
                </td>
                <td className="px-4 py-4">
                  {ticket.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <FaUserCheck className="text-gray-600 dark:text-[#8b8fa3] text-xs" />
                      <span className="text-gray-600 dark:text-[#8b8fa3] text-xs">{ticket.assignedTo.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaUserPlus className="text-gray-500 dark:text-[#6b7280] text-xs" />
                      <span className="text-gray-500 dark:text-[#6b7280] text-xs">Unassigned</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">{formatDateTime(ticket.lastUpdated)}</div>
                  {ticket.firstResponseTime && (
                    <div className="text-[#10b981] text-xs mt-0.5">Response: {ticket.firstResponseTime}</div>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">{formatDateTime(ticket.createdAt)}</div>
                  {ticket.resolutionTime && (
                    <div className="text-[#10b981] text-xs mt-0.5">Resolved: {ticket.resolutionTime}</div>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewDetails(ticket)}
                      className="p-2 text-gray-600 dark:text-[#8b8fa3] hover:text-[#3b82f6] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                      title="View ticket"
                    >
                      <FaEye className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredAndSortedTickets.length} itemsPerPage={itemsPerPage} itemLabel="tickets" onPageChange={setCurrentPage} onItemsPerPageChange={(size) => { setItemsPerPage(size); setCurrentPage(1); }} />
    </div>
  )
}

export default SupportTable

