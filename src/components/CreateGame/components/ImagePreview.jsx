import { useState } from 'react'
import { FaImage, FaTimes } from 'react-icons/fa'

const ImagePreview = ({ url }) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative aspect-video bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg overflow-hidden group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-[#10b981]"></div>
        </div>
      )}
      {!imageError ? (
        <img
          src={url}
          alt="Preview"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true)
            setIsLoading(false)
          }}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-[#8b8fa3]">
          <FaImage className="text-xl sm:text-2xl mb-2" />
          <p className="text-xs text-center px-2">Failed to load image</p>
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
    </div>
  )
}

export default ImagePreview

