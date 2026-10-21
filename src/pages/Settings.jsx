import { useState } from 'react'
import { FaCog, FaGamepad, FaCreditCard, FaWallet, FaShieldAlt, FaBell, FaPlug, FaUsers, FaServer } from 'react-icons/fa'
import Header from '../components/Dashboard/Header'
import GeneralSettings from '../components/Settings/GeneralSettings'
import PlatformSettings from '../components/Settings/PlatformSettings'
import PaymentsSettings from '../components/Settings/PaymentsSettings'
import WalletSettings from '../components/Settings/WalletSettings'
import SecuritySettings from '../components/Settings/SecuritySettings'
import NotificationsSettings from '../components/Settings/NotificationsSettings'
import IntegrationsSettings from '../components/Settings/IntegrationsSettings'
import RolesPermissionsSettings from '../components/Settings/RolesPermissionsSettings'
import SystemSettings from '../components/Settings/SystemSettings'

const Settings = () => {
  const [activeCategory, setActiveCategory] = useState('general')

  const categories = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'platform', label: 'Platform', icon: FaGamepad },
    { id: 'payments', label: 'Payments', icon: FaCreditCard },
    { id: 'wallet', label: 'Wallet', icon: FaWallet },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'integrations', label: 'Integrations', icon: FaPlug },
    { id: 'roles', label: 'Roles & Permissions', icon: FaUsers },
    { id: 'system', label: 'System', icon: FaServer },
  ]

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'general':
        return <GeneralSettings />
      case 'platform':
        return <PlatformSettings />
      case 'payments':
        return <PaymentsSettings />
      case 'wallet':
        return <WalletSettings />
      case 'security':
        return <SecuritySettings />
      case 'notifications':
        return <NotificationsSettings />
      case 'integrations':
        return <IntegrationsSettings />
      case 'roles':
        return <RolesPermissionsSettings />
      case 'system':
        return <SystemSettings />
      default:
        return <GeneralSettings />
    }
  }

  return (
    <main className="ml-64 flex-1 bg-gray-50 dark:bg-[#0a0e27]">
      <div className="p-6">
        <Header />

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 dark:text-white text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">
            Manage system configuration, security, payments, and platform preferences
          </p>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-6">
          {/* Settings Navigation Sidebar */}
          <aside className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 h-fit sticky top-6">
            <nav className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = activeCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white'
                        : 'text-gray-600 dark:text-[#8b8fa3] hover:bg-gray-100 dark:hover:bg-[#1e2742] hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Settings Content */}
          <div className="min-h-[600px]">
            {renderCategoryContent()}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Settings

