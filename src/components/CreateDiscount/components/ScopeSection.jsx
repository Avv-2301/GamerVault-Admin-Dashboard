import { useState } from 'react'
import { FaGamepad, FaFolder, FaSearch, FaTimes, FaPlus } from 'react-icons/fa'

const ScopeSection = ({ formData, errors, options, optionsLoading, scopeLocked = false, onFieldChange, onArrayChange }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredGames = options.games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCategories = options.categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddGame = (game) => {
    if (!formData.selectedGames.find((g) => g.id === game.id)) {
      onArrayChange('selectedGames', [...formData.selectedGames, game])
    }
    setSearchTerm('')
  }

  const handleRemoveGame = (gameId) => {
    onArrayChange(
      'selectedGames',
      formData.selectedGames.filter((g) => g.id !== gameId)
    )
  }

  const handleAddCategory = (category) => {
    if (!formData.selectedCategories.find((c) => c.id === category.id)) {
      onArrayChange('selectedCategories', [...formData.selectedCategories, category])
    }
    setSearchTerm('')
  }

  const handleRemoveCategory = (categoryId) => {
    onArrayChange(
      'selectedCategories',
      formData.selectedCategories.filter((c) => c.id !== categoryId)
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Discount Scope</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Choose games or categories. The schedule activates each matching game's configured discount price and percentage.</p>
      </div>

      {/* Scope Type Selection */}
      <div>
        <label className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2 sm:mb-3">
          Scope Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[
            { value: 'game', label: 'Specific Games', icon: FaGamepad, description: 'Select games' },
            { value: 'category', label: 'Categories', icon: FaFolder, description: 'Select categories' },
          ].map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.value}
                type="button"
                disabled={scopeLocked}
                onClick={() => onFieldChange('scope', option.value)}
                className={`flex flex-col items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 sm:py-4 rounded-lg border-2 transition-all disabled:cursor-not-allowed ${
                  formData.scope === option.value
                    ? 'border-[#10b981] bg-[rgba(16,185,129,0.1)] text-[#10b981]'
                    : 'border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] hover:border-gray-300 dark:hover:border-[#3a4451]'
                }`}
              >
                <Icon className="text-lg sm:text-xl" />
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                  <div className="text-xs opacity-75 mt-0.5">{option.description}</div>
                </div>
              </button>
            )
          })}
        </div>
        {scopeLocked && <p className="mt-2 text-xs text-gray-500 dark:text-[#8b8fa3]">Discount scope cannot be changed after creation.</p>}
        {errors.scope && <p className="mt-2 text-red-500 text-xs">{errors.scope}</p>}
      </div>

      {/* Scope Details */}
      {formData.scope === 'game' && (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
              Select Games <span className="text-red-500">*</span>
            </label>
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search games..."
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>

            {/* Selected Games */}
            {formData.selectedGames.length > 0 && (
              <div className="mb-3">
                <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-2">Selected Games ({formData.selectedGames.length})</div>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedGames.map((game) => (
                    <span
                      key={game.id}
                      className="inline-flex items-center gap-1.5 sm:gap-2 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm"
                    >
                      <FaGamepad className="text-xs text-gray-400 dark:text-[#8b8fa3] flex-shrink-0" />
                      <span className="truncate max-w-[150px] sm:max-w-none" title={game.name}>{game.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGame(game.id)}
                        className="text-gray-400 dark:text-[#8b8fa3] hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Games */}
            {optionsLoading && <p className="text-sm text-gray-500">Loading games…</p>}
            {filteredGames.length > 0 && (
              <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg max-h-60 overflow-y-auto">
                {filteredGames
                  .filter((game) => !formData.selectedGames.find((g) => g.id === game.id))
                  .map((game) => (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => handleAddGame(game)}
                      className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-[#141b2d] transition-colors border-b border-gray-200 dark:border-[#2a3441] last:border-0"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <FaGamepad className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white text-xs sm:text-sm truncate">{game.name}</span>
                      </div>
                      <FaPlus className="text-gray-400 dark:text-[#8b8fa3] text-xs flex-shrink-0 ml-2" />
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {formData.scope === 'category' && (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-gray-900 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2">
              Select Categories <span className="text-red-500">*</span>
            </label>
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search categories..."
                className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>

            {/* Selected Categories */}
            {formData.selectedCategories.length > 0 && (
              <div className="mb-3">
                <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mb-2">
                  Selected Categories ({formData.selectedCategories.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedCategories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center gap-1.5 sm:gap-2 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm"
                    >
                      <FaFolder className="text-xs text-gray-400 dark:text-[#8b8fa3] flex-shrink-0" />
                      <span className="truncate max-w-[150px] sm:max-w-none" title={category.name}>{category.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category.id)}
                        className="text-gray-400 dark:text-[#8b8fa3] hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Categories */}
            {optionsLoading && <p className="text-sm text-gray-500">Loading categories…</p>}
            {filteredCategories.length > 0 && (
              <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg max-h-60 overflow-y-auto">
                {filteredCategories
                  .filter((category) => !formData.selectedCategories.find((c) => c.id === category.id))
                  .map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleAddCategory(category)}
                      className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-[#141b2d] transition-colors border-b border-gray-200 dark:border-[#2a3441] last:border-0"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <FaFolder className="text-gray-400 dark:text-[#8b8fa3] text-xs sm:text-sm flex-shrink-0" />
                        <span className="text-gray-900 dark:text-white text-xs sm:text-sm truncate">{category.name}</span>
                      </div>
                      <FaPlus className="text-gray-400 dark:text-[#8b8fa3] text-xs flex-shrink-0 ml-2" />
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default ScopeSection

