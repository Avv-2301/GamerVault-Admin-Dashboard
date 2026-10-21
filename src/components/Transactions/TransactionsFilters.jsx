import { useState } from 'react'
import { FaSearch, FaFilter, FaChevronDown, FaChevronUp, FaTimes, FaCalendarAlt } from 'react-icons/fa'

const TransactionsFilters = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({ ...prev, [key]: value }))
  }

  const handleAmountRangeChange = (field, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      amountRange: { ...prev.amountRange, [field]: value },
    }))
  }

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      dateRange: 'all',
      spentType: 'all',
      transactionType: 'all',
      paymentMethod: 'all',
      amountRange: { min: '', max: '' },
    })
  }

  const hasActiveFilters =
    filters.search ||
    filters.dateRange !== 'all' ||
    filters.spentType !== 'all' ||
    filters.transactionType !== 'all' ||
    filters.paymentMethod !== 'all' ||
    filters.amountRange.min ||
    filters.amountRange.max

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
              Search (Transaction ID, User ID, Email)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500 dark:text-[#8b8fa3] text-sm" />
              </div>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search transactions..."
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] pl-10 pr-4 py-2.5 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
                <option value="year">Last Year</option>
              </select>
            </div>

            {/* Spent Type Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Spent Type</label>
              <select
                value={filters.spentType}
                onChange={(e) => handleFilterChange('spentType', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Types</option>
                <option value="purchase">Game Purchase</option>
                <option value="top-up">Wallet Top-Up</option>
                <option value="refund">Refund</option>
              </select>
            </div>

            {/* Transaction Type Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Transaction Type</label>
              <select
                value={filters.transactionType}
                onChange={(e) => handleFilterChange('transactionType', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="purchase">Purchase</option>
              </select>
            </div>

            {/* Payment Method Filter */}
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Payment Method</label>
              <select
                value={filters.paymentMethod}
                onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              >
                <option value="all">All Methods</option>
                <option value="card">Credit/Debit Card</option>
                <option value="wallet">Wallet</option>
                <option value="stripe">Stripe</option>
                <option value="razorpay">Razorpay</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>

          {/* Amount Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Min Amount</label>
              <input
                type="number"
                value={filters.amountRange.min}
                onChange={(e) => handleAmountRangeChange('min', e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Max Amount</label>
              <input
                type="number"
                value={filters.amountRange.max}
                onChange={(e) => handleAmountRangeChange('max', e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionsFilters

