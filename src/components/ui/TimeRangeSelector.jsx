import { useState, useRef, useEffect } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'

const TimeRangeSelector = ({ onRangeChange, defaultRange = 'all' }) => {
  const [selectedRange, setSelectedRange] = useState(defaultRange)
  const [isCustomOpen, setIsCustomOpen] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const containerRef = useRef(null)

  const ranges = [
    { value: 'all', label: 'All' },
    { value: '7D', label: '7D' },
    { value: '30D', label: '30D' },
    { value: '90D', label: '90D' },
    { value: '365D', label: '365D' },
    { value: 'custom', label: 'Custom' },
  ]

  // Close custom date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsCustomOpen(false)
      }
    }

    if (isCustomOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCustomOpen])

  const handleRangeSelect = (range) => {
    if (range === 'custom') {
      setIsCustomOpen(true)
    } else {
      setSelectedRange(range)
      setIsCustomOpen(false)
      if (onRangeChange) {
        onRangeChange(range, null)
      }
    }
  }

  const handleCustomDateApply = () => {
    if (startDate && endDate) {
      if (onRangeChange) {
        onRangeChange('custom', { startDate, endDate })
      }
      setSelectedRange('custom')
      setIsCustomOpen(false)
    }
  }

  return (
    <div className="relative inline-flex" ref={containerRef}>
      <div className="flex items-center gap-0 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg overflow-hidden">
        {ranges.map((range) => (
          <button
            key={range.value}
            onClick={() => handleRangeSelect(range.value)}
            className={`px-3 py-2 text-sm font-medium transition-all whitespace-nowrap ${
              selectedRange === range.value
                ? 'bg-gray-100 dark:bg-[#1e2742] text-[#10b981] border-b-2 border-[#10b981]'
                : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Custom Date Range Picker */}
      {isCustomOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-lg z-50 p-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <FaCalendarAlt className="text-[#10b981] text-sm" />
              <h3 className="text-gray-800 dark:text-white font-semibold text-sm">Select Date Range</h3>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs mb-1.5">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate || undefined}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs mb-1.5">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || undefined}
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setIsCustomOpen(false)
              }}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#8b8fa3] rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#2a3441] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCustomDateApply}
              disabled={!startDate || !endDate}
              className="flex-1 px-4 py-2 bg-gradient-to-br from-[#10b981] to-[#059669] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeRangeSelector
