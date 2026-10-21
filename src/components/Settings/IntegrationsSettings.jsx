import { useState } from 'react'
import { FaSave, FaSpinner, FaPlug, FaEye, FaEyeSlash, FaCopy, FaCheck, FaToggleOn, FaToggleOff } from 'react-icons/fa'
import { useToast } from '../ui/ToastContainer'

const IntegrationsSettings = () => {
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [revealedKeys, setRevealedKeys] = useState({})
  const [copiedKeys, setCopiedKeys] = useState({})
  const [formData, setFormData] = useState({
    integrations: {
      stripe: { enabled: true, apiKey: 'sk_live_51H...', webhookUrl: 'https://api.gamervault.com/webhooks/stripe' },
      paypal: { enabled: false, apiKey: 'A21A...', webhookUrl: 'https://api.gamervault.com/webhooks/paypal' },
      emailService: { enabled: true, apiKey: 'SG.abc123...', webhookUrl: '' },
    },
  })

  const maskApiKey = (key) => {
    if (!key) return ''
    if (key.length <= 8) return '•'.repeat(key.length)
    return key.substring(0, 4) + '•'.repeat(key.length - 8) + key.substring(key.length - 4)
  }

  const toggleReveal = (key) => {
    setRevealedKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedKeys((prev) => ({ ...prev, [key]: true }))
    setTimeout(() => setCopiedKeys((prev) => ({ ...prev, [key]: false })), 2000)
    success('API key copied to clipboard')
  }

  const handleToggle = (integration) => {
    setFormData((prev) => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [integration]: {
          ...prev.integrations[integration],
          enabled: !prev.integrations[integration].enabled,
        },
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success('Integration settings saved successfully')
    } catch (err) {
      error('Failed to save settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const IntegrationCard = ({ name, data, onToggle }) => {
    const keyName = `${name}_apiKey`
    const isRevealed = revealedKeys[keyName]
    const isCopied = copiedKeys[keyName]

    return (
      <div className="p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-800 dark:text-white text-sm font-medium mb-1">{name.toUpperCase()}</h3>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-xs">Third-party payment integration</p>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className={`text-2xl transition-colors ${
              data.enabled ? 'text-[#10b981]' : 'text-[#6b7280]'
            }`}
          >
            {data.enabled ? <FaToggleOn /> : <FaToggleOff />}
          </button>
        </div>

        {data.enabled && (
          <>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs font-medium mb-2">API Key</label>
              <div className="flex items-center gap-2">
                <input
                  type={isRevealed ? 'text' : 'password'}
                  value={isRevealed ? data.apiKey : maskApiKey(data.apiKey)}
                  readOnly
                  className="flex-1 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 py-2 rounded-lg text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => toggleReveal(keyName)}
                  className="p-2 text-gray-400 dark:text-[#8b8fa3] hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                  title={isRevealed ? 'Hide' : 'Reveal'}
                >
                  {isRevealed ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(data.apiKey, keyName)}
                  className="p-2 text-gray-400 dark:text-[#8b8fa3] hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                  title="Copy"
                >
                  {isCopied ? <FaCheck className="text-[#10b981]" /> : <FaCopy />}
                </button>
              </div>
            </div>
            {data.webhookUrl && (
              <div>
                <label className="block text-gray-700 dark:text-[#e0e0e0] text-xs font-medium mb-2">Webhook URL</label>
                <input
                  type="text"
                  value={data.webhookUrl}
                  readOnly
                  className="w-full bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-3 py-2 rounded-lg text-sm font-mono"
                />
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-gray-800 dark:text-white text-xl font-semibold mb-1">Integration Settings</h2>
          <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Manage third-party service integrations and API keys</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <IntegrationCard
              name="stripe"
              data={formData.integrations.stripe}
              onToggle={() => handleToggle('stripe')}
            />
            <IntegrationCard
              name="paypal"
              data={formData.integrations.paypal}
              onToggle={() => handleToggle('paypal')}
            />
            <IntegrationCard
              name="emailService"
              data={formData.integrations.emailService}
              onToggle={() => handleToggle('emailService')}
            />
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-[#1e2742]">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IntegrationsSettings

