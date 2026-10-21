import { formatDate } from '../../services/helper.js'
import { useState } from 'react'
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaRupeeSign,
  FaCalendarAlt,
  FaUser,
} from 'react-icons/fa'

const SalesTab = ({ gameId }) => {
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  // Mock data - replace with API call
  const mockSales = [
    {
      id: 'SALE-001',
      userId: 'USR-001',
      user: { name: 'John Smith', email: 'johns@example.com' },
      amount: 39.99,
      date: '2024-05-20T14:30:00',
      paymentMethod: 'card',
    },
    {
      id: 'SALE-002',
      userId: 'USR-002',
      user: { name: 'Emma Wilson', email: 'emmaw@example.com' },
      amount: 39.99,
      date: '2024-05-19T10:15:00',
      paymentMethod: 'wallet',
    },
    {
      id: 'SALE-003',
      userId: 'USR-003',
      user: { name: 'Michael Brown', email: 'michaelb@example.com' },
      amount: 39.99,
      date: '2024-05-18T08:45:00',
      paymentMethod: 'card',
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

  const sortedSales = [...mockSales].sort((a, b) => {
    if (!sortField) return 0
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === 'date') {
      aValue = new Date(a.date)
      bValue = new Date(b.date)
    } else if (sortField === 'user') {
      aValue = a.user.name.toLowerCase()
      bValue = b.user.name.toLowerCase()
    }

    if (typeof aValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
  })

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-[#1e2742]">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-1">Sales History</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Complete transaction history for this game</p>
      </div>
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-[700px]">
          <thead className="bg-gray-50 dark:bg-[#1e2742] sticky top-0 z-10">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => handleSort('id')}
              >
                Sale ID {getSortIcon('id')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => handleSort('user')}
              >
                Customer {getSortIcon('user')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => handleSort('amount')}
              >
                Amount {getSortIcon('amount')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Payment Method
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => handleSort('date')}
              >
                Date & Time {getSortIcon('date')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSales.map((sale) => (
              <tr
                key={sale.id}
                className="border-b border-gray-200 dark:border-[#1e2742] hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors"
              >
                <td className="px-4 py-4">
                  <code className="text-gray-800 dark:text-[#e0e0e0] text-sm">{sale.id}</code>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-xs font-semibold">
                      {sale.user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white text-sm font-medium">{sale.user.name}</div>
                      <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">{sale.user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white font-medium text-sm">₹{sale.amount.toFixed(2)}</td>
                <td className="px-4 py-4">
                  <span className="text-gray-700 dark:text-[#e0e0e0] text-sm capitalize">{sale.paymentMethod}</span>
                </td>
                <td className="px-4 py-4 text-gray-700 dark:text-[#e0e0e0] text-sm">{formatDate(sale.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SalesTab

