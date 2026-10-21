import { FaFileAlt, FaAlignLeft, FaTags, FaExclamationTriangle } from 'react-icons/fa'

const BasicInfoSection = ({ formData, errors, onFieldChange }) => {
  const categories = [
    { value: 'payment', label: 'Payment' },
    { value: 'game', label: 'Game' },
    { value: 'account', label: 'Account' },
    { value: 'technical', label: 'Technical' },
    { value: 'billing', label: 'Billing' },
    { value: 'other', label: 'Other' },
  ]

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-1">Ticket Information</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Enter the ticket details and classification</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject */}
        <div className="md:col-span-2">
          <label htmlFor="subject" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
            <FaFileAlt className="inline mr-2 text-gray-500 dark:text-[#8b8fa3]" />
            Subject <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
              <FaFileAlt className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors" />
            </div>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => onFieldChange('subject', e.target.value)}
              placeholder="Enter ticket subject"
              maxLength={200}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.subject ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-11 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
          </div>
          {errors.subject && <p className="mt-1 text-red-500 text-xs">{errors.subject}</p>}
          <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">
            {formData.subject.length}/200 characters
          </p>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
            <FaTags className="inline mr-2 text-gray-500 dark:text-[#8b8fa3]" />
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
              <FaTags className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors" />
            </div>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => onFieldChange('category', e.target.value)}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.category ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-11 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all appearance-none cursor-pointer`}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          {errors.category && <p className="mt-1 text-red-500 text-xs">{errors.category}</p>}
          <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">
            Select the ticket category
          </p>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
            <FaExclamationTriangle className="inline mr-2 text-gray-500 dark:text-[#8b8fa3]" />
            Priority <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
              <FaExclamationTriangle className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors" />
            </div>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => onFieldChange('priority', e.target.value)}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.priority ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-11 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all appearance-none cursor-pointer`}
            >
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
          {errors.priority && <p className="mt-1 text-red-500 text-xs">{errors.priority}</p>}
          <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">
            Select the ticket priority level
          </p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
            <FaAlignLeft className="inline mr-2 text-gray-500 dark:text-[#8b8fa3]" />
            Description <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute top-3 left-4 pointer-events-none transition-colors group-focus-within:text-[#10b981]">
              <FaAlignLeft className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors" />
            </div>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => onFieldChange('description', e.target.value)}
              placeholder="Enter detailed description of the issue..."
              rows={6}
              maxLength={5000}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.description ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-11 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none`}
            />
          </div>
          {errors.description && (
            <p className="mt-1 text-red-500 text-xs">{errors.description}</p>
          )}
          <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">
            {formData.description.length}/5000 characters (minimum 10 characters)
          </p>
        </div>
      </div>
    </div>
  )
}

export default BasicInfoSection

