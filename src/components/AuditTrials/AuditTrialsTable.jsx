import { useMemo, useState } from 'react'
import { FaSort, FaSortUp, FaSortDown, FaEye, FaUser, FaCog, FaShieldAlt, FaGamepad, FaCreditCard, FaTag, FaImage, FaServer, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa'
import EmptyState from './EmptyState'
import { formatDate } from '../../services/helper'
import Pagination from '../Common/Pagination'

const AuditTrialsTable = ({ auditLogs = [], pagination = {}, onPageChange, onLimitChange, onViewDetails }) => {
  const [sortField, setSortField] = useState('timestamp')
  const [sortDirection, setSortDirection] = useState('desc')
  const currentPage = pagination.currentPage || 1
  const totalPages = Math.max(1, pagination.totalPages || 1)
  const limit = pagination.limit || 10
  const totalCount = pagination.totalCount || 0

  const sortedLogs = useMemo(() => [...auditLogs].sort((a, b) => {
    const first = a[sortField] ?? ''
    const second = b[sortField] ?? ''
    const comparison = sortField === 'timestamp'
      ? new Date(first).getTime() - new Date(second).getTime()
      : String(first).localeCompare(String(second), undefined, { sensitivity: 'base' })
    return sortDirection === 'asc' ? comparison : -comparison
  }), [auditLogs, sortField, sortDirection])

  const toggleSort = (field) => {
    if (sortField === field) setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDirection('desc') }
  }
  const sortIcon = (field) => sortField !== field ? <FaSort className="inline ml-1" /> : sortDirection === 'asc' ? <FaSortUp className="inline ml-1 text-[#10b981]" /> : <FaSortDown className="inline ml-1 text-[#10b981]" />
  const resourceIcons = { settings: FaCog, security: FaShieldAlt, users: FaUser, games: FaGamepad, transactions: FaCreditCard, discounts: FaTag, banners: FaImage, system: FaServer }
  const statusStyles = {
    success: { className: 'bg-[rgba(16,185,129,0.2)] text-[#10b981]', icon: FaCheckCircle },
    failed: { className: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]', icon: FaTimesCircle },
    warning: { className: 'bg-[rgba(245,158,11,0.2)] text-[#f59e0b]', icon: FaExclamationTriangle },
  }
  const actionStyles = { create: 'text-[#10b981] bg-[rgba(16,185,129,0.15)]', update: 'text-[#3b82f6] bg-[rgba(59,130,246,0.15)]', delete: 'text-[#ef4444] bg-[rgba(239,68,68,0.15)]' }

  if (!sortedLogs.length) return <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden"><EmptyState /></div>

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden max-w-full">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-gray-50 dark:bg-[#1e2742]"><tr>
            <th onClick={() => toggleSort('timestamp')} className="w-[22%] xl:w-[18%] px-2 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase cursor-pointer">Timestamp {sortIcon('timestamp')}</th>
            <th className="w-[27%] xl:w-[20%] px-2 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">User</th>
            <th onClick={() => toggleSort('action')} className="w-[20%] xl:w-[16%] px-2 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase cursor-pointer">Action {sortIcon('action')}</th>
            <th className="hidden xl:table-cell w-[18%] px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">Resource</th>
            <th className="w-[22%] xl:w-[12%] px-2 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">Result</th>
            <th className="w-[9%] xl:w-[4%] px-2 sm:px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">View</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#1e2742]">
            {sortedLogs.map((audit) => {
              const ResourceIcon = resourceIcons[audit.resourceType] || FaServer
              const status = statusStyles[audit.status] || statusStyles.success
              const StatusIcon = status.icon
              const initials = (audit.user.name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
              return <tr key={audit.id} className="hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors">
                <td className="px-2 sm:px-4 py-4 text-xs text-gray-600 dark:text-[#8b8fa3]"><div className="flex items-center gap-1 sm:gap-2 min-w-0"><FaClock className="shrink-0" /><span className="truncate">{formatDate(audit.timestamp)}</span></div></td>
                <td className="px-2 sm:px-4 py-4"><div className="flex items-center gap-2 min-w-0"><div className="hidden sm:flex w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] items-center justify-center text-white text-xs font-semibold">{initials}</div><div className="min-w-0"><div className="text-gray-800 dark:text-white text-xs sm:text-sm font-medium truncate">{audit.user.name}</div><div className="hidden sm:block text-gray-500 dark:text-[#8b8fa3] text-xs truncate">{audit.user.email || audit.user.role}</div></div></div></td>
                <td className="px-2 sm:px-4 py-4"><span className={`inline-flex max-w-full px-1.5 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium capitalize truncate ${actionStyles[audit.action] || 'text-gray-600 bg-gray-100 dark:bg-[#26314a]'}`}>{audit.action} · {audit.method}</span></td>
                <td className="hidden xl:table-cell px-4 py-4"><div className="flex items-center gap-2 min-w-0"><ResourceIcon className="shrink-0 text-gray-500 dark:text-[#8b8fa3]" /><div className="min-w-0"><div className="text-gray-800 dark:text-white text-xs font-medium capitalize">{audit.resourceType}</div><div className="text-gray-500 dark:text-[#8b8fa3] text-xs font-mono truncate" title={audit.endpoint}>{audit.endpoint}</div></div></div></td>
                <td className="px-2 sm:px-4 py-4"><span className={`inline-flex max-w-full items-center gap-1 px-1.5 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium ${status.className}`}><StatusIcon className="shrink-0" /><span className="truncate">{audit.status} · {audit.responseStatus}</span></span></td>
                <td className="px-2 sm:px-4 py-4 text-right"><button onClick={() => onViewDetails(audit)} className="p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#3b82f6] hover:bg-gray-100 dark:hover:bg-[#26314a] rounded-lg" title="View details"><FaEye /></button></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalCount} itemsPerPage={limit} itemLabel="audit logs" onPageChange={onPageChange} onItemsPerPageChange={onLimitChange} />
    </div>
  )
}

export default AuditTrialsTable
