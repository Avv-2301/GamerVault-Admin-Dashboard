import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaSave, FaSpinner } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import BasicInfoSection from '../components/CreateGame/components/BasicInfoSection'
import PricingSection from '../components/CreateGame/components/PricingSection'
import MediaSection from '../components/CreateGame/components/MediaSection'
import RequirementsSection from '../components/CreateGame/components/RequirementsSection'
import AdditionalInfoSection from '../components/CreateGame/components/AdditionalInfoSection'
import GameDetailInfoSection from '../components/CreateGame/components/GameDetailInfoSection'
import { getGameById, updateGame } from '../services/api/game'
import { toDateInput } from '../services/helper'

const emptyRequirements = {
  os: '',
  processor: '',
  memory: '',
  graphics: '',
  storage: '',
  directX: '',
}

const EditGame = () => {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [isLoadingGame, setIsLoadingGame] = useState(true)
  const [isProcessingThumbnail, setIsProcessingThumbnail] = useState(false)
  const [isProcessingMedia, setIsProcessingMedia] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [promotionActive, setPromotionActive] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '', slug: '', description: '', shortDescription: '', category: '',
      thumbnail: null, thumbnailPreview: null, price: '', discountPrice: '',
      discountPercentage: 0, isDiscountActive: false, releaseDate: '', developer: '', publisher: '',
      genres: [], tags: [], images: [], videos: [], screenshots: [],
      languageSupport: [], supportedFeatures: [], featureHighlights: [],
      matureContentDescription: '', metascore: '', achievementCount: '',
      systemRequirements: { minimum: emptyRequirements, recommended: emptyRequirements },
      languages: [], ageRating: 'RP', platform: [], downloadSize: '',
      isActive: true, isFeatured: false, stock: -1,
    },
  })

  useEffect(() => {
    let cancelled = false
    const loadGame = async () => {
      setIsLoadingGame(true)
      setLoadError('')
      try {
        const response = await getGameById(gameId)
        const game = response?.data
        if (!game) throw new Error('Game details were not returned by the server.')
        if (cancelled) return
        setPromotionActive(game.isDiscountPromotionActive === true)

        reset({
          name: game.name || '',
          slug: game.slug || '',
          description: game.description || '',
          shortDescription: game.shortDescription || '',
          category: game.category || '',
          thumbnail: game.thumbnail || null,
          thumbnailPreview: game.thumbnail || null,
          price: game.price ?? '',
          discountPrice: game.discountPrice ?? '',
          discountPercentage: game.discountPercentage ?? 0,
          isDiscountActive: game.isDiscountManuallyActive ?? game.isDiscountActive ?? false,
          releaseDate: toDateInput(game.releaseDate),
          developer: game.developer || '',
          publisher: game.publisher || '',
          genres: Array.isArray(game.genres) ? game.genres : [],
          tags: Array.isArray(game.tags) ? game.tags : [],
          images: Array.isArray(game.images) ? game.images : [],
          videos: Array.isArray(game.videos) ? game.videos : [],
          screenshots: Array.isArray(game.screenshots) ? game.screenshots : [],
          systemRequirements: {
            minimum: { ...emptyRequirements, ...(game.systemRequirements?.minimum || {}) },
            recommended: { ...emptyRequirements, ...(game.systemRequirements?.recommended || {}) },
          },
          languages: Array.isArray(game.languages) ? game.languages : [],
          languageSupport: Array.isArray(game.languageSupport)
            ? game.languageSupport.map(({ language, interface: hasInterface, audio, subtitles }) => ({
                language: language || '',
                interface: Boolean(hasInterface),
                audio: Boolean(audio),
                subtitles: Boolean(subtitles),
              }))
            : [],
          supportedFeatures: Array.isArray(game.supportedFeatures) ? game.supportedFeatures : [],
          featureHighlights: Array.isArray(game.featureHighlights)
            ? game.featureHighlights.map(({ title, description }) => ({ title: title || '', description: description || '' }))
            : [],
          matureContentDescription: game.matureContentDescription || '',
          metascore: game.metascore ?? '',
          achievementCount: game.achievementCount ?? '',
          ageRating: game.ageRating || 'RP',
          platform: Array.isArray(game.platform) ? game.platform : [],
          downloadSize: game.downloadSize || '',
          isActive: game.isActive ?? true,
          isFeatured: game.isFeatured ?? false,
          stock: game.stock ?? -1,
        })
      } catch (error) {
        if (!cancelled) setLoadError(error?.response?.data?.meta?.message || error?.message || 'Could not load this game.')
      } finally {
        if (!cancelled) setIsLoadingGame(false)
      }
    }

    loadGame()
    return () => { cancelled = true }
  }, [gameId, reset])

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      price: Number(data.price),
      discountPrice: data.discountPrice === '' ? null : Number(data.discountPrice),
      discountPercentage: Number(data.discountPercentage) || 0,
      metascore: data.metascore == null || data.metascore === '' ? null : Number(data.metascore),
      achievementCount: data.achievementCount == null || data.achievementCount === '' ? 0 : Number(data.achievementCount),
      stock: data.stock === '' || Number(data.stock) === -1 ? -1 : Number(data.stock),
      releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
    }

    delete payload.thumbnailPreview

    try {
      const response = await updateGame(gameId, payload)
      if (response?.meta?.code === 200) navigate('/dashboard/games')
    } catch {
      // The API helper displays the server error.
    }
  }

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] min-h-screen overflow-x-hidden max-w-full">
      <Header />
      <div className="mb-4 sm:mb-6 flex items-start sm:items-center gap-3 sm:gap-4">
        <button onClick={() => navigate('/dashboard/games')} className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742]">
          <FaArrowLeft className="text-xs sm:text-sm" />
        </button>
        <div>
          <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold">Edit Game</h1>
          <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Update this game’s details</p>
        </div>
      </div>

      {isLoadingGame ? (
        <div className="py-20 flex items-center justify-center gap-3 text-gray-500 dark:text-[#8b8fa3]"><FaSpinner className="animate-spin" /> Loading game…</div>
      ) : loadError ? (
        <div className="bg-white dark:bg-[#141b2d] border border-red-200 dark:border-red-900 rounded-xl p-6 text-red-600 dark:text-red-400">{loadError}</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6"><BasicInfoSection register={register} control={control} watch={watch} setValue={setValue} errors={errors} isProcessingThumbnail={isProcessingThumbnail} onImageProcessingChange={setIsProcessingThumbnail} /></section>
          <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6"><PricingSection register={register} control={control} watch={watch} setValue={setValue} errors={errors} promotionActive={promotionActive} /></section>
          <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6"><MediaSection control={control} watch={watch} setValue={setValue} errors={errors} onProcessingChange={setIsProcessingMedia} /></section>
          <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6"><RequirementsSection register={register} /></section>
          <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6"><GameDetailInfoSection register={register} control={control} /></section>
          <section className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6"><AdditionalInfoSection register={register} control={control} watch={watch} setValue={setValue} errors={errors} /></section>
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
            <button type="button" onClick={() => navigate('/dashboard/games')} className="px-5 py-2.5 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-sm">Cancel</button>
            <button type="submit" disabled={isSubmitting || isProcessingThumbnail || isProcessingMedia} className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg text-sm disabled:opacity-50">
              {isSubmitting ? <><FaSpinner className="animate-spin" /> Saving…</> : <><FaSave /> Save Changes</>}
            </button>
          </div>
        </form>
      )}
    </main>
  )
}

export default EditGame
