import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaCalendarAlt } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import TimeRangeSelector from '../components/ui/TimeRangeSelector'
import DiscountsSummary from '../components/Discounts/DiscountsSummary'
import DiscountsFilters from '../components/Discounts/DiscountsFilters'
import DiscountsTable from '../components/Discounts/DiscountsTable'
import DiscountDetailDrawer from '../components/Discounts/DiscountDetailDrawer'
import DiscountActionModal from '../components/Discounts/DiscountActionModal'
import EmptyState from '../components/Discounts/EmptyState'
import LoadingState from '../components/Discounts/LoadingState'
import BulkActionsDropdown from '../components/Discounts/BulkActionsDropdown'
import { bulkDiscountAction, deleteDiscount, getAllDiscounts, setDiscountPaused } from '../services/api/discounts'

const Discounts = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [discounts, setDiscounts] = useState([])
  const [loadError, setLoadError] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [filters, setFilters] = useState({
    search: '',
    scope: 'all',
    status: 'all',
    dateRange: 'all',
    createdBy: 'all',
  })
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedDiscounts, setSelectedDiscounts] = useState([])
  const [selectedDiscount, setSelectedDiscount] = useState(null)
  const [discountAction, setDiscountAction] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [timeRange, setTimeRange] = useState('all')

  useEffect(() => {
    let active = true
    getAllDiscounts()
      .then((result) => {
        if (active) {
          setDiscounts(result.discounts || [])
        }
      })
      .catch((requestError) => { if (active) setLoadError(requestError?.response?.data?.meta?.message || requestError?.message || 'Could not load discounts') })
      .finally(() => { if (active) setIsLoading(false) })
    return () => { active = false }
  }, [])

  const handleTimeRangeChange = (range, customDates) => {
    setTimeRange(range)
    console.log('Time range changed:', range, customDates)
    // TODO: Implement time range filtering
  }

  const handleCreateDiscount = () => {
    navigate('/dashboard/discounts/create')
  }

  const handleViewCalendar = () => {
    // TODO: Navigate to calendar view or open modal
    console.log('View discount calendar')
  }

  const handleViewDetails = (discount) => {
    setSelectedDiscount(discount)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedDiscount(null)
  }

  const handleEditDiscount = (discount) => {
    setIsDrawerOpen(false)
    setSelectedDiscount(null)
    navigate(`/dashboard/discounts/${discount.id}/edit`)
  }

  const handleRequestAction = (type, discount) => {
    setDiscountAction({ type, discount })
  }

  const confirmDiscountAction = async (password) => {
    const { type, discount, discounts: bulkDiscounts } = discountAction
    const affectedIds = new Set((bulkDiscounts || [discount]).map((item) => item.id))
    if (bulkDiscounts) {
      await bulkDiscountAction(bulkDiscounts.map((item) => item.id), type, password)
    } else if (type === 'delete') await deleteDiscount(discount.id, password)
    else await setDiscountPaused(discount.id, type === 'pause', password)

    setDiscountAction(null)
    setDiscounts((current) => type === 'delete'
      ? current.filter((item) => !affectedIds.has(item.id))
      : current.map((item) => affectedIds.has(item.id)
        ? { ...item, isPaused: type === 'pause', status: type === 'pause' ? 'disabled' : new Date(item.startDate) > new Date() ? 'scheduled' : new Date(item.endDate) < new Date() ? 'expired' : 'active' }
        : item))
    if (bulkDiscounts) {
      setSelectedDiscounts([])
      setSelectedDiscount(null)
      setIsDrawerOpen(false)
    } else if (type === 'delete') {
      setSelectedDiscounts((current) => current.filter((id) => id !== discount.id))
      setSelectedDiscount(null)
      setIsDrawerOpen(false)
    } else {
      setSelectedDiscount(null)
      setIsDrawerOpen(false)
    }
    try {
      const result = await getAllDiscounts()
      setDiscounts(result.discounts || [])
      setLoadError('')
    } catch (error) {
      setLoadError(error?.response?.data?.meta?.message || error?.message || 'Could not refresh discounts')
    }
  }

  const handleBulkAction = (action) => {
    if (['pause', 'resume', 'delete'].includes(action)) {
      const targets = discounts.filter((discount) => selectedDiscounts.includes(discount.id))
      if (targets.length) setDiscountAction({ type: action, discounts: targets })
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // Update status filter based on active tab
    const statusMap = {
      all: 'all',
      active: 'active',
      scheduled: 'scheduled',
      expired: 'expired',
    }
    setFilters((prev) => ({ ...prev, status: statusMap[tab] }))
    // Clear selection when changing tabs
    setSelectedDiscounts([])
  }

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] overflow-x-hidden max-w-full">
      <Header />

      {/* Time Range Selector */}
      <div className="mb-4 sm:mb-6 flex justify-start">
        <TimeRangeSelector 
          onRangeChange={handleTimeRangeChange}
          defaultRange={timeRange}
        />
      </div>

      {/* Page Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Discounts & Promotions</h1>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">
              Create, schedule, and manage game discounts across the platform
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Bulk Actions Dropdown */}
            {selectedDiscounts.length > 0 && (
              <BulkActionsDropdown
                selectedCount={selectedDiscounts.length}
                onAction={handleBulkAction}
              />
            )}

            {/* View Calendar Button */}
            <button
              onClick={handleViewCalendar}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
            >
              <FaCalendarAlt className="text-xs sm:text-sm" />
              <span>View Calendar</span>
            </button>

            {/* Create Discount Button */}
            <button
              onClick={handleCreateDiscount}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity"
            >
              <FaPlus className="text-xs sm:text-sm" />
              <span>Create Discount</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <DiscountsSummary discounts={discounts} />

        {/* Tabs Section */}
        <div className="mt-4 sm:mt-6 mb-3 sm:mb-4">
          <div className="flex items-center gap-1 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-1 inline-flex w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              All Discounts
            </button>
            <button
              onClick={() => handleTabChange('active')}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'active'
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => handleTabChange('scheduled')}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'scheduled'
                  ? 'bg-[#3b82f6] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              Scheduled
            </button>
            <button
              onClick={() => handleTabChange('expired')}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'expired'
                  ? 'bg-[#6b7280] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              Expired
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mb-4 sm:mb-6">
          <DiscountsFilters
            filters={filters}
            onFiltersChange={(newFilters) => {
              setFilters(newFilters)
              // Update active tab when status filter changes manually
              if (newFilters.status !== filters.status) {
                const tabMap = {
                  all: 'all',
                  active: 'active',
                  scheduled: 'scheduled',
                  expired: 'expired',
                }
                setActiveTab(tabMap[newFilters.status] || 'all')
              }
            }}
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
          />
        </div>
      </div>

      {/* Discounts Table */}
      {loadError && <p role="alert" className="mb-4 text-sm text-red-500">{loadError}</p>}
      {isLoading ? (
        <LoadingState />
      ) : (
        <DiscountsTable
          discounts={discounts}
          filters={filters}
          selectedDiscounts={selectedDiscounts}
          onSelectionChange={setSelectedDiscounts}
          onViewDetails={handleViewDetails}
          onEdit={handleEditDiscount}
          onRequestAction={handleRequestAction}
        />
      )}

      {/* Discount Detail Drawer */}
      <DiscountDetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        discount={selectedDiscount}
        onEdit={handleEditDiscount}
        onRequestAction={handleRequestAction}
      />
      <DiscountActionModal
        key={`${discountAction?.type}-${discountAction?.discount?.id || discountAction?.discounts?.map((item) => item.id).join(',')}`}
        action={discountAction}
        onClose={() => setDiscountAction(null)}
        onConfirm={confirmDiscountAction}
      />
    </main>
  )
}

export default Discounts

