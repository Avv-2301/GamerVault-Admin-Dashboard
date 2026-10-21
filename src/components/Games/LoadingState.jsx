const LoadingState = () => {
  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg sm:rounded-xl overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-[#1e2742] rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-[#1e2742] rounded w-1/4"></div>
                  <div className="h-2 sm:h-3 bg-gray-200 dark:bg-[#1e2742] rounded w-1/6"></div>
                </div>
                <div className="hidden md:block h-3 sm:h-4 bg-gray-200 dark:bg-[#1e2742] rounded w-12 sm:w-16"></div>
                <div className="h-3 sm:h-4 bg-gray-200 dark:bg-[#1e2742] rounded w-12 sm:w-20"></div>
                <div className="hidden lg:block h-3 sm:h-4 bg-gray-200 dark:bg-[#1e2742] rounded w-16 sm:w-24"></div>
                <div className="hidden sm:block h-3 sm:h-4 bg-gray-200 dark:bg-[#1e2742] rounded w-12 sm:w-20"></div>
                <div className="h-6 sm:h-8 bg-gray-200 dark:bg-[#1e2742] rounded w-20 sm:w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingState

