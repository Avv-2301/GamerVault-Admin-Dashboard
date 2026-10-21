import { formatLocalDate as formatDate } from '../../services/helper.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaCheckCircle,
  FaCopy,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaStar,
  FaTag,
  FaTimesCircle,
  FaTrash,
} from 'react-icons/fa'
import { changeGameVisibility, deleteGame, updateGame } from '../../services/api/game'
import DeleteGameModal from '../Games/DeleteGameModal'

const GameHeader = ({ game, onGameUpdated, onManageDiscount, onDelete }) => {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const gameId = game._id
  const currentPrice = Number(game.price || 0)
  const salePrice = game.discountPrice == null ? null : Number(game.discountPrice)
  const hasDiscount = game.isDiscountActive === true && salePrice !== null && salePrice < currentPrice

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(gameId)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard access can be unavailable on non-secure origins.
    }
  }

  const toggleVisibility = async () => {
    setIsBusy(true)
    try {
      const nextStatus = !game.isActive
      const response = await changeGameVisibility(gameId, nextStatus)
      if (response?.meta?.code === 200) {
        onGameUpdated({ ...game, isActive: nextStatus })
      }
    } finally {
      setIsBusy(false)
    }
  }

  const toggleFeatured = async () => {
    setIsBusy(true)
    try {
      const response = await updateGame(gameId, { isFeatured: !game.isFeatured })
      onGameUpdated(response?.data)
    } catch {
      // The API helper shows an error message.
    } finally {
      setIsBusy(false)
    }
  }

  const confirmDelete = async (password) => {
    const response = await deleteGame(gameId, password)
    if (response?.meta?.code === 200) {
      setIsDeleteOpen(false)
      onDelete()
    }
  }


  return (
    <>
      <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-5 sm:p-6">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-4 mb-5">
              {game.thumbnail ? (
                <img src={game.thumbnail} alt={game.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0 bg-gray-100 dark:bg-[#1e2742]" />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-[#1e2742] text-gray-400">No image</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h1 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold break-words">{game.name}</h1>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${game.isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}>
                    {game.isActive ? <FaCheckCircle /> : <FaTimesCircle />}{game.isActive ? 'Live' : 'Hidden'}
                  </span>
                  {game.isFeatured && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"><FaStar /> Featured</span>}
                </div>
                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 dark:text-[#8b8fa3]">
                  <span>Game ID</span>
                  <code className="max-w-[230px] truncate text-gray-800 dark:text-[#e0e0e0] bg-gray-100 dark:bg-[#1e2742] px-2 py-1 rounded">{gameId}</code>
                  <button type="button" onClick={copyId} aria-label="Copy game ID" title="Copy game ID" className="hover:text-[#10b981]">
                    {copied ? <FaCheckCircle className="text-[#10b981]" /> : <FaCopy />}
                  </button>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600 dark:text-[#8b8fa3]">
                  <span>Category: <strong className="text-gray-900 dark:text-white font-medium">{game.category || '—'}</strong></span>
                  <span>Rating: <strong className="text-gray-900 dark:text-white font-medium">{Number(game.averageRating || 0).toFixed(1)} ★</strong></span>
                  <span>Reviews: <strong className="text-gray-900 dark:text-white font-medium">{(game.reviewCount || 0).toLocaleString()}</strong></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-[#1e2742]">
              <div><div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Price</div><div className="font-bold text-lg text-gray-900 dark:text-white">{hasDiscount && <span className="line-through text-gray-500 text-sm mr-2">₹{currentPrice.toFixed(2)}</span>}<span className={hasDiscount ? 'text-[#10b981]' : ''}>₹{(hasDiscount ? salePrice : currentPrice).toFixed(2)}</span></div></div>
              <div><div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Units Sold</div><div className="font-bold text-lg text-gray-900 dark:text-white">{(game.totalSales || 0).toLocaleString()}</div></div>
              <div><div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Discount</div><div className="font-bold text-lg text-gray-900 dark:text-white">{hasDiscount ? `${game.discountPercentage || Math.round((1 - salePrice / currentPrice) * 100)}%` : 'None'}</div></div>
              <div><div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Added</div><div className="text-gray-900 dark:text-white text-sm">{formatDate(game.createdAt)}</div></div>
            </div>
          </div>

          <aside className="xl:w-64 flex-shrink-0">
            <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-4">
              <h2 className="text-gray-900 dark:text-white text-sm font-semibold mb-3">Game Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2">
                <button type="button" onClick={() => navigate(`/dashboard/games/${encodeURIComponent(gameId)}/edit`)} disabled={isBusy} className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] disabled:opacity-50"><FaEdit /> Edit Game</button>
                <button type="button" onClick={onManageDiscount} className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742]"><FaTag /> Manage Discount</button>
                <button type="button" onClick={toggleVisibility} disabled={isBusy} className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] disabled:opacity-50">{game.isActive ? <FaEyeSlash /> : <FaEye />}{game.isActive ? 'Hide Game' : 'Make Live'}</button>
                <button type="button" onClick={toggleFeatured} disabled={isBusy} className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 py-2.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] disabled:opacity-50"><FaStar />{game.isFeatured ? 'Remove Featured' : 'Mark Featured'}</button>
                <button type="button" onClick={() => setIsDeleteOpen(true)} disabled={isBusy} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50"><FaTrash /> Hide Game</button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <DeleteGameModal game={isDeleteOpen ? game : null} onClose={() => setIsDeleteOpen(false)} onConfirm={confirmDelete} />
    </>
  )
}

export default GameHeader
