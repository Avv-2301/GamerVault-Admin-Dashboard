import { useState, useRef, useEffect } from 'react'
import { FaChevronDown, FaCheckCircle, FaBan, FaTag, FaStar, FaStarHalf } from 'react-icons/fa'

const BulkActionsDropdown = ({ selectedCount, onAction }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const actions = [
    { id: 'activate', label: 'Activate Games', icon: FaCheckCircle, color: 'text-[#10b981]' },
    { id: 'deactivate', label: 'Deactivate Games', icon: FaBan, color: 'text-[#ef4444]' },
    { id: 'feature', label: 'Feature Games', icon: FaStar, color: 'text-[#fbbf24]' },
    { id: 'unfeature', label: 'Unfeature Games', icon: FaStarHalf, color: 'text-[#8b8fa3]' },
    { id: 'discount', label: 'Assign Discount', icon: FaTag, color: 'text-[#f97316]' },
  ]

  const handleAction = (actionId) => {
    onAction(actionId)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors whitespace-nowrap"
      >
        <span className="hidden sm:inline">Bulk Actions ({selectedCount})</span>
        <span className="sm:hidden">Actions ({selectedCount})</span>
        <FaChevronDown className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-52 sm:w-56 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-200 dark:border-[#1e2742] bg-gray-50 dark:bg-[#1e2742]">
            <div className="text-gray-800 dark:text-white font-semibold text-xs sm:text-sm">Bulk Actions</div>
            <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">{selectedCount} game(s) selected</div>
          </div>
          <div className="py-2">
            {actions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left text-gray-800 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
                >
                  <Icon className={`${action.color} text-sm sm:text-base`} />
                  <span className="text-xs sm:text-sm font-medium">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default BulkActionsDropdown

