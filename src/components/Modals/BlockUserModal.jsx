import { validateBlockForm } from '../../services/helper'
import { useState } from 'react'
import {
  FaBan,
  FaKey,
  FaExclamationTriangle,
  FaUser,
} from 'react-icons/fa'
import Modal from '../ui/Modal'

const BlockUserModal = ({ isOpen, onClose, user, onConfirm }) => {
  const [blockData, setBlockData] = useState({
    reason: '',
    adminPassword: '',
  })
  const [blockErrors, setBlockErrors] = useState({})

  const blockReasons = [
    'Violation of Terms of Service',
    'Fraudulent Activity',
    'Suspicious Behavior',
    'Account Security Concern',
    'Spam or Abuse',
    'Other',
  ]


  const handleConfirmBlock = () => {
    const validationErrors = validateBlockForm(blockData)
    setBlockErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    // Call parent handler with block data
    onConfirm({
      reason: blockData.reason,
      adminPassword: blockData.adminPassword,
    })

    // Reset form
    handleClose()
  }

  const handleClose = () => {
    setBlockData({
      reason: '',
      adminPassword: '',
    })
    setBlockErrors({})
    onClose()
  }

  const handleInputChange = (field, value) => {
    setBlockData({ ...blockData, [field]: value })
    // Clear error when user starts typing
    if (blockErrors[field]) {
      setBlockErrors({ ...blockErrors, [field]: '' })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Block User"
      subtitle="Block this user from accessing their account. This action requires admin authentication."
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* User Info Card */}
        <div className="bg-gradient-to-r from-[#1e2742] to-[#2a3441] border border-[#2a3441] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-semibold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-white font-semibold text-lg mb-1">{user.name?.toUpperCase()}</div>
                <div className="text-[#8b8fa3] text-sm">{user.email}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#8b8fa3] text-xs mb-1">User ID</div>
              <div className="text-white text-sm font-mono">{user._id}</div>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-[rgba(239,68,68,0.1)] border border-[#ef4444] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-[#ef4444] text-lg flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[#ef4444] font-medium text-sm mb-1">Warning: Account Access Restriction</div>
              <div className="text-[#8b8fa3] text-xs leading-relaxed">
                This action will prevent the user from logging in and accessing their account. The user will be notified via email. This action will be logged in the audit trail.
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4">
          {/* Left Column - Reason */}
          <div>
            <label className="text-[#8b8fa3] text-sm mb-2 block flex items-center gap-2">
              <FaBan className="text-[#ef4444]" />
              Reason for Blocking <span className="text-[#ef4444]">*</span>
            </label>
            <select
              value={blockData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              className={`w-full bg-[#1e2742] border ${
                blockErrors.reason ? 'border-[#ef4444]' : 'border-[#2a3441]'
              } text-[#e0e0e0] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#ef4444]`}
            >
              <option value="">Select reason</option>
              {blockReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            {blockErrors.reason && (
              <p className="text-[#ef4444] text-xs mt-1">{blockErrors.reason}</p>
            )}
            <p className="text-[#8b8fa3] text-xs mt-1">
              Select the reason for blocking this user account
            </p>
          </div>

          {/* Right Column - Admin Password */}
          <div>
            <label className="text-[#8b8fa3] text-sm mb-2 block">
              Admin Password <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="password"
              value={blockData.adminPassword}
              onChange={(e) => handleInputChange('adminPassword', e.target.value)}
              placeholder="Your password"
              className={`w-full bg-[#1e2742] border ${
                blockErrors.adminPassword ? 'border-[#ef4444]' : 'border-[#2a3441]'
              } text-[#e0e0e0] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#ef4444]`}
            />
            {blockErrors.adminPassword && (
              <p className="text-[#ef4444] text-xs mt-1">{blockErrors.adminPassword}</p>
            )}
            <div className="bg-[#1e2742] border border-[#2a3441] rounded-lg p-2.5 mt-2">
              <p className="text-[#8b8fa3] text-xs leading-relaxed">
                <span className="text-[#ef4444] font-medium inline-flex items-center gap-1">
                  <FaKey className="text-[10px]" />
                  Security Required
                </span>
                <br />
                <span className="text-[11px]">Enter your admin password to authorize this action.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleConfirmBlock}
            className="flex-1 bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white px-4 py-3 rounded-lg font-medium transition-all shadow-lg shadow-[#ef4444]/20 flex items-center justify-center gap-2"
          >
            <FaBan className="text-sm" />
            <span>Block User</span>
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-[#141b2d] border border-[#1e2742] text-[#e0e0e0] px-4 py-3 rounded-lg hover:bg-[#1e2742] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default BlockUserModal

