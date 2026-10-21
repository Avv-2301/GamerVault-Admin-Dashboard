import { formatDateOnly as formatDate } from '../../services/helper.js'
import { useState } from 'react'
import { FaStar, FaUser, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'

const ReviewsTab = ({ gameId }) => {
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  // Mock data - replace with API call
  const mockReviews = [
    {
      id: 1,
      user: { name: 'John Smith', avatar: 'https://via.placeholder.com/40x40/667eea/ffffff?text=JS' },
      rating: 5,
      comment: 'Amazing game! The graphics are stunning and the gameplay is incredibly engaging. Highly recommended!',
      date: '2024-05-15T10:30:00',
      helpful: 24,
    },
    {
      id: 2,
      user: { name: 'Emma Wilson', avatar: 'https://via.placeholder.com/40x40/10b981/ffffff?text=EW' },
      rating: 4,
      comment: 'Great game overall. The story is compelling and the mechanics are well-designed. Some minor bugs but nothing game-breaking.',
      date: '2024-05-10T14:20:00',
      helpful: 18,
    },
    {
      id: 3,
      user: { name: 'Michael Brown', avatar: 'https://via.placeholder.com/40x40/f97316/ffffff?text=MB' },
      rating: 5,
      comment: 'Best game I\'ve played this year! The attention to detail is incredible.',
      date: '2024-05-05T09:15:00',
      helpful: 32,
    },
  ]


  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="inline ml-1 text-gray-600 dark:text-[#8b8fa3]" />
    return sortDirection === 'asc' ? <FaSortUp className="inline ml-1 text-gray-900 dark:text-white" /> : <FaSortDown className="inline ml-1 text-gray-900 dark:text-white" />
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-[#fbbf24]' : 'text-gray-400 dark:text-[#4b5563]'}
        size={14}
      />
    ))
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-[#1e2742]">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-1">User Reviews</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Customer feedback and ratings</p>
      </div>
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="bg-gray-50 dark:bg-[#1e2742] sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                User
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => handleSort('rating')}
              >
                Rating {getSortIcon('rating')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Review
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => handleSort('date')}
              >
                Date {getSortIcon('date')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Helpful
              </th>
            </tr>
          </thead>
          <tbody>
            {mockReviews.map((review) => (
              <tr
                key={review.id}
                className="border-b border-gray-200 dark:border-[#1e2742] hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-sm font-semibold">
                      {review.user.name.charAt(0)}
                    </div>
                    <div className="text-gray-900 dark:text-white text-sm font-medium">{review.user.name}</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                    <span className="text-gray-600 dark:text-[#8b8fa3] text-xs ml-1">({review.rating})</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-gray-700 dark:text-[#e0e0e0] text-sm max-w-md">{review.comment}</div>
                </td>
                <td className="px-4 py-4 text-gray-700 dark:text-[#e0e0e0] text-sm">{formatDate(review.date)}</td>
                <td className="px-4 py-4 text-gray-700 dark:text-[#e0e0e0] text-sm">{review.helpful}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReviewsTab

