import { FaRupeeSign, FaShoppingCart, FaCreditCard } from "react-icons/fa";
import KPICard from "../Dashboard/KPICard";
import SalesChart from "./SalesChart";
import RevenueBreakdown from "./RevenueBreakdown";
import { formatReportCurrency, formatReportNumber } from "../../services/helper";

const RevenueReport = ({ report }) => {
  const summary = report.summary;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard icon={FaRupeeSign} label="Captured Payments" value={formatReportCurrency(summary.revenue)} iconColor="green" />
        <KPICard icon={FaShoppingCart} label="Successful Payments" value={formatReportNumber(summary.orders)} iconColor="purple" />
        <KPICard icon={FaRupeeSign} label="Average Payment" value={formatReportCurrency(summary.averageOrderValue)} iconColor="orange" />
        <KPICard icon={FaCreditCard} label="Payment Providers" value="Razorpay & Stripe" iconColor="green" />
      </div>
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-1">Revenue Trends</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-6">Successful Razorpay and Stripe deposits over time</p>
        <SalesChart series={report.series} label="Payments" emptyMessage="No successful payments in this period." />
      </div>
      <RevenueBreakdown methods={report.paymentMethods} total={summary.revenue} />
    </div>
  );
};

export default RevenueReport;
