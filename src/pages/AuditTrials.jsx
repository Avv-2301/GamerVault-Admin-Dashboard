import { useCallback, useEffect, useState } from 'react'
import { FaDownload, FaSyncAlt } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import AuditTrialsSummary from '../components/AuditTrials/AuditTrialsSummary'
import AuditTrialsFilters from '../components/AuditTrials/AuditTrialsFilters'
import AuditTrialsTable from '../components/AuditTrials/AuditTrialsTable'
import AuditDetailDrawer from '../components/AuditTrials/AuditDetailDrawer'
import LoadingState from '../components/AuditTrials/LoadingState'
import { getAuditLogStats, getAuditLogs } from '../services/api/auditLogs'
import { getAuditDateParams, mapAuditLog } from '../services/helper'

const defaultFilters = {
  search: '', actionType: 'all', resourceType: 'all', user: '', dateRange: 'all', status: 'all',
}

const AuditTrials = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [filters, setFilters] = useState(defaultFilters)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedAudit, setSelectedAudit] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [auditLogs, setAuditLogs] = useState([])
  const [stats, setStats] = useState({})
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalCount: 0, limit: 10 })
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const loadAuditData = useCallback(async () => {
    setIsLoading(true)
    setLoadError('')
    const dateParams = getAuditDateParams(filters.dateRange)
    const params = {
      page,
      limit,
      ...dateParams,
      ...(filters.search.trim() ? { search: filters.search.trim() } : {}),
      ...(filters.actionType !== 'all' ? { actionType: filters.actionType } : {}),
      ...(filters.resourceType !== 'all' ? { resourceType: filters.resourceType } : {}),
      ...(filters.user.trim() ? { user: filters.user.trim() } : {}),
      ...(filters.status !== 'all' ? { status: filters.status } : {}),
    }

    try {
      const [logsResponse, statsResponse] = await Promise.all([
        getAuditLogs(params),
        getAuditLogStats(dateParams),
      ])
      const result = logsResponse?.data || {}
      setAuditLogs((result.auditLogs || []).map(mapAuditLog))
      setPagination(result.pagination || { currentPage: page, totalPages: 1, totalCount: 0, limit })
      setStats(statsResponse?.data || {})
    } catch (error) {
      console.error('Unable to load audit logs:', error)
      setLoadError(error?.response?.data?.meta?.message || error?.message || 'Could not load audit logs.')
      setAuditLogs([])
      setPagination({ currentPage: page, totalPages: 1, totalCount: 0, limit })
    } finally {
      setIsLoading(false)
    }
  }, [filters, page, limit])

  useEffect(() => {
    const timer = window.setTimeout(loadAuditData, filters.search ? 300 : 0)
    return () => window.clearTimeout(timer)
  }, [loadAuditData, filters.search])

  const handleFiltersChange = (update) => {
    setFilters((previous) => typeof update === 'function' ? update(previous) : update)
    setPage(1)
  }

  const handleExport = () => {
    const fields = ['timestamp', 'user', 'method', 'endpoint', 'responseStatus', 'ipAddress', 'duration']
    const csv = [fields.join(','), ...auditLogs.map((log) => fields.map((field) => {
      const value = field === 'user' ? log.user.name : log[field] ?? ''
      return `"${String(value).replaceAll('"', '""')}"`
    }).join(','))].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'audit-trials.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] overflow-x-hidden max-w-full">
      <Header />
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-gray-900 dark:text-white text-3xl font-bold mb-2">Audit Trials</h1>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Complete audit trail of administrative actions and system changes</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadAuditData} disabled={isLoading} className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-4 py-2.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] disabled:opacity-50">
              <FaSyncAlt className={isLoading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button onClick={handleExport} disabled={!auditLogs.length} className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-4 py-2.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] disabled:opacity-50">
              <FaDownload className="text-sm" /> Export Logs
            </button>
          </div>
        </div>
        <AuditTrialsSummary stats={stats} />
        <div className="mt-6 mb-6">
          <AuditTrialsFilters filters={filters} onFiltersChange={handleFiltersChange} isOpen={isFiltersOpen} onToggle={() => setIsFiltersOpen(!isFiltersOpen)} />
        </div>
      </div>
      {isLoading ? <LoadingState /> : loadError ? (
        <div className="bg-white dark:bg-[#141b2d] border border-red-200 dark:border-red-900/50 rounded-xl p-8 text-center">
          <p className="text-red-600 dark:text-red-400 text-sm mb-4">{loadError}</p>
          <button onClick={loadAuditData} className="px-4 py-2 rounded-lg bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669]">Try again</button>
        </div>
      ) : (
        <AuditTrialsTable
          auditLogs={auditLogs}
          pagination={pagination}
          onPageChange={setPage}
          onLimitChange={(nextLimit) => { setLimit(nextLimit); setPage(1) }}
          onViewDetails={(audit) => { setSelectedAudit(audit); setIsDrawerOpen(true) }}
        />
      )}
      <AuditDetailDrawer isOpen={isDrawerOpen} onClose={() => { setIsDrawerOpen(false); setSelectedAudit(null) }} audit={selectedAudit} />
    </main>
  )
}

export default AuditTrials
