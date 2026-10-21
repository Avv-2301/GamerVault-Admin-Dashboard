import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaGift, FaSearch, FaCheckCircle, FaTimesCircle, FaClock, FaPlus, FaEdit, FaTrash, FaSyncAlt, FaTimes } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import TimeRangeSelector from '../components/ui/TimeRangeSelector'
import { deleteGiftCard, getAllGiftCards } from '../services/api/giftCards'
import { formatDateOnly as formatDate, getGiftCardInventory, getGiftCardStatusPresentation } from '../services/helper'
import useDebouncedValue from '../hooks/useDebouncedValue'
import DeleteGiftCardModal from '../components/GiftCards/DeleteGiftCardModal'
import GiftCardCodesModal from '../components/GiftCards/GiftCardCodesModal'

const GiftCards = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 350)
  const [timeRange, setTimeRange] = useState('all')
  const [giftCards, setGiftCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [giftCardToDelete, setGiftCardToDelete] = useState(null)
  const [giftCardCodesToView, setGiftCardCodesToView] = useState(null)

  const loadGiftCards = useCallback(async () => {
    setIsLoading(true)
    setLoadError('')
    try {
      setGiftCards(await getAllGiftCards())
    } catch (requestError) {
      setLoadError(requestError?.response?.data?.meta?.message || requestError?.message || 'Could not load gift cards.')
      setGiftCards([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { loadGiftCards() }, [loadGiftCards])

  const handleTimeRangeChange = (range, customDates) => {
    setTimeRange(range)
    console.log('Time range changed:', range, customDates)
    // TODO: Implement time range filtering
  }

  const handleCreateGiftCard = () => {
    navigate('/dashboard/gift-cards/create')
  }

  const filteredGiftCards = useMemo(() => giftCards.filter((card) => {
    const searchLower = debouncedSearchQuery.trim().toLowerCase()
    if (!searchLower) return true
    return (
      String(card.code || '').toLowerCase().includes(searchLower) ||
      (card.codes || []).some((entry) => String(entry.code || '').toLowerCase().includes(searchLower)) ||
      String(card.id || card._id || '').toLowerCase().includes(searchLower) ||
      String(card.codePrefix || '').toLowerCase().includes(searchLower) ||
      String(card.status || '').toLowerCase().includes(searchLower) ||
      String(card.notes || '').toLowerCase().includes(searchLower) ||
      String(card.amount ?? '').includes(searchLower) ||
      String(card.quantity ?? card.generatedQuantity ?? '').includes(searchLower)
    )
  }), [giftCards, debouncedSearchQuery])

  const handleDeleteGiftCard = async (card) => {
    setGiftCardToDelete(card)
  }

  const confirmDeleteGiftCard = async (password) => {
    try {
      await deleteGiftCard(giftCardToDelete.id || giftCardToDelete._id, password)
      setGiftCardToDelete(null)
      await loadGiftCards()
    } catch (requestError) {
      console.error('Unable to delete gift cards:', requestError)
      throw requestError
    }
  }

  const activeCount = giftCards.reduce((sum, card) => sum + (Number(card.availableQuantity ?? card.quantity ?? 1) * (card.status === 'active' ? 1 : 0)), 0)
  const redeemedCount = giftCards.reduce((sum, card) => sum + Number(card.redeemedQuantity ?? (card.status === 'redeemed' ? 1 : 0)), 0)
  const expiredCount = giftCards.reduce((sum, card) => sum + (card.status === 'expired' ? Number(card.quantity ?? 1) : 0), 0)
  const totalValue = giftCards
    .filter((c) => c.status === 'active')
    .reduce((sum, c) => sum + (Number(c.amount) || 0) * Number(c.availableQuantity ?? c.quantity ?? 1), 0)

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
            <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Gift Cards</h1>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">
              View and manage gift cards
            </p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <button type="button" onClick={loadGiftCards} disabled={isLoading} aria-label="Refresh gift cards" className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-[#1e2742] bg-white dark:bg-[#141b2d] text-gray-700 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] disabled:opacity-50">
              <FaSyncAlt className={isLoading ? 'animate-spin' : ''} />
              <span className="text-xs sm:text-sm">Refresh</span>
            </button>
            <button
              onClick={handleCreateGiftCard}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#10b981] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm hover:bg-[#059669] transition-colors"
            >
              <FaPlus className="text-xs sm:text-sm" />
              <span>Create Gift Card</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">Active Cards</div>
              <FaCheckCircle className="text-[#10b981] text-xs sm:text-sm" />
            </div>
            <div className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold">{activeCount}</div>
          </div>
          <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">Redeemed</div>
              <FaCheckCircle className="text-[#3b82f6] text-xs sm:text-sm" />
            </div>
            <div className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold">{redeemedCount}</div>
          </div>
          <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">Expired</div>
              <FaTimesCircle className="text-[#6b7280] text-xs sm:text-sm" />
            </div>
            <div className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold">{expiredCount}</div>
          </div>
          <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">Total Active Value</div>
              <FaGift className="text-[#10b981] text-xs sm:text-sm" />
            </div>
            <div className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 bg-white dark:bg-[#141b2d] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 dark:border-[#1e2742] max-w-full sm:max-w-md">
            <FaSearch className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm flex-shrink-0" />
            <input
              type="text"
              aria-label="Search gift card batches"
              placeholder="Search code, batch ID, prefix, status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-[#6b7280] min-w-0"
            />
            {searchQuery && <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear gift card search" className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white"><FaTimes className="text-xs" /></button>}
          </div>
        </div>
      </div>

      {/* Gift Cards Table */}
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden max-w-full">
        <div className="overflow-x-auto max-w-full">
          <table className="w-full border-collapse min-w-[650px] sm:min-w-[750px] md:min-w-[850px] lg:min-w-[950px]">
            <thead className="bg-gray-50 dark:bg-[#1e2742] sticky top-0 z-10">
              <tr>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider min-w-[76px]">
                  Image
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider min-w-[140px] sm:min-w-[160px]">
                  Gift Card Codes
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider min-w-[80px]">
                  Amount
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider min-w-[140px]">
                  Redeemed / Generated
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider min-w-[90px]">
                  Status
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden lg:table-cell min-w-[110px]">
                  Expires At
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden xl:table-cell min-w-[110px]">
                  Created At
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider min-w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="8" className="px-4 py-10 text-center text-sm text-gray-500 dark:text-[#8b8fa3]">Loading gift cards…</td></tr>
              ) : loadError ? (
                <tr><td colSpan="8" className="px-4 py-10 text-center text-sm text-red-500">{loadError}</td></tr>
              ) : filteredGiftCards.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-2 sm:px-4 py-6 sm:py-8 text-center text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm">
                    {debouncedSearchQuery ? 'No gift cards found matching your search' : 'No gift cards available'}
                  </td>
                </tr>
              ) : (
                filteredGiftCards.map((card) => {
                  const { generated, redeemed, available } = getGiftCardInventory(card)
                  const status = getGiftCardStatusPresentation(card.status)
                  const StatusIcon = status.icon === 'check' ? FaCheckCircle : FaTimesCircle
                  return <tr
                    key={card.id}
                    className="hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors border-b border-gray-200 dark:border-[#1e2742]"
                  >
                    <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                      {card.image ? <img src={card.image} alt={`${card.code} gift card`} loading="lazy" className="w-14 h-10 rounded-md border border-gray-200 dark:border-[#2a3441] object-cover" /> : <div className="w-14 h-10 rounded-md border border-gray-200 dark:border-[#2a3441] flex items-center justify-center text-[#10b981]"><FaGift /></div>}
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 min-w-0">
                        <FaGift className="text-[#10b981] text-xs sm:text-sm flex-shrink-0" />
                        <button type="button" onClick={() => setGiftCardCodesToView(card)} className="rounded-md px-2 py-1 text-left text-xs sm:text-sm font-medium text-[#10b981] hover:bg-emerald-500/10">
                          View codes ({card.codes?.length || generated})
                        </button>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-gray-900 dark:text-[#e0e0e0] font-semibold whitespace-nowrap">${card.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                      <div className="whitespace-nowrap"><div className="text-xs sm:text-sm text-gray-900 dark:text-[#e0e0e0] font-medium">{redeemed} / {generated}</div><div className="text-xs text-gray-500 dark:text-[#8b8fa3] mt-0.5">{available} available</div></div>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.className}`}><StatusIcon className="text-xs" />{status.label}</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                        <FaClock className="text-gray-400 dark:text-[#8b8fa3] text-xs flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-900 dark:text-[#e0e0e0] whitespace-nowrap">{formatDate(card.expiresAt)}</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 hidden xl:table-cell">
                      <span className="text-xs sm:text-sm text-gray-900 dark:text-[#e0e0e0] whitespace-nowrap">{formatDate(card.createdAt)}</span>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" onClick={() => navigate(`/dashboard/gift-cards/${card.id || card._id}/edit`)} title="Edit gift card batch" aria-label="Edit gift card batch" className="p-2 rounded-md text-gray-500 hover:text-[#10b981] hover:bg-gray-100 dark:hover:bg-[#1e2742]"><FaEdit /></button>
                        <button type="button" onClick={() => handleDeleteGiftCard(card)} title="Delete gift card batch" aria-label="Delete gift card batch" className="p-2 rounded-md text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteGiftCardModal giftCard={giftCardToDelete} onClose={() => setGiftCardToDelete(null)} onConfirm={confirmDeleteGiftCard} />
      <GiftCardCodesModal giftCard={giftCardCodesToView} onClose={() => setGiftCardCodesToView(null)} />
    </main>
  )
}

export default GiftCards

