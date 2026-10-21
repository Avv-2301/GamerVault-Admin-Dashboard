import { validateSupportTicketForm } from '../services/helper'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaSave, FaSpinner } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import { useToast } from '../components/ui/ToastContainer'
import BasicInfoSection from '../components/CreateSupportTicket/components/BasicInfoSection'
import UserInfoSection from '../components/CreateSupportTicket/components/UserInfoSection'
import AssignmentSection from '../components/CreateSupportTicket/components/AssignmentSection'

const CreateSupportTicket = () => {
  const navigate = useNavigate()
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    userId: '',
    userEmail: '',
    userName: '',
    subject: '',
    description: '',
    category: 'other',
    priority: 'medium',
    assignedTo: '',
  })
  const [formErrors, setFormErrors] = useState({})

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateSupportTicketForm(formData)
    setFormErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      error('Please fix the errors in the form')
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const submitData = {
        userId: formData.userId || null,
        userEmail: formData.userEmail || null,
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        category: formData.category,
        priority: formData.priority,
        assignedTo: formData.assignedTo || null,
        status: 'open',
      }

      // Log the form data (for development/debugging)
      console.log('Support ticket data to be submitted:', submitData)

      success('Support ticket created successfully!')
      setIsLoading(false)
      navigate('/dashboard/support')
    }, 1000)
  }

  return (
    <main className="ml-64 flex-1 p-6 bg-gray-50 dark:bg-[#0a0e27] min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard/support')}
              className="flex items-center justify-center w-10 h-10 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
            >
              <FaArrowLeft className="text-sm" />
            </button>
            <div>
              <h1 className="text-gray-900 dark:text-white text-3xl font-bold mb-2">Create Support Ticket</h1>
              <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">
                Create a new support ticket for a user
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
          <UserInfoSection
            formData={formData}
            errors={formErrors}
            onFieldChange={handleFieldChange}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
          <BasicInfoSection
            formData={formData}
            errors={formErrors}
            onFieldChange={handleFieldChange}
          />
        </div>

        <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
          <AssignmentSection
            formData={formData}
            errors={formErrors}
            onFieldChange={handleFieldChange}
          />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/support')}
            className="px-5 py-2.5 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg font-medium text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <FaSave />
                <span>Create Ticket</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateSupportTicket

