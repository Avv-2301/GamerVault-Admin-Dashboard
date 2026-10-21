import { FaGamepad, FaPlus } from 'react-icons/fa'

const EmptyState = ({ onCreateGame, dateFiltered = false }) => {
  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg sm:rounded-xl p-6 sm:p-12">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gray-100 dark:bg-[#1e2742] flex items-center justify-center mb-4 sm:mb-6">
          <FaGamepad className="text-gray-400 dark:text-[#8b8fa3] text-3xl sm:text-4xl" />
        </div>
        <h3 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-2">
          {dateFiltered ? 'No games available for this time period' : 'No games found'}
        </h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm mb-4 sm:mb-6">
          {dateFiltered
            ? 'No games were added during the selected date range. Choose another time period to see more games.'
            : 'Get started by creating your first game. Add games to your platform and start managing your catalog.'}
        </p>
        {!dateFiltered && (
          <button
            onClick={onCreateGame}
            className="flex items-center gap-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity"
          >
            <FaPlus className="text-xs sm:text-sm" />
            <span>Create Your First Game</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default EmptyState

