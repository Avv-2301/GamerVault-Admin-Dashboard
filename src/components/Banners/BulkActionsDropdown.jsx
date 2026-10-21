import { useState, useRef, useEffect } from 'react'
import { FaChevronDown, FaPause, FaPlay, FaTrash, FaCopy } from 'react-icons/fa'

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

  const handleAction = (action) => {
    setIsOpen(false)
    onAction(action)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
      >
        <span>{selectedCount} selected</span>
        <FaChevronDown className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-44 sm:w-48 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-lg overflow-hidden z-50">
          <div className="py-1">
            <button
              onClick={() => handleAction('activate')}
              className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 text-left text-gray-800 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-xs sm:text-sm"
            >
              <FaPlay className="text-xs" />
              Activate Selected
            </button>
            <button
              onClick={() => handleAction('pause')}
              className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 text-left text-gray-800 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-xs sm:text-sm"
            >
              <FaPause className="text-xs" />
              Pause Selected
            </button>
            <button
              onClick={() => handleAction('duplicate')}
              className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 text-left text-gray-800 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-xs sm:text-sm"
            >
              <FaCopy className="text-xs" />
              Duplicate Selected
            </button>
            <div className="border-t border-gray-200 dark:border-[#1e2742] my-1"></div>
            <button
              onClick={() => handleAction('delete')}
              className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 text-left text-[#ef4444] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-xs sm:text-sm"
            >
              <FaTrash className="text-xs" />
              Delete Selected
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BulkActionsDropdown

