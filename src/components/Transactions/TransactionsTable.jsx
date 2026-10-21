import { getUserInitials } from '../../services/helper.js'
import Pagination from "../Common/Pagination";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaUser,
  FaUndo,
  FaEllipsisV,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCreditCard,
  FaPaypal,
  FaWallet,
  FaUniversity,
} from "react-icons/fa";
import { formatDate } from "../../services/helper";

const TransactionsTable = ({
  filters,
  selectedTransactions,
  onSelectionChange,
  onViewDetails,
  onBulkAction,
  transactions = [],
  loading = false,
  pagination = {},
  onPageChange,
  onItemsPerPageChange,
}) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const actionMenuRef = useRef(null);

  // Use pagination values directly from backend - no frontend calculations
  const currentPage = pagination?.currentPage ?? 1;
  const itemsPerPage = pagination?.itemsPerPage ?? 10;
  const totalPages = pagination?.totalPages ?? 1;
  const totalItems = pagination?.totalItems ?? 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setActionMenuOpen(null);
      }
    };

    if (actionMenuOpen !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionMenuOpen]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(transactions.map((tx) => tx._id || tx.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectTransaction = (txId) => {
    if (selectedTransactions.includes(txId)) {
      onSelectionChange(selectedTransactions.filter((id) => id !== txId));
    } else {
      onSelectionChange([...selectedTransactions, txId]);
    }
  };

  const handleAction = (action, transaction) => {
    console.log(transaction);
    setActionMenuOpen(null);
    if (action === "view") {
      onViewDetails(transaction);
    } else if (action === "user") {
      const userId = transaction.userId?._id;
      if (userId) {
        navigate(`/dashboard/users/${userId}`);
      }
    } else {
      // TODO: Implement other actions
      console.log(
        "Action:",
        action,
        "Transaction:",
        transaction._id || transaction.id
      );
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case "card":
        return FaCreditCard;
      case "paypal":
        return FaPaypal;
      case "wallet":
        return FaWallet;
      case "bank":
      case "manual":
        return FaUniversity;
      default:
        return FaCreditCard;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      success: "bg-[rgba(16,185,129,0.2)] text-[#10b981]",
      failed: "bg-[rgba(239,68,68,0.2)] text-[#ef4444]",
      pending: "bg-[rgba(249,115,22,0.2)] text-[#f97316]",
      refunded: "bg-[rgba(139,92,246,0.2)] text-[#8b5cf6]",
      refund: "bg-[rgba(139,92,246,0.2)] text-[#8b5cf6]",
    };
    const icons = {
      success: FaCheckCircle,
      failed: FaTimesCircle,
      pending: FaClock,
      refunded: FaUndo,
      refund: FaUndo,
    };
    const Icon = icons[status] || FaCheckCircle;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
          styles[status] || styles.success
        }`}
      >
        <Icon className="text-xs" />
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "Unknown"}
      </span>
    );
  };

  const getTransactionTypeBadge = (type) => {
    const badges = {
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
    const badge = badges[type?.toLowerCase()];
    if (!badge) return null;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
      >
        {badge.label}
      </span>
    );
  };


  // Handle page change
  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field)
      return (
        <FaSort className="inline ml-1 text-gray-500 dark:text-[#8b8fa3]" />
      );
    return sortDirection === "asc" ? (
      <FaSortUp className="inline ml-1 text-[#10b981]" />
    ) : (
      <FaSortDown className="inline ml-1 text-[#10b981]" />
    );
  };

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden max-w-full">
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="bg-gray-50 dark:bg-[#1e2742] sticky top-0 z-10">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedTransactions.length === transactions.length &&
                    transactions.length > 0
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                />
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                User
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Type
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden md:table-cell">
                Payment Method
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden lg:table-cell">
                Game
              </th>
              <th
                className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => handleSort("amount")}
              >
                Amount {getSortIcon("amount")}
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Status
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden sm:table-cell">
                Date & Time
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#1e2742]">
            {loading ? (
              <tr>
                <td
                  colSpan="10"
                  className="px-4 py-8 text-center text-gray-600 dark:text-[#8b8fa3]"
                >
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="px-4 py-8 text-center text-gray-600 dark:text-[#8b8fa3]"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => {
                const transactionId = transaction._id || transaction.id;
                const PaymentIcon = getPaymentMethodIcon(
                  transaction.paymentMethod
                );
                const user = transaction.userId || {};
                return (
                  <tr
                    key={transactionId}
                    className={`hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors cursor-pointer ${
                      selectedTransactions.includes(transactionId)
                        ? "bg-[rgba(16,185,129,0.1)]"
                        : ""
                    }`}
                    onClick={() => onViewDetails(transaction)}
                  >
                    <td
                      className="px-2 sm:px-4 py-3 sm:py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTransactions.includes(transactionId)}
                        onChange={() => handleSelectTransaction(transactionId)}
                        className="w-4 h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4">
                      <span className="text-gray-800 dark:text-white font-mono text-xs sm:text-sm truncate block max-w-[120px] sm:max-w-none">
                        {transaction.orderId || transactionId}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
                          {user?.profile?.profilePhoto ? (
                            <img
                              src={user?.profile?.profilePhoto}
                              alt={user?.name || "User"}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-200 dark:border-[#1e2742]"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-semibold text-xs ${
                              user?.profile?.profilePhoto
                                ? "hidden absolute inset-0"
                                : ""
                            }`}
                          >
                            {getUserInitials(user)}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-gray-800 dark:text-white font-medium text-xs sm:text-sm truncate">
                            {user?.name?.toUpperCase()}
                          </div>
                          {user.email && (
                            <div className="text-gray-500 dark:text-[#8b8fa3] text-xs truncate hidden sm:block">
                              {user.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4">
                      {getTransactionTypeBadge(transaction.transactionType)}
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <PaymentIcon className="text-gray-500 dark:text-[#8b8fa3] text-xs sm:text-sm" />
                        <span className="text-gray-600 dark:text-[#8b8fa3] text-xs capitalize">
                          {transaction.paymentMethod || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 hidden lg:table-cell">
                      {transaction.game ? (
                        <span className="text-gray-800 dark:text-white text-xs sm:text-sm truncate block">
                          {transaction.game.name}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-[#6b7280] text-xs">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 text-right">
                      <span className="text-gray-800 dark:text-white font-semibold text-xs sm:text-sm">
                        &#8377;{transaction.amount?.toFixed(2) || "0.00"}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">
                      <div className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                        <div>{formatDate(transaction.createdAt)}</div>
                      </div>
                    </td>
                    <td
                      className="px-2 sm:px-4 py-3 sm:py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <button
                          onClick={() => handleAction("user", transaction)}
                          className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#10b981] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                          title="View User Profile"
                        >
                          <FaUser className="text-xs sm:text-sm" />
                        </button>
                        {transaction.status === "success" &&
                          transaction.transactionType?.toLowerCase() ===
                            "deposit" && (
                            <button
                              onClick={() =>
                                handleAction("refund", transaction)
                              }
                              className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#f97316] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                              title="Issue Refund"
                            >
                              <FaUndo className="text-xs sm:text-sm" />
                            </button>
                          )}
                        <div className="relative" ref={actionMenuRef}>
                          <button
                            onClick={() =>
                              setActionMenuOpen(
                                actionMenuOpen === transactionId
                                  ? null
                                  : transactionId
                              )
                            }
                            className="p-1.5 sm:p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                            title="More actions"
                          >
                            <FaEllipsisV className="text-xs sm:text-sm" />
                          </button>
                          {actionMenuOpen === transactionId && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-lg overflow-hidden z-50">
                              <button
                                onClick={() =>
                                  handleAction("export", transaction)
                                }
                                className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-800 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-sm"
                              >
                                Export
                              </button>
                              <button
                                onClick={() =>
                                  handleAction("duplicate", transaction)
                                }
                                className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-800 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-sm"
                              >
                                Duplicate
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} itemsPerPage={itemsPerPage} itemLabel="transactions" onPageChange={handlePageChange} onItemsPerPageChange={(size) => { handleItemsPerPageChange(size); handlePageChange(1); }} disabled={loading} />
    </div>
  );
};

export default TransactionsTable;
