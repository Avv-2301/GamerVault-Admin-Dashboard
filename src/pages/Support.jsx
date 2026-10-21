import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaCog, FaTicketAlt } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import TimeRangeSelector from '../components/ui/TimeRangeSelector'
import SupportSummary from '../components/Support/SupportSummary'
import SupportFilters from '../components/Support/SupportFilters'
import SupportTable from '../components/Support/SupportTable'
import TicketDetailDrawer from '../components/Support/TicketDetailDrawer'
import EmptyState from '../components/Support/EmptyState'
import LoadingState from '../components/Support/LoadingState'

const Support = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all',
    assignedTo: 'all',
    dateRange: 'all',
  })
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedTickets, setSelectedTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [timeRange, setTimeRange] = useState('all')

  const handleTimeRangeChange = (range, customDates) => {
    setTimeRange(range)
    console.log('Time range changed:', range, customDates)
    // TODO: Implement time range filtering
  }

  const handleCreateTicket = () => {
    navigate('/dashboard/support/create')
  }

  const handleViewSettings = () => {
    // TODO: Navigate to support settings
    console.log('View support settings')
  }

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedTicket(null)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // Update status filter based on active tab
    const statusMap = {
      all: 'all',
      open: 'open',
      assigned: 'assigned',
      'in-progress': 'in-progress',
      resolved: 'resolved',
      closed: 'closed',
    }
    setFilters((prev) => ({ ...prev, status: statusMap[tab] }))
    // Clear selection when changing tabs
    setSelectedTickets([])
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
            <h1 className="text-gray-900 dark:text-white text-3xl font-bold mb-2">Support Tickets</h1>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">
              Manage and resolve user support requests efficiently
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Support Settings Button */}
            <button
              onClick={handleViewSettings}
              className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-4 py-2.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
            >
              <FaCog className="text-sm" />
              <span>Support Settings</span>
            </button>

            {/* Create Ticket Button */}
            <button
              onClick={handleCreateTicket}
              className="flex items-center gap-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <FaPlus className="text-sm" />
              <span>Create Ticket</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <SupportSummary filters={filters} />

        {/* Status Tabs */}
        <div className="mt-6 mb-4">
          <div className="flex items-center gap-1 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-1 inline-flex">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              All Tickets
            </button>
            <button
              onClick={() => handleTabChange('open')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'open'
                  ? 'bg-[#ef4444] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              Open
            </button>
            <button
              onClick={() => handleTabChange('assigned')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'assigned'
                  ? 'bg-[#3b82f6] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              Assigned
            </button>
            <button
              onClick={() => handleTabChange('in-progress')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'in-progress'
                  ? 'bg-[#3b82f6] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => handleTabChange('resolved')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'resolved'
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              Resolved
            </button>
            <button
              onClick={() => handleTabChange('closed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'closed'
                  ? 'bg-[#6b7280] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              Closed
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mb-6">
          <SupportFilters
            filters={filters}
            onFiltersChange={(newFilters) => {
              setFilters(newFilters)
              // Update active tab when status filter changes manually
              if (newFilters.status !== filters.status) {
                const tabMap = {
                  all: 'all',
                  open: 'open',
                  assigned: 'assigned',
                  'in-progress': 'in-progress',
                  resolved: 'resolved',
                  closed: 'closed',
                }
                setActiveTab(tabMap[newFilters.status] || 'all')
              }
            }}
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
          />
        </div>
      </div>

      {/* Support Table */}
      {isLoading ? (
        <LoadingState />
      ) : (
        <SupportTable
          filters={filters}
          selectedTickets={selectedTickets}
          onSelectionChange={setSelectedTickets}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* Ticket Detail Drawer */}
      <TicketDetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        ticket={selectedTicket}
      />
    </main>
  )
}

export default Support

