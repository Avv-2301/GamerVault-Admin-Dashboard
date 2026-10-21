import { FaPlus, FaUser, FaTag, FaFile, FaDownload, FaCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const QuickActions = () => {
  const navigate = useNavigate()
  const actions = [
    { icon: FaPlus, label: 'Add New Game', color: 'green', path: '/dashboard/games/create' },
    { icon: FaUser, label: 'Create User', color: 'blue', path: '/dashboard/users/create' },
    { icon: FaTag, label: 'Create Discount', color: 'orange', path: '/dashboard/discounts/create' },
    { icon: FaFile, label: 'Generate Report', color: 'purple', path: '/dashboard/reports' },
    { icon: FaDownload, label: 'Export Data', color: 'green', path: '/dashboard/reports' },
    { icon: FaCog, label: 'System Settings', color: 'purple', path: '/dashboard/settings' },
  ]

  const iconColors = {
    green: 'text-[#10b981]',
    blue: 'text-[#3b82f6]',
    orange: 'text-[#f97316]',
    purple: 'text-[#8b5cf6]',
    red: 'text-[#ef4444]',
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg sm:rounded-xl p-4 sm:p-6">
      <div className="mb-4 sm:mb-5">
        <h3 className="text-gray-800 dark:text-white text-base sm:text-lg mb-1">Quick Actions</h3>
        <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">Common administrative tasks.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => navigate(action.path)}
            className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-5 flex flex-col items-center gap-2 sm:gap-3 text-gray-700 dark:text-[#e0e0e0] cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-[#2a3441] hover:-translate-y-0.5 hover:border-[#10b981] text-xs sm:text-sm"
          >
            <action.icon className={`text-2xl sm:text-3xl ${iconColors[action.color]}`} />
            <span className="text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions

