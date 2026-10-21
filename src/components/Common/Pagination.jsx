const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  itemLabel = 'items',
  onPageChange = () => {},
  onItemsPerPageChange,
  disabled = false,
  showPageSize = true,
  showSummary = true,
  showOnlyWhenNeeded = false,
}) => {
  const pages = Math.max(1, totalPages || 1)
  const page = Math.min(Math.max(1, currentPage), pages)

  if (showOnlyWhenNeeded && pages <= 1) return null

  const visiblePages = Array.from({ length: Math.min(pages, 5) }, (_, index) => {
    if (pages <= 5 || page <= 3) return index + 1
    if (page >= pages - 2) return pages - 4 + index
    return page - 2 + index
  })

  return (
    <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-gray-200 dark:border-[#1e2742] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
        {showSummary && <span className="text-gray-600 dark:text-[#8b8fa3] text-xs text-center sm:text-left">
          Showing {totalItems ? (page - 1) * itemsPerPage + 1 : 0} to {Math.min(page * itemsPerPage, totalItems)} of {totalItems} {itemLabel}
        </span>}
        {showPageSize && onItemsPerPageChange && <select
          value={itemsPerPage}
          onChange={(event) => onItemsPerPageChange(Number(event.target.value))}
          className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs focus:outline-none focus:border-[#10b981] w-full sm:w-auto"
          aria-label={`Items per page for ${itemLabel}`}
        >
          {[10, 25, 50, 100].map((size) => <option key={size} value={size}>{size} per page</option>)}
        </select>}
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <button type="button" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1 || disabled} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#2a3441] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
        <div className="flex items-center gap-1">
          {visiblePages.map((pageNumber) => <button type="button" key={pageNumber} onClick={() => onPageChange(pageNumber)} disabled={disabled} aria-current={page === pageNumber ? 'page' : undefined} className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-colors ${page === pageNumber ? 'bg-[#10b981] text-white' : 'bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] hover:bg-gray-200 dark:hover:bg-[#2a3441]'}`}>{pageNumber}</button>)}
        </div>
        <button type="button" onClick={() => onPageChange(Math.min(pages, page + 1))} disabled={page === pages || disabled} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-700 dark:text-[#e0e0e0] rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#2a3441] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
      </div>
    </div>
  )
}

export default Pagination
