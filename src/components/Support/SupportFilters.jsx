import { FaSearch, FaFilter, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa'

const SupportFilters = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: 'all',
      priority: 'all',
      category: 'all',
      assignedTo: 'all',
      dateRange: 'all',
    })
  }

  const hasActiveFilters =
    filters.search ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all' ||
    filters.assignedTo !== 'all' ||
    filters.dateRange !== 'all'

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg overflow-hidden sticky top-0 z-10">
      {/* Filter Toggle Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-[#1e2742] bg-white dark:bg-[#141b2d]">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 text-gray-800 dark:text-[#e0e0e0] hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FaFilter className="text-sm" />
          <span className="text-sm font-medium">Filters</span>
          {isOpen ? (
            <FaChevronUp className="text-xs ml-1" />
          ) : (
            <FaChevronDown className="text-xs ml-1" />
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-gray-600 dark:text-[#8b8fa3] hover:text-[#ef4444] text-xs transition-colors"
          >
            <FaTimes className="text-xs" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 space-y-4 bg-white dark:bg-[#141b2d]">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">
              Search (Ticket ID, User ID, or Email)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500 dark:text-[#8b8fa3] text-sm" />
              </div>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search tickets..."
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] pl-10 pr-4 py-2.5 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-5 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Categories</option>
                <option value="payment">Payment</option>
                <option value="game">Game</option>
                <option value="account">Account</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Assigned To Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Assigned To</label>
              <select
                value={filters.assignedTo}
                onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Admins</option>
                <option value="alex">Alex Morgan</option>
                <option value="john">John Doe</option>
                <option value="jane">Jane Smith</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SupportFilters

