import { useEffect, useState } from 'react'
import { formatDateOnly as formatDate } from '../../services/helper.js'
import { getAllDiscounts } from '../../services/api/discounts'

const DiscountsTab = ({ game }) => {
  const [discounts, setDiscounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getAllDiscounts()
      .then(({ discounts: records = [] }) => {
        if (!active) return
        setDiscounts(records.filter((discount) =>
          discount.scope === 'game'
            ? discount.selectedGames?.some((selected) => String(selected?._id || selected) === String(game._id))
            : discount.scope === 'category' && discount.selectedCategories?.includes(game.category)
        ))
      })
      .catch((requestError) => {
        if (active) setError(requestError?.message || 'Could not load discounts')
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [game._id, game.category])

  const hasConfiguredPrice = game.discountPrice != null && Number(game.discountPrice) < Number(game.price)
  const percentage = hasConfiguredPrice
    ? Number(game.discountPercentage) || Math.round((1 - Number(game.discountPrice) / Number(game.price)) * 100)
    : 0
  const rows = [
    {
      id: 'individual',
      name: 'Individual game discount',
      scope: 'Manual',
      status: game.isDiscountManuallyActive ? 'active' : 'disabled',
      period: 'Until turned off',
    },
    ...discounts.map((discount) => ({
      id: discount.id,
      name: discount.name,
      scope: discount.scope === 'game' ? 'Specific games' : 'Category',
      status: discount.status,
      period: `${formatDate(discount.startDate)} – ${formatDate(discount.endDate)}`,
    })),
  ]

  return (
    <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-[#1e2742]">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-1">Game Discounts</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Active promotions use this game’s configured discount price and percentage.</p>
      </div>
      {loading ? <p className="p-6 text-sm text-gray-500">Loading discounts…</p> : error ? <p role="alert" className="p-6 text-sm text-red-500">{error}</p> : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-gray-50 dark:bg-[#1e2742] text-left text-xs uppercase text-gray-500 dark:text-[#8b8fa3]">
              <tr><th className="px-4 py-3">Discount</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Game price</th><th className="px-4 py-3">Period</th><th className="px-4 py-3">Status</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-200 dark:border-[#1e2742] text-gray-800 dark:text-[#e0e0e0]">
                  <td className="px-4 py-4 font-medium">{row.name}</td>
                  <td className="px-4 py-4">{row.scope}</td>
                  <td className="px-4 py-4">{hasConfiguredPrice ? `${percentage}% · ₹${Number(game.discountPrice).toFixed(2)}` : 'No discount price set'}</td>
                  <td className="px-4 py-4">{row.period}</td>
                  <td className="px-4 py-4 capitalize">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default DiscountsTab
