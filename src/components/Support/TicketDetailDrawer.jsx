import { formatLongDateTime as formatDateTime } from '../../services/helper.js'
import { useState } from 'react'
import { FaTimes, FaUser, FaClock, FaReply, FaCheckCircle, FaUserCheck, FaExclamationTriangle, FaPaperclip, FaStickyNote, FaLock, FaCircle, FaBan } from 'react-icons/fa'
import { useToast } from '../ui/ToastContainer'

const TicketDetailDrawer = ({ isOpen, onClose, ticket }) => {
  const { success, error } = useToast()
  const [replyText, setReplyText] = useState('')
  const [internalNote, setInternalNote] = useState('')
  const [showInternalNotes, setShowInternalNotes] = useState(true)

  if (!isOpen || !ticket) return null

  const getStatusBadge = (status) => {
    const styles = {
      open: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]',
      assigned: 'bg-[rgba(59,130,246,0.2)] text-[#3b82f6]',
      'in-progress': 'bg-[rgba(59,130,246,0.2)] text-[#3b82f6]',
      resolved: 'bg-[rgba(16,185,129,0.2)] text-[#10b981]',
      closed: 'bg-[rgba(107,114,128,0.2)] text-[#6b7280]',
    }
    const icons = {
      open: FaCircle,
      assigned: FaUserCheck,
      'in-progress': FaClock,
      resolved: FaCheckCircle,
      closed: FaBan,
    }
    const Icon = icons[status] || FaCircle
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${styles[status] || styles.open}`}>
        <Icon className="text-sm" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const styles = {
      low: 'bg-[rgba(107,114,128,0.2)] text-[#6b7280]',
      medium: 'bg-[rgba(245,158,11,0.2)] text-[#f59e0b]',
      high: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]',
      critical: 'bg-[rgba(239,68,68,0.2)] text-[#ef4444] border border-[#ef4444]',
    }
    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${styles[priority] || styles.low}`}>
        {priority}
      </span>
    )
  }


  // Mock conversation messages
  const messages = [
    {
      id: 1,
      sender: 'user',
      name: ticket.user.name,
      message: 'I tried to purchase Cyber Warriors 2077 but my payment was declined. I have sufficient funds in my account.',
      timestamp: ticket.createdAt,
      attachments: [],
    },
    {
      id: 2,
      sender: 'admin',
      name: ticket.assignedTo?.name || 'Support Team',
      message: 'Thank you for contacting us. We are looking into this issue and will get back to you shortly.',
      timestamp: new Date(ticket.createdAt.getTime() + 30 * 60000),
      attachments: [],
    },
  ]

  // Mock internal notes
  const internalNotes = [
    {
      id: 1,
      admin: 'Alex Morgan',
      note: 'User has valid payment method. Checking payment gateway logs.',
      timestamp: new Date(ticket.createdAt.getTime() + 45 * 60000),
    },
  ]

  const handleReply = () => {
    if (!replyText.trim()) {
      error('Please enter a reply message')
      return
    }
    // TODO: Implement reply functionality
    success('Reply sent successfully')
    setReplyText('')
  }

  const handleAddInternalNote = () => {
    if (!internalNote.trim()) {
      error('Please enter an internal note')
      return
    }
    // TODO: Implement internal note functionality
    success('Internal note added')
    setInternalNote('')
  }

  const handleStatusChange = (newStatus) => {
    // TODO: Implement status change
    success(`Ticket status changed to ${newStatus}`)
  }

  const handleAssign = () => {
    // TODO: Implement assignment
    success('Ticket assigned successfully')
  }

  const handleCloseTicket = () => {
    if (window.confirm('Are you sure you want to close this ticket? This action cannot be undone.')) {
      // TODO: Implement close ticket
      success('Ticket closed successfully')
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-3xl bg-white dark:bg-[#141b2d] border-l border-gray-200 dark:border-[#1e2742] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto flex flex-col`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#141b2d] border-b border-gray-200 dark:border-[#1e2742] px-6 py-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-1">Ticket Details</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-gray-600 dark:text-[#8b8fa3] text-xs font-mono">{ticket.id}</span>
                {getStatusBadge(ticket.status)}
                {getPriorityBadge(ticket.priority)}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 dark:text-[#8b8fa3] hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleStatusChange('in-progress')}
              className="px-3 py-1.5 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors"
            >
              Mark In Progress
            </button>
            <button
              onClick={() => handleStatusChange('resolved')}
              className="px-3 py-1.5 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors"
            >
              Mark Resolved
            </button>
            <button
              onClick={handleAssign}
              className="px-3 py-1.5 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors"
            >
              Assign
            </button>
            <button
              onClick={handleCloseTicket}
              className="px-3 py-1.5 bg-white dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-xs hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors"
            >
              Close Ticket
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Information */}
          <div className="p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-semibold">
                {ticket.user.initials}
              </div>
              <div className="flex-1">
                <div className="text-gray-900 dark:text-white font-medium text-sm">{ticket.user.name}</div>
                <div className="text-gray-500 dark:text-[#8b8fa3] text-xs">{ticket.user.email}</div>
                <a
                  href={`/dashboard/users/${ticket.userId}`}
                  className="text-[#3b82f6] text-xs mt-1 hover:text-[#60a5fa] transition-colors"
                >
                  View User Profile →
                </a>
              </div>
            </div>
          </div>

          {/* Ticket Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Category</label>
              <div className="text-gray-900 dark:text-white text-sm capitalize">{ticket.category}</div>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Assigned To</label>
              <div className="text-gray-900 dark:text-white text-sm">
                {ticket.assignedTo ? ticket.assignedTo.name : 'Unassigned'}
              </div>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Created</label>
              <div className="text-gray-900 dark:text-white text-sm">{formatDateTime(ticket.createdAt)}</div>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Last Updated</label>
              <div className="text-gray-900 dark:text-white text-sm">{formatDateTime(ticket.lastUpdated)}</div>
            </div>
            {ticket.firstResponseTime && (
              <div>
                <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">First Response</label>
                <div className="text-[#10b981] text-sm">{ticket.firstResponseTime}</div>
              </div>
            )}
            {ticket.resolutionTime && (
              <div>
                <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Resolution Time</label>
                <div className="text-[#10b981] text-sm">{ticket.resolutionTime}</div>
              </div>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Subject</label>
            <div className="p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
              <p className="text-gray-900 dark:text-white text-sm font-medium">{ticket.subject}</p>
            </div>
          </div>

          {/* Conversation Timeline */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-sm font-medium mb-4">Conversation</h3>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441]'
                      : 'bg-blue-50 dark:bg-[rgba(59,130,246,0.1)] border border-blue-200 dark:border-[#3b82f6]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2]'
                        : 'bg-gradient-to-br from-[#3b82f6] to-[#2563eb]'
                    }`}>
                      {msg.sender === 'user' ? ticket.user.initials : 'A'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-900 dark:text-white text-sm font-medium">{msg.name}</span>
                        <span className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                          {formatDateTime(msg.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-[#e0e0e0] text-sm">{msg.message}</p>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                          <FaPaperclip className="text-gray-400 dark:text-[#8b8fa3] text-xs" />
                          <span className="text-gray-500 dark:text-[#8b8fa3] text-xs">{msg.attachments.length} attachment(s)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reply Section */}
          <div className="border-t border-gray-200 dark:border-[#1e2742] pt-4">
            <label className="block text-gray-600 dark:text-[#8b8fa3] text-xs font-medium mb-2">Reply to User</label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              rows={4}
              className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none mb-3"
            />
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 dark:text-[#8b8fa3] text-xs hover:text-gray-800 dark:hover:text-white transition-colors">
                <FaPaperclip className="text-xs" />
                <span>Attach File</span>
              </button>
              <button
                onClick={handleReply}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <FaReply className="text-sm" />
                <span>Send Reply</span>
              </button>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="border-t border-gray-200 dark:border-[#1e2742] pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaLock className="text-gray-400 dark:text-[#8b8fa3] text-sm" />
                <h3 className="text-gray-900 dark:text-white text-sm font-medium">Internal Notes</h3>
                <span className="text-gray-500 dark:text-[#8b8fa3] text-xs">(Not visible to user)</span>
              </div>
              <button
                onClick={() => setShowInternalNotes(!showInternalNotes)}
                className="text-gray-600 dark:text-[#8b8fa3] text-xs hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                {showInternalNotes ? 'Hide' : 'Show'}
              </button>
            </div>
            {showInternalNotes && (
              <>
                <div className="space-y-3 mb-4">
                  {internalNotes.map((note) => (
                    <div key={note.id} className="p-3 bg-yellow-50 dark:bg-[rgba(245,158,11,0.1)] border border-yellow-200 dark:border-[#f59e0b] rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <FaStickyNote className="text-[#f59e0b] text-xs" />
                        <span className="text-gray-900 dark:text-white text-xs font-medium">{note.admin}</span>
                        <span className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                          {formatDateTime(note.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-[#e0e0e0] text-xs">{note.note}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <textarea
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Add internal note..."
                    rows={2}
                    className="flex-1 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 py-2 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 transition-all resize-none"
                  />
                  <button
                    onClick={handleAddInternalNote}
                    className="px-4 py-2 bg-[#f59e0b] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <FaStickyNote />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TicketDetailDrawer

