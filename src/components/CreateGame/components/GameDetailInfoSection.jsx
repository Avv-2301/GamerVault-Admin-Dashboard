import { Controller, useFieldArray } from 'react-hook-form'
import { FaPlus, FaTimes } from 'react-icons/fa'

const supportedFeatureOptions = [
  'Single-player',
  'Multi-player',
  'Full controller support',
  'Steam Cloud',
  'Steam Trading Cards',
  'Remote Play on TV / Tablet',
]

const inputClass = 'w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all'
const labelClass = 'block text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm font-medium mb-2'

export default function GameDetailInfoSection({ register, control }) {
  const highlights = useFieldArray({ control, name: 'featureHighlights' })
  const languageRows = useFieldArray({ control, name: 'languageSupport' })

  return (
    <section className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold mb-1">Game Detail Page</h2>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">Add the content shown in the game detail page sidebar and About section.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <label className="block">
          <span className={labelClass}>Metascore (0–100)</span>
          <input type="number" min="0" max="100" step="1" {...register('metascore', { min: 0, max: 100, setValueAs: (value) => value === '' ? null : Number(value) })} placeholder="Optional" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Achievement Count</span>
          <input type="number" min="0" step="1" {...register('achievementCount', { min: 0, setValueAs: (value) => value === '' ? 0 : Number(value) })} placeholder="0" className={inputClass} />
        </label>
      </div>

      <div>
        <label htmlFor="matureContentDescription" className={labelClass}>Mature Content Description</label>
        <textarea id="matureContentDescription" rows={3} {...register('matureContentDescription')} placeholder="Describe mature themes or content shown on the detail page." className={inputClass} />
      </div>

      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-gray-800 dark:text-white text-sm font-medium">Feature Highlights</h3>
            <p className="text-gray-500 dark:text-[#8b8fa3] text-xs mt-1">Short title and description pairs for the About section.</p>
          </div>
          <button type="button" onClick={() => highlights.append({ title: '', description: '' })} className="inline-flex items-center gap-2 px-3 py-2 bg-[#10b981] text-white rounded-lg text-xs"><FaPlus /> Add Highlight</button>
        </div>
        <div className="space-y-3">
          {highlights.fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-2 p-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
              <input {...register(`featureHighlights.${index}.title`)} placeholder="Highlight title" className={inputClass} />
              <input {...register(`featureHighlights.${index}.description`)} placeholder="Short feature description" className={inputClass} />
              <button type="button" onClick={() => highlights.remove(index)} aria-label="Remove highlight" className="text-red-500 px-2"><FaTimes /></button>
            </div>
          ))}
          {highlights.fields.length === 0 && <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">No highlights added yet.</p>}
        </div>
      </div>

      <div>
        <h3 className="text-gray-800 dark:text-white text-sm font-medium mb-3">Store Features</h3>
        <Controller
          name="supportedFeatures"
          control={control}
          render={({ field }) => {
            const selected = field.value || []
            return <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {supportedFeatureOptions.map((feature) => (
                <label key={feature} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg text-xs sm:text-sm text-gray-800 dark:text-[#e0e0e0]">
                  <input type="checkbox" checked={selected.includes(feature)} onChange={(event) => field.onChange(event.target.checked ? [...selected, feature] : selected.filter((item) => item !== feature))} className="accent-[#10b981]" />
                  {feature}
                </label>
              ))}
            </div>
          }}
        />
      </div>

      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-gray-800 dark:text-white text-sm font-medium">Language Support</h3>
            <p className="text-gray-500 dark:text-[#8b8fa3] text-xs mt-1">Select the supported UI, audio, and subtitle tracks per language.</p>
          </div>
          <button type="button" onClick={() => languageRows.append({ language: '', interface: false, audio: false, subtitles: false })} className="inline-flex items-center gap-2 px-3 py-2 bg-[#10b981] text-white rounded-lg text-xs"><FaPlus /> Add Language</button>
        </div>
        <div className="space-y-2">
          {languageRows.fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-2 sm:grid-cols-[minmax(130px,1fr)_repeat(3,auto)_auto] items-center gap-3 p-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
              <input {...register(`languageSupport.${index}.language`, { required: 'Enter a language name' })} placeholder="Language" className={inputClass} />
              {[[ 'interface', 'UI' ], [ 'audio', 'Audio' ], [ 'subtitles', 'Subtitles' ]].map(([key, label]) => (
                <label key={key} className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-[#e0e0e0]"><input type="checkbox" {...register(`languageSupport.${index}.${key}`)} className="accent-[#10b981]" />{label}</label>
              ))}
              <button type="button" onClick={() => languageRows.remove(index)} aria-label="Remove language" className="text-red-500 px-2"><FaTimes /></button>
            </div>
          ))}
          {languageRows.fields.length === 0 && <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">No language rows added yet.</p>}
        </div>
      </div>
    </section>
  )
}
