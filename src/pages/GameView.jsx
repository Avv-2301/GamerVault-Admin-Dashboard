import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaExclamationCircle, FaSpinner, FaSync } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import GameHeader from '../components/GameView/GameHeader'
import OverviewTab from '../components/GameView/OverviewTab'
import SalesTab from '../components/GameView/SalesTab'
import DiscountsTab from '../components/GameView/DiscountsTab'
import ReviewsTab from '../components/GameView/ReviewsTab'
import { getGameBySlug } from '../services/api/game'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'sales', label: 'Sales & Revenue' },
  { id: 'discounts', label: 'Discounts' },
  { id: 'reviews', label: 'Reviews' },
]

const GameView = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [game, setGame] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const loadGame = useCallback(async () => {
    setIsLoading(true)
    setLoadError('')
    try {
      const response = await getGameBySlug(slug)
      setGame(response?.data || null)
      if (!response?.data) setLoadError('Game details were not returned by the server.')
    } catch (error) {
      setLoadError(error?.response?.data?.meta?.message || error?.message || 'Could not load this game.')
    } finally {
      setIsLoading(false)
    }
  }, [slug])

  useEffect(() => {
    loadGame()
  }, [loadGame])

  const updateGame = (updatedGame) => {
    if (updatedGame) setGame(updatedGame)
    else loadGame()
  }

  const renderTabContent = () => {
    if (activeTab === 'overview') return <OverviewTab game={game} />
    if (activeTab === 'sales') return <SalesTab gameId={game?._id} />
    if (activeTab === 'discounts') return <DiscountsTab game={game} />
    if (activeTab === 'reviews') return <ReviewsTab gameId={game?._id} />
    return null
  }

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] min-h-screen overflow-x-hidden max-w-full">
      <Header />

      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard/games')}
          className="flex items-center gap-2 text-gray-500 dark:text-[#8b8fa3] hover:text-gray-700 dark:hover:text-white transition-colors"
        >
          <FaArrowLeft className="text-sm" />
          <span className="text-sm">Back to Games</span>
        </button>
      </div>

      {isLoading ? (
        <div className="min-h-64 flex items-center justify-center text-gray-500 dark:text-[#8b8fa3] gap-3">
          <FaSpinner className="animate-spin" /> Loading game details…
        </div>
      ) : loadError ? (
        <div className="bg-white dark:bg-[#141b2d] border border-red-200 dark:border-red-900 rounded-xl p-6 text-center">
          <FaExclamationCircle className="mx-auto text-red-500 text-2xl mb-3" />
          <p className="text-gray-800 dark:text-white mb-4">{loadError}</p>
          <button onClick={loadGame} className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg hover:bg-[#059669]">
            <FaSync /> Try again
          </button>
        </div>
      ) : game ? (
        <>
          <div className="mb-6">
            <GameHeader
              game={game}
              onGameUpdated={updateGame}
              onManageDiscount={() => setActiveTab('discounts')}
              onDelete={() => navigate('/dashboard/games', { replace: true })}
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-1 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#10b981] text-white shadow-sm'
                      : 'text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[400px]">{renderTabContent()}</div>
        </>
      ) : null}
    </main>
  )
}

export default GameView
