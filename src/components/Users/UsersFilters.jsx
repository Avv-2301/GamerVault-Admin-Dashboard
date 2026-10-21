import { useState } from 'react'
import { FaSearch, FaFilter, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa'

const UsersFilters = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: 'all',
      role: 'all',
      verified: 'all',
    })
  }

  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.role !== 'all' ||
    filters.verified !== 'all' ||
    filters.search

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg overflow-hidden">
      {/* Filter Toggle Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-[#1e2742]">
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
        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">
              Search Users
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500 dark:text-[#8b8fa3] text-sm" />
              </div>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by name or email..."
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] pl-10 pr-4 py-2.5 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Role</label>
              <select
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* Verified Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">
                Verification
              </label>
              <select
                value={filters.verified}
                onChange={(e) => handleFilterChange('verified', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Users</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersFilters

