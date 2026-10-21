import { formatLocalLongDate as formatDate } from '../../services/helper.js'
import { useState } from 'react'
import {
  FaCalendarAlt,
  FaGamepad,
  FaRupeeSign,
  FaStar,
  FaTag,
  FaUsers,
} from 'react-icons/fa'
import KPICard from '../Dashboard/KPICard'
import GameMediaSection from './GameMediaSection'


const ValueList = ({ title, values = [] }) => (
  <div>
    <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-2">{title}</div>
    {values.length ? (
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <span key={value} className="px-2 py-1 bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] text-xs rounded">
            {value}
          </span>
        ))}
      </div>
    ) : (
      <div className="text-gray-500 dark:text-[#6b7280] text-sm">Not specified</div>
    )}
  </div>
)

const RequirementCard = ({ title, requirements = {} }) => {
  const rows = [
    ['Operating system', requirements.os],
    ['Processor', requirements.processor],
    ['Memory', requirements.memory],
    ['Graphics', requirements.graphics],
    ['Storage', requirements.storage],
  ].filter(([, value]) => value)

  return (
    <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
      <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">{title}</h3>
      {rows.length ? (
        <dl className="space-y-3">
          {rows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[120px_1fr] gap-3 text-sm">
              <dt className="text-gray-600 dark:text-[#8b8fa3]">{label}</dt>
              <dd className="text-gray-900 dark:text-white break-words">{value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-gray-500 dark:text-[#8b8fa3] text-sm">No requirements have been added.</p>
      )}
    </section>
  )
}

const OverviewTab = ({ game }) => {
  const [expandedDescriptionKey, setExpandedDescriptionKey] = useState(null)
  const description = game.description || 'No description has been added.'
  const descriptionKey = `${game._id}:${description}`
  const descriptionExpanded = expandedDescriptionKey === descriptionKey
  const canExpandDescription = description.length > 240
  const hasActiveSale = game.isDiscountActive === true && game.discountPrice != null && game.discountPrice < game.price

  const minimum = game.systemRequirements?.minimum || {}
  const recommended = game.systemRequirements?.recommended || {}
  const stockLabel = game.stock === -1
    ? 'Unlimited'
    : typeof game.stock === 'number'
      ? game.stock.toLocaleString()
      : 'Not set'

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard icon={FaUsers} label="Units Sold" value={(game.totalSales || 0).toLocaleString()} change="Lifetime sales" changeType="positive" iconColor="purple" />
        <KPICard icon={FaRupeeSign} label="Current Price" value={`₹${Number(hasActiveSale ? game.discountPrice : game.price ?? 0).toLocaleString()}`} change={hasActiveSale ? `Regular price ₹${Number(game.price || 0).toLocaleString()}` : 'No active sale price'} changeType="positive" iconColor="green" />
        <KPICard icon={FaStar} label="Average Rating" value={Number(game.averageRating || 0).toFixed(1)} change={`${(game.reviewCount || 0).toLocaleString()} reviews`} changeType="positive" iconColor="orange" />
        <KPICard icon={FaTag} label="Inventory" value={stockLabel} change={game.isActive ? 'Visible in store' : 'Hidden from store'} changeType={game.isActive ? 'positive' : 'negative'} iconColor="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-gray-900 dark:text-white text-lg font-semibold mb-5"><FaGamepad className="text-[#10b981]" /> Game Information</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div><dt className="text-gray-600 dark:text-[#8b8fa3] mb-1">Developer</dt><dd className="text-gray-900 dark:text-white">{game.developer || 'Not specified'}</dd></div>
            <div><dt className="text-gray-600 dark:text-[#8b8fa3] mb-1">Publisher</dt><dd className="text-gray-900 dark:text-white">{game.publisher || 'Not specified'}</dd></div>
            <div><dt className="text-gray-600 dark:text-[#8b8fa3] mb-1">Category</dt><dd className="text-gray-900 dark:text-white">{game.category || 'Not specified'}</dd></div>
            <div><dt className="text-gray-600 dark:text-[#8b8fa3] mb-1">Age Rating</dt><dd className="text-gray-900 dark:text-white">{game.ageRating || 'Not rated'}</dd></div>
            <div><dt className="text-gray-600 dark:text-[#8b8fa3] mb-1">Release Date</dt><dd className="text-gray-900 dark:text-white">{formatDate(game.releaseDate)}</dd></div>
            <div><dt className="flex items-center gap-2 text-gray-600 dark:text-[#8b8fa3] mb-1"><FaCalendarAlt /> Added</dt><dd className="text-gray-900 dark:text-white">{formatDate(game.createdAt)}</dd></div>
            <div><dt className="text-gray-600 dark:text-[#8b8fa3] mb-1">Download Size</dt><dd className="text-gray-900 dark:text-white">{game.downloadSize || 'Not specified'}</dd></div>
            <div><dt className="text-gray-600 dark:text-[#8b8fa3] mb-1">Slug</dt><dd className="text-gray-900 dark:text-white break-all">{game.slug || 'Not set'}</dd></div>
          </dl>
        </section>

        <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6 space-y-5">
          <h3 className="text-gray-900 dark:text-white text-lg font-semibold">Platforms & Categories</h3>
          <ValueList title="Platforms" values={game.platform || []} />
          <ValueList title="Genres" values={game.genres || []} />
          <ValueList title="Languages" values={game.languages || []} />
          <ValueList title="Tags" values={game.tags || []} />
        </section>
      </div>

      <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-3">Description</h3>
        <p
          className="text-gray-700 dark:text-[#e0e0e0] text-sm leading-relaxed whitespace-pre-wrap"
          style={canExpandDescription && !descriptionExpanded ? { maxHeight: '6em', overflow: 'hidden' } : undefined}
        >
          {description}
        </p>
        {canExpandDescription && (
          <button
            type="button"
            onClick={() => setExpandedDescriptionKey(descriptionExpanded ? null : descriptionKey)}
            aria-expanded={descriptionExpanded}
            className="mt-2 text-sm font-medium text-[#10b981] hover:text-[#059669] transition-colors"
          >
            {descriptionExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
        {game.shortDescription && <p className="mt-4 text-gray-500 dark:text-[#8b8fa3] text-sm">{game.shortDescription}</p>}
      </section>

      <GameMediaSection images={game.images} videos={game.videos} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RequirementCard title="Minimum Requirements" requirements={minimum} />
        <RequirementCard title="Recommended Requirements" requirements={recommended} />
      </div>
    </div>
  )
}

export default OverviewTab
