import { useState } from 'react'
import { FaSearch, FaFilter, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa'

const BannersFilters = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      position: 'all',
      status: 'all',
      dateRange: 'all',
      createdBy: 'all',
    })
  }

  const hasActiveFilters =
    filters.search ||
    filters.position !== 'all' ||
    filters.status !== 'all' ||
    filters.dateRange !== 'all' ||
    filters.createdBy !== 'all'

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg overflow-hidden sticky top-0 z-10 max-w-full">
      {/* Filter Toggle Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-200 dark:border-[#1e2742] bg-white dark:bg-[#141b2d]">
        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 sm:gap-2 text-gray-800 dark:text-[#e0e0e0] hover:text-gray-900 dark:hover:text-white transition-colors"
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
            <span className="hidden sm:inline">Clear all</span>
          </button>
        )}
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-white dark:bg-[#141b2d]">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">
              Search (Banner Title or ID)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm" />
              </div>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by banner title or ID..."
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Position Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Position</label>
              <select
                value={filters.position}
                onChange={(e) => handleFilterChange('position', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Positions</option>
                <option value="homepage-hero">Homepage Hero</option>
                <option value="homepage-featured">Homepage Featured</option>
                <option value="homepage-sidebar">Homepage Sidebar</option>
                <option value="category-header">Category Header</option>
                <option value="game-page">Game Page</option>
              </select>
            </div>

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
                <option value="scheduled">Scheduled</option>
                <option value="expired">Expired</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            {/* Created By Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Created By</label>
              <select
                value={filters.createdBy}
                onChange={(e) => handleFilterChange('createdBy', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Admins</option>
                <option value="john">John Doe</option>
                <option value="jane">Jane Smith</option>
                <option value="admin">Admin User</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BannersFilters

