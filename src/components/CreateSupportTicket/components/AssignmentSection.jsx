import { FaUserCheck, FaInfoCircle } from 'react-icons/fa'

const AssignmentSection = ({ formData, errors, onFieldChange }) => {
  // Mock admin users - in real app, this would come from an API
  const adminUsers = [
    { id: 'admin-1', name: 'Alex Morgan', email: 'alex.morgan@gamervault.com' },
    { id: 'admin-2', name: 'John Doe', email: 'john.doe@gamervault.com' },
    { id: 'admin-3', name: 'Jane Smith', email: 'jane.smith@gamervault.com' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-1">Assignment (Optional)</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">
          Optionally assign this ticket to a support agent
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assigned To */}
        <div className="md:col-span-2">
          <label htmlFor="assignedTo" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
            <FaUserCheck className="inline mr-2 text-gray-500 dark:text-[#8b8fa3]" />
            Assign To
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
              <FaUserCheck className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors" />
            </div>
            <select
              id="assignedTo"
              value={formData.assignedTo}
              onChange={(e) => onFieldChange('assignedTo', e.target.value)}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.assignedTo ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-11 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all appearance-none cursor-pointer`}
            >
              <option value="">Unassigned (Leave open)</option>
              {adminUsers.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name} ({admin.email})
                </option>
              ))}
            </select>
          </div>
          {errors.assignedTo && (
            <p className="mt-1 text-red-500 text-xs">{errors.assignedTo}</p>
          )}
          <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">
            Leave unassigned to create an open ticket, or assign to a support agent
          </p>
        </div>

        {/* Info Note */}
        <div className="md:col-span-2">
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-[rgba(59,130,246,0.1)] border border-blue-200 dark:border-[rgba(59,130,246,0.3)] rounded-lg">
            <FaInfoCircle className="text-[#3b82f6] text-sm mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-[#3b82f6] text-sm font-medium mb-1">Ticket Status</div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">
                New tickets are created with "Open" status. If assigned, the ticket status will
                automatically change to "Assigned" upon creation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignmentSection

