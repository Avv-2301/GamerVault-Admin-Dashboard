import { useState } from 'react'
import { FaExclamationTriangle, FaLock, FaPause, FaPlay, FaTimes } from 'react-icons/fa'

const DeleteBannerModal = ({ banner, mode = 'delete', onClose, onConfirm }) => {
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  if (!banner) return null
  const isPause = mode === 'pause'
  const isResume = mode === 'resume'
  const action = isPause ? 'pause' : isResume ? 'resume' : 'delete'

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
      setSubmitError(error?.response?.data?.meta?.message || error?.response?.data?.message || `Could not ${action} this banner. Check your password and try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
      <button type="button" aria-label={`Close ${action} confirmation`} onClick={onClose} disabled={isSubmitting} className="absolute inset-0 bg-black/60 disabled:cursor-wait" />
      <form onSubmit={handleSubmit} role="dialog" aria-modal="true" aria-labelledby="banner-action-title" className="relative w-full max-w-md rounded-xl border border-gray-200 dark:border-[#1e2742] bg-white dark:bg-[#141b2d] shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 dark:border-[#1e2742] px-5 py-4">
          <div className="flex items-start gap-3">
            <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isPause ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400' : isResume ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400'}`}>
              {isPause ? <FaPause /> : isResume ? <FaPlay /> : <FaExclamationTriangle />}
            </span>
            <div>
              <h2 id="banner-action-title" className="text-lg font-semibold text-gray-900 dark:text-white">{isPause ? 'Pause banner?' : isResume ? 'Resume banner?' : 'Delete banner?'}</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-[#8b8fa3]">{isPause ? <>This will disable <span className="font-medium text-gray-900 dark:text-white">{banner.title}</span> until it is resumed.</> : isResume ? <>This will re-enable <span className="font-medium text-gray-900 dark:text-white">{banner.title}</span> according to its schedule.</> : <>This will permanently delete <span className="font-medium text-gray-900 dark:text-white">{banner.title}</span>.</>}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} disabled={isSubmitting} aria-label="Close" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 dark:text-[#8b8fa3] dark:hover:bg-[#1e2742] dark:hover:text-white">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-3 px-5 py-4">
          <label htmlFor="delete-banner-password" className="block text-sm font-medium text-gray-800 dark:text-[#e0e0e0]">Admin password</label>
          <div className="relative">
            <FaLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#8b8fa3]" />
            <input
              id="delete-banner-password"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 disabled:opacity-60 dark:border-[#2a3441] dark:bg-[#1e2742] dark:text-white"
            />
          </div>
          {submitError && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{submitError}</p>}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end dark:border-[#1e2742]">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-[#2a3441] dark:text-[#e0e0e0] dark:hover:bg-[#1e2742]">Cancel</button>
          <button type="submit" disabled={isSubmitting || !password.trim()} className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${isPause ? 'bg-amber-600 hover:bg-amber-700' : isResume ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}>
            {isSubmitting ? `${isPause ? 'Pausing' : isResume ? 'Resuming' : 'Deleting'}…` : `${action[0].toUpperCase()}${action.slice(1)} banner`}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteBannerModal
