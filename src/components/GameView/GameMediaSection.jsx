import { FaImage, FaVideo } from 'react-icons/fa'
import { getVideoDisplay } from '../../services/helper'

const GameMediaSection = ({ images = [], videos = [] }) => {
  const validImages = (Array.isArray(images) ? images : []).filter((image) => typeof image === 'string' && image.trim())
  const validVideos = (Array.isArray(videos) ? videos : []).map(getVideoDisplay).filter(Boolean)

  return (
    <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6 space-y-6">
      <h3 className="text-gray-900 dark:text-white text-lg font-semibold">Game Media</h3>

      <div>
        <h4 className="flex items-center gap-2 text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-3">
          <FaImage className="text-[#10b981]" /> Images
        </h4>
        {validImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {validImages.map((image, index) => (
              <a key={`${index}-${image.slice(0, 40)}`} href={image} target="_blank" rel="noreferrer" className="block rounded-lg overflow-hidden border border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742]">
                <img src={image} alt={`Game image ${index + 1}`} loading="lazy" className="w-full h-48 object-cover" />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-[#8b8fa3] text-sm">No images have been added for this game.</p>
        )}
      </div>

      <div>
        <h4 className="flex items-center gap-2 text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-3">
          <FaVideo className="text-[#10b981]" /> Videos
        </h4>
        {validVideos.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {validVideos.map((video, index) => (
              <div key={`${index}-${video.src.slice(0, 40)}`} className="overflow-hidden rounded-lg border border-gray-200 dark:border-[#2a3441] bg-black aspect-video">
                {video.type === 'embed' ? (
                  <iframe src={video.src} title={`Game video ${index + 1}`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />
                ) : video.type === 'file' ? (
                  <video src={video.src} controls preload="metadata" className="w-full h-full" />
                ) : (
                  <a href={video.src} target="_blank" rel="noreferrer" className="w-full h-full flex items-center justify-center p-4 text-sm text-white hover:text-[#10b981]">Open video</a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-[#8b8fa3] text-sm">No videos have been added for this game.</p>
        )}
      </div>
    </section>
  )
}

export default GameMediaSection
