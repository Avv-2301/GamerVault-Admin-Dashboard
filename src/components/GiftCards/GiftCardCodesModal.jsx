import { useEffect } from 'react'
import { FaCheckCircle, FaTimes, FaRegCircle } from 'react-icons/fa'

const GiftCardCodesModal = ({ giftCard, onClose }) => {
  useEffect(() => {
    if (!giftCard) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [giftCard, onClose])

  if (!giftCard) return null
  const codes = giftCard.codes?.length ? giftCard.codes : [{ code: giftCard.code, redeemed: giftCard.status === 'redeemed' }]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
      <button type="button" aria-label="Close gift card codes" onClick={onClose} className="absolute inset-0 bg-black/60" />
      <section role="dialog" aria-modal="true" aria-labelledby="gift-card-codes-title" className="relative flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-[#1e2742] dark:bg-[#141b2d]">
        <header className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 dark:border-[#1e2742]">
          <div>
            <h2 id="gift-card-codes-title" className="text-lg font-semibold text-gray-900 dark:text-white">Generated gift card codes</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-[#8b8fa3]">
              {giftCard.codePrefix || 'Gift card batch'} · {codes.length} {codes.length === 1 ? 'code' : 'codes'} · ${Number(giftCard.amount || 0).toFixed(2)} each
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-[#8b8fa3] dark:hover:bg-[#1e2742] dark:hover:text-white"><FaTimes /></button>
        </header>
        <div className="overflow-y-auto p-4 sm:p-5">
          <ul className="space-y-2">
            {codes.map((entry, index) => (
              <li key={entry.code || index} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 dark:border-[#263146] dark:bg-[#101729]">
                <code className={`break-all text-sm font-semibold ${entry.redeemed ? 'text-gray-500 line-through dark:text-[#8b8fa3]' : 'text-gray-900 dark:text-white'}`}>
                  {entry.code || 'Code unavailable'}
                </code>
                <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${entry.redeemed ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>
                  {entry.redeemed ? <><FaCheckCircle /> Redeemed</> : <><FaRegCircle /> Available</>}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <footer className="flex justify-end border-t border-gray-200 px-5 py-3 dark:border-[#1e2742]">
          <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-[#2a3441] dark:text-[#e0e0e0] dark:hover:bg-[#1e2742]">Close</button>
        </footer>
      </section>
    </div>
  )
}

export default GiftCardCodesModal
