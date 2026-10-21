import { FaCreditCard, FaSearch } from 'react-icons/fa'

const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-12">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-[#1e2742] flex items-center justify-center mb-6">
          <FaCreditCard className="text-gray-400 dark:text-[#8b8fa3] text-4xl" />
        </div>
        <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-2">No transactions found</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-6">
          Try adjusting your filters or search criteria to find the transactions you're looking for.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors"
          >
            <FaSearch className="text-sm" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default EmptyState

