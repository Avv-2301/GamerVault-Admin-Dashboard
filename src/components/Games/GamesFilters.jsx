import { FaSearch, FaFilter, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa'

const GamesFilters = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const categories = [
    'All Categories',
    'Action',
    'Adventure',
    'RPG',
    'Strategy',
    'Sports',
    'Racing',
    'Puzzle',
    'Simulation',
    'Horror',
  ]

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: 'all',
      category: 'all',
    })
  }

  const hasActiveFilters = filters.status !== 'all' || filters.category !== 'all' || filters.search

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg overflow-hidden">
      {/* Filter Toggle Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-200 dark:border-[#1e2742]">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 text-gray-800 dark:text-[#e0e0e0] hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FaFilter className="text-xs sm:text-sm" />
          <span className="text-xs sm:text-sm font-medium">Filters</span>
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
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Search Games</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm" />
              </div>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by game name..."
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat === 'All Categories' ? 'all' : cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GamesFilters

