import { formatDateTime } from '../../services/helper.js'
import Pagination from "../Common/Pagination";
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaEdit,
  FaPause,
  FaPlay,
  FaCopy,
  FaTrash,
  FaEllipsisV,
  FaTag,
  FaGamepad,
  FaFolder,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBan,
} from 'react-icons/fa'
import EmptyState from './EmptyState'

const DiscountsTable = ({ discounts = [], filters, selectedDiscounts, onSelectionChange, onViewDetails, onEdit, onRequestAction }) => {
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [actionMenuOpen, setActionMenuOpen] = useState(null)
  const [actionMenuPosition, setActionMenuPosition] = useState({ top: 0, left: 0 })
  const actionMenuRef = useRef(null)
  const actionButtonRef = useRef(null)

  // Close action menu when clicking outside
  useEffect(() => {
    const closeMenu = () => setActionMenuOpen(null)
    const handleClickOutside = (event) => {
      if (!actionMenuRef.current?.contains(event.target) && !actionButtonRef.current?.contains(event.target)) {
        setActionMenuOpen(null)
      }
    }

    if (actionMenuOpen !== null) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('scroll', closeMenu, true)
      window.addEventListener('resize', closeMenu)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', closeMenu, true)
      window.removeEventListener('resize', closeMenu)
    }
  }, [actionMenuOpen])

  const openActionMenu = (event, discountId) => {
    if (actionMenuOpen === discountId) {
      setActionMenuOpen(null)
      return
    }
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const menuWidth = 192
    const menuHeight = 90
    actionButtonRef.current = button
    setActionMenuPosition({
      top: rect.bottom + menuHeight + 8 <= window.innerHeight ? rect.bottom + 8 : Math.max(8, rect.top - menuHeight - 8),
      left: Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8)),
    })
    setActionMenuOpen(discountId)
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(filteredAndSortedDiscounts.map((discount) => discount.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectDiscount = (discountId) => {
    if (selectedDiscounts.includes(discountId)) {
      onSelectionChange(selectedDiscounts.filter((id) => id !== discountId))
    } else {
      onSelectionChange([...selectedDiscounts, discountId])
    }
  }

  const handleAction = (action, discount) => {
    setActionMenuOpen(null)
    if (action === 'view') {
      onViewDetails(discount)
    } else if (action === 'edit') {
      onEdit(discount)
    } else if (action === 'pause' || action === 'resume') {
      onRequestAction(action, discount)
    } else if (action === 'duplicate') {
      // TODO: Implement duplicate
      console.log('Duplicate discount:', discount.id)
    } else if (action === 'delete') {
      onRequestAction('delete', discount)
    } else {
      // TODO: Implement other actions
      console.log('Action:', action, 'Discount ID:', discount.id)
    }
  }

  // Filter and sort discounts
  const filteredAndSortedDiscounts = (() => {
    let filtered = [...discounts]

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(
        (discount) =>
          discount.name.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.scope !== 'all') {
      filtered = filtered.filter((discount) => discount.scope === filters.scope)
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter((discount) => discount.status === filters.status)
    }

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField]
        let bValue = b[sortField]

        if (sortField === 'name') {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        } else if (sortField === 'startDate' || sortField === 'endDate' || sortField === 'createdAt') {
          aValue = new Date(aValue)
          bValue = new Date(bValue)
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
  })()

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedDiscounts.length / itemsPerPage)
  const paginatedDiscounts = filteredAndSortedDiscounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const activeMenuDiscount = paginatedDiscounts.find((discount) => discount.id === actionMenuOpen)

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="inline ml-1 text-gray-500 dark:text-[#8b8fa3]" />
    return sortDirection === 'asc' ? (
      <FaSortUp className="inline ml-1 text-[#10b981]" />
    ) : (
      <FaSortDown className="inline ml-1 text-[#10b981]" />
    )
  }


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
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${styles[status] || styles.active}`}>
        <Icon className="text-xs" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getScopeIcon = (scope) => {
    switch (scope) {
      case 'game':
        return FaGamepad
      case 'category':
        return FaFolder
      default:
        return FaTag
    }
  }

  // Show empty state if no discounts
  if (filteredAndSortedDiscounts.length === 0) {
    return (
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden">
        <EmptyState onCreateDiscount={() => console.log('Create discount')} />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden max-w-full">
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-[700px] sm:min-w-[800px] md:min-w-[900px] lg:min-w-[1000px]">
          <thead className="bg-gray-50 dark:bg-[#1e2742] sticky top-0 z-10">
            <tr>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedDiscounts.length === paginatedDiscounts.length && paginatedDiscounts.length > 0}
                  onChange={handleSelectAll}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                />
              </th>
              <th
                className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors min-w-[140px]"
                onClick={() => handleSort('name')}
              >
                Discount Name {getSortIcon('name')}
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden sm:table-cell min-w-[120px]">
                Scope
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden md:table-cell min-w-[120px]">
                Games Affected
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider min-w-[90px]">
                Status
              </th>
              <th
                className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors hidden lg:table-cell min-w-[130px]"
                onClick={() => handleSort('startDate')}
              >
                Start Date {getSortIcon('startDate')}
              </th>
              <th
                className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors hidden lg:table-cell min-w-[130px]"
                onClick={() => handleSort('endDate')}
              >
                End Date {getSortIcon('endDate')}
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden xl:table-cell min-w-[100px]">
                Created By
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider min-w-[100px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#1e2742]">
            {paginatedDiscounts.map((discount) => (
              <tr
                key={discount.id}
                className={`hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors ${
                  selectedDiscounts.includes(discount.id) ? 'bg-[rgba(16,185,129,0.1)]' : ''
                }`}
              >
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                  <input
                    type="checkbox"
                    checked={selectedDiscounts.includes(discount.id)}
                    onChange={() => handleSelectDiscount(discount.id)}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                  />
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                  <div className="min-w-0">
                    <div className="text-gray-800 dark:text-white font-medium text-xs sm:text-sm mb-0.5 truncate" title={discount.name}>{discount.name}</div>
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden sm:table-cell">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    {(() => {
                      const ScopeIcon = getScopeIcon(discount.scope)
                      return <ScopeIcon className="text-gray-500 dark:text-[#8b8fa3] text-xs flex-shrink-0" />
                    })()}
                    <span className="text-gray-600 dark:text-[#8b8fa3] text-xs capitalize truncate">{discount.scope}</span>
                  </div>
                  <div className="text-gray-400 dark:text-[#6b7280] text-xs mt-0.5 truncate max-w-[120px]" title={discount.scopeDetails}>
                    {discount.scopeDetails}
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden md:table-cell">
                  <div className="flex flex-col min-w-0">
                    <span className="text-gray-800 dark:text-white text-xs sm:text-sm font-medium">{discount.gamesAffected ?? '—'}</span>
                    {discount.gamesPreview.length > 0 && (
                      <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mt-1 truncate max-w-[150px]" title={discount.gamesPreview.join(', ')}>
                        {discount.gamesPreview.slice(0, 2).join(', ')}
                        {discount.gamesPreview.length > 2 && '...'}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                  <div className="flex items-center">
                    {getStatusBadge(discount.status)}
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden lg:table-cell">
                  <div className="text-gray-500 dark:text-[#8b8fa3] text-xs whitespace-nowrap">{formatDateTime(discount.startDate)}</div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden lg:table-cell">
                  <div className="text-gray-500 dark:text-[#8b8fa3] text-xs whitespace-nowrap">{formatDateTime(discount.endDate)}</div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden xl:table-cell">
                  <div className="text-gray-500 dark:text-[#8b8fa3] text-xs truncate" title={discount.createdBy}>{discount.createdBy}</div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <button
                      onClick={() => handleAction('view', discount)}
                      className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#3b82f6] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                      title="View details"
                    >
                      <FaEye className="text-xs sm:text-sm" />
                    </button>
                    <button
                      onClick={() => handleAction('edit', discount)}
                      className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#10b981] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="text-xs sm:text-sm" />
                    </button>
                    {discount.status === 'active' ? (
                      <button
                        onClick={() => handleAction('pause', discount)}
                        className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#f97316] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                        title="Pause"
                      >
                        <FaPause className="text-xs sm:text-sm" />
                      </button>
                    ) : discount.status === 'disabled' ? (
                      <button
                        onClick={() => handleAction('resume', discount)}
                        className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#10b981] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                        title="Resume"
                      >
                        <FaPlay className="text-xs sm:text-sm" />
                      </button>
                    ) : null}
                    <div>
                      <button
                        onClick={(event) => openActionMenu(event, discount.id)}
                        className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                        title="More actions"
                        aria-haspopup="menu"
                        aria-expanded={actionMenuOpen === discount.id}
                      >
                        <FaEllipsisV className="text-xs sm:text-sm" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredAndSortedDiscounts.length} itemsPerPage={itemsPerPage} itemLabel="discounts" onPageChange={setCurrentPage} onItemsPerPageChange={(size) => { setItemsPerPage(size); setCurrentPage(1); }} />
      {activeMenuDiscount && createPortal(
        <div
          ref={actionMenuRef}
          role="menu"
          style={{ top: actionMenuPosition.top, left: actionMenuPosition.left }}
          className="fixed w-48 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-lg overflow-hidden z-[100]"
        >
          <button
            role="menuitem"
            onClick={() => handleAction('duplicate', activeMenuDiscount)}
            className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-800 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-xs sm:text-sm"
          >
            <FaCopy className="text-xs" />
            Duplicate Discount
          </button>
          <div className="border-t border-gray-200 dark:border-[#1e2742]"></div>
          <button
            role="menuitem"
            onClick={() => handleAction('delete', activeMenuDiscount)}
            className="w-full flex items-center gap-2 px-4 py-2 text-left text-[#ef4444] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-xs sm:text-sm"
          >
            <FaTrash className="text-xs" />
            Delete
          </button>
        </div>,
        document.body
      )}
    </div>
  )
}

export default DiscountsTable


