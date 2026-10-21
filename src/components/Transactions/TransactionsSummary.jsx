import {
  FaRupeeSign,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaUndo,
  FaWallet,
} from "react-icons/fa";

const TransactionsSummary = ({
  filters,
  totalRevenue,
  transactionToday,
  successPayments,
  failedPayments,
  refunds,
  walletTop,
}) => {
  // Mock data - replace with actual API call
  const summaryData = {
    totalRevenue: {
      value: "₹1,247,892",
      change: "+12.5%",
      changeType: "positive",
    },
    transactionsToday: {
      value: "1,842",
      change: "+8.2%",
      changeType: "positive",
    },
    successfulPayments: {
      value: "892",
      change: "98.5%",
      changeType: "positive",
    },
    failedPayments: { value: "12", change: "1.2%", changeType: "negative" },
    refundsIssued: { value: "34", change: "2.8%", changeType: "neutral" },
    walletTopUps: { value: "567", change: "+15.3%", changeType: "positive" },
  };

  const cards = [
    {
      icon: FaRupeeSign,
      label: "Total Revenue",
      value: "₹" + totalRevenue,
      change: summaryData.totalRevenue.change,
      changeType: summaryData.totalRevenue.changeType,
      iconColor: "green",
    },
    {
      icon: FaCreditCard,
      label: "Transactions Today",
      value: "₹" + transactionToday,
      change: summaryData.transactionsToday.change,
      changeType: summaryData.transactionsToday.changeType,
      iconColor: "blue",
    },
    {
      icon: FaCheckCircle,
      label: "Successful Payments",
      value: successPayments,
      change: summaryData.successfulPayments.change,
      changeType: summaryData.successfulPayments.changeType,
      iconColor: "green",
    },
    {
      icon: FaTimesCircle,
      label: "Failed Payments",
      value: failedPayments,
      change: summaryData.failedPayments.change,
      changeType: summaryData.failedPayments.changeType,
      iconColor: "red",
    },
    {
      icon: FaUndo,
      label: "Refunds Issued",
      value: refunds,
      change: summaryData.refundsIssued.change,
      changeType: summaryData.refundsIssued.changeType,
      iconColor: "orange",
    },
    {
      icon: FaWallet,
      label: "Wallet Top-Ups",
      value: walletTop,
      change: summaryData.walletTopUps.change,
      changeType: summaryData.walletTopUps.changeType,
      iconColor: "purple",
    },
  ];

  const iconColors = {
    green: "text-[#10b981]",
    blue: "text-[#3b82f6]",
    red: "text-[#ef4444]",
    orange: "text-[#f97316]",
    purple: "text-[#8b5cf6]",
  };

  const changeColors = {
    positive: "text-[#10b981]",
    negative: "text-[#ef4444]",
    neutral: "text-[#8b8fa3]",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6 max-w-full overflow-x-hidden">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-4 hover:border-[#10b981]/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg bg-gray-50 dark:bg-[#1e2742] flex items-center justify-center ${
                  iconColors[card.iconColor]
                }`}
              >
                <Icon className="text-lg" />
              </div>
            </div>
            <div className="mb-1">
              <div className="text-gray-900 dark:text-white text-lg sm:text-xl font-bold truncate">
                {card.value}
              </div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mt-1 truncate">
                {card.label}
              </div>
            </div>
            <div
              className={`text-xs font-medium ${changeColors[card.changeType]}`}
            >
              {card.change}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionsSummary;
