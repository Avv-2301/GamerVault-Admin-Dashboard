import { useEffect, useState } from "react";
import {
  FaFileDownload,
  FaFilter,
  FaUsers,
  FaGamepad,
  FaRupeeSign,
  FaShoppingCart,
} from "react-icons/fa";
import Header from "../components/Dashboard/Header";
import TimeRangeSelector from "../components/ui/TimeRangeSelector";
import SalesReport from "../components/Reports/SalesReport";
import UserReport from "../components/Reports/UserReport";
import GameReport from "../components/Reports/GameReport";
import RevenueReport from "../components/Reports/RevenueReport";
import { getReport } from "../services/api/reports";
import { downloadReportCsv } from "../services/helper";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("sales");
  const [timeRange, setTimeRange] = useState("all");
  const [customDates, setCustomDates] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getReport(activeTab, timeRange, customDates, paymentMethod)
      .then((data) => { if (active) { setReport(data); setError(""); } })
      .catch((requestError) => {
        if (active) {
          setReport(null);
          setError(requestError?.response?.data?.meta?.message || requestError?.message || "Could not load report");
        }
      })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [activeTab, timeRange, customDates, paymentMethod]);

  const tabs = [
    { id: "sales", label: "Sales Report", icon: FaShoppingCart },
    { id: "revenue", label: "Revenue Report", icon: FaRupeeSign },
    { id: "users", label: "User Report", icon: FaUsers },
    { id: "games", label: "Game Report", icon: FaGamepad },
  ];

  const handleTimeRangeChange = (range, customDates) => {
    setIsLoading(true);
    setTimeRange(range);
    setCustomDates(customDates);
  };

  const handleExport = () => {
    if (report) downloadReportCsv(activeTab, report);
  };

  const renderReportContent = () => {
    switch (activeTab) {
      case "sales":
        return <SalesReport report={report} />;
      case "revenue":
        return <RevenueReport report={report} />;
      case "users":
        return <UserReport report={report} />;
      case "games":
        return <GameReport report={report} />;
      default:
        return <SalesReport report={report} />;
    }
  };

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] overflow-x-hidden max-w-full">
      <div className="p-6">
        <Header />

        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-gray-800 dark:text-white text-3xl font-bold mb-2">
                Reports & Analytics
              </h1>
              <p className="text-gray-600 dark:text-[#8b8fa3] text-sm">
                Comprehensive insights and analytics for your gaming platform
              </p>
            </div>
            <div className="flex items-center gap-3">
              {activeTab !== "users" && <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
              >
                <FaFilter className="text-sm" />
                <span className="text-sm">Filters</span>
              </button>}
              <button
                onClick={handleExport}
                disabled={!report || isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaFileDownload className="text-sm" />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex justify-start">
            <TimeRangeSelector
              onRangeChange={handleTimeRangeChange}
              defaultRange={timeRange}
            />
          </div>
          {showFilters && activeTab !== "users" && (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-[#1e2742] dark:bg-[#141b2d]">
              <label htmlFor="reportPaymentMethod" className="block text-sm font-medium text-gray-700 dark:text-[#e0e0e0] mb-2">Payment provider</label>
              <select
                id="reportPaymentMethod"
                value={paymentMethod}
                onChange={(event) => { setIsLoading(true); setPaymentMethod(event.target.value); }}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 dark:border-[#2a3441] dark:bg-[#1e2742] dark:text-white"
              >
                <option value="all">All payments</option>
                <option value="razorpay">Razorpay</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>
          )}
        </div>

        {/* Report Tabs */}
        <div className="mb-6">
          <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { if (tab.id !== activeTab) { setIsLoading(true); setActiveTab(tab.id); } }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-[#10b981] text-white shadow-sm"
                        : "text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]"
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="min-h-[600px]">
          {isLoading ? <p className="p-6 text-gray-500 dark:text-[#8b8fa3]">Loading report…</p>
            : error ? <p role="alert" className="p-6 text-red-500">{error}</p>
            : report ? renderReportContent() : null}
        </div>
      </div>
    </main>
  );
};

export default Reports;
