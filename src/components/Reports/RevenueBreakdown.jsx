import { FaCreditCard } from "react-icons/fa";
import { formatReportCurrency, formatReportNumber } from "../../services/helper";

const RevenueBreakdown = ({ methods = [], total = 0 }) => {
  const attributed = methods.reduce((sum, method) => sum + method.amount, 0);
  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
      <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-6">Revenue by Payment Provider</h3>
      <div className="space-y-5">
        {methods.map((item) => {
          const percentage = attributed ? item.amount / attributed * 100 : 0;
          return (
            <div key={item.method} className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1e2742] flex items-center justify-center"><FaCreditCard className="text-gray-600 dark:text-[#8b8fa3]" /></div>
                  <div>
                    <div className="text-gray-800 dark:text-white font-medium capitalize">{item.method}</div>
                    <div className="text-gray-600 dark:text-[#8b8fa3] text-sm">{formatReportNumber(item.orders)} purchases · {percentage.toFixed(1)}% of provider-tagged revenue</div>
                  </div>
                </div>
                <div className="text-gray-800 dark:text-white font-semibold">{formatReportCurrency(item.amount)}</div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#1e2742] rounded-full h-2"><div className="bg-[#10b981] h-2 rounded-full" style={{ width: `${percentage}%` }} /></div>
            </div>
          );
        })}
      </div>
      {total > attributed && <p className="mt-5 text-xs text-gray-500 dark:text-[#8b8fa3]">Some recorded purchases do not identify Razorpay or Stripe, so they are included in total revenue but excluded from this breakdown.</p>}
    </div>
  );
};

export default RevenueBreakdown;
