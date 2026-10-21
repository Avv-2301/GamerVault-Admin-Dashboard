const LoadingState = () => {
  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-gray-200 dark:bg-[#1e2742] rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-[#1e2742] rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-[#1e2742] rounded w-1/6"></div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-[#1e2742] rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-[#1e2742] rounded w-24"></div>
                <div className="h-6 bg-gray-200 dark:bg-[#1e2742] rounded w-20"></div>
                <div className="h-6 bg-gray-200 dark:bg-[#1e2742] rounded w-24"></div>
                <div className="h-4 bg-gray-200 dark:bg-[#1e2742] rounded w-24"></div>
                <div className="h-4 bg-gray-200 dark:bg-[#1e2742] rounded w-24"></div>
                <div className="h-8 bg-gray-200 dark:bg-[#1e2742] rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingState

