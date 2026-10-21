import { useState, useEffect } from "react";
import { FaDownload, FaChartLine, FaSyncAlt } from "react-icons/fa";
import Header from "../components/Dashboard/Header";
import TimeRangeSelector from "../components/ui/TimeRangeSelector";
import TransactionsSummary from "../components/Transactions/TransactionsSummary";
import TransactionsFilters from "../components/Transactions/TransactionsFilters";
import TransactionsTable from "../components/Transactions/TransactionsTable";
import { transactions } from "../services/api/transactions";
import { buildTransactionApiFilters } from "../services/helper";

const Transactions = () => {
  const [filters, setFilters] = useState({
    search: "",
    dateRange: "all",
    spentType: "all",
    transactionType: "all",
    status: "all",
    paymentMethod: "all",
    amountRange: { min: "", max: "" },
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("all");
  const [transactionData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
    totalItems: 0,
  });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [transactionToday, setTransactionToday] = useState(0);
  const [successPayments, setSuccessPayments] = useState(0);
  const [failedPayments, setFailedPayments] = useState(0);
  const [refunds, setRefunds] = useState(0);
  const [walletTop, setWalletTopUp] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiFilters = buildTransactionApiFilters(pagination, filters);
      const response = await transactions(apiFilters);

      if (response?.meta?.code === 200) {
        const data = response?.data;
        
        // Use only backend transactions - no frontend merging
        setTransactionsData(data?.transactions || []);
        
        setTotalRevenue(data?.totalRevenue);
        setTransactionToday(data?.todayTransaction);
        setSuccessPayments(data?.successPayments);
        setFailedPayments(data?.failedPayments);
        setRefunds(data?.refunds);
        setWalletTopUp(data?.topUps);

        // Update pagination from API response - preserve currentPage from state, update totals from backend
        if (data?.pagination) {
          const totalItems = data.pagination.totalDocuments || 0;
          const currentItemsPerPage = pagination.itemsPerPage || 10;
          // Calculate totalPages if not provided by backend
          const calculatedTotalPages = data.pagination.totalPages !== null && data.pagination.totalPages !== undefined
            ? data.pagination.totalPages
            : (totalItems > 0 ? Math.ceil(totalItems / currentItemsPerPage) : 1);
          
          // Preserve currentPage from state (set by user clicking pagination), only update totals from backend
          setPagination((prev) => ({
            currentPage: prev.currentPage || 1, // Keep the current page from state
            itemsPerPage: currentItemsPerPage,
            totalPages: calculatedTotalPages,
            totalItems: totalItems,
          }));
        } else if (data?.transactions) {
          // Fallback: if no pagination object, calculate from data
          const totalItems = data.transactions.length;
          const currentItemsPerPage = pagination.itemsPerPage || 10;
          const calculatedTotalPages = totalItems > 0 ? Math.ceil(totalItems / currentItemsPerPage) : 1;
          
          setPagination((prev) => ({
            ...prev,
            totalPages: calculatedTotalPages,
            totalItems: totalItems,
          }));
        }
      }
    } catch (error) {
      console.log(error);
      setTransactionsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [
    filters.search,
    filters.dateRange,
    filters.spentType,
    filters.transactionType,
    filters.status,
    filters.paymentMethod,
    filters.amountRange.min,
    filters.amountRange.max,
  ]);

  useEffect(() => {
    fetchData();
  }, [filters, pagination.currentPage, pagination.itemsPerPage]);

  // Sync activeTab with filters.status
  useEffect(() => {
    setActiveTab(filters.status);
  }, [filters.status]);

  const handleTabChange = (status) => {
    setActiveTab(status);
    setFilters((prev) => ({ ...prev, status }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (itemsPerPage) => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage,
      currentPage: 1,
    }));
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export transactions");
  };

  const handleViewReports = () => {
    // TODO: Navigate to reports page
    console.log("View reports");
  };

  const handleViewDetails = (transaction) => {
    // TODO: Implement view details functionality
    console.log("View details:", transaction);
  };

  const handleBulkAction = (action) => {
    // TODO: Implement bulk actions
    console.log("Bulk action:", action, selectedTransactions);
  };

  const handleTimeRangeChange = (range, customDates) => {
    setTimeRange(range);
    console.log("Time range changed:", range, customDates);
    // TODO: Implement time range filtering
  };

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] overflow-x-hidden max-w-full">
      <Header />

      {/* Time Range Selector */}
      <div className="mb-4 sm:mb-6 flex justify-start">
        <TimeRangeSelector
          onRangeChange={handleTimeRangeChange}
          defaultRange={timeRange}
        />
      </div>

      {/* Page Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-2">
              Transactions
            </h1>
            <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm">
              Overview of all user payments, wallet activity, refunds, and
              failures
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              aria-label="Refresh transactions"
              title="Refresh transactions"
              className="group flex items-center gap-2 rounded-xl border border-emerald-400/60 bg-[#10b981] px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_5px_16px_rgba(16,185,129,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#059669] hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0e27] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-65 flex-shrink-0"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
                <FaSyncAlt className={loading ? "animate-spin" : "transition-transform duration-500 group-hover:rotate-180"} />
              </span>
              <span>Refresh</span>
            </button>

            {/* View Reports Button */}
            <button
              onClick={handleViewReports}
              className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors flex-shrink-0"
            >
              <FaChartLine className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">View Reports</span>
              <span className="sm:hidden">Reports</span>
            </button>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors flex-shrink-0"
            >
              <FaDownload className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">Export Transactions</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <TransactionsSummary
          filters={filters}
          totalRevenue={totalRevenue}
          transactionToday={transactionToday}
          successPayments={successPayments}
          failedPayments={failedPayments}
          refunds={refunds}
          walletTop={walletTop}
        />

        {/* Status Tabs */}
        <div className="mt-4 sm:mt-6">
          <div className="flex items-center gap-1 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-1 overflow-x-auto max-w-full">
            <button
              onClick={() => handleTabChange("all")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-[#10b981] text-white shadow-sm"
                  : "text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleTabChange("success")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === "success"
                  ? "bg-[#10b981] text-white shadow-sm"
                  : "text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]"
              }`}
            >
              Success
            </button>
            <button
              onClick={() => handleTabChange("pending")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === "pending"
                  ? "bg-[#10b981] text-white shadow-sm"
                  : "text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => handleTabChange("refund")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === "refunded"
                  ? "bg-[#10b981] text-white shadow-sm"
                  : "text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]"
              }`}
            >
              Refunded
            </button>
            <button
              onClick={() => handleTabChange("failed")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === "failed"
                  ? "bg-[#10b981] text-white shadow-sm"
                  : "text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]"
              }`}
            >
              Failed
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mt-4 sm:mt-6">
          <TransactionsFilters
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
          />
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionsTable
        filters={filters}
        selectedTransactions={selectedTransactions}
        onSelectionChange={setSelectedTransactions}
        onViewDetails={handleViewDetails}
        transactions={transactionData}
        onBulkAction={handleBulkAction}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </main>
  );
};

export default Transactions;
