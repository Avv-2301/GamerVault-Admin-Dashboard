import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FaChartBar, FaGamepad, FaUsers, FaCreditCard, FaTag, FaComments, FaChartLine, FaImage, FaCog, FaShieldAlt, FaGift, FaBars, FaTimes } from 'react-icons/fa'
import SidebarClock from '../ui/SidebarClock'

// Navigation configuration object
const navigationConfig = {
  main: [
    { icon: FaChartBar, label: 'Dashboard', path: '/dashboard' },
    { icon: FaGamepad, label: 'Games', path: '/dashboard/games' },
    { icon: FaUsers, label: 'Users', path: '/dashboard/users' },
    { icon: FaCreditCard, label: 'Transactions', path: '/dashboard/transactions' },
    { icon: FaTag, label: 'Discounts', path: '/dashboard/discounts' },
    { icon: FaGift, label: 'Gift Cards', path: '/dashboard/gift-cards' },
    { icon: FaComments, label: 'Support', path: '/dashboard/support', badge: 12 },
  ],
  analytics: {
    title: 'Analytics',
    items: [
      { icon: FaChartLine, label: 'Reports', path: '/dashboard/reports' },
    ],
  },
  content: {
    title: 'Content',
    items: [
      { icon: FaImage, label: 'Banners', path: '/dashboard/banners' },
    ],
  },
  settings: {
    title: 'Settings',
    items: [
      { icon: FaCog, label: 'General Settings', path: '/dashboard/settings' },
    ],
  },
  audit: {
    title: 'Audit & Trials',
    items: [
      { icon: FaShieldAlt, label: 'Audit Trials', path: '/dashboard/audit-trials' },
    ],
  },
}

const Sidebar = () => {
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Check if a path is currently active
  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/'
    }
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  // Navigation item component
  const NavItem = ({ item, onNavigate }) => {
    const active = isActive(item.path)
    const Icon = item.icon

    return (
      <NavLink
        to={item.path}
        onClick={() => {
          if (onNavigate) onNavigate()
        }}
        className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all relative ${
          active
            ? 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white'
            : 'text-gray-600 dark:text-[#8b8fa3] hover:bg-gray-100 dark:hover:bg-[#1e2742] hover:text-gray-800 dark:hover:text-white'
        }`}
      >
        <Icon className="text-base sm:text-lg flex-shrink-0" />
        <span className="text-sm sm:text-base">{item.label}</span>
        {item.badge && (
          <span className="ml-auto bg-[#ef4444] text-white text-xs px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </NavLink>
    )
  }

  // Navigation section component
  const NavSection = ({ title, items, onNavigate }) => {
    return (
      <div className="mb-6 sm:mb-8">
        <h3 className="text-gray-500 dark:text-[#8b8fa3] text-xs uppercase tracking-wider mb-3 px-3 sm:px-4">
          {title}
        </h3>
        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <NavItem key={item.path} item={item} onNavigate={onNavigate} />
          ))}
        </nav>
      </div>
    )
  }

  const handleNavigate = () => {
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-2 text-gray-600 dark:text-[#8b8fa3] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-[#141b2d] p-4 sm:p-6 flex flex-col border-r border-gray-200 dark:border-[#1e2742] overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <h2 className="text-gray-800 dark:text-white text-lg sm:text-xl font-semibold">GamerVault</h2>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-gray-600 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white"
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Clock Section */}
        <div className="mb-6 sm:mb-8">
          <SidebarClock />
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-2 mb-6 sm:mb-8">
          {navigationConfig.main.map((item) => (
            <NavItem key={item.path} item={item} onNavigate={handleNavigate} />
          ))}
        </nav>

        {/* Analytics Section */}
        <NavSection
          title={navigationConfig.analytics.title}
          items={navigationConfig.analytics.items}
          onNavigate={handleNavigate}
        />

        {/* Content Section */}
        <NavSection
          title={navigationConfig.content.title}
          items={navigationConfig.content.items}
          onNavigate={handleNavigate}
        />

        {/* Settings Section */}
        <NavSection
          title={navigationConfig.settings.title}
          items={navigationConfig.settings.items}
          onNavigate={handleNavigate}
        />

        {/* Audit & Trials Section */}
        <NavSection
          title={navigationConfig.audit.title}
          items={navigationConfig.audit.items}
          onNavigate={handleNavigate}
        />

        {/* Status Indicator */}
        <div className="mt-auto flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 dark:bg-[#1e2742] rounded-lg text-xs sm:text-sm text-gray-600 dark:text-[#8b8fa3]">
          <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse flex-shrink-0"></div>
          <span className="truncate">All systems operational</span>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

