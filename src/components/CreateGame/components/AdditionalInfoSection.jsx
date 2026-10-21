import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { FaPlus, FaTimes } from 'react-icons/fa'

const AdditionalInfoSection = ({ register, control, watch, setValue, errors }) => {
  const [languageInput, setLanguageInput] = useState('')

  const watchedLanguages = watch('languages') || []
  const watchedPlatform = watch('platform') || []

  const handleAddLanguage = () => {
    if (languageInput.trim() && !watchedLanguages.includes(languageInput.trim())) {
      setValue('languages', [...watchedLanguages, languageInput.trim()])
      setLanguageInput('')
    }
  }

  const handleRemoveLanguage = (language) => {
    setValue('languages', watchedLanguages.filter((l) => l !== language))
  }

  const ageRatings = [
    { value: 'E', label: 'E - Everyone' },
    { value: 'E10+', label: 'E10+ - Everyone 10+' },
    { value: 'T', label: 'T - Teen' },
    { value: 'M', label: 'M - Mature' },
    { value: 'AO', label: 'AO - Adults Only' },
    { value: 'RP', label: 'RP - Rating Pending' },
  ]

  const platforms = ['Windows', 'Mac', 'Linux']

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Additional Information</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Set additional game details and settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Platforms */}
        <div>
          <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Platforms <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {platforms.map((platform) => (
              <label key={platform} className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={watchedPlatform.includes(platform)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue('platform', [...watchedPlatform, platform])
                    } else {
                      setValue('platform', watchedPlatform.filter((p) => p !== platform))
                    }
                  }}
                  className="w-4 h-4 text-[#10b981] bg-gray-50 dark:bg-[#1e2742] border-gray-300 dark:border-[#2a3441] rounded focus:ring-[#10b981] focus:ring-2"
                />
                <span className="text-gray-800 dark:text-[#e0e0e0] text-xs sm:text-sm">{platform}</span>
              </label>
            ))}
          </div>
          {errors.platform && <p className="mt-1 text-red-500 text-xs">{errors.platform.message}</p>}
          <Controller
            name="platform"
            control={control}
            rules={{
              required: 'At least one platform is required',
              validate: (value) => (value && value.length > 0) || 'At least one platform is required',
            }}
            render={({ field }) => <input type="hidden" {...field} />}
          />
        </div>

        {/* Age Rating */}
        <div>
          <label htmlFor="ageRating" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Age Rating
          </label>
          <select
            id="ageRating"
            {...register('ageRating')}
            className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
          >
            {ageRatings.map((rating) => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </div>

        {/* Download Size */}
        <div>
          <label htmlFor="downloadSize" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Download Size
          </label>
          <input
            id="downloadSize"
            type="text"
            {...register('downloadSize')}
            placeholder="e.g., 50 GB"
            className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
          />
        </div>

        {/* Languages */}
        <div>
          <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Supported Languages
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
              placeholder="Add language"
              className="flex-1 bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
            />
            <button
              type="button"
              onClick={handleAddLanguage}
              className="px-3 sm:px-4 py-2 bg-[#10b981] text-white rounded-lg hover:opacity-90 transition-opacity text-xs sm:text-sm"
            >
              <FaPlus />
            </button>
          </div>
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex flex-wrap gap-2 mt-2">
                  {watchedLanguages.map((language) => (
                    <span
                      key={language}
                      className="inline-flex items-center gap-2 bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm"
                    >
                      {language}
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(language)}
                        className="text-gray-500 dark:text-[#8b8fa3] hover:text-red-500 transition-colors"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
                <input type="hidden" {...field} />
              </>
            )}
          />
        </div>

        {/* Status Toggles */}
        <div className="md:col-span-2 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
            <div className="flex-1 min-w-0">
              <label className="text-gray-800 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium">Active Status</label>
              <p className="text-gray-500 dark:text-[#8b8fa3] text-xs mt-1">Game will be visible to users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                {...register('isActive')}
                className="sr-only peer"
              />
              <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-300 dark:bg-[#2a3441] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#10b981] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-[#10b981]"></div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
            <div className="flex-1 min-w-0">
              <label className="text-gray-800 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium">Featured Game</label>
              <p className="text-gray-500 dark:text-[#8b8fa3] text-xs mt-1">Show on homepage and featured sections</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                {...register('isFeatured')}
                className="sr-only peer"
              />
              <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-300 dark:bg-[#2a3441] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#10b981] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-[#10b981]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdditionalInfoSection
