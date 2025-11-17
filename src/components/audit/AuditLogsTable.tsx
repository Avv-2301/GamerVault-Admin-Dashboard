import React from "react";
import { FaUser, FaClock, FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaServer, FaGlobe } from "react-icons/fa";

export interface AuditLog {
  _id: string;
  action: string | null;
  createdAt: string;
  duration: number;
  endpoint: string;
  errorMessage: string | null;
  fullUrl: string;
  ipAddress: string;
  method: string;
  queryParams: Record<string, any> | null;
  requestBody: Record<string, any> | null;
  responseStatus: number;
  updatedAt: string;
  userAgent: string;
  userId: string | { _id: string; name: string; email: string } | null;
  userRole: string | null;
  __v?: number;
}

interface AuditLogsTableProps {
  logs: AuditLog[];
  isLoading?: boolean;
}

const AuditLogsTable: React.FC<AuditLogsTableProps> = ({ logs, isLoading = false }) => {
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const getStatusIcon = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return <FaCheckCircle className="text-green-600" />;
    } else if (statusCode >= 400 && statusCode < 500) {
      return <FaExclamationTriangle className="text-yellow-600" />;
    } else if (statusCode >= 500) {
      return <FaTimesCircle className="text-red-600" />;
    }
    return <FaInfoCircle className="text-blue-600" />;
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return "bg-green-100 text-green-700";
    } else if (statusCode >= 400 && statusCode < 500) {
      return "bg-yellow-100 text-yellow-700";
    } else if (statusCode >= 500) {
      return "bg-red-100 text-red-700";
    }
    return "bg-blue-100 text-blue-700";
  };

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getMethodColor = (method: string): string => {
    switch (method.toUpperCase()) {
      case "GET":
        return "bg-blue-100 text-blue-700";
      case "POST":
        return "bg-green-100 text-green-700";
      case "PUT":
        return "bg-yellow-100 text-yellow-700";
      case "PATCH":
        return "bg-orange-100 text-orange-700";
      case "DELETE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading audit logs...</p>
        <p className="text-sm text-gray-400 mt-2">Please wait while we fetch the data</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <FaInfoCircle className="text-gray-400 text-3xl" />
        </div>
        <p className="text-gray-700 font-semibold text-lg mb-2">No audit logs found</p>
        <p className="text-sm text-gray-500">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Method
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Endpoint
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              IP Address
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              User Agent
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {logs.map((log, index) => (
            <tr
              key={log._id}
              className={`hover:bg-gray-50 transition-colors duration-150 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400 flex-shrink-0" size={14} />
                  <span className="text-sm font-medium text-gray-900">{formatDate(log.createdAt)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-md shadow-sm ${getMethodColor(log.method)}`}>
                  {log.method}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-start gap-2 max-w-md">
                  <FaServer className="text-gray-400 flex-shrink-0 mt-0.5" size={14} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 font-mono truncate" title={log.endpoint}>
                      {log.endpoint}
                    </div>
                    {log.errorMessage && (
                      <div className="text-xs text-red-600 mt-1 truncate" title={log.errorMessage}>
                        <span className="font-medium">Error:</span> {log.errorMessage.substring(0, 60)}
                        {log.errorMessage.length > 60 && "..."}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="flex-shrink-0">{getStatusIcon(log.responseStatus)}</span>
                  <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full ${getStatusColor(log.responseStatus)}`}>
                    {log.responseStatus}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-sm font-mono rounded-md">
                  {formatDuration(log.duration)}
                </span>
              </td>
              <td className="px-6 py-4">
                {log.userId ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                      <FaUser className="text-white text-xs" />
                    </div>
                    <div className="min-w-0">
                      {typeof log.userId === "object" && log.userId !== null ? (
                        <>
                          <div className="text-xs font-medium text-gray-500 mb-0.5">User</div>
                          <div className="text-sm font-semibold text-gray-900 truncate" title={`${log.userId.name} (${log.userId.email})`}>
                            {log.userId.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate" title={log.userId.email}>
                            {log.userId.email}
                          </div>
                          {log.userRole && (
                            <div className="text-xs text-gray-500 mt-0.5">{log.userRole}</div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="text-xs font-medium text-gray-500 mb-0.5">User ID</div>
                          <div className="text-sm font-semibold text-gray-900 font-mono truncate" title={String(log.userId || "")}>
                            {String(log.userId || "")}
                          </div>
                          {log.userRole && (
                            <div className="text-xs text-gray-500 mt-0.5">{log.userRole}</div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-500 text-sm font-medium rounded-md">
                    Anonymous
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-gray-400 flex-shrink-0" size={14} />
                  <span className="text-sm font-mono text-gray-700">{log.ipAddress || "-"}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600 max-w-xs truncate font-mono" title={log.userAgent}>
                  {log.userAgent || "-"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogsTable;

