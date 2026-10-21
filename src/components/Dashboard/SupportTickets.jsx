import { useState, useMemo } from 'react'
import { FaExclamationTriangle, FaInfoCircle, FaCheck } from 'react-icons/fa'

// Support tickets data configuration
const tickets = [
  {
    id: '#S1P-1047',
    priority: 'high',
    icon: FaExclamationTriangle,
    title: 'High Priority',
    description: 'Payment failed for game purchase - User unable to complete transaction for Cyber Warriors 2077.',
    meta: '5 min ago • Jessica Parker',
    status: 'open',
  },
  {
    id: '#S1P-1009',
    priority: 'medium',
    icon: FaExclamationTriangle,
    title: 'Medium Priority',
    description: 'Account verification issue - User requesting help with email verification process.',
    meta: '18 min ago • Mark Thompson',
    status: 'open',
  },
  {
    id: '#S1P-1045',
    priority: 'low',
    icon: FaInfoCircle,
    title: 'Low Priority',
    description: 'Question about game features - User asking about multiplayer mode in Racing Legends.',
    meta: '42 min ago • Lisa Anderson',
    status: 'open',
  },
  {
    id: '#S1P-1006',
    priority: 'resolved',
    icon: FaCheck,
    title: 'Resolved',
    description: 'Refund request processed - Successfully refunded purchase of Mystery Quest.',
    meta: '1 hour ago • Tom Wilson',
    status: 'closed',
  },
]

// Priority border styles configuration
const priorityStyles = {
  high: 'border-l-[#ef4444]',
  medium: 'border-l-[#f97316]',
  low: 'border-l-[#3b82f6]',
  resolved: 'border-l-[#10b981] opacity-70',
}

// Filter options
const FILTER_OPTIONS = ['All', 'Open', 'Closed']

const SupportTickets = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  // Filter tickets based on active filter and limit to 3
  const filteredTickets = useMemo(() => {
    let filtered = []
    if (activeFilter === 'All') filtered = tickets
    else if (activeFilter === 'Open') filtered = tickets.filter(ticket => ticket.status === 'open')
    else if (activeFilter === 'Closed') filtered = tickets.filter(ticket => ticket.status === 'closed')
    else filtered = tickets
    return filtered.slice(0, 3)
  }, [activeFilter])

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg sm:rounded-xl p-4 sm:p-6">
      <div className="mb-4 sm:mb-5">
        <h3 className="text-gray-800 dark:text-white text-base sm:text-lg mb-1">Support Tickets</h3>
        <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">Recent customer inquiries.</p>
        <div className="flex gap-2 mt-2 sm:mt-3 flex-wrap">
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs transition-all ${
                activeFilter === filter
                  ? 'bg-[#10b981] border border-[#10b981] text-white'
                  : 'bg-transparent border border-gray-200 dark:border-[#1e2742] text-gray-600 dark:text-[#8b8fa3] hover:border-[#10b981] hover:text-[#10b981]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 max-h-[200px] sm:max-h-[250px] overflow-y-auto">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm">
            No tickets found
          </div>
        ) : (
          filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`flex gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-[#1e2742] rounded-lg border-l-4 ${priorityStyles[ticket.priority]}`}
          >
            <div className="text-lg sm:text-xl flex-shrink-0 flex items-center text-gray-600 dark:text-white">
              <ticket.icon />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-800 dark:text-white font-semibold text-xs mb-1 truncate">
                {ticket.id} {ticket.title}
              </div>
              <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-1 leading-relaxed line-clamp-2">{ticket.description}</div>
              <div className="text-gray-400 dark:text-[#6b7280] text-xs truncate">{ticket.meta}</div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SupportTickets

