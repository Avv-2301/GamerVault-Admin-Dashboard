import { FaUsers } from 'react-icons/fa'

const EmptyState = () => {
  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-12">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-[#1e2742] flex items-center justify-center mb-6">
          <FaUsers className="text-gray-400 dark:text-[#8b8fa3] text-4xl" />
        </div>
        <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-2">No users found</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">
          No users match your current filters. Try adjusting your search criteria or filters.
        </p>
      </div>
    </div>
  )
}

export default EmptyState

