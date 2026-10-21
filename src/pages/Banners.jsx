import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import TimeRangeSelector from '../components/ui/TimeRangeSelector'
import BannersSummary from '../components/Banners/BannersSummary'
import BannersFilters from '../components/Banners/BannersFilters'
import BannersTable from '../components/Banners/BannersTable'
import BannerDetailDrawer from '../components/Banners/BannerDetailDrawer'
import DeleteBannerModal from '../components/Banners/DeleteBannerModal'
import LoadingState from '../components/Banners/LoadingState'
import BulkActionsDropdown from '../components/Banners/BulkActionsDropdown'
import { deleteBanner, getAllBanners, pauseBanner, resumeBanner } from '../services/api/banner'

const Banners = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [banners, setBanners] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [filters, setFilters] = useState({
    search: '',
    position: 'all',
    status: 'all',
    dateRange: 'all',
    createdBy: 'all',
  })
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedBanners, setSelectedBanners] = useState([])
  const [selectedBanner, setSelectedBanner] = useState(null)
  const [bannerAction, setBannerAction] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [timeRange, setTimeRange] = useState('all')

  const loadBanners = async () => {
    setIsLoading(true)
    try {
      const result = await getAllBanners()
      setBanners(result.map((banner) => ({
        ...banner,
        id: banner._id,
        target: banner.linkTarget || '_self',
        createdBy: banner.createdBy?.name || banner.createdBy?.email || 'Admin',
        clicks: banner.clicks || 0,
        impressions: banner.impressions || 0,
        deviceTypes: banner.deviceTypes || [],
      })))
    } catch (_) {
      setBanners([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { loadBanners() }, [])

  const handleTimeRangeChange = (range, customDates) => {
    setTimeRange(range)
    console.log('Time range changed:', range, customDates)
    // TODO: Implement time range filtering
  }

  const handleCreateBanner = () => {
    navigate('/dashboard/banners/create')
  }

  const handleViewDetails = (banner) => {
    setSelectedBanner(banner)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedBanner(null)
  }

  const handleEditBanner = (banner) => {
    navigate(`/dashboard/banners/${banner.id}/edit`)
  }

  const handleDeleteBanner = (banner) => {
    setBannerAction({ type: 'delete', banner })
  }

  const handlePauseBanner = (banner) => {
    setBannerAction({ type: 'pause', banner })
  }

  const handleResumeBanner = (banner) => {
    setBannerAction({ type: 'resume', banner })
  }

  const confirmBannerAction = async (password) => {
    if (!bannerAction) return
    const { type, banner } = bannerAction
    if (type === 'delete') {
      await deleteBanner(banner.id, password)
      setBanners((current) => current.filter((item) => item.id !== banner.id))
      setSelectedBanners((current) => current.filter((id) => id !== banner.id))
    } else if (type === 'pause') {
      const updatedBanner = await pauseBanner(banner.id, password)
      setBanners((current) => current.map((item) => item.id === banner.id ? { ...item, status: updatedBanner?.status || 'disabled' } : item))
    } else if (type === 'resume') {
      const updatedBanner = await resumeBanner(banner.id, password)
      setBanners((current) => current.map((item) => item.id === banner.id ? { ...item, status: updatedBanner?.status || 'active' } : item))
    }
    setBannerAction(null)
  }

  const handleBulkAction = (action) => {
    // TODO: Implement bulk actions
    console.log('Bulk action:', action, selectedBanners)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // Update status filter based on active tab
    const statusMap = {
      all: 'all',
      active: 'active',
      scheduled: 'scheduled',
      expired: 'expired',
      disabled: 'disabled',
    }
    setFilters((prev) => ({ ...prev, status: statusMap[tab] }))
    // Clear selection when changing tabs
    setSelectedBanners([])
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
            <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Banner Management</h1>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">
              Create, manage, and schedule promotional banners across the platform
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Bulk Actions Dropdown */}
            {selectedBanners.length > 0 && (
              <BulkActionsDropdown
                selectedCount={selectedBanners.length}
                onAction={handleBulkAction}
              />
            )}

            {/* Create Banner Button */}
            <button
              onClick={handleCreateBanner}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity"
            >
              <FaPlus className="text-xs sm:text-sm" />
              <span>Create Banner</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <BannersSummary banners={banners} />

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
              All Banners
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
            <button
              onClick={() => handleTabChange('disabled')}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'disabled'
                  ? 'bg-[#ef4444] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
              }`}
            >
              Disabled
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mb-4 sm:mb-6">
          <BannersFilters
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
                  disabled: 'disabled',
                }
                setActiveTab(tabMap[newFilters.status] || 'all')
              }
            }}
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
          />
        </div>
      </div>

      {/* Banners Table */}
      {isLoading ? (
        <LoadingState />
      ) : (
        <BannersTable
          banners={banners}
          filters={filters}
          selectedBanners={selectedBanners}
          onSelectionChange={setSelectedBanners}
          onViewDetails={handleViewDetails}
          onEditBanner={handleEditBanner}
          onPauseBanner={handlePauseBanner}
          onResumeBanner={handleResumeBanner}
          onDeleteBanner={handleDeleteBanner}
          onCreateBanner={handleCreateBanner}
          onBulkAction={handleBulkAction}
        />
      )}

      {/* Banner Detail Drawer */}
      <BannerDetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        banner={selectedBanner}
        onEdit={() => selectedBanner && handleEditBanner(selectedBanner)}
      />
      <DeleteBannerModal
        key={`${bannerAction?.type || 'closed'}-${bannerAction?.banner?.id || ''}`}
        banner={bannerAction?.banner}
        mode={bannerAction?.type}
        onClose={() => setBannerAction(null)}
        onConfirm={confirmBannerAction}
      />
    </main>
  )
}

export default Banners

