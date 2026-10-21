import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaDownload } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import TimeRangeSelector from '../components/ui/TimeRangeSelector'
import GamesTable from '../components/Games/GamesTable'
import GamesFilters from '../components/Games/GamesFilters'
import EmptyState from '../components/Games/EmptyState'
import LoadingState from '../components/Games/LoadingState'
import BulkActionsDropdown from '../components/Games/BulkActionsDropdown'
import { getAllGames } from '../services/api/game';
import { getDateRangeParams } from '../services/helper'
import useDebouncedValue from '../hooks/useDebouncedValue'

const Games = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
  })
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedGames, setSelectedGames] = useState([])
  const [games,setGames] = useState([]);
  const [totalGames, setTotalGames] = useState(0);
  const [activeGames, setActiveGames] = useState(0);
  const [inactiveGames, setInactiveGames] = useState(0);
  const [refresh, setRefresh] = useState();
  const [timeRange, setTimeRange] = useState('all')
  const [dateRangeParams, setDateRangeParams] = useState({})
  const debouncedSearch = useDebouncedValue(filters.search, 350)

  const handleRefresh = () =>{
    setRefresh((current) => !current);
  }

  const handleTimeRangeChange = (range, customDates) => {
    setTimeRange(range)
    setDateRangeParams(getDateRangeParams(range, customDates))
  }

  const fetchAllGames = async() =>{
    setIsLoading(true)
    try{
      const response = await getAllGames({ ...filters, search: debouncedSearch, ...dateRangeParams });

      if(response?.meta?.code === 200){
        setGames(response?.data?.games || []);
        setTotalGames(response?.data?.pagination?.totalGames);
        setActiveGames(response?.data?.pagination?.activeGames);
        setInactiveGames(response?.data?.pagination?.inActiveGames || 0);
      }
    }
    catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }


  useEffect(() =>{
    fetchAllGames();
  }, [filters.status, filters.category, debouncedSearch, refresh, dateRangeParams])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'all') {
      setFilters((prev) => ({ ...prev, status: 'all' }))
    } else if (tab === 'active') {
      setFilters((prev) => ({ ...prev, status: 'active' }))
    } else if (tab === 'inactive') {
      setFilters((prev) => ({ ...prev, status: 'inactive' }))
    }
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    if (newFilters.status === 'all') {
      setActiveTab('all')
    } else if (newFilters.status === 'active') {
      setActiveTab('active')
    } else if (newFilters.status === 'inactive') {
      setActiveTab('inactive')
    }
  }

  const handleCreateGame = () => {
    navigate('/dashboard/games/create')
  }

  const handleBulkAction = (action) => {
    // TODO: Implement bulk actions
    console.log('Bulk action:', action, selectedGames)
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export games')
  }

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] min-h-screen overflow-x-hidden max-w-full">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-gray-800 dark:text-white text-2xl sm:text-3xl font-bold mb-2">All Games</h1>
            <p className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm">
              {totalGames.toLocaleString()} total games • {activeGames.toLocaleString()} active • {inactiveGames.toLocaleString()} inactive
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
            {/* Bulk Actions Dropdown */}
            {selectedGames.length > 0 && (
              <BulkActionsDropdown
                selectedCount={selectedGames.length}
                onAction={handleBulkAction}
              />
            )}

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors flex-shrink-0"
            >
              <FaDownload className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Create Game Button */}
            <button
              onClick={handleCreateGame}
              className="flex items-center gap-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0"
            >
              <FaPlus className="text-xs sm:text-sm" />
              <span>Create Game</span>
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-4">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-1 inline-flex w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#1e2742]'
              }`}
            >
              All Games
            </button>
            <button
              onClick={() => handleTabChange('active')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'active'
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#1e2742]'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => handleTabChange('inactive')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'inactive'
                  ? 'bg-[#10b981] text-white shadow-sm'
                  : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#1e2742]'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <GamesFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isOpen={isFiltersOpen}
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        />
      </div>

      {/* Games Table */}
      {isLoading ? (
        <LoadingState />
      ) : games.length === 0 ? (
        <EmptyState
          onCreateGame={handleCreateGame}
          dateFiltered={timeRange !== 'all'}
        />
      ) : (
        <GamesTable
          selectedGames={selectedGames}
          onSelectionChange={setSelectedGames}
          games={games}
          handleRefresh={handleRefresh}
        />
      )}
    </main>
  )
}

export default Games

