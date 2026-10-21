import { FaSearch, FaFilter, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa'

const inputClass = 'w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all'

const AuditTrialsFilters = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const update = (key, value) => onFiltersChange((previous) => ({ ...previous, [key]: value }))
  const clear = () => onFiltersChange({ search: '', actionType: 'all', resourceType: 'all', user: '', dateRange: 'all', status: 'all' })
  const active = filters.search || filters.actionType !== 'all' || filters.resourceType !== 'all' || filters.user || filters.dateRange !== 'all' || filters.status !== 'all'

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-[#1e2742]">
        <button onClick={onToggle} className="flex items-center gap-2 text-gray-800 dark:text-[#e0e0e0]">
          <FaFilter className="text-sm" /><span className="text-sm font-medium">Filters</span>{isOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
        </button>
        {active && <button onClick={clear} className="flex items-center gap-1 text-gray-600 dark:text-[#8b8fa3] hover:text-[#ef4444] text-xs"><FaTimes /><span>Clear all</span></button>}
      </div>
      {isOpen && (
        <div className="p-4 space-y-4">
          <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">Search logs
            <div className="relative mt-2"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" /><input value={filters.search} onChange={(e) => update('search', e.target.value)} placeholder="Endpoint, user, IP address..." className={`${inputClass} pl-10`} /></div>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <label className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">Action
              <select value={filters.actionType} onChange={(e) => update('actionType', e.target.value)} className={`${inputClass} mt-2`}>
                <option value="all">All actions</option><option value="create">Create (POST)</option><option value="update">Update (PUT/PATCH)</option><option value="delete">Delete</option>
              </select>
            </label>
            <label className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">Resource
              <select value={filters.resourceType} onChange={(e) => update('resourceType', e.target.value)} className={`${inputClass} mt-2`}>
                <option value="all">All resources</option><option value="settings">Settings</option><option value="users">Users</option><option value="games">Games</option><option value="transactions">Transactions</option><option value="discounts">Discounts</option><option value="banners">Banners</option><option value="security">Security</option><option value="system">System</option>
              </select>
            </label>
            <label className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">User
              <input value={filters.user} onChange={(e) => update('user', e.target.value)} placeholder="Name or email" className={`${inputClass} mt-2`} />
            </label>
            <label className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">Date range
              <select value={filters.dateRange} onChange={(e) => update('dateRange', e.target.value)} className={`${inputClass} mt-2`}>
                <option value="1">Last 24 hours</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="365">Last year</option><option value="all">All time</option>
              </select>
            </label>
            <label className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">Result
              <select value={filters.status} onChange={(e) => update('status', e.target.value)} className={`${inputClass} mt-2`}>
                <option value="all">All results</option><option value="success">Successful</option><option value="failed">Failed (4xx)</option><option value="warning">Server errors (5xx)</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuditTrialsFilters
