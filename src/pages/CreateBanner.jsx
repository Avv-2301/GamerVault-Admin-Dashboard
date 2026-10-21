import { validateBannerForm } from '../services/helper'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaSave, FaSpinner } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import { useToast } from '../components/ui/ToastContainer'
import BasicInfoSection from '../components/CreateBanner/components/BasicInfoSection'
import DisplaySettingsSection from '../components/CreateBanner/components/DisplaySettingsSection'
import ScheduleSection from '../components/CreateBanner/components/ScheduleSection'
import { createBanner, getBannerById, updateBanner } from '../services/api/banner'
import { formatDateInputPart, formatTimeInputPart, isValidUrl } from '../services/helper'
import { uploadImageToCloudinary } from '../services/api/media'

const CreateBanner = () => {
  const navigate = useNavigate()
  const { bannerId } = useParams()
  const isEditing = Boolean(bannerId)
  const { error } = useToast()
  const [isLoading, setIsLoading] = useState(isEditing)
  const [isProcessingImage, setIsProcessingImage] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    imagePreview: null,
    position: 'homepage-hero',
    link: '',
    linkTarget: '_self',
    deviceTypes: ['desktop', 'mobile'],
    priority: 1,
    status: 'active',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    if (!bannerId) return
    let isMounted = true
    getBannerById(bannerId).then((banner) => {
      if (!isMounted || !banner) return
      const startDate = new Date(banner.startDate)
      const endDate = new Date(banner.endDate)
      setFormData({
        title: banner.title || '', image: null, imagePreview: banner.image || null,
        position: banner.position || 'homepage-hero', link: banner.link || '',
        linkTarget: banner.linkTarget || '_self', deviceTypes: banner.deviceTypes || ['desktop', 'mobile'],
        priority: banner.priority || 1, status: banner.status || 'active',
        startDate: formatDateInputPart(startDate), startTime: formatTimeInputPart(startDate),
        endDate: formatDateInputPart(endDate), endTime: formatTimeInputPart(endDate),
      })
    }).catch(() => {}).finally(() => {
      if (isMounted) setIsLoading(false)
    })
    return () => { isMounted = false }
  }, [bannerId])

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleArrayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageChange = async (file) => {
    if (!file) return
    setIsProcessingImage(true)
    try {
      const imageUrl = await uploadImageToCloudinary(file, 'banners', {
        maxWidth: 1920,
        maxHeight: 600,
        maxBytes: 600 * 1024,
      })
      setFormData((prev) => ({ ...prev, image: imageUrl, imagePreview: imageUrl }))
    } catch (imageError) {
      error(imageError.message || 'Could not process the selected image')
    } finally {
      setIsProcessingImage(false)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateBannerForm(formData)
    setFormErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      error('Please fix the errors in the form')
      return
    }

    setIsLoading(true)

    try {
      // Combine date and time
      const startDateTime = `${formData.startDate}T${formData.startTime || '00:00'}:00`
      const endDateTime = `${formData.endDate}T${formData.endTime || '23:59'}:59`

      const bannerData = {
        title: formData.title,
        image: formData.imagePreview,
        position: formData.position,
        link: formData.link || null,
        linkTarget: formData.linkTarget,
        deviceTypes: formData.deviceTypes,
        priority: parseInt(formData.priority),
        status: formData.status,
        startDate: startDateTime,
        endDate: endDateTime,
      }

      if (isEditing) await updateBanner(bannerId, bannerData)
      else await createBanner(bannerData)
      navigate('/dashboard/banners')
    } catch (err) {
      // The API client displays the server error.
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] min-h-screen overflow-x-hidden max-w-full">
      <Header />

      {/* Page Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-start sm:items-center gap-2 sm:gap-4 mb-4">
          <button
            onClick={() => navigate('/dashboard/banners')}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors flex-shrink-0"
          >
            <FaArrowLeft className="text-xs sm:text-sm" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{isEditing ? 'Edit Banner' : 'Create New Banner'}</h1>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">
              {isEditing ? 'Update the promotional banner details' : 'Create a new promotional banner to display across the platform'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6">
          <BasicInfoSection
            formData={formData}
            errors={formErrors}
            onFieldChange={handleFieldChange}
            onImageChange={handleImageChange}
            isProcessingImage={isProcessingImage}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6">
          <DisplaySettingsSection
            formData={formData}
            errors={formErrors}
            onFieldChange={handleFieldChange}
            onArrayChange={handleArrayChange}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6">
          <ScheduleSection
            formData={formData}
            errors={formErrors}
            onFieldChange={handleFieldChange}
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/banners')}
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || isProcessingImage}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin text-xs sm:text-sm" />
                <span>{isEditing ? 'Saving...' : 'Creating...'}</span>
              </>
            ) : (
              <>
                <FaSave className="text-xs sm:text-sm" />
                <span>{isEditing ? 'Save Changes' : 'Create Banner'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateBanner

