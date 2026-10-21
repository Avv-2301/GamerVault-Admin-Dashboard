import { useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import { FaImage, FaVideo, FaPlus, FaTimes, FaUpload } from 'react-icons/fa'
import ImagePreview from './ImagePreview'
import { uploadImageToCloudinary } from '../../../services/api/media'

const MediaSection = ({ control, watch, setValue, errors, onProcessingChange }) => {
  const imageInputRef = useRef(null)
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [isProcessingImages, setIsProcessingImages] = useState(false)

  const watchedImages = watch('images') || []
  const watchedVideos = watch('videos') || []

  const handleImageFiles = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    if (!files.length) return
    const remaining = 10 - watchedImages.length
    if (remaining <= 0) {
      window.alert('A game can have up to 10 media images.')
      return
    }
    if (imageUrl.trim() && !watchedImages.includes(imageUrl.trim()) && remaining < 2) {
      window.alert('Add the image URL first or remove an image to keep the 10 image maximum.')
      return
    }
    if (files.length > remaining) {
      window.alert(`You can add ${remaining} more image${remaining === 1 ? '' : 's'} (10 maximum).`)
    }
    const selectedFiles = files.slice(0, remaining)
    const supportedFiles = selectedFiles.filter((file) =>
      ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    )
    if (supportedFiles.length !== selectedFiles.length) {
      window.alert('Choose JPEG, PNG, or WebP images.')
    }
    setIsProcessingImages(true)
    onProcessingChange?.(true)
    try {
      const uploadedImages = []
      for (const file of supportedFiles) {
        uploadedImages.push(await uploadImageToCloudinary(file, 'games/media', {
          maxWidth: 1600,
          maxHeight: 1000,
          maxBytes: 400 * 1024,
        }))
      }
      setValue('images', [...watchedImages, ...uploadedImages], {
        shouldDirty: true,
        shouldValidate: true,
      })
    } catch (error) {
      window.alert(error.message || 'Could not process the selected images.')
    } finally {
      setIsProcessingImages(false)
      onProcessingChange?.(false)
    }
  }

  const handleAddImage = () => {
    if (watchedImages.length >= 10) {
      window.alert('A game can have up to 10 media images.')
      return
    }
    if (imageUrl.trim() && !watchedImages.includes(imageUrl.trim())) {
      setValue('images', [...watchedImages, imageUrl.trim()])
      setImageUrl('')
    }
  }

  const handleRemoveImage = (url) => {
    setValue('images', watchedImages.filter((img) => img !== url))
  }

  const handleAddVideo = () => {
    if (videoUrl.trim() && !watchedVideos.includes(videoUrl.trim())) {
      setValue('videos', [...watchedVideos, videoUrl.trim()])
      setVideoUrl('')
    }
  }

  const handleRemoveVideo = (url) => {
    setValue('videos', watchedVideos.filter((vid) => vid !== url))
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Media</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Upload game media images and add video links</p>
      </div>

      {/* Images */}
      <div>
        <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
          <FaImage className="inline mr-2 text-xs sm:text-sm" />
          Images
        </label>
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
            placeholder="Enter image URL"
            className="flex-1 bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="px-3 sm:px-4 py-2 bg-[#10b981] text-white rounded-lg hover:opacity-90 transition-opacity text-xs sm:text-sm"
          >
            <FaPlus />
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageFiles}
            disabled={isProcessingImages || watchedImages.length >= 10}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            disabled={isProcessingImages || watchedImages.length >= 10}
            className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-200 dark:bg-[#2a3441] text-gray-800 dark:text-white rounded-lg hover:opacity-90 disabled:opacity-50 text-xs sm:text-sm"
          >
            <FaUpload />
            {isProcessingImages ? 'Processing…' : 'Upload Images'}
          </button>
        </div>
        <p className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-3">JPEG, PNG, or WebP. Up to 10 images; files are resized and compressed automatically.</p>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <>
              {watchedImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {watchedImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <ImagePreview url={url} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url)}
                        className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input type="hidden" {...field} />
            </>
          )}
        />
      </div>

      {/* Videos */}
      <div>
        <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
          <FaVideo className="inline mr-2 text-xs sm:text-sm" />
          Videos
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddVideo())}
            placeholder="Enter video URL (YouTube, Vimeo, etc.)"
            className="flex-1 bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
          />
          <button
            type="button"
            onClick={handleAddVideo}
            className="px-3 sm:px-4 py-2 bg-[#10b981] text-white rounded-lg hover:opacity-90 transition-opacity text-xs sm:text-sm"
          >
            <FaPlus />
          </button>
        </div>
        <Controller
          name="videos"
          control={control}
          render={({ field }) => (
            <>
              {watchedVideos.length > 0 && (
                <div className="space-y-2">
                  {watchedVideos.map((url, index) => (
                    <div key={index} className="relative flex items-center gap-2 sm:gap-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-2 sm:p-3">
                      <FaVideo className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm flex-shrink-0" />
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-gray-800 dark:text-[#e0e0e0] text-xs sm:text-sm hover:text-[#10b981] truncate"
                      >
                        {url}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemoveVideo(url)}
                        className="text-red-500 hover:text-red-400 transition-colors flex-shrink-0 p-1"
                      >
                        <FaTimes className="text-xs sm:text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input type="hidden" {...field} />
            </>
          )}
        />
      </div>

    </div>
  )
}

export default MediaSection
