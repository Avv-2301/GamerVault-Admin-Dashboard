import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
  FaClock,
  FaUndo,
  FaCreditCard,
  FaWallet,
  FaPaypal,
  FaUniversity,
  FaEye,
} from "react-icons/fa";
import { formatDate } from "../../services/helper";
import { userTransaction } from "../../services/api/users";

const TransactionsTab = ({ userId }) => {
  const [filters, setFilters] = useState({
    status: "all",
    paymentMethod: "all",
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserTransaction = async () => {
    setLoading(true);
    setError("");
    try {
      const filterParams = {};
      if (filters.status !== "all") {
        filterParams.status = filters.status;
      }
      if (filters.paymentMethod !== "all") {
        filterParams.paymentMethod = filters.paymentMethod;
      }
      const response = await userTransaction(userId, filterParams);
      if (response?.meta?.code === 200) {
        setTransaction(Array.isArray(response.data) ? response.data : []);
      } else setError(response?.meta?.message || "Could not load user transactions.");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserTransaction();
    }
  }, [userId, filters]);

  const getPaymentMethodIcon = (method) => {
    const icons = {
      card: FaCreditCard,
      wallet: FaWallet,
      paypal: FaPaypal,
      manual: FaUniversity,
    };
    return icons[method] || FaCreditCard;
  };

  const getStatusBadge = (status) => {
    const badges = {
      success: {
        icon: FaCheckCircle,
        bg: "bg-[rgba(16,185,129,0.2)]",
        text: "text-[#10b981]",
        label: "Success",
      },
      failed: {
        icon: FaTimesCircle,
        bg: "bg-[rgba(239,68,68,0.2)]",
        text: "text-[#ef4444]",
        label: "Failed",
      },
      pending: {
        icon: FaClock,
        bg: "bg-[rgba(249,115,22,0.2)]",
        text: "text-[#f97316]",
        label: "Pending",
      },
      refund: {
        icon: FaUndo,
        bg: "bg-[rgba(139,92,246,0.2)]",
        text: "text-[#8b5cf6]",
        label: "Refunded",
      },
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
      >
        <Icon className="text-xs" />
        {badge.label}
      </span>
    );
  };

  const getTransactionTypeBadge = (type) => {
    const transactionBadges = {
      deposit: {
        bg: "bg-[rgba(16,185,129,0.2)]",
        text: "text-[#10b981]",
        label: "Deposit",
      },
      withdrawal: {
        bg: "bg-[rgba(239,68,68,0.2)]",
        text: "text-[#ef4444]",
        label: "Withdrawal",
      },
      purchase: {
        bg: "bg-[rgba(239,68,68,0.2)]",
        text: "text-[#ef4444]",
        label: "Purchase",
      },
    };
    const badge = transactionBadges[type];

    if (!badge) return null;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
      >
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <label className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-2 block">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#10b981]"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
              <option value="refund">Refunded</option>
            </select>
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-2 block">
              Payment Method
            </label>
            <select
              value={filters.paymentMethod}
              onChange={(e) =>
                setFilters({ ...filters, paymentMethod: e.target.value })
              }
              className="w-full bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] text-gray-800 dark:text-[#e0e0e0] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#10b981]"
            >
              <option value="all">All Methods</option>
              <option value="card">Card</option>
              <option value="stripe">Stripe</option>
              <option value="wallet">Wallet</option>
              <option value="razorpay">Razorpay</option>
              <option value="manual">Manual</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden max-w-full">
        <div className="overflow-x-auto max-w-full">
          <table className="w-full border-collapse min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-[#1e2742] sticky top-0 z-10">
              <tr>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden md:table-cell">
                  Game
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden lg:table-cell">
                  Payment Method
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden sm:table-cell">
                  Date & Time
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-8 text-center text-gray-600 dark:text-[#8b8fa3]"
                  >
                    Loading transactions...
                  </td>
                </tr>
              ) : error ? (
                <tr><td colSpan="8" className="px-4 py-8 text-center text-red-500">{error}</td></tr>
              ) : transaction?.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-8 text-center text-gray-600 dark:text-[#8b8fa3]"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                transaction?.map((tx) => {
                  const PaymentIcon = getPaymentMethodIcon(tx.paymentMethod);
                  return (
                    <tr
                      key={tx._id}
                      className="border-b border-gray-200 dark:border-[#1e2742] hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors cursor-pointer"
                      onClick={() => setSelectedTransaction(tx)}
                    >
                      <td className="px-2 sm:px-4 py-3 sm:py-4">
                        <code className="text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm truncate block max-w-[100px] sm:max-w-none">
                          {tx.orderId}
                        </code>
                      </td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm">
                        {getTransactionTypeBadge(tx.transactionType ?? "-")}
                      </td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-gray-800 dark:text-white font-medium text-xs sm:text-sm">
                        &#8377;{Number(tx.amount || 0).toFixed(2)}
                      </td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm hidden md:table-cell">
                        {tx.game ? tx.game.name : "-"}
                      </td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <PaymentIcon className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm" />
                          <span className="text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm capitalize">
                            {tx.paymentMethod}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4 text-gray-700 dark:text-[#e0e0e0] text-xs sm:text-sm hidden sm:table-cell">
                        {formatDate(tx.createdAt)}
                      </td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4">{getStatusBadge(tx.status)}</td>
                      <td className="px-2 sm:px-4 py-3 sm:py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTransaction(tx);
                          }}
                          className="text-gray-500 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white transition-colors"
                          title="View details"
                        >
                          <FaEye className="text-xs sm:text-sm" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Detail Drawer */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedTransaction(null)}
          />
          <div
            className="relative bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-t-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-50 dark:bg-[#1e2742] border-b border-gray-200 dark:border-[#2a3441] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-gray-800 dark:text-white text-base sm:text-lg font-semibold truncate">
                  Transaction Details
                </h3>
                <p className="text-gray-600 dark:text-[#8b8fa3] text-xs sm:text-sm truncate">
                  {selectedTransaction.orderId}
                </p>
              </div>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="text-gray-500 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0 ml-2"
              >
                <FaTimes className="text-lg sm:text-xl" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">
                    Amount
                  </div>
                  <div className="text-gray-800 dark:text-white font-semibold">
                  &#8377;{Number(selectedTransaction.amount || 0).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">
                    Status
                  </div>
                  <div>{getStatusBadge(selectedTransaction.status)}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">
                    Type
                  </div>
                  <div className="text-gray-800 dark:text-white text-sm">
                    {getTransactionTypeBadge(
                      selectedTransaction.transactionType
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">
                    Payment Method
                  </div>
                  <div className="text-gray-800 dark:text-white text-sm capitalize">
                    {selectedTransaction.paymentMethod}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">
                    Date & Time
                  </div>
                  <div className="text-gray-800 dark:text-white text-sm">
                    {formatDate(selectedTransaction.createdAt)}
                  </div>
                </div>
                {selectedTransaction.game && (
                  <div>
                    <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-1">
                      Game
                    </div>
                    <div className="text-gray-800 dark:text-white text-sm">
                      {selectedTransaction.game.name}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsTab;
