import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaDownload, FaPlus } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import TimeRangeSelector from '../components/ui/TimeRangeSelector'
import UsersTable from '../components/Users/UsersTable'
import UsersFilters from '../components/Users/UsersFilters'
import EmptyState from '../components/Users/EmptyState'
import LoadingState from '../components/Users/LoadingState'
import BulkActionsDropdown from '../components/Users/BulkActionsDropdown'
import { getAllUsers } from '../services/api/users'
import { getDateRangeParams } from '../services/helper'
import useDebouncedValue from '../hooks/useDebouncedValue'

const Users = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    verified: 'all',
  })
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inActiveUsers, setInActiveUsers] = useState(0);
  const [bannedUsers, setBannedUsers] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [timeRange, setTimeRange] = useState('all')
  const [dateRangeParams, setDateRangeParams] = useState({})
  const debouncedSearch = useDebouncedValue(filters.search, 350)
  // const [refresh, setRefresh] = useState();

  const fetchAllUsers = async() =>{
    try{
      setIsLoading(true);
      const response = await getAllUsers({ ...filters, search: debouncedSearch, ...dateRangeParams });

      if(response?.meta?.code === 200){
        setAllUsers(response?.data?.users);
        setTotalUsers(response?.data?.pagination?.totalUsers);
        setActiveUsers(response?.data?.pagination?.activeUsers);
        setInActiveUsers(response?.data?.pagination?.inActiveUsers);
        setBannedUsers(response?.data?.pagination?.bannedUsers);
      }
    }
    catch(error){
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() =>{
    fetchAllUsers();
  }, [filters.status, filters.role, filters.verified, debouncedSearch, dateRangeParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // Update status filter based on tab
    if (tab === 'all') {
      setFilters((prev) => ({ ...prev, status: 'all' }))
    } else if (tab === 'active') {
      setFilters((prev) => ({ ...prev, status: 'active' }))
    } else if (tab === 'inactive') {
      setFilters((prev) => ({ ...prev, status: 'inactive' }))
    } else if (tab === 'banned') {
      setFilters((prev) => ({ ...prev, status: 'banned' }))
    }
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    // Sync tab with status filter
    if (newFilters.status === 'all') {
      setActiveTab('all')
    } else if (newFilters.status === 'active') {
      setActiveTab('active')
    } else if (newFilters.status === 'inactive') {
      setActiveTab('inactive')
    } else if (newFilters.status === 'banned') {
      setActiveTab('banned')
    }
  }

  const handleBulkAction = (action) => {
    // TODO: Implement bulk actions
    console.log('Bulk action:', action, selectedUsers)
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export users')
  }

  const handleCreateUser = () => {
    navigate('/dashboard/users/create')
  }

  const handleTimeRangeChange = (range, customDates) => {
    setTimeRange(range)
    setDateRangeParams(getDateRangeParams(range, customDates))
  }

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] overflow-x-hidden max-w-full">
      <Header />

      {/* Time Range Selector */}
      <div className="mb-6 flex justify-start">
        <TimeRangeSelector 
          onRangeChange={handleTimeRangeChange}
          defaultRange={timeRange}
        />
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-gray-800 dark:text-white text-3xl font-bold mb-2">All Users</h1>
            <p className="text-gray-500 dark:text-[#8b8fa3] text-sm">
              {totalUsers} total users • {activeUsers} active • {inActiveUsers} inactive • {bannedUsers} banned
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Bulk Actions Dropdown */}
            {selectedUsers.length > 0 && (
              <BulkActionsDropdown
                selectedCount={selectedUsers.length}
                onAction={handleBulkAction}
              />
            )}

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-4 py-2.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
            >
              <FaDownload className="text-sm" />
              <span>Export</span>
            </button>

            {/* Create User Button */}
            <button
              onClick={handleCreateUser}
              className="flex items-center gap-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <FaPlus className="text-sm" />
              <span>Create User</span>
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-4">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-1 inline-flex">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#1e2742]'
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => handleTabChange('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'active'
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#1e2742]'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => handleTabChange('inactive')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'inactive'
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#1e2742]'
              }`}
            >
              Inactive
            </button>
            <button
              onClick={() => handleTabChange('banned')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'banned'
                  ? 'bg-[#ef4444] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#1e2742]'
              }`}
            >
              Banned
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <UsersFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isOpen={isFiltersOpen}
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        />
      </div>

      {/* Users Table */}
      {isLoading ? (
        <LoadingState />
      ) : (
        <UsersTable
          filters={filters}
          selectedUsers={selectedUsers}
          onSelectionChange={setSelectedUsers}
          onBulkAction={handleBulkAction}
          allUsers={allUsers}
        />
      )}
    </main>
  )
}

export default Users

