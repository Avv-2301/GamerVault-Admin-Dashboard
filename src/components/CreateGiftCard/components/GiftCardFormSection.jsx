import { useState } from 'react'
import { FaRupeeSign, FaHashtag, FaCalendarAlt, FaFileAlt, FaInfoCircle, FaImage, FaSpinner, FaTimes } from 'react-icons/fa'
import { generateGiftCardPreviewCode } from '../../../services/helper'
import { uploadImageToCloudinary } from '../../../services/api/media'
import { useToast } from '../../ui/ToastContainer'

const GiftCardFormSection = ({ register, control, watch, setValue, errors }) => {
  const amount = watch('amount')
  const quantity = watch('quantity')
  const codePrefix = watch('codePrefix')
  const image = watch('image')
  const { error } = useToast()
  const [isProcessingImage, setIsProcessingImage] = useState(false)

  // Calculate total value
  const totalValue = amount && quantity ? (parseFloat(amount) * parseInt(quantity)).toFixed(2) : '0.00'

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setIsProcessingImage(true)
    try {
      const imageUrl = await uploadImageToCloudinary(file, 'gift-cards')
      setValue('image', imageUrl, { shouldDirty: true, shouldValidate: true })
    } catch (imageError) {
      error(imageError.message || 'Could not upload the selected image.')
    } finally {
      setIsProcessingImage(false)
    }
  }

  // Generate preview code
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Gift Card Details</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Configure the gift card settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="md:col-span-2">
          <label htmlFor="giftCardImage" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">Gift Card Image</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {image ? <img src={image} alt="Gift card preview" className="w-40 h-24 rounded-lg border border-gray-200 dark:border-[#2a3441] object-cover" /> : <div className="w-40 h-24 rounded-lg border border-dashed border-gray-300 dark:border-[#2a3441] flex items-center justify-center text-gray-400"><FaImage className="text-2xl" /></div>}
            <div className="flex items-center gap-2">
              <label htmlFor="giftCardImage" className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] ${isProcessingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                {isProcessingImage ? <FaSpinner className="animate-spin" /> : <FaImage />}
                {isProcessingImage ? 'Uploading…' : image ? 'Change image' : 'Upload image'}
              </label>
              {image && <button type="button" onClick={() => setValue('image', '', { shouldDirty: true, shouldValidate: true })} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-red-500 text-xs sm:text-sm hover:bg-red-50 dark:hover:bg-red-950/30"><FaTimes /> Remove</button>}
              <input id="giftCardImage" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} className="hidden" />
            </div>
          </div>
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Optional. Images upload directly to Cloudinary.</p>
        </div>
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Gift Card Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaRupeeSign className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              {...register('amount', {
                required: 'Amount is required',
                min: { value: 0.01, message: 'Amount must be greater than 0' },
                max: { value: 10000, message: 'Amount cannot exceed ₹10,000' },
              })}
              placeholder="50.00"
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.amount ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
          </div>
          {errors.amount && <p className="mt-1 text-red-500 text-xs">{errors.amount.message}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            The value each gift card will have
          </p>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Quantity <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaHashtag className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              id="quantity"
              type="number"
              min="1"
              max="100"
              {...register('quantity', {
                required: 'Quantity is required',
                min: { value: 1, message: 'Quantity must be at least 1' },
                max: { value: 100, message: 'Cannot create more than 100 gift cards at once' },
              })}
              placeholder="1"
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.quantity ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
          </div>
          {errors.quantity && <p className="mt-1 text-red-500 text-xs">{errors.quantity.message}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            Number of gift cards to generate
          </p>
        </div>

        {/* Expiration Date */}
        <div>
          <label htmlFor="expirationDate" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Expiration Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              id="expirationDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('expirationDate', {
                required: 'Expiration date is required',
                validate: (value) => {
                  const selectedDate = new Date(value)
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  if (selectedDate <= today) {
                    return 'Expiration date must be in the future'
                  }
                  return true
                },
              })}
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.expirationDate ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
          </div>
          {errors.expirationDate && <p className="mt-1 text-red-500 text-xs">{errors.expirationDate.message}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            Date when the gift cards will expire
          </p>
        </div>

        {/* Code Prefix */}
        <div>
          <label htmlFor="codePrefix" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Code Prefix
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaHashtag className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              id="codePrefix"
              type="text"
              maxLength={20}
              {...register('codePrefix', {
                pattern: {
                  value: /^[A-Z0-9]+$/i,
                  message: 'Code prefix can only contain letters and numbers',
                },
              })}
              onChange={(e) => {
                const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
                setValue('codePrefix', value)
              }}
              placeholder="GAMER2024"
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.codePrefix ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all font-mono`}
            />
          </div>
          {errors.codePrefix && <p className="mt-1 text-red-500 text-xs">{errors.codePrefix.message}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            Optional prefix for gift card codes (e.g., GAMER2024-XXXXXX)
          </p>
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label htmlFor="notes" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Notes
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <FaFileAlt className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm mt-0.5" />
            </div>
            <textarea
              id="notes"
              rows={3}
              {...register('notes', {
                maxLength: { value: 500, message: 'Notes cannot exceed 500 characters' },
              })}
              placeholder="Optional notes about these gift cards..."
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.notes ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none`}
            />
          </div>
          {errors.notes && <p className="mt-1 text-red-500 text-xs">{errors.notes.message}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            Internal notes (not visible to customers)
          </p>
        </div>
      </div>

      {/* Summary Card */}
      {(amount || quantity) && (
        <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <FaInfoCircle className="text-[#10b981] text-sm sm:text-base flex-shrink-0" />
            <h3 className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">Summary</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">Gift Card Value</div>
              <div className="text-gray-900 dark:text-white font-bold text-sm sm:text-base">
                ₹{amount ? parseFloat(amount).toFixed(2) : '0.00'}
              </div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">Quantity</div>
              <div className="text-gray-900 dark:text-white font-bold text-sm sm:text-base">
                {quantity || 0} card{quantity !== 1 ? 's' : ''}
              </div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">Total Value</div>
              <div className="text-[#10b981] font-bold text-sm sm:text-base">
                ₹{totalValue}
              </div>
            </div>
          </div>
          {codePrefix && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-[#2a3441]">
              <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">Code Preview</div>
              <div className="text-gray-900 dark:text-white font-mono text-xs sm:text-sm">
                  {generateGiftCardPreviewCode(codePrefix || 'GAMER2024')}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GiftCardFormSection
