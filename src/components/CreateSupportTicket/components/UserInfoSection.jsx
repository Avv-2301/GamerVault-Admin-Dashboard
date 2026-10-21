import { useState } from 'react'
import { FaUser, FaEnvelope, FaSearch } from 'react-icons/fa'

const UserInfoSection = ({ formData, errors, onFieldChange }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserSearch, setShowUserSearch] = useState(false)

  // Mock user data - in real app, this would come from an API
  const mockUsers = [
    { id: 'USR-001', name: 'John Smith', email: 'johns@example.com' },
    { id: 'USR-002', name: 'Emma Wilson', email: 'emmaw@example.com' },
    { id: 'USR-003', name: 'Michael Brown', email: 'michaelb@example.com' },
    { id: 'USR-004', name: 'Sarah Davis', email: 'sarahd@example.com' },
    { id: 'USR-005', name: 'David Lee', email: 'davidl@example.com' },
  ]

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUserSelect = (user) => {
    onFieldChange('userId', user.id)
    onFieldChange('userEmail', user.email)
    onFieldChange('userName', user.name)
    setSearchQuery('')
    setShowUserSearch(false)
  }

  const handleEmailChange = (email) => {
    onFieldChange('userEmail', email)
    // Clear userId if email is manually entered
    if (email && formData.userId) {
      onFieldChange('userId', '')
      onFieldChange('userName', '')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-1">User Information</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Select or enter the user for this ticket</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User ID */}
        <div>
          <label htmlFor="userId" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
            <FaUser className="inline mr-2 text-gray-500 dark:text-[#8b8fa3]" />
            User ID
          </label>
          <div className="relative">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
                <FaUser className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors" />
              </div>
              <input
                id="userId"
                type="text"
                value={formData.userId}
                onChange={(e) => {
                  onFieldChange('userId', e.target.value)
                  // Clear email if ID is manually entered
                  if (e.target.value && formData.userEmail) {
                    onFieldChange('userEmail', '')
                    onFieldChange('userName', '')
                  }
                }}
                placeholder="USR-001"
                className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                  errors.user ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
                } text-gray-900 dark:text-[#e0e0e0] pl-11 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
              />
            </div>
            {errors.user && <p className="mt-1 text-red-500 text-xs">{errors.user}</p>}
          </div>
        </div>

        {/* User Email */}
        <div>
          <label htmlFor="userEmail" className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
            <FaEnvelope className="inline mr-2 text-gray-500 dark:text-[#8b8fa3]" />
            User Email
          </label>
          <div className="relative">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
                <FaEnvelope className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors" />
              </div>
              <input
                id="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="user@example.com"
                className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                  errors.user ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
                } text-gray-900 dark:text-[#e0e0e0] pl-11 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
              />
            </div>
            {errors.user && <p className="mt-1 text-red-500 text-xs">{errors.user}</p>}
          </div>
        </div>

        {/* User Search */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
            <FaSearch className="inline mr-2 text-gray-500 dark:text-[#8b8fa3]" />
            Search Users
          </label>
          <div className="relative">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#10b981]">
                <FaSearch className="text-gray-400 dark:text-[#8b8fa3] group-focus-within:text-[#10b981] transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowUserSearch(true)
                }}
                onFocus={() => setShowUserSearch(true)}
                placeholder="Search by name, email, or user ID..."
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-11 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>

            {/* User Search Results */}
            {showUserSearch && searchQuery && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleUserSelect(user)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-[#141b2d] transition-colors border-b border-gray-200 dark:border-[#2a3441] last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-xs font-semibold">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="text-gray-900 dark:text-white text-sm font-medium">{user.name}</div>
                          <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">{user.email}</div>
                          <div className="text-gray-500 dark:text-[#6b7280] text-xs font-mono">{user.id}</div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-600 dark:text-[#8b8fa3] text-sm text-center">
                    No users found
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="mt-1 text-gray-600 dark:text-[#8b8fa3] text-xs">
            Search and select a user, or enter User ID or Email manually
          </p>
        </div>

        {/* Selected User Display */}
        {formData.userName && (
          <div className="md:col-span-2">
            <div className="p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-sm font-semibold">
                  {formData.userName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 dark:text-white text-sm font-medium">{formData.userName}</div>
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">{formData.userEmail}</div>
                  {formData.userId && (
                    <div className="text-gray-500 dark:text-[#6b7280] text-xs font-mono mt-0.5">{formData.userId}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onFieldChange('userId', '')
                    onFieldChange('userEmail', '')
                    onFieldChange('userName', '')
                    setSearchQuery('')
                  }}
                  className="text-gray-600 dark:text-[#8b8fa3] hover:text-red-500 transition-colors text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserInfoSection

