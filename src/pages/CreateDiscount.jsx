import { discountToFormData, validateDiscountForm } from '../services/helper'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaSave, FaSpinner } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import BasicInfoSection from '../components/CreateDiscount/components/BasicInfoSection'
import ScopeSection from '../components/CreateDiscount/components/ScopeSection'
import ScheduleSection from '../components/CreateDiscount/components/ScheduleSection'
import { createDiscount, getDiscountById, getDiscountOptions, updateDiscount } from '../services/api/discounts'
import { showError } from '../services/toast'

const CreateDiscount = () => {
  const navigate = useNavigate()
  const { discountId } = useParams()
  const isEditing = Boolean(discountId)
  const [isLoading, setIsLoading] = useState(false)
  const [scopeOptions, setScopeOptions] = useState({ games: [], categories: [] })
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    scope: 'game',
    scopeDetails: '',
    selectedGames: [],
    selectedCategories: [],
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    let active = true
    Promise.all([getDiscountOptions(), isEditing ? getDiscountById(discountId) : Promise.resolve(null)])
      .then(([options, discount]) => {
        if (!active) return
        setScopeOptions(options)
        if (discount) setFormData(discountToFormData(discount))
      })
      .catch((requestError) => {
        if (!active) return
        const message = requestError?.response?.data?.meta?.message || requestError?.message || 'Failed to load discount'
        setLoadError(message)
        showError(message)
      })
      .finally(() => { if (active) setOptionsLoading(false) })
    return () => { active = false }
  }, [discountId, isEditing])

  const handleFieldChange = (field, value) => {
    if (isEditing && field === 'scope') return
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


  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateDiscountForm(formData)
    setFormErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      showError('Please fix the errors in the form')
      return
    }

    setIsLoading(true)

    try {
      // Combine date and time
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime || '00:00'}:00`).toISOString()
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime || '23:59'}:59`).toISOString()

      const discountData = {
        name: formData.name,
        scope: formData.scope,
        selectedGames: formData.selectedGames.map((game) => game.id),
        selectedCategories: formData.selectedCategories.map((category) => category.id),
        startDate: startDateTime,
        endDate: endDateTime,
      }

      if (isEditing) await updateDiscount(discountId, discountData)
      else await createDiscount(discountData)
      navigate('/dashboard/discounts')
    } catch (err) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} discount:`, err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] overflow-x-hidden max-w-full">
      <Header />

      {/* Page Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-start sm:items-center justify-between mb-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button
              onClick={() => navigate('/dashboard/discounts')}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors flex-shrink-0"
            >
              <FaArrowLeft className="text-xs sm:text-sm" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{isEditing ? 'Edit Discount' : 'Create New Discount'}</h1>
              <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">
                {isEditing ? 'Update the discount details and schedule' : 'Create a new discount or promotion for your games'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {loadError && <p role="alert" className="mb-4 text-sm text-red-500">{loadError}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6">
          <BasicInfoSection
            formData={formData}
            errors={formErrors}
            onFieldChange={handleFieldChange}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6">
          <ScopeSection
            formData={formData}
            errors={formErrors}
            options={scopeOptions}
            optionsLoading={optionsLoading}
            scopeLocked={isEditing}
            onFieldChange={handleFieldChange}
            onArrayChange={handleArrayChange}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6">
          <ScheduleSection
            formData={formData}
            errors={formErrors}
            onFieldChange={handleFieldChange}
            isEditing={isEditing}
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/discounts')}
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || optionsLoading || Boolean(loadError)}
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
                <span>{isEditing ? 'Save Changes' : 'Create Discount'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateDiscount

