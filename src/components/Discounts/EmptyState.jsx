import { FaTag, FaPlus } from 'react-icons/fa'

const EmptyState = ({ onCreateDiscount }) => {
  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-12">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-[#1e2742] flex items-center justify-center mb-6">
          <FaTag className="text-gray-400 dark:text-[#8b8fa3] text-4xl" />
        </div>
        <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-2">No discounts found</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-6">
          Get started by creating your first discount. Create promotions to boost sales and engage your users.
        </p>
        <button
          onClick={onCreateDiscount}
          className="flex items-center gap-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <FaPlus className="text-sm" />
          <span>Create Your First Discount</span>
        </button>
      </div>
    </div>
  )
}

export default EmptyState

