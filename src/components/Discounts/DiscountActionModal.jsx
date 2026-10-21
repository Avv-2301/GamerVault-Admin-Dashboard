import { useState } from 'react'
import { FaExclamationTriangle, FaLock, FaPause, FaPlay, FaTimes } from 'react-icons/fa'

const DiscountActionModal = ({ action, onClose, onConfirm }) => {
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  if (!action) return null
  const { type, discount, discounts } = action
  const isBulk = Array.isArray(discounts)
  const target = isBulk ? `${discounts.length} selected discounts` : discount.name
  const verb = type === 'delete' ? 'Delete' : type === 'resume' ? 'Resume' : 'Pause'

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!password.trim()) {
      setSubmitError('Enter your admin password to continue.')
      return
    }
    setIsSubmitting(true)
    setSubmitError('')
    try {
      await onConfirm(password)
    } catch (error) {
      setSubmitError(error?.response?.data?.meta?.message || error?.response?.data?.message || error?.message || `Could not ${verb.toLowerCase()} this discount.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
      <button type="button" aria-label="Close confirmation" onClick={onClose} disabled={isSubmitting} className="absolute inset-0 bg-black/60 disabled:cursor-wait" />
      <form onSubmit={handleSubmit} role="dialog" aria-modal="true" aria-labelledby="discount-action-title" className="relative w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-[#1e2742] dark:bg-[#141b2d]">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 dark:border-[#1e2742]">
          <div className="flex items-start gap-3">
            <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${type === 'delete' ? 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400'}`}>
              {type === 'delete' ? <FaExclamationTriangle /> : type === 'resume' ? <FaPlay /> : <FaPause />}
            </span>
            <div>
              <h2 id="discount-action-title" className="text-lg font-semibold text-gray-900 dark:text-white">{verb} {isBulk ? 'discounts' : 'discount'}?</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-[#8b8fa3]">
                {type === 'delete' ? 'This will permanently delete ' : type === 'resume' ? 'This will resume ' : 'This will pause '}
                <span className="font-medium text-gray-900 dark:text-white">{target}</span>{type === 'pause' ? ' until resumed.' : '.'}
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} disabled={isSubmitting} aria-label="Close" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50 dark:text-[#8b8fa3] dark:hover:bg-[#1e2742]"><FaTimes /></button>
        </div>
        <div className="space-y-3 px-5 py-4">
          <label htmlFor="discount-action-password" className="block text-sm font-medium text-gray-800 dark:text-[#e0e0e0]">Admin password</label>
          <div className="relative">
            <FaLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#8b8fa3]" />
            <input id="discount-action-password" type="password" autoComplete="current-password" autoFocus value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" disabled={isSubmitting} className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 disabled:opacity-60 dark:border-[#2a3441] dark:bg-[#1e2742] dark:text-white" />
          </div>
          {submitError && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{submitError}</p>}
        </div>
        <div className="flex flex-col-reverse gap-2 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end dark:border-[#1e2742]">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-[#2a3441] dark:text-[#e0e0e0] dark:hover:bg-[#1e2742]">Cancel</button>
          <button type="submit" disabled={isSubmitting || !password.trim()} className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${type === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}`}>
            {isSubmitting ? `${type === 'resume' ? 'Resuming' : `${verb}ing`}…` : `${verb} ${isBulk ? 'discounts' : 'discount'}`}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DiscountActionModal
