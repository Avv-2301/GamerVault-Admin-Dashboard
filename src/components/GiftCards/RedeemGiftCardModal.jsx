import { useState, useEffect } from 'react'
import { FaGift, FaUser, FaRupeeSign, FaKey, FaInfoCircle, FaCheckCircle, FaSpinner } from 'react-icons/fa'
import Modal from '../ui/Modal'
import { validateRedeemGiftCardForm } from '../../services/helper'

const RedeemGiftCardModal = ({ isOpen, onClose, onRedeem, isLoading }) => {
  const [formData, setFormData] = useState({
    code: '',
    userId: '',
    userSearch: '',
  })
  const [errors, setErrors] = useState({})
  const [giftCardInfo, setGiftCardInfo] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [isValidatingCode, setIsValidatingCode] = useState(false)
  const [isSearchingUser, setIsSearchingUser] = useState(false)

  // Mock users for search - replace with API call
  const mockUsers = [
    { id: 'USR-001', name: 'John Doe', email: 'john.doe@example.com', walletBalance: 245.50 },
    { id: 'USR-002', name: 'Jane Smith', email: 'jane.smith@example.com', walletBalance: 120.00 },
    { id: 'USR-003', name: 'Bob Johnson', email: 'bob.johnson@example.com', walletBalance: 50.00 },
  ]

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({ code: '', userId: '', userSearch: '' })
      setErrors({})
      setGiftCardInfo(null)
      setUserInfo(null)
    }
  }, [isOpen])

  const validateCode = async (code) => {
    if (!code || code.trim() === '') {
      setGiftCardInfo(null)
      return
    }

    setIsValidatingCode(true)
    // TODO: Implement API call to validate gift card code
    // GET /api/gift-cards/validate?code={code}
    
    // Simulate API call
    setTimeout(() => {
      // Mock validation - replace with actual API response
      const mockGiftCard = {
        id: 'GC-001',
        code: code.toUpperCase(),
        amount: 50.00,
        status: 'active',
        expiresAt: '2024-12-31',
      }

      if (code.toUpperCase().startsWith('GAMER')) {
        setGiftCardInfo(mockGiftCard)
        setErrors((prev) => ({ ...prev, code: '' }))
      } else {
        setGiftCardInfo(null)
        setErrors((prev) => ({ ...prev, code: 'Invalid gift card code' }))
      }
      setIsValidatingCode(false)
    }, 500)
  }

  const handleCodeChange = (value) => {
    const upperValue = value.toUpperCase()
    setFormData((prev) => ({ ...prev, code: upperValue }))
    validateCode(upperValue)
  }

  const handleUserSearch = (searchTerm) => {
    setFormData((prev) => ({ ...prev, userSearch: searchTerm }))
    
    if (!searchTerm || searchTerm.trim() === '') {
      setUserInfo(null)
      setFormData((prev) => ({ ...prev, userId: '' }))
      return
    }

    setIsSearchingUser(true)
    // TODO: Implement API call to search users
    // GET /api/users/search?q={searchTerm}
    
    // Simulate API call
    setTimeout(() => {
      const foundUser = mockUsers.find(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id.toLowerCase().includes(searchTerm.toLowerCase())
      )

      if (foundUser) {
        setUserInfo(foundUser)
        setFormData((prev) => ({ ...prev, userId: foundUser.id }))
        setErrors((prev) => ({ ...prev, userId: '' }))
      } else {
        setUserInfo(null)
        setFormData((prev) => ({ ...prev, userId: '' }))
        setErrors((prev) => ({ ...prev, userId: 'User not found' }))
      }
      setIsSearchingUser(false)
    }, 300)
  }

  const handleSubmit = () => {
    const validationErrors = validateRedeemGiftCardForm(formData, giftCardInfo, userInfo)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    onRedeem({
      code: formData.code,
      userId: formData.userId,
      amount: giftCardInfo.amount,
      user: userInfo,
    })
  }

  const handleClose = () => {
    setFormData({ code: '', userId: '', userSearch: '' })
    setErrors({})
    setGiftCardInfo(null)
    setUserInfo(null)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Redeem Gift Card"
      subtitle="Redeem a gift card to add funds to a user's wallet"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Information Banner */}
        <div className="bg-[rgba(16,185,129,0.1)] border border-[#10b981] rounded-lg p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <FaInfoCircle className="text-[#10b981] text-base sm:text-lg flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-[#10b981] font-medium text-xs sm:text-sm mb-1">Gift Card Redemption</div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs leading-relaxed">
                Enter a valid gift card code and select the user to redeem it. The gift card amount will be
                added to the user's wallet balance immediately.
              </div>
            </div>
          </div>
        </div>

        {/* Gift Card Code Input */}
        <div>
          <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Gift Card Code <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
              <FaGift className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder="Enter gift card code (e.g., GAMER2024-ABC123)"
              className={`w-full pl-9 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#1e2742] border ${
                errors.code ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
              } rounded-lg text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent`}
            />
            {isValidatingCode && (
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                <FaSpinner className="text-[#10b981] text-xs sm:text-sm animate-spin" />
              </div>
            )}
            {giftCardInfo && !isValidatingCode && (
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                <FaCheckCircle className="text-[#10b981] text-xs sm:text-sm" />
              </div>
            )}
          </div>
          {errors.code && (
            <p className="mt-1.5 text-xs text-red-500">{errors.code}</p>
          )}
          {giftCardInfo && !errors.code && (
            <div className="mt-2 bg-[rgba(16,185,129,0.1)] border border-[#10b981] rounded-lg p-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div className="flex-1 min-w-0">
                  <div className="text-[#10b981] text-xs sm:text-sm font-medium mb-1">Valid Gift Card</div>
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">Expires: {new Date(giftCardInfo.expiresAt).toLocaleDateString()}</div>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Card Value</div>
                  <div className="text-[#10b981] text-lg sm:text-xl font-bold">₹{giftCardInfo.amount.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Search Input */}
        <div>
          <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            User <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
              <FaUser className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              type="text"
              value={formData.userSearch}
              onChange={(e) => handleUserSearch(e.target.value)}
              placeholder="Search by name, email, or user ID"
              className={`w-full pl-9 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#1e2742] border ${
                errors.userId ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
              } rounded-lg text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent`}
            />
            {isSearchingUser && (
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                <FaSpinner className="text-[#10b981] text-xs sm:text-sm animate-spin" />
              </div>
            )}
            {userInfo && !isSearchingUser && (
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                <FaCheckCircle className="text-[#10b981] text-xs sm:text-sm" />
              </div>
            )}
          </div>
          {errors.userId && (
            <p className="mt-1.5 text-xs text-red-500">{errors.userId}</p>
          )}
          {userInfo && !errors.userId && (
            <div className="mt-2 bg-[rgba(16,185,129,0.1)] border border-[#10b981] rounded-lg p-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div className="flex-1 min-w-0">
                  <div className="text-[#10b981] text-xs sm:text-sm font-medium mb-1">{userInfo.name}</div>
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">{userInfo.email}</div>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">Current Balance</div>
                  <div className="text-gray-900 dark:text-white text-base sm:text-lg font-bold">₹{userInfo.walletBalance.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary Card */}
        {giftCardInfo && userInfo && (
          <div className="bg-gradient-to-r from-[rgba(16,185,129,0.1)] to-[rgba(16,185,129,0.05)] border border-[#10b981] rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs font-medium">Redemption Summary</div>
              <FaRupeeSign className="text-[#10b981] text-xs sm:text-sm" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Current Balance</span>
                <span className="text-gray-900 dark:text-white text-xs sm:text-sm font-medium">${userInfo.walletBalance.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Gift Card Amount</span>
                <span className="text-[#10b981] text-xs sm:text-sm font-medium">+${giftCardInfo.amount.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#10b981]/30 pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white text-xs sm:text-sm font-semibold">New Balance</span>
                  <span className="text-gray-900 dark:text-white text-base sm:text-lg font-bold">
                    ${(userInfo.walletBalance + giftCardInfo.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !giftCardInfo || !userInfo}
            className="flex-1 bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all shadow-lg shadow-[#10b981]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
          >
            {isLoading ? (
              <>
                <FaSpinner className="text-xs sm:text-sm animate-spin" />
                <span>Redeeming...</span>
              </>
            ) : (
              <>
                <FaGift className="text-xs sm:text-sm" />
                <span>Redeem Gift Card</span>
              </>
            )}
          </button>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-4 py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default RedeemGiftCardModal

