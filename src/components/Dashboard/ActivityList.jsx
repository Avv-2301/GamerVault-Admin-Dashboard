import { createElement } from 'react'
import { FaHistory, FaPlus, FaEdit, FaTrash, FaClock } from 'react-icons/fa'
import { formatDateTime } from '../../services/helper'

const methodStyles = {
  POST: {
    icon: FaPlus,
    label: 'Created',
    iconClass: 'bg-emerald-50 text-[#10b981] ring-emerald-100 dark:bg-[#10b981]/10 dark:ring-[#10b981]/20',
    badgeClass: 'bg-emerald-50 text-[#059669] dark:bg-[#10b981]/10 dark:text-[#34d399]',
    dotClass: 'bg-[#10b981]',
  },
  PUT: {
    icon: FaEdit,
    label: 'Updated',
    iconClass: 'bg-blue-50 text-[#3b82f6] ring-blue-100 dark:bg-[#3b82f6]/10 dark:ring-[#3b82f6]/20',
    badgeClass: 'bg-blue-50 text-[#2563eb] dark:bg-[#3b82f6]/10 dark:text-[#60a5fa]',
    dotClass: 'bg-[#3b82f6]',
  },
  PATCH: {
    icon: FaEdit,
    label: 'Updated',
    iconClass: 'bg-blue-50 text-[#3b82f6] ring-blue-100 dark:bg-[#3b82f6]/10 dark:ring-[#3b82f6]/20',
    badgeClass: 'bg-blue-50 text-[#2563eb] dark:bg-[#3b82f6]/10 dark:text-[#60a5fa]',
    dotClass: 'bg-[#3b82f6]',
  },
  DELETE: {
    icon: FaTrash,
    label: 'Deleted',
    iconClass: 'bg-red-50 text-[#ef4444] ring-red-100 dark:bg-[#ef4444]/10 dark:ring-[#ef4444]/20',
    badgeClass: 'bg-red-50 text-[#dc2626] dark:bg-[#ef4444]/10 dark:text-[#f87171]',
    dotClass: 'bg-[#ef4444]',
  },
}

const ActivityList = ({ activities = [] }) => (
  <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-[#1e2742] dark:bg-[#141b2d] sm:p-5">
    <div className="mb-4 flex items-start justify-between gap-3 border-b border-gray-100 pb-4 dark:border-[#1e2742]">
      <div>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/10 text-[#10b981]"><FaHistory className="text-sm" /></span>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">Recent Activity</h3>
        </div>
        <p className="mt-1.5 text-xs text-gray-500 dark:text-[#8b8fa3]">Latest successful admin changes</p>
      </div>
      <span className="shrink-0 rounded-full border border-[#10b981]/20 bg-[#10b981]/10 px-2.5 py-1 text-xs font-semibold text-[#059669] dark:text-[#34d399]">
        {activities.length} recent
      </span>
    </div>

    {activities.length === 0 ? (
      <div className="flex min-h-[190px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50/60 px-4 text-center dark:border-[#2a3441] dark:bg-[#1e2742]/40">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]"><FaClock /></div>
        <p className="text-sm font-medium text-gray-800 dark:text-white">No recent activity</p>
        <p className="mt-1 text-xs text-gray-500 dark:text-[#8b8fa3]">Admin changes in this date range will appear here.</p>
      </div>
    ) : (
      <div className="max-h-[270px] space-y-2.5 overflow-y-auto pr-1 sm:max-h-[300px]">
        {activities.map((activity) => {
          const style = methodStyles[activity.method] || methodStyles.PUT
          return (
            <div key={activity.id} className="group relative flex gap-3 rounded-lg border border-gray-200 bg-gray-50/70 p-3 transition-colors hover:border-[#10b981]/40 hover:bg-[#10b981]/[0.04] dark:border-[#2a3441] dark:bg-[#1e2742]/70 dark:hover:bg-[#10b981]/[0.06]">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${style.iconClass}`}>
                {createElement(style.icon, { className: 'text-sm' })}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
                  <p className="min-w-0 truncate text-sm font-semibold text-gray-800 dark:text-white" title={activity.title}>{activity.title}</p>
                  <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.badgeClass}`}>{style.label}</span>
                </div>
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-[#8b8fa3]" title={activity.description}>{activity.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-gray-500 dark:text-[#8b8fa3]">
                  <span className={`h-1.5 w-1.5 rounded-full ${style.dotClass}`} />
                  <span className="font-medium text-gray-700 dark:text-[#cbd5e1]">{activity.actor}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={activity.createdAt}>{formatDateTime(activity.createdAt)}</time>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )}
  </div>
)

export default ActivityList
