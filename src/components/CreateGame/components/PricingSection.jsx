import { useEffect } from 'react'

const PricingSection = ({ register, watch, setValue, errors, promotionActive = false }) => {
  const watchedPrice = watch('price')
  const watchedDiscountPrice = watch('discountPrice')
  const watchedDiscountPercentage = watch('discountPercentage')

  useEffect(() => {
    if (watchedPrice && watchedDiscountPrice) {
      const price = parseFloat(watchedPrice)
      const discountPrice = parseFloat(watchedDiscountPrice)
      if (price > 0 && discountPrice >= 0) {
        const percentage = ((price - discountPrice) / price) * 100
        const roundedPercentage = Math.round(percentage)
        if (roundedPercentage !== parseFloat(watchedDiscountPercentage)) {
          setValue('discountPercentage', roundedPercentage)
        }
      }
    } else if (watchedPrice && watchedDiscountPercentage) {
      const price = parseFloat(watchedPrice)
      const percentage = parseFloat(watchedDiscountPercentage)
      if (price > 0 && percentage >= 0 && percentage <= 100) {
        const discountPrice = price - (price * percentage) / 100
        const calculatedPrice = parseFloat(discountPrice.toFixed(2))
        const currentPrice = watchedDiscountPrice ? parseFloat(watchedDiscountPrice) : null
        if (Math.abs(calculatedPrice - (currentPrice || 0)) > 0.01) {
          setValue('discountPrice', calculatedPrice)
        }
      }
    }
  }, [watchedPrice, watchedDiscountPrice, watchedDiscountPercentage, setValue])

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Pricing</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Set the game pricing and discounts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Price ($) <span className="text-red-500">*</span>
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register('price', {
              required: 'Valid price is required',
              validate: (value) => {
                const numValue = parseFloat(value)
                return (numValue >= 0) || 'Price must be greater than or equal to 0'
              },
            })}
            placeholder="0.00"
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.price ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          />
          {errors.price && <p className="mt-1 text-red-500 text-xs">{errors.price.message}</p>}
        </div>

        {/* Discount Price */}
        <div>
          <label htmlFor="discountPrice" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Discount Price ($)
          </label>
          <input
            id="discountPrice"
            type="number"
            step="0.01"
            min="0"
            {...register('discountPrice', {
              validate: (value) => {
                if (!value) return true
                const numValue = parseFloat(value)
                return (numValue >= 0) || 'Discount price must be positive'
              },
            })}
            placeholder="0.00"
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.discountPrice ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          />
          {errors.discountPrice && <p className="mt-1 text-red-500 text-xs">{errors.discountPrice.message}</p>}
        </div>

        {/* Discount Percentage */}
        <div>
          <label htmlFor="discountPercentage" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Discount Percentage (%)
          </label>
          <input
            id="discountPercentage"
            type="number"
            step="1"
            min="0"
            max="100"
            {...register('discountPercentage', {
              validate: (value) => {
                const numValue = parseFloat(value) || 0
                return (numValue >= 0 && numValue <= 100) || 'Discount percentage must be between 0 and 100'
              },
            })}
            placeholder="0"
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.discountPercentage ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          />
          {errors.discountPercentage && <p className="mt-1 text-red-500 text-xs">{errors.discountPercentage.message}</p>}
        </div>
      </div>

      <label htmlFor="isDiscountActive" className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-[#2a3441] p-3 sm:p-4 cursor-pointer">
        <input
          id="isDiscountActive"
          type="checkbox"
          {...register('isDiscountActive')}
          className="h-4 w-4 rounded border-gray-300 text-[#10b981] focus:ring-[#10b981]"
        />
        <span>
          <span className="block text-sm font-medium text-gray-800 dark:text-white">Individual game discount</span>
          <span className="block text-xs text-gray-500 dark:text-[#8b8fa3]">Keep this game discounted until you turn this switch off.</span>
          {promotionActive && <span className="block text-xs text-[#10b981]">A scheduled promotion also activates this game's discount.</span>}
        </span>
      </label>

      {/* Stock */}
      <div>
        <label htmlFor="stock" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
          Stock Quantity
        </label>
        <input
          id="stock"
          type="number"
          min="-1"
          {...register('stock', {
            setValueAs: (value) => value === '' ? -1 : parseInt(value),
          })}
          placeholder="-1 for unlimited"
          className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
        />
        <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Leave empty or set to -1 for unlimited stock</p>
      </div>
    </div>
  )
}

export default PricingSection
