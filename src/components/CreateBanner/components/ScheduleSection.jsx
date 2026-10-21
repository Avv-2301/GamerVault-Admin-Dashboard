import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import { getMinScheduleDate } from '../../../services/helper'

const ScheduleSection = ({ formData, errors, onFieldChange }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Schedule</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Set when the banner should start and end</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Start Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => onFieldChange('startDate', e.target.value)}
              min={getMinScheduleDate(formData.startDate)}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.startDate ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
          </div>
          {errors.startDate && <p className="mt-1 text-red-500 text-xs">{errors.startDate}</p>}
        </div>

        {/* Start Time */}
        <div>
          <label htmlFor="startTime" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Start Time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaClock className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => onFieldChange('startTime', e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
            />
          </div>
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Leave empty to start at midnight (00:00)</p>
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            End Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => onFieldChange('endDate', e.target.value)}
              min={getMinScheduleDate(formData.startDate)}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.endDate ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
          </div>
          {errors.endDate && <p className="mt-1 text-red-500 text-xs">{errors.endDate}</p>}
        </div>

        {/* End Time */}
        <div>
          <label htmlFor="endTime" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            End Time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaClock className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => onFieldChange('endTime', e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
            />
          </div>
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Leave empty to end at 23:59</p>
        </div>
      </div>

      {/* Schedule Summary */}
      {formData.startDate && formData.endDate && (
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
          <p className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-2 sm:mb-3">Schedule Summary</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex-1 min-w-0">
              <span className="text-gray-500 dark:text-[#8b8fa3]">Starts:</span>{' '}
              <span className="text-gray-900 dark:text-white font-medium">
                {new Date(`${formData.startDate}T${formData.startTime || '00:00'}`).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="text-gray-500 dark:text-[#8b8fa3] hidden sm:inline">→</div>
            <div className="flex-1 min-w-0">
              <span className="text-gray-500 dark:text-[#8b8fa3]">Ends:</span>{' '}
              <span className="text-gray-900 dark:text-white font-medium">
                {new Date(`${formData.endDate}T${formData.endTime || '23:59'}`).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScheduleSection

