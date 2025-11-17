import React, { useState, useEffect, useCallback } from "react";
import { FaFileAlt, FaSearch, FaFilter, FaTimes, FaChartLine, FaClock, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import AuditLogsTable from "../components/audit/AuditLogsTable";
import type { AuditLog } from "../components/audit/AuditLogsTable";
import Pagination from "../components/common/Pagination";
import { apiGet } from "../services/api";
import { API_CONFIG } from "../services/config";
import { showError } from "../utils/notifications";
import type { ApiError } from "../services/api";

interface AuditLogsResponse {
  auditLogs?: AuditLog[];
  data?: AuditLog[];
  logs?: AuditLog[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchAuditLogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentPage > 1) {
        params.append("page", currentPage.toString());
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      if (methodFilter) {
        params.append("method", methodFilter);
      }
      if (statusFilter) {
        params.append("status", statusFilter);
      }

      const url = `${API_CONFIG.endpoints.auditLogs.list}${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await apiGet<AuditLogsResponse>(url);

      // Extract data from response
      let logsData: AuditLog[] = [];
      let total = 1;
      let pages = 1;

      if (response.data) {
        // ApiResponse wraps the data, so access response.data.data
        const responseData: any = response.data.data || response.data;

        // Check for auditLogs property
        if (responseData?.auditLogs && Array.isArray(responseData.auditLogs)) {
          logsData = responseData.auditLogs;
          total = responseData.total || 0;
          pages = responseData.totalPages || 1;
        }
        // Fallback to other possible structures
        else if (Array.isArray(responseData)) {
          logsData = responseData;
        } else if (responseData && typeof responseData === "object") {
          if (Array.isArray(responseData.data)) {
            logsData = responseData.data;
          } else if (Array.isArray(responseData.logs)) {
            logsData = responseData.logs;
          }

          if (typeof responseData.total === "number") {
            total = responseData.total;
          }
          if (typeof responseData.totalPages === "number") {
            pages = responseData.totalPages;
          } else if (typeof responseData.limit === "number" && total > 0) {
            pages = Math.ceil(total / responseData.limit);
          }
        }
      }

      setLogs(logsData);
      setTotalPages(pages > 0 ? pages : 1);
    } catch (err) {
      const apiError = err as ApiError;
      showError(apiError.message || "Failed to load audit logs");
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, methodFilter, statusFilter]);

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAuditLogs();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Extract unique methods and status codes for filters
  const uniqueMethods = Array.from(new Set(logs.map((log) => log.method))).sort();
  const uniqueStatusCodes = Array.from(new Set(logs.map((log) => log.responseStatus)))
    .sort((a, b) => a - b)
    .map((code) => code.toString());

  // Calculate stats
  const totalLogs = logs.length;
  const successCount = logs.filter((log) => log.responseStatus >= 200 && log.responseStatus < 300).length;
  const errorCount = logs.filter((log) => log.responseStatus >= 400).length;
  const avgDuration = logs.length > 0
    ? Math.round(logs.reduce((sum, log) => sum + log.duration, 0) / logs.length)
    : 0;

  const hasActiveFilters = methodFilter || statusFilter || searchQuery;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg">
                  <FaFileAlt className="text-white" size={28} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
                  <p className="text-sm text-gray-500 mt-1">Monitor and track all system activities and API requests</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">Total Logs</p>
                    <p className="text-2xl font-bold text-blue-900">{totalLogs}</p>
                  </div>
                  <div className="bg-blue-200 p-3 rounded-lg">
                    <FaChartLine className="text-blue-600" size={20} />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">Successful</p>
                    <p className="text-2xl font-bold text-green-900">{successCount}</p>
                  </div>
                  <div className="bg-green-200 p-3 rounded-lg">
                    <FaCheckCircle className="text-green-600" size={20} />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600 mb-1">Errors</p>
                    <p className="text-2xl font-bold text-red-900">{errorCount}</p>
                  </div>
                  <div className="bg-red-200 p-3 rounded-lg">
                    <FaExclamationTriangle className="text-red-600" size={20} />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 mb-1">Avg Duration</p>
                    <p className="text-2xl font-bold text-purple-900">{avgDuration}ms</p>
                  </div>
                  <div className="bg-purple-200 p-3 rounded-lg">
                    <FaClock className="text-purple-600" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search by endpoint, method, IP address, or user ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <FaFilter className="text-gray-600" size={14} />
                <span className="text-sm font-semibold text-gray-700">Filters:</span>
              </div>
              <select
                value={methodFilter}
                onChange={(e) => {
                  setMethodFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-medium bg-white shadow-sm hover:shadow transition-all"
              >
                <option value="">All Methods</option>
                {uniqueMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-medium bg-white shadow-sm hover:shadow transition-all"
              >
                <option value="">All Status Codes</option>
                {uniqueStatusCodes.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setMethodFilter("");
                    setStatusFilter("");
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all flex items-center gap-2"
                >
                  <FaTimes size={12} />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <AuditLogsTable logs={logs} isLoading={isLoading} />
          </div>

          {/* Pagination */}
          {!isLoading && logs.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;

