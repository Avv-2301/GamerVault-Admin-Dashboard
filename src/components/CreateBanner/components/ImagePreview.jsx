import { FaTimes } from 'react-icons/fa'

const ImagePreview = ({ image, onRemove }) => {
  return (
    <div className="relative group">
      <div className="w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441]">
        <img
          src={image}
          alt="Banner preview"
          className="w-full h-full object-cover"
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-[#ef4444] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#dc2626]"
        title="Remove image"
      >
        <FaTimes className="text-xs sm:text-sm" />
      </button>
      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        <span className="hidden sm:inline">Click to change image</span>
        <span className="sm:hidden">Change</span>
      </div>
    </div>
  )
}

export default ImagePreview

