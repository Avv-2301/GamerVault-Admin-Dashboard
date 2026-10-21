import { useRef } from 'react'
import { FaImage, FaUpload, FaTimes, FaExternalLinkAlt, FaHome, FaFolder, FaGamepad } from 'react-icons/fa'
import ImagePreview from './ImagePreview'
import { getBannerPositionDescription } from '../../../services/helper'

const BasicInfoSection = ({ formData, errors, onFieldChange, onImageChange, isProcessingImage }) => {
  const fileInputRef = useRef(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Choose a JPEG, PNG, or WebP image')
        return
      }
      if (file.size > 25 * 1024 * 1024) {
        alert('Image size must be less than 25MB')
        return
      }
      onImageChange(file)
    }
  }

  const handleRemoveImage = () => {
    onFieldChange('image', null)
    onFieldChange('imagePreview', null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getPositionIcon = (position) => {
    switch (position) {
      case 'homepage-hero':
      case 'homepage-featured':
      case 'homepage-sidebar':
        return FaHome
      case 'category-header':
        return FaFolder
      case 'game-page':
        return FaGamepad
      default:
        return FaHome
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Basic Information</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Enter the basic details about the banner</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Banner Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Banner Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => onFieldChange('title', e.target.value)}
            placeholder="e.g., Summer Sale 2024"
            maxLength={100}
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.title ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          />
          {errors.title && <p className="mt-1 text-red-500 text-xs">{errors.title}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            {formData.title.length}/100 characters (visible to admins only)
          </p>
        </div>

        {/* Banner Image */}
        <div className="md:col-span-2">
          <label className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Banner Image <span className="text-red-500">*</span>
          </label>
          {formData.imagePreview ? (
            <div className="relative">
              <ImagePreview
                image={formData.imagePreview}
                onRemove={handleRemoveImage}
              />
            </div>
          ) : (
            <div
              onClick={handleImageClick}
              className="border-2 border-dashed border-gray-200 dark:border-[#2a3441] rounded-lg p-4 sm:p-6 md:p-8 text-center cursor-pointer hover:border-[#10b981] transition-colors bg-gray-50 dark:bg-[#1e2742]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={isProcessingImage}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-[#141b2d] flex items-center justify-center flex-shrink-0">
                  <FaImage className="text-gray-500 dark:text-[#8b8fa3] text-xl sm:text-2xl" />
                </div>
                <div className="text-center">
                  <p className="text-gray-900 dark:text-white text-xs sm:text-sm font-medium mb-1">Click to upload banner image</p>
                  <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                    JPEG, PNG, WebP up to 25MB. Resized and compressed on upload (Recommended: 1920x600px)
                  </p>
                  {isProcessingImage && <p className="mt-1 text-[#10b981] text-xs">Resizing and compressing image…</p>}
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#10b981] text-white rounded-lg text-xs sm:text-sm hover:opacity-90 transition-opacity"
                >
                  <FaUpload className="text-xs" />
                  <span>Choose File</span>
                </button>
              </div>
            </div>
          )}
          {errors.image && <p className="mt-1 text-red-500 text-xs">{errors.image}</p>}
        </div>

        {/* Position */}
        <div className="md:col-span-2">
          <label className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Display Position <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {[
              { value: 'homepage-hero', label: 'Homepage Hero' },
              { value: 'homepage-featured', label: 'Homepage Featured' },
              { value: 'homepage-sidebar', label: 'Homepage Sidebar' },
              { value: 'category-header', label: 'Category Header' },
              { value: 'game-page', label: 'Game Page' },
            ].map((position) => {
              const PositionIcon = getPositionIcon(position.value)
              return (
                <button
                  key={position.value}
                  type="button"
                  onClick={() => onFieldChange('position', position.value)}
                  className={`flex flex-col items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 transition-all ${
                    formData.position === position.value
                      ? 'border-[#10b981] bg-[rgba(16,185,129,0.1)] text-[#10b981]'
                      : 'border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] hover:border-gray-300 dark:hover:border-[#3a4451]'
                  }`}
                >
                  <PositionIcon className="text-base sm:text-lg" />
                  <span className="text-xs font-medium text-center">{position.label}</span>
                </button>
              )
            })}
          </div>
          {errors.position && <p className="mt-1 text-red-500 text-xs">{errors.position}</p>}
          {formData.position && (
            <p className="mt-2 text-gray-500 dark:text-[#8b8fa3] text-xs">{getBannerPositionDescription(formData.position)}</p>
          )}
        </div>

        {/* Link URL */}
        <div className="md:col-span-2">
          <label htmlFor="link" className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Link URL (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaExternalLinkAlt className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
            </div>
            <input
              id="link"
              type="text"
              value={formData.link}
              onChange={(e) => onFieldChange('link', e.target.value)}
              placeholder="/games/summer-sale or https://example.com"
              className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
                errors.link ? 'border-red-500' : 'border-gray-200 dark:border-[#2a3441]'
              } text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
            />
          </div>
          {errors.link && <p className="mt-1 text-red-500 text-xs">{errors.link}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            URL where users will be redirected when clicking the banner (leave empty for no link)
          </p>
        </div>

        {/* Link Target */}
        {formData.link && (
          <div className="md:col-span-2">
            <label className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
              Link Target
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => onFieldChange('linkTarget', '_self')}
                className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 transition-all ${
                  formData.linkTarget === '_self'
                    ? 'border-[#10b981] bg-[rgba(16,185,129,0.1)] text-[#10b981]'
                    : 'border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] hover:border-gray-300 dark:hover:border-[#3a4451]'
                }`}
              >
                <span className="text-xs sm:text-sm font-medium">Same Window</span>
              </button>
              <button
                type="button"
                onClick={() => onFieldChange('linkTarget', '_blank')}
                className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 transition-all ${
                  formData.linkTarget === '_blank'
                    ? 'border-[#10b981] bg-[rgba(16,185,129,0.1)] text-[#10b981]'
                    : 'border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] hover:border-gray-300 dark:hover:border-[#3a4451]'
                }`}
              >
                <span className="text-xs sm:text-sm font-medium">New Window</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BasicInfoSection

