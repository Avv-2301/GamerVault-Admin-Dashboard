import { useState } from 'react'
import { FaSave, FaSpinner, FaUsers, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { useToast } from '../ui/ToastContainer'

const RolesPermissionsSettings = () => {
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState('super-admin')
  const [roles] = useState([
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: {
        games: { view: true, create: true, edit: true, delete: true },
        users: { view: true, create: true, edit: true, delete: true },
        transactions: { view: true, create: false, edit: true, delete: false },
        discounts: { view: true, create: true, edit: true, delete: true },
        banners: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: false, edit: true, delete: false },
      },
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Standard administrative access',
      permissions: {
        games: { view: true, create: true, edit: true, delete: false },
        users: { view: true, create: true, edit: true, delete: false },
        transactions: { view: true, create: false, edit: false, delete: false },
        discounts: { view: true, create: true, edit: true, delete: false },
        banners: { view: true, create: true, edit: true, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: 'moderator',
      name: 'Moderator',
      description: 'Limited access for content moderation',
      permissions: {
        games: { view: true, create: false, edit: true, delete: false },
        users: { view: true, create: false, edit: true, delete: false },
        transactions: { view: true, create: false, edit: false, delete: false },
        discounts: { view: true, create: false, edit: false, delete: false },
        banners: { view: true, create: false, edit: true, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
  ])

  const currentRole = roles.find((r) => r.id === selectedRole)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success('Role permissions saved successfully')
    } catch (err) {
      error('Failed to save settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const PermissionCell = ({ hasPermission }) => (
    <div className="flex items-center justify-center">
      {hasPermission ? (
        <FaCheck className="text-[#10b981] text-sm" />
      ) : (
        <FaTimes className="text-[#6b7280] text-sm" />
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 dark:text-white text-xl font-semibold mb-1">Roles & Permissions</h2>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Manage admin roles and access permissions</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors"
          >
            <FaPlus className="text-sm" />
            <span>New Role</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedRole === role.id
                    ? 'border-[#10b981] bg-[rgba(16,185,129,0.1)]'
                    : 'border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] hover:border-gray-300 dark:hover:border-[#3a4451]'
                }`}
              >
                <h3 className={`text-sm font-medium mb-1 ${selectedRole === role.id ? 'text-[#10b981]' : 'text-gray-800 dark:text-white'}`}>
                  {role.name}
                </h3>
                <p className="text-gray-600 dark:text-[#8b8fa3] text-xs">{role.description}</p>
              </button>
            ))}
          </div>

          {/* Permission Matrix */}
          {currentRole && (
            <div className="border-t border-gray-200 dark:border-[#1e2742] pt-6">
              <h3 className="text-gray-800 dark:text-white text-sm font-medium mb-4">Permission Matrix: {currentRole.name}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#1e2742]">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">Resource</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">View</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">Create</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">Edit</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-[#1e2742]">
                    {Object.entries(currentRole.permissions).map(([resource, perms]) => (
                      <tr key={resource} className="hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors">
                        <td className="px-4 py-3 text-gray-800 dark:text-white text-sm font-medium capitalize">{resource}</td>
                        <td className="px-4 py-3">
                          <PermissionCell hasPermission={perms.view} />
                        </td>
                        <td className="px-4 py-3">
                          <PermissionCell hasPermission={perms.create} />
                        </td>
                        <td className="px-4 py-3">
                          <PermissionCell hasPermission={perms.edit} />
                        </td>
                        <td className="px-4 py-3">
                          <PermissionCell hasPermission={perms.delete} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-[#1e2742]">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RolesPermissionsSettings

