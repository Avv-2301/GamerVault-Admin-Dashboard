import Pagination from "../Common/Pagination";
import { useState, useMemo, useRef, useEffect } from 'react'
import { FaSort, FaSortUp, FaSortDown, FaFilter, FaCheckCircle, FaClock, FaTimesCircle, FaChevronDown } from 'react-icons/fa'
import { getSelectedFilter, formatReportCurrency } from '../../services/helper'

// Status badge styles configuration
const statusStyles = {
  success: 'bg-[rgba(16,185,129,0.2)] text-[#10b981]',
  pending: 'bg-[rgba(249,115,22,0.2)] text-[#f97316]',
  failed: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]',
  cancelled: 'bg-gray-100 text-gray-600',
  refund: 'bg-blue-100 text-blue-700',
}

const TransactionUserAvatar = ({ user }) => {
  const [imageError, setImageError] = useState(false)
  const initials = (user?.name || 'User').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 overflow-hidden">
      {user?.profilePhoto && !imageError
        ? <img src={user.profilePhoto} alt={user.name || 'User'} className="w-full h-full object-cover" onError={() => setImageError(true)} />
        : initials}
    </div>
  )
}

const TransactionsTable = ({ transactions = [] }) => {
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)
  const itemsPerPage = 3

  // Filter options configuration
  const filterOptions = [
    { value: 'all', label: 'All Transactions', icon: FaFilter, description: 'Show all transactions' },
    { value: 'success', label: 'Successful', icon: FaCheckCircle, description: 'Successfully processed', color: '#10b981' },
    { value: 'pending', label: 'Pending', icon: FaClock, description: 'Awaiting processing', color: '#f97316' },
    { value: 'failed', label: 'Failed', icon: FaTimesCircle, description: 'Processing failed', color: '#ef4444' },
  ]

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFilterOpen])

  const handleFilterSelect = (value) => {
    setStatusFilter(value)
    setCurrentPage(1)
    setIsFilterOpen(false)
  }

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = statusFilter === 'all'
      ? transactions
      : transactions.filter(t => t.status === statusFilter)

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = a[sortField]
        let bValue = b[sortField]

        if (sortField === 'amount') {
          aValue = Number(aValue)
          bValue = Number(bValue)
        } else if (sortField === 'user') {
          aValue = a.user.name
          bValue = b.user.name
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
  }, [transactions, sortField, sortDirection, statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage)
  const safePage = Math.min(currentPage, Math.max(1, totalPages))
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  )

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="inline ml-1" />
    return sortDirection === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg sm:rounded-xl p-3 sm:p-4">
      <div className="mb-3 sm:mb-4">
        <h3 className="text-gray-800 dark:text-white text-base sm:text-lg mb-1">Recent Transactions</h3>
        <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">Latest payment activity.</p>
      </div>

      {/* Filters */}
      <div className="mb-3 flex gap-2 items-center">
        <label className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium hidden sm:block">Filter:</label>
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs cursor-pointer hover:border-[#10b981] hover:bg-gray-100 dark:hover:bg-[#252d42] transition-all"
          >
            <FaFilter className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm flex-shrink-0" />
            <span className="flex-1 text-left font-medium truncate">{getSelectedFilter(filterOptions, statusFilter).label}</span>
            <FaChevronDown
              className={`text-gray-500 dark:text-[#8b8fa3] text-xs transition-transform flex-shrink-0 ${isFilterOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Filter Dropdown Menu */}
          {isFilterOpen && (
            <div className="absolute left-0 mt-2 w-56 sm:w-64 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-[#1e2742] bg-gray-50 dark:bg-[#1e2742]">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-[#10b981] text-sm" />
                  <div>
                    <div className="text-gray-800 dark:text-white font-semibold text-sm">Transaction Status</div>
                    <div className="text-gray-500 dark:text-[#8b8fa3] text-xs">Filter transactions by status</div>
                  </div>
                </div>
              </div>

              <div className="py-2">
                {filterOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = statusFilter === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleFilterSelect(option.value)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${isSelected
                          ? 'bg-gray-100 dark:bg-[#1e2742] border-l-2 border-[#10b981]'
                          : 'text-gray-800 dark:text-[#e0e0e0] hover:bg-gray-50 dark:hover:bg-[#1e2742]'
                        }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${isSelected
                          ? 'bg-[#10b981]'
                          : option.color
                            ? `bg-[${option.color}]`
                            : 'bg-[#2a3441]'
                        }`} style={option.color && !isSelected ? { backgroundColor: option.color } : {}}></div>
                      <Icon
                        className={`text-base ${isSelected ? 'text-[#10b981]' : option.color ? '' : 'text-[#8b8fa3]'}`}
                        style={option.color && !isSelected ? { color: option.color } : {}}
                      />
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${isSelected ? 'text-[#10b981]' : 'text-gray-800 dark:text-white'
                          }`}>
                          {option.label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-[#8b8fa3]">{option.description}</div>
                      </div>
                      {isSelected && (
                        <FaCheckCircle className="text-[#10b981] text-sm" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto -mx-3 sm:mx-0 max-w-full">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-y-auto max-h-[200px] sm:max-h-[250px]">
            <table className="w-full border-collapse text-xs sm:text-sm min-w-[600px]">
              <thead className="bg-gray-50 dark:bg-[#1e2742] sticky top-0 z-10">
                <tr>
                  <th
                    className="px-2 sm:px-3 py-2 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors"
                    onClick={() => handleSort('user')}
                  >
                    User {getSortIcon('user')}
                  </th>
                  <th className="px-2 sm:px-3 py-2 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden sm:table-cell">
                    Game
                  </th>
                  <th
                    className="px-2 sm:px-3 py-2 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors"
                    onClick={() => handleSort('amount')}
                  >
                    Amount {getSortIcon('amount')}
                  </th>
                  <th className="px-2 sm:px-3 py-2 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-2 sm:px-3 py-6 text-center text-gray-500 dark:text-[#8b8fa3] text-xs">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  paginatedTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors border-b border-gray-200 dark:border-[#1e2742]"
                    >
                      <td className="px-2 sm:px-3 py-2 sm:py-3">
                        <div className="flex items-center gap-2">
                          <TransactionUserAvatar user={transaction.user} />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-800 dark:text-[#e0e0e0] font-medium truncate">{transaction.user.name}</div>
                            <div className="text-xs text-gray-500 dark:text-[#8b8fa3] truncate hidden sm:block">{transaction.user.email}</div>
                            <div className="text-xs text-gray-500 dark:text-[#8b8fa3] font-mono mt-0.5 hidden sm:block">{transaction.orderId}</div>
                            <div className="text-xs text-gray-500 dark:text-[#8b8fa3] truncate sm:hidden">{transaction.game}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 hidden sm:table-cell">
                        <div className="text-xs text-gray-800 dark:text-[#e0e0e0] truncate max-w-[150px]">{transaction.game}</div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3">
                        <div className="text-xs text-gray-800 dark:text-white font-semibold">{formatReportCurrency(transaction.amount)}</div>
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3">
                        <span
                          className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${statusStyles[transaction.status] || statusStyles.pending}`}
                        >
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <Pagination currentPage={safePage} totalPages={totalPages} totalItems={filteredAndSortedTransactions.length} itemsPerPage={itemsPerPage} itemLabel="transactions" onPageChange={setCurrentPage} showPageSize={false} showSummary={false} showOnlyWhenNeeded />
    </div>
  )
}

export default TransactionsTable
