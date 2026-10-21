import { useState } from 'react'
import { FaSave, FaSpinner, FaCreditCard, FaPaypal, FaStripe, FaToggleOn, FaToggleOff, FaExclamationCircle } from 'react-icons/fa'
import { useToast } from '../ui/ToastContainer'

const PaymentsSettings = () => {
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    paymentMethods: {
      creditCard: { enabled: true, name: 'Credit Card' },
      paypal: { enabled: true, name: 'PayPal' },
      stripe: { enabled: false, name: 'Stripe' },
    },
    defaultGateway: 'creditCard',
    refundPolicy: '7',
    maxTransactionAmount: '10000',
    minTransactionAmount: '1',
  })

  const handleTogglePayment = (method) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        [method]: {
          ...prev.paymentMethods[method],
          enabled: !prev.paymentMethods[method].enabled,
        },
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success('Payment settings saved successfully')
    } catch (err) {
      error('Failed to save settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const PaymentMethodCard = ({ method, data, icon: Icon, onToggle }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#141b2d] flex items-center justify-center">
          <Icon className="text-gray-400 dark:text-[#8b8fa3] text-lg" />
        </div>
        <div>
          <h3 className="text-gray-900 dark:text-white text-sm font-medium">{data.name}</h3>
          <p className="text-gray-500 dark:text-[#8b8fa3] text-xs">
            {data.enabled ? 'Enabled' : 'Disabled'}
          </p>
        </div>
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
  )

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-1">Payment Settings</h2>
          <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">Configure payment methods and transaction limits</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Methods */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-sm font-medium mb-3">Payment Methods</h3>
            <div className="space-y-3">
              <PaymentMethodCard
                method="creditCard"
                data={formData.paymentMethods.creditCard}
                icon={FaCreditCard}
                onToggle={() => handleTogglePayment('creditCard')}
              />
              <PaymentMethodCard
                method="paypal"
                data={formData.paymentMethods.paypal}
                icon={FaPaypal}
                onToggle={() => handleTogglePayment('paypal')}
              />
              <PaymentMethodCard
                method="stripe"
                data={formData.paymentMethods.stripe}
                icon={FaStripe}
                onToggle={() => handleTogglePayment('stripe')}
              />
            </div>
          </div>

          {/* Default Payment Gateway */}
          <div>
            <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
              Default Payment Gateway
            </label>
            <select
              value={formData.defaultGateway}
              onChange={(e) => setFormData((prev) => ({ ...prev, defaultGateway: e.target.value }))}
              className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
            </select>
            <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Default payment method for transactions</p>
          </div>

          {/* Refund Policy */}
          <div>
            <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
              Refund Policy (Days) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.refundPolicy}
              onChange={(e) => setFormData((prev) => ({ ...prev, refundPolicy: e.target.value }))}
              min="0"
              max="365"
              className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] px-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
            />
            <p className="mt-1 text-gray-500 dark:text-[#8b8fa3] text-xs">Number of days customers can request refunds</p>
          </div>

          {/* Transaction Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                Minimum Transaction Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 dark:text-[#8b8fa3] text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={formData.minTransactionAmount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, minTransactionAmount: e.target.value }))}
                  min="0"
                  step="0.01"
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-8 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-[#e0e0e0] text-sm font-medium mb-2">
                Maximum Transaction Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 dark:text-[#8b8fa3] text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={formData.maxTransactionAmount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, maxTransactionAmount: e.target.value }))}
                  min="0"
                  step="0.01"
                  className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-300 dark:border-[#2a3441] text-gray-900 dark:text-[#e0e0e0] pl-8 pr-4 py-3 rounded-lg text-sm placeholder:text-gray-400 dark:placeholder:text-[#6b7280] focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-[rgba(245,158,11,0.1)] border border-[#f59e0b] rounded-lg">
            <FaExclamationCircle className="text-[#f59e0b] text-lg mt-0.5" />
            <div>
              <h4 className="text-[#f59e0b] text-sm font-medium mb-1">Financial Impact</h4>
              <p className="text-[#8b8fa3] text-xs">
                Changes to payment settings may affect active transactions and user experience. Review carefully before saving.
              </p>
            </div>
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

export default PaymentsSettings

