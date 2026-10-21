import { FaRupeeSign, FaShoppingCart, FaPercent } from "react-icons/fa";
import KPICard from "../Dashboard/KPICard";
import SalesChart from "./SalesChart";
import SalesTable from "./SalesTable";
import { formatReportCurrency, formatReportNumber } from "../../services/helper";

const SalesReport = ({ report }) => {
  const summary = report.summary;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard icon={FaRupeeSign} label="Total Sales" value={formatReportCurrency(summary.revenue)} iconColor="green" />
        <KPICard icon={FaShoppingCart} label="Completed Orders" value={formatReportNumber(summary.orders)} iconColor="purple" />
        <KPICard icon={FaRupeeSign} label="Average Order Value" value={formatReportCurrency(summary.averageOrderValue)} iconColor="orange" />
        <KPICard icon={FaPercent} label="Purchase Success Rate" value={summary.purchaseAttempts ? `${summary.purchaseSuccessRate.toFixed(1)}%` : "—"} iconColor="green" />
      </div>
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-1">Sales Overview</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-6">Completed game purchases over time</p>
        <SalesChart series={report.series} label="Sales" />
      </div>
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden">
        <h3 className="p-6 border-b border-gray-200 dark:border-[#1e2742] text-gray-800 dark:text-white text-lg font-semibold">Top Selling Games</h3>
        <SalesTable games={report.topGames} />
      </div>
    </div>
  );
};

export default SalesReport;
