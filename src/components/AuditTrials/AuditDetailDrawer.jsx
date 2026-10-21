import { FaTimes, FaClock, FaMapMarkerAlt, FaDesktop, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa'
import { formatDate } from '../../services/helper'

const AuditDetailDrawer = ({ isOpen, onClose, audit }) => {
  if (!isOpen || !audit) return null
  const statusIcon = audit.status === 'warning' ? FaExclamationTriangle : audit.status === 'failed' ? FaTimesCircle : FaCheckCircle
  const StatusIcon = statusIcon
  const statusClass = audit.status === 'warning' ? 'text-[#f59e0b]' : audit.status === 'failed' ? 'text-[#ef4444]' : 'text-[#10b981]'
  const jsonBlock = (value) => <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] p-3 text-xs text-gray-800 dark:text-[#e0e0e0]">{JSON.stringify(value ?? {}, null, 2)}</pre>

  return <>
    <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
    <aside className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-[#141b2d] border-l border-gray-200 dark:border-[#1e2742] z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-[#141b2d] border-b border-gray-200 dark:border-[#1e2742] px-6 py-4 flex items-center justify-between z-10">
        <div><h2 className="text-gray-900 dark:text-white text-xl font-semibold">Audit Log Details</h2><p className="text-gray-500 dark:text-[#8b8fa3] text-xs font-mono mt-1">{audit.id}</p></div>
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg"><FaTimes /></button>
      </div>
      <div className="p-6 space-y-5">
        <section className="grid grid-cols-2 gap-4">
          <div><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">Result</label><div className={`flex items-center gap-2 text-sm font-medium capitalize ${statusClass}`}><StatusIcon />{audit.status} · {audit.responseStatus}</div></div>
          <div><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">Timestamp</label><div className="flex items-center gap-2 text-gray-900 dark:text-white text-sm"><FaClock className="text-gray-400" />{formatDate(audit.timestamp)}</div></div>
          <div><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">Action</label><div className="text-gray-900 dark:text-white text-sm capitalize">{audit.action} ({audit.method})</div></div>
          <div><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">Duration</label><div className="text-gray-900 dark:text-white text-sm">{audit.duration ?? '—'} ms</div></div>
        </section>
        <section className="rounded-lg border border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] p-4"><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-2">User</label><div className="text-gray-900 dark:text-white text-sm font-medium">{audit.user.name}</div><div className="text-gray-500 dark:text-[#8b8fa3] text-xs">{audit.user.email || 'No email recorded'} · {audit.user.role}</div></section>
        <section><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">Endpoint</label><div className="break-all font-mono text-sm text-gray-900 dark:text-white">{audit.fullUrl || audit.endpoint}</div></section>
        <section><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-2">Details</label><div className="rounded-lg border border-gray-200 dark:border-[#2a3441] bg-gray-50 dark:bg-[#1e2742] p-4 text-sm text-gray-800 dark:text-[#e0e0e0]">{audit.details || 'No additional details recorded.'}</div></section>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">Resource</label><div className="text-sm text-gray-900 dark:text-white capitalize">{audit.resourceType}</div></div><div><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-1">IP Address</label><div className="flex items-center gap-2 font-mono text-sm text-gray-900 dark:text-white"><FaMapMarkerAlt className="text-gray-400" />{audit.ipAddress || '—'}</div></div></section>
        {audit.requestBody && <section><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-2">Request Body</label>{jsonBlock(audit.requestBody)}</section>}
        {audit.queryParams && Object.keys(audit.queryParams).length > 0 && <section><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-2">Query Parameters</label>{jsonBlock(audit.queryParams)}</section>}
        {audit.errorMessage && <section className="rounded-lg border border-red-300 bg-red-50 dark:bg-red-950/20 p-4"><label className="block text-red-600 text-xs mb-1">Error</label><p className="text-sm text-red-700 dark:text-red-300">{audit.errorMessage}</p></section>}
        <section className="border-t border-gray-200 dark:border-[#1e2742] pt-4"><label className="block text-gray-500 dark:text-[#8b8fa3] text-xs mb-2">User Agent</label><div className="flex items-start gap-2 break-all text-xs font-mono text-gray-700 dark:text-[#c1c5d2]"><FaDesktop className="mt-0.5 shrink-0 text-gray-400" />{audit.userAgent || '—'}</div></section>
      </div>
    </aside>
  </>
}

export default AuditDetailDrawer
