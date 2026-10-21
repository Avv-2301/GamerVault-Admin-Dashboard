import { useEffect, useMemo, useState } from "react";
import { formatDate } from "../../services/helper.js";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaDesktop,
  FaMobile,
  FaGlobe,
  FaSignOutAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { forceLogoutUser, getUserLoginHistory } from "../../services/api/users";

const describeDevice = (entry) => {
  const userAgent = entry.userAgent || "";
  const deviceType = entry.deviceType || (/iPad|Tablet/i.test(userAgent) ? "tablet" : /mobile|android|iphone|ipod/i.test(userAgent) ? "mobile" : userAgent ? "desktop" : "unknown");
  const mobile = deviceType === "mobile";
  const browserName = entry.browserName || (/Edg\//i.test(userAgent) ? "Microsoft Edge" : /Chrome\//i.test(userAgent) ? "Google Chrome" : /Firefox\//i.test(userAgent) ? "Mozilla Firefox" : /Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent) ? "Safari" : "Unknown browser");
  const browserVersion = entry.browserVersion || userAgent.match(/(?:Edg|Chrome|Firefox|Version)\/([\d.]+)/i)?.[1] || "";
  const device = deviceType === "unknown" ? "Unknown device" : `${deviceType.charAt(0).toUpperCase()}${deviceType.slice(1)} device`;
  return { device, browser: browserVersion ? `${browserName} ${browserVersion}` : browserName, mobile };
};

const LoginActivityTab = ({ userId }) => {
  const [showSuspiciousOnly, setShowSuspiciousOnly] = useState(false);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getUserLoginHistory(userId).then((response) => {
      if (!active) return;
      if (response?.meta?.code === 200) setActivity(Array.isArray(response.data?.loginDetails) ? response.data.loginDetails : []);
      else setError(response?.meta?.message || "Could not load login activity.");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [userId]);

  const filteredActivity = useMemo(() => {
    const normalized = activity.map((entry, index) => ({
      ...entry,
      id: entry._id || `${entry.last_login || "login"}-${index}`,
      status: entry.status === "failed" ? "failed" : "success",
      ip: entry.ip_address?.browser_ip || entry.ip_address?.system_ip || "Not recorded",
      suspicious: entry.status === "failed",
      ...describeDevice(entry),
    }));
    return showSuspiciousOnly ? normalized.filter((entry) => entry.suspicious) : normalized;
  }, [activity, showSuspiciousOnly]);

  const handleForceLogout = async () => {
    if (!window.confirm("Log this user out of all active sessions?")) return;
    setLoggingOut(true);
    await forceLogoutUser(userId);
    setLoggingOut(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 dark:border-[#1e2742] dark:bg-[#141b2d] sm:flex-row sm:items-center sm:p-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={showSuspiciousOnly} onChange={(event) => setShowSuspiciousOnly(event.target.checked)} className="h-4 w-4 rounded border-gray-300 bg-white text-[#10b981] focus:ring-2 focus:ring-[#10b981] dark:border-[#2a3441] dark:bg-[#1e2742]" />
          <span className="text-xs text-gray-700 dark:text-[#e0e0e0] sm:text-sm">Show failed sign-in attempts only</span>
        </label>
        <button onClick={handleForceLogout} disabled={loggingOut} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ef4444] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#dc2626] disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:px-4 sm:text-sm">
          <FaSignOutAlt />{loggingOut ? "Logging out…" : "Force Logout All Sessions"}
        </button>
      </div>

      <div className="max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-[#1e2742] dark:bg-[#141b2d]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-[#1e2742]"><tr>
              {["Date & Time", "IP Address", "Location", "Device / Browser", "Status"].map((heading) => <th key={heading} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-[#8b8fa3]">{heading}</th>)}
            </tr></thead>
            <tbody>
              {loading ? <tr><td colSpan="5" className="px-4 py-10 text-center text-sm text-gray-500 dark:text-[#8b8fa3]">Loading login activity…</td></tr>
                : error ? <tr><td colSpan="5" className="px-4 py-10 text-center text-sm text-red-500" role="alert">{error}</td></tr>
                  : filteredActivity.length === 0 ? <tr><td colSpan="5" className="px-4 py-10 text-center text-sm text-gray-500 dark:text-[#8b8fa3]">{showSuspiciousOnly ? "No failed sign-in attempts found." : "No login activity recorded."}</td></tr>
                    : filteredActivity.map((entry) => {
                      const DeviceIcon = entry.mobile ? FaMobile : FaDesktop;
                      return <tr key={entry.id} className={`border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-[#1e2742] dark:hover:bg-[#1e2742] ${entry.suspicious ? "bg-[rgba(249,115,22,0.05)]" : ""}`}>
                        <td className="px-3 py-3 text-xs text-gray-700 dark:text-[#e0e0e0] sm:text-sm">{formatDate(entry.last_login)}</td>
                        <td className="px-3 py-3"><code className="text-xs text-gray-700 dark:text-[#e0e0e0]">{entry.ip}</code></td>
                        <td className="px-3 py-3"><div className="flex items-center gap-2 text-xs text-gray-500 dark:text-[#8b8fa3]"><FaGlobe />Location unavailable</div></td>
                        <td className="px-3 py-3"><div className="flex items-center gap-2"><DeviceIcon className="text-gray-500 dark:text-[#8b8fa3]" /><div><div className="text-xs text-gray-700 dark:text-[#e0e0e0]">{entry.device}</div><div className="text-xs text-gray-500 dark:text-[#8b8fa3]">{entry.browser}</div></div></div></td>
                        <td className="px-3 py-3">{entry.status === "success" ? <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(16,185,129,0.2)] px-2 py-1 text-xs font-medium text-[#10b981]"><FaCheckCircle />Success</span> : <div><span className="inline-flex items-center gap-1 rounded-full bg-[rgba(239,68,68,0.2)] px-2 py-1 text-xs font-medium text-[#ef4444]"><FaTimesCircle />Failed</span>{entry.failureReason && <div className="mt-1 flex items-center gap-1 text-xs text-orange-500"><FaExclamationTriangle />{entry.failureReason}</div>}</div>}</td>
                      </tr>;
                    })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoginActivityTab;
