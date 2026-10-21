import { useEffect } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa'

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const typeStyles = {
    success: {
      bg: 'bg-[rgba(16,185,129,0.2)]',
      border: 'border-[#10b981]',
      text: 'text-[#10b981]',
      icon: FaCheckCircle,
    },
    error: {
      bg: 'bg-[rgba(239,68,68,0.2)]',
      border: 'border-[#ef4444]',
      text: 'text-[#ef4444]',
      icon: FaExclamationCircle,
    },
    warning: {
      bg: 'bg-[rgba(249,115,22,0.2)]',
      border: 'border-[#f97316]',
      text: 'text-[#f97316]',
      icon: FaExclamationTriangle,
    },
    info: {
      bg: 'bg-[rgba(59,130,246,0.2)]',
      border: 'border-[#3b82f6]',
      text: 'text-[#3b82f6]',
      icon: FaInfoCircle,
    },
  }

  const style = typeStyles[type] || typeStyles.info
  const Icon = style.icon

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 bg-[#141b2d] border-l-4 ${style.border} ${style.bg} rounded-lg shadow-lg min-w-[300px] max-w-md`}
      style={{
        animation: 'slideInFromRight 0.3s ease-out, fadeIn 0.3s ease-out',
      }}
    >
      <Icon className={`${style.text} text-lg flex-shrink-0`} />
      <p className={`${style.text} text-sm font-medium flex-1`}>{message}</p>
      <button
        onClick={onClose}
        className={`${style.text} hover:opacity-70 transition-opacity flex-shrink-0`}
        aria-label="Close notification"
      >
        <FaTimes className="text-sm" />
      </button>
    </div>
  )
}

export default Toast

