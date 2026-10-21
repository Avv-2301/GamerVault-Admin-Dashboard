import { useState, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { FaTag, FaPlus, FaTimes, FaImage, FaUpload } from 'react-icons/fa'
import { uploadImageToCloudinary } from '../../../services/api/media'

const BasicInfoSection = ({ register, control, watch, setValue, errors, isProcessingThumbnail = false, onImageProcessingChange = () => {} }) => {
  const [tagInput, setTagInput] = useState('')
  const [genreInput, setGenreInput] = useState('')
  const fileInputRef = useRef(null)

  const watchedTags = watch('tags') || []
  const watchedGenres = watch('genres') || []
  const watchedShortDescription = watch('shortDescription') || ''
  const watchedThumbnail = watch('thumbnail')
  const watchedThumbnailPreview = watch('thumbnailPreview')

  const handleAddTag = () => {
    if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
      setValue('tags', [...watchedTags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag) => {
    setValue('tags', watchedTags.filter((t) => t !== tag))
  }

  const handleAddGenre = () => {
    if (genreInput.trim() && !watchedGenres.includes(genreInput.trim())) {
      setValue('genres', [...watchedGenres, genreInput.trim()])
      setGenreInput('')
    }
  }

  const handleRemoveGenre = (genre) => {
    setValue('genres', watchedGenres.filter((g) => g !== genre))
  }

  const handleThumbnailClick = () => {
    fileInputRef.current?.click()
  }

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Choose a JPEG, PNG, or WebP image')
        return
      }
      onImageProcessingChange(true)
      try {
        const imageUrl = await uploadImageToCloudinary(file, 'games/thumbnails')
        setValue('thumbnail', imageUrl, { shouldValidate: true })
        setValue('thumbnailPreview', imageUrl)
      } catch (imageError) {
        alert(imageError.message || 'Could not upload the selected image')
      } finally {
        onImageProcessingChange(false)
      }
    }
  }

  const handleRemoveThumbnail = () => {
    setValue('thumbnail', null)
    setValue('thumbnailPreview', null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const categories = [
    'Action',
    'Adventure',
    'Romance',
    'RPG',
    'Strategy',
    'Sports',
    'Racing',
    'Puzzle',
    'Simulation',
    'Horror',
    'Fighting',
    'Platformer',
    'Shooter',
    'MMO',
    'Indie',
    'Casual',
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Basic Information</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Enter the basic details about the game</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Game Name */}
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Game Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: 'Game name is required',
              validate: (value) => value.trim() !== '' || 'Game name is required',
            })}
            placeholder="Enter game name"
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.name ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          />
          {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        {/* Slug */}
        <div className="md:col-span-2">
          <label htmlFor="slug" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            id="slug"
            type="text"
            {...register('slug', {
              required: 'Slug is required',
              validate: (value) => value.trim() !== '' || 'Slug is required',
            })}
            placeholder="game-slug-url"
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.slug ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          />
          {errors.slug && <p className="mt-1 text-red-500 text-xs">{errors.slug.message}</p>}
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">URL-friendly identifier (auto-generated from name)</p>
        </div>

        {/* Short Description */}
        <div className="md:col-span-2">
          <label htmlFor="shortDescription" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Short Description
          </label>
          <textarea
            id="shortDescription"
            {...register('shortDescription', {
              maxLength: {
                value: 200,
                message: 'Short description must be less than 200 characters',
              },
            })}
            placeholder="Brief description (max 200 characters)"
            maxLength={200}
            rows={2}
            className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none"
          />
          <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">
            {watchedShortDescription.length}/200 characters
          </p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            {...register('description', {
              required: 'Description is required',
              validate: (value) => value.trim() !== '' || 'Description is required',
            })}
            placeholder="Enter detailed game description"
            rows={6}
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.description ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none`}
          />
          {errors.description && <p className="mt-1 text-red-500 text-xs">{errors.description.message}</p>}
        </div>

        {/* Developer */}
        <div>
          <label htmlFor="developer" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Developer <span className="text-red-500">*</span>
          </label>
          <input
            id="developer"
            type="text"
            {...register('developer', {
              required: 'Developer is required',
              validate: (value) => value.trim() !== '' || 'Developer is required',
            })}
            placeholder="Enter developer name"
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.developer ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          />
          {errors.developer && <p className="mt-1 text-red-500 text-xs">{errors.developer.message}</p>}
        </div>

        {/* Publisher */}
        <div>
          <label htmlFor="publisher" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Publisher <span className="text-red-500">*</span>
          </label>
          <input
            id="publisher"
            type="text"
            {...register('publisher', {
              required: 'Publisher is required',
              validate: (value) => value.trim() !== '' || 'Publisher is required',
            })}
            placeholder="Enter publisher name"
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.publisher ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          />
          {errors.publisher && <p className="mt-1 text-red-500 text-xs">{errors.publisher.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            {...register('category', {
              required: 'Category is required',
            })}
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.category ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-red-500 text-xs">{errors.category.message}</p>}
        </div>

        {/* Release Date */}
        <div>
          <label htmlFor="releaseDate" className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Release Date <span className="text-red-500">*</span>
          </label>
          <input
            id="releaseDate"
            type="date"
            {...register('releaseDate', {
              required: 'Release date is required',
            })}
            className={`w-full bg-gray-50 dark:bg-[#1e2742] border ${
              errors.releaseDate ? 'border-red-500' : 'border-gray-300 dark:border-[#2a3441]'
            } text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all`}
          />
          {errors.releaseDate && <p className="mt-1 text-red-500 text-xs">{errors.releaseDate.message}</p>}
        </div>

        {/* Genres */}
        <div>
          <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Genres <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGenre())}
              placeholder="Add genre"
              className="flex-1 bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
            />
            <button
              type="button"
              onClick={handleAddGenre}
              className="px-3 sm:px-4 py-2 bg-[#10b981] text-white rounded-lg hover:opacity-90 transition-opacity text-xs sm:text-sm"
            >
              <FaPlus />
            </button>
          </div>
          {errors.genres && <p className="mt-1 text-red-500 text-xs">{errors.genres.message}</p>}
          <Controller
            name="genres"
            control={control}
            rules={{
              required: 'At least one genre is required',
              validate: (value) => (value && value.length > 0) || 'At least one genre is required',
            }}
            render={({ field }) => (
              <>
                <div className="flex flex-wrap gap-2 mt-2">
                  {watchedGenres.map((genre) => (
                    <span
                      key={genre}
                      className="inline-flex items-center gap-2 bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm"
                    >
                      {genre}
                      <button
                        type="button"
                        onClick={() => handleRemoveGenre(genre)}
                        className="text-gray-500 dark:text-[#8b8fa3] hover:text-red-500 transition-colors"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
                <input type="hidden" {...field} />
              </>
            )}
          />
        </div>

        {/* Thumbnail */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Thumbnail <span className="text-red-500">*</span>
          </label>
          {watchedThumbnailPreview ? (
            <div className="relative group">
              <div className="w-full max-w-xs rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441]">
                <img
                  src={watchedThumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-40 sm:h-48 object-cover"
                />
              </div>
              <button
                type="button"
                onClick={handleRemoveThumbnail}
                className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-[#ef4444] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#dc2626]"
                title="Remove thumbnail"
              >
                <FaTimes className="text-xs sm:text-sm" />
              </button>
            </div>
          ) : (
            <div
              onClick={handleThumbnailClick}
              className="border-2 border-dashed border-gray-300 dark:border-[#2a3441] rounded-lg p-4 sm:p-8 text-center cursor-pointer hover:border-[#10b981] transition-colors bg-gray-50 dark:bg-[#1e2742] max-w-xs"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleThumbnailChange}
                disabled={isProcessingThumbnail}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-[#141b2d] flex items-center justify-center">
                  <FaImage className="text-gray-500 dark:text-[#8b8fa3] text-xl sm:text-2xl" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white text-xs sm:text-sm font-medium mb-1">Click to upload thumbnail</p>
                  <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                    JPEG, PNG, WebP up to 25MB. Uploaded to Cloudinary (Recommended: 400x400px)
                  </p>
                  {isProcessingThumbnail && <p className="mt-1 text-[#10b981] text-xs">Uploading to Cloudinary…</p>}
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#10b981] text-white rounded-lg text-xs sm:text-sm hover:opacity-90 transition-opacity"
                >
                  <FaUpload className="text-xs" />
                  <span>Choose File</span>
                </button>
              </div>
            </div>
          )}
          {errors.thumbnail && <p className="mt-1 text-red-500 text-xs">{errors.thumbnail.message}</p>}
          <Controller
            name="thumbnail"
            control={control}
            rules={{
              required: 'Thumbnail is required',
            }}
            render={({ field }) => (
              <input type="hidden" {...field} />
            )}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add tag"
              className="flex-1 bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 sm:px-4 py-2 bg-[#10b981] text-white rounded-lg hover:opacity-90 transition-opacity text-xs sm:text-sm"
            >
              <FaPlus />
            </button>
          </div>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex flex-wrap gap-2 mt-2">
                  {watchedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm"
                    >
                      <FaTag className="text-xs text-gray-500 dark:text-[#8b8fa3]" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-500 dark:text-[#8b8fa3] hover:text-red-500 transition-colors"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
                <input type="hidden" {...field} />
              </>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default BasicInfoSection
