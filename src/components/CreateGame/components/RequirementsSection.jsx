const RequirementsSection = ({ register }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">System Requirements</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Specify minimum and recommended system requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Minimum Requirements */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-gray-900 dark:text-white text-base sm:text-lg font-medium">Minimum Requirements</h3>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">OS</label>
              <input
                type="text"
                {...register('systemRequirements.minimum.os')}
                placeholder="Windows 10"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">Processor</label>
              <input
                type="text"
                {...register('systemRequirements.minimum.processor')}
                placeholder="Intel Core i5-8400"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">Memory</label>
              <input
                type="text"
                {...register('systemRequirements.minimum.memory')}
                placeholder="8 GB RAM"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">Graphics</label>
              <input
                type="text"
                {...register('systemRequirements.minimum.graphics')}
                placeholder="NVIDIA GTX 1060"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">Storage</label>
              <input
                type="text"
                {...register('systemRequirements.minimum.storage')}
                placeholder="50 GB available space"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">DirectX</label>
              <input type="text" {...register('systemRequirements.minimum.directX')} placeholder="DirectX 12" className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all" />
            </div>
          </div>
        </div>

        {/* Recommended Requirements */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-gray-900 dark:text-white text-base sm:text-lg font-medium">Recommended Requirements</h3>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">OS</label>
              <input
                type="text"
                {...register('systemRequirements.recommended.os')}
                placeholder="Windows 11"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">Processor</label>
              <input
                type="text"
                {...register('systemRequirements.recommended.processor')}
                placeholder="Intel Core i7-9700K"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">Memory</label>
              <input
                type="text"
                {...register('systemRequirements.recommended.memory')}
                placeholder="16 GB RAM"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">Graphics</label>
              <input
                type="text"
                {...register('systemRequirements.recommended.graphics')}
                placeholder="NVIDIA RTX 3070"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">Storage</label>
              <input
                type="text"
                {...register('systemRequirements.recommended.storage')}
                placeholder="50 GB available space"
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">DirectX</label>
              <input type="text" {...register('systemRequirements.recommended.directX')} placeholder="DirectX 12 Ultimate" className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequirementsSection
