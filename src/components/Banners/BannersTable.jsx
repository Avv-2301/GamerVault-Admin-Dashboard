import { formatDateOnly as formatDate, formatDateTime, getBannerPositionLabel as getPositionLabel } from '../../services/helper.js'
import Pagination from "../Common/Pagination";
import { useState, useMemo, useRef, useEffect } from 'react'
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
  FaImage,
  FaDesktop,
  FaMobile,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBan,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import EmptyState from './EmptyState'

const BannersTable = ({ banners = [], filters, selectedBanners, onSelectionChange, onViewDetails, onEditBanner, onPauseBanner, onResumeBanner, onDeleteBanner, onCreateBanner }) => {
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [actionMenuOpen, setActionMenuOpen] = useState(null)
  const actionMenuRef = useRef(null)
  const actionMenuContentRef = useRef(null)
  const [actionMenuPosition, setActionMenuPosition] = useState({ top: 0, left: 0 })

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !actionMenuRef.current?.contains(event.target) &&
        !actionMenuContentRef.current?.contains(event.target)
      ) {
        setActionMenuOpen(null)
      }
    }
    const closeOnViewportChange = () => setActionMenuOpen(null)

    if (actionMenuOpen !== null) {
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('scroll', closeOnViewportChange, true)
      window.addEventListener('resize', closeOnViewportChange)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', closeOnViewportChange, true)
      window.removeEventListener('resize', closeOnViewportChange)
    }
  }, [actionMenuOpen])

  const toggleActionMenu = (event, bannerId) => {
    if (actionMenuOpen === bannerId) {
      setActionMenuOpen(null)
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const menuHeight = 96
    const menuWidth = 192
    const top = rect.bottom + menuHeight + 8 > window.innerHeight
      ? Math.max(8, rect.top - menuHeight - 8)
      : rect.bottom + 8
    const left = Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8))
    setActionMenuPosition({ top, left })
    setActionMenuOpen(bannerId)
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
      onSelectionChange(filteredAndSortedBanners.map((banner) => banner.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectBanner = (bannerId) => {
    if (selectedBanners.includes(bannerId)) {
      onSelectionChange(selectedBanners.filter((id) => id !== bannerId))
    } else {
      onSelectionChange([...selectedBanners, bannerId])
    }
  }

  const handleAction = (action, banner) => {
    setActionMenuOpen(null)
    if (action === 'view') {
      onViewDetails(banner)
    } else if (action === 'edit') {
      onEditBanner(banner)
    } else if (action === 'pause' || action === 'resume') {
      if (action === 'pause') onPauseBanner(banner)
      else onResumeBanner(banner)
    } else if (action === 'duplicate') {
      // TODO: Implement duplicate
      console.log('Duplicate banner:', banner.id)
    } else if (action === 'delete') {
      onDeleteBanner(banner)
    } else {
      // TODO: Implement other actions
      console.log('Action:', action, 'Banner ID:', banner.id)
    }
  }

  // Filter and sort banners
  const filteredAndSortedBanners = useMemo(() => {
    let filtered = [...banners]

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(
        (banner) =>
          banner.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          banner.id.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.position !== 'all') {
      filtered = filtered.filter((banner) => banner.position === filters.position)
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter((banner) => banner.status === filters.status)
    }

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField]
        let bValue = b[sortField]

        if (sortField === 'title' || sortField === 'position') {
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
  }, [banners, filters, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBanners.length / itemsPerPage)
  const paginatedBanners = filteredAndSortedBanners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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


  const getDeviceIcons = (deviceTypes) => {
    return deviceTypes.map((device) => {
      if (device === 'desktop') return <FaDesktop key={device} className="text-gray-500 dark:text-[#8b8fa3] text-xs" />
      if (device === 'mobile') return <FaMobile key={device} className="text-gray-500 dark:text-[#8b8fa3] text-xs" />
      return null
    })
  }

  // Show empty state if no banners
  if (filteredAndSortedBanners.length === 0) {
    return (
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden">
        <EmptyState onCreateBanner={onCreateBanner} />
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
                  checked={selectedBanners.length === paginatedBanners.length && paginatedBanners.length > 0}
                  onChange={handleSelectAll}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                />
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider min-w-[80px]">
                Banner
              </th>
              <th
                className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors min-w-[140px]"
                onClick={() => handleSort('title')}
              >
                Title {getSortIcon('title')}
              </th>
              <th
                className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:table-cell min-w-[120px]"
                onClick={() => handleSort('position')}
              >
                Position {getSortIcon('position')}
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden md:table-cell min-w-[80px]">
                Devices
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
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden xl:table-cell min-w-[120px]">
                Performance
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
            {paginatedBanners.map((banner) => (
              <tr
                key={banner.id}
                className={`hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors ${
                  selectedBanners.includes(banner.id) ? 'bg-[rgba(16,185,129,0.1)]' : ''
                }`}
              >
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                  <input
                    type="checkbox"
                    checked={selectedBanners.includes(banner.id)}
                    onChange={() => handleSelectBanner(banner.id)}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                  />
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                  <div className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] flex-shrink-0">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1920x600'
                      }}
                    />
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                  <div className="min-w-0">
                    <div className="text-gray-800 dark:text-white font-medium text-xs sm:text-sm mb-0.5 truncate" title={banner.title}>{banner.title}</div>
                    <div className="text-gray-500 dark:text-[#8b8fa3] text-xs font-mono truncate" title={banner.id}>{banner.id}</div>
                    {banner.link && (
                      <a
                        href={banner.link}
                        target={banner.target}
                        rel={banner.target === '_blank' ? 'noopener noreferrer' : ''}
                        className="inline-flex items-center gap-1 text-[#3b82f6] text-xs mt-1 hover:text-[#60a5fa] transition-colors"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        <span className="hidden sm:inline">View Link</span>
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden sm:table-cell">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] text-xs rounded capitalize whitespace-nowrap">
                    {getPositionLabel(banner.position)}
                  </span>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden md:table-cell">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {getDeviceIcons(banner.deviceTypes)}
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                  <div className="flex items-center">
                    {getStatusBadge(banner.status)}
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden lg:table-cell">
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs whitespace-nowrap">{formatDateTime(banner.startDate)}</div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden lg:table-cell">
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs whitespace-nowrap">{formatDateTime(banner.endDate)}</div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden xl:table-cell">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="text-gray-800 dark:text-white text-xs font-medium">
                      {(banner.clicks || 0).toLocaleString()} clicks
                    </div>
                    <div className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                      {(banner.impressions || 0).toLocaleString()} views
                    </div>
                    {banner.impressions > 0 && (
                      <div className="text-[#10b981] text-xs">
                        {((banner.clicks / banner.impressions) * 100).toFixed(2)}% CTR
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden xl:table-cell">
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs truncate" title={banner.createdBy}>{banner.createdBy}</div>
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <button
                      onClick={() => handleAction('view', banner)}
                      className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#3b82f6] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                      title="View details"
                    >
                      <FaEye className="text-xs sm:text-sm" />
                    </button>
                    <button
                      onClick={() => handleAction('edit', banner)}
                      className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#10b981] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="text-xs sm:text-sm" />
                    </button>
                    {banner.status === 'active' ? (
                      <button
                        onClick={() => handleAction('pause', banner)}
                        className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#f97316] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                        title="Pause"
                      >
                        <FaPause className="text-xs sm:text-sm" />
                      </button>
                    ) : banner.status === 'disabled' ? (
                      <button
                        onClick={() => handleAction('resume', banner)}
                        className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#10b981] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                        title="Resume"
                      >
                        <FaPlay className="text-xs sm:text-sm" />
                      </button>
                    ) : null}
                    <div>
                      <button
                        ref={actionMenuOpen === banner.id ? actionMenuRef : null}
                        onClick={(event) => toggleActionMenu(event, banner.id)}
                        className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                        title="More actions"
                      >
                        <FaEllipsisV className="text-xs sm:text-sm" />
                      </button>
                      {actionMenuOpen === banner.id && createPortal(
                        <div
                          ref={actionMenuContentRef}
                          style={{ top: actionMenuPosition.top, left: actionMenuPosition.left }}
                          className="fixed w-48 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-xl overflow-hidden z-[110]"
                        >
                          <button
                            onClick={() => handleAction('duplicate', banner)}
                            className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 text-left text-gray-800 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-xs sm:text-sm"
                          >
                            <FaCopy className="text-xs" />
                            Duplicate Banner
                          </button>
                          <div className="border-t border-gray-200 dark:border-[#1e2742]"></div>
                          <button
                            onClick={() => handleAction('delete', banner)}
                            className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 text-left text-[#ef4444] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-xs sm:text-sm"
                          >
                            <FaTrash className="text-xs" />
                            Delete
                          </button>
                        </div>,
                        document.body
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredAndSortedBanners.length} itemsPerPage={itemsPerPage} itemLabel="banners" onPageChange={setCurrentPage} onItemsPerPageChange={(size) => { setItemsPerPage(size); setCurrentPage(1); }} />
    </div>
  )
}

export default BannersTable
