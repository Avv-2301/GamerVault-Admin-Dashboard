import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const Modal = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Close modal when clicking backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className={`relative w-full ${maxWidth} bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'fadeIn 0.2s ease-out, zoomIn 0.2s ease-out',
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-[#1e2742] bg-gray-50 dark:bg-[#1e2742] flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-1">{title}</h2>
            {subtitle && (
              <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2a3441] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-[#141b2d]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal

