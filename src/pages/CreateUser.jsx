import { validateUserForm } from '../services/helper'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaSave, FaSpinner } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import { useToast } from '../components/ui/ToastContainer'
import BasicInfoSection from '../components/CreateUser/components/BasicInfoSection'
import AccountSettingsSection from '../components/CreateUser/components/AccountSettingsSection'

const CreateUser = () => {
  const navigate = useNavigate()
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    verified: false,
    role: 'user',
    status: '0', // 0-inactive, 1-active, 2-deleted
  })
  const [formErrors, setFormErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateUserForm(formData)
    setFormErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      error('Please fix the errors in the form')
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        verified: formData.verified,
        role: formData.role,
        status: formData.status,
      }

      // Log the form data (for development/debugging)
      console.log('User data to be submitted:', submitData)

      success('User created successfully!')
      setIsLoading(false)
      navigate('/dashboard/users')
    }, 1000)
  }

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] min-h-screen overflow-x-hidden max-w-full">
      <Header />

      {/* Page Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <button
            onClick={() => navigate('/dashboard/users')}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors flex-shrink-0"
          >
            <FaArrowLeft className="text-xs sm:text-sm" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Create New User</h1>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">
              Add a new user to your platform
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6 max-w-full overflow-x-hidden">
          <BasicInfoSection
            formData={formData}
            errors={formErrors}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            onFieldChange={handleFieldChange}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 sm:p-6 max-w-full overflow-x-hidden">
          <AccountSettingsSection
            formData={formData}
            errors={formErrors}
            onFieldChange={handleFieldChange}
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/users')}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin text-xs sm:text-sm" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <FaSave className="text-xs sm:text-sm" />
                <span>Create User</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateUser

