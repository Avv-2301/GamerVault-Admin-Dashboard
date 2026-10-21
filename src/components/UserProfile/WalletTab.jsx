import { useEffect, useState } from "react";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaGift,
  FaExclamationTriangle,
} from "react-icons/fa";
import KPICard from "../Dashboard/KPICard";
import AddWalletModal from "../Modals/AddWalletModal";
import ManualDeductionModal from "../Modals/ManualDeductionModal";
import BonusModal from "../Modals/BonusModal";
import { addBalanceToUser, deductBalanceToUser } from "../../services/api/transactions";
import { getUserWallet } from "../../services/api/users";

const WalletTab = ({ userId, user, handleRefresh, refresh }) => {
  const [isAddWalletModalOpen, setIsAddWalletModalOpen] = useState(false);
  const [isDeductionModalOpen, setIsDeductionModalOpen] = useState(false);
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const [walletLoading, setWalletLoading] = useState(true);
  const [walletError, setWalletError] = useState("");

  useEffect(() => {
    let active = true;
    setWalletLoading(true);
    setWalletError("");
    getUserWallet(userId).then((response) => {
      if (!active) return;
      if (response?.meta?.code === 200) setWalletData(response.data);
      else setWalletError(response?.meta?.message || "Could not load wallet details.");
    }).finally(() => { if (active) setWalletLoading(false); });
    return () => { active = false; };
  }, [userId, refresh]);

  const handleAddWalletBalance = async (walletData) => {
    const { amount, confirmAmount, adminPassword, reason } = walletData;
    const response = await addBalanceToUser(userId, amount, confirmAmount, adminPassword, reason);
    if (response?.meta?.code === 200) {
      setIsAddWalletModalOpen(false);
      handleRefresh();
    }
  };

  const handleDeductionConfirm = async (deductionFormData) => {
    const { amount, confirmAmount, adminPassword, reason } = deductionFormData;
    const response = await deductBalanceToUser(userId, amount, confirmAmount, adminPassword, reason);
    if (response?.meta?.code === 200) {
      setIsDeductionModalOpen(false);
      handleRefresh();
    }
  };

  const handleBonusConfirm = async (bonusFormData) => {
    const response = await addBalanceToUser(userId, bonusFormData.amount, bonusFormData.amount, bonusFormData.adminPassword, `${bonusFormData.reason}${bonusFormData.note ? `: ${bonusFormData.note}` : ""}`);
    if (response?.meta?.code === 200) {
      setIsBonusModalOpen(false);
      handleRefresh();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Wallet Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-full overflow-x-hidden">
        <KPICard
          icon={FaWallet}
          label="Current Balance"
          value={`₹${Number(user?.balance ?? 0).toLocaleString()}`}
          change="Available funds"
          changeType="positive"
          iconColor="green"
        />
        <KPICard
          icon={FaArrowUp}
          label="Lifetime Deposits"
          value={`₹${Number(walletData?.lifetimeDeposits ?? user?.metrics?.lifetimeDeposits ?? 0).toLocaleString()}`}
          change="Lifetime deposits"
          changeType="positive"
          iconColor="green"
        />
        <KPICard
          icon={FaArrowDown}
          label="Lifetime Spends"
          value={`₹${Number(walletData?.lifetimeSpends ?? user?.metrics?.lifetimeSpends ?? 0).toLocaleString()}`}
          change="Lifetime spends"
          changeType="positive"
          iconColor="purple"
        />
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-[#1e2742] dark:bg-[#141b2d]">
        <div className="border-b border-gray-200 px-5 py-4 dark:border-[#1e2742]"><h3 className="font-semibold text-gray-800 dark:text-white">Recent Wallet Transactions</h3></div>
        {walletLoading ? <p className="p-5 text-sm text-gray-500 dark:text-[#8b8fa3]">Loading wallet transactions…</p> : walletError ? <p className="p-5 text-sm text-red-500" role="alert">{walletError}</p> : (walletData?.transactions || []).length === 0 ? <p className="p-5 text-sm text-gray-500 dark:text-[#8b8fa3]">No wallet transactions found.</p> : <div className="divide-y divide-gray-200 dark:divide-[#1e2742]">{walletData.transactions.map((transaction) => { const isSpend = ["withdrawal", "purchase"].includes(transaction.transactionType); return <div key={transaction._id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"><div><div className="text-sm font-medium text-gray-800 dark:text-white">{transaction.reason || transaction.spentType || transaction.transactionType}</div><div className="text-xs text-gray-500 dark:text-[#8b8fa3]">{transaction.orderId || "—"} · {transaction.status} · {transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : ""}</div></div><strong className={`text-sm ${isSpend ? "text-red-500" : "text-emerald-500"}`}>{isSpend ? "−" : "+"}₹{Number(transaction.amount || 0).toFixed(2)}</strong></div>; })}</div>}
      </section>

      {/* Admin Wallet Actions */}
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-4">
          Admin Wallet Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <button
            onClick={() => setIsAddWalletModalOpen(true)}
            className="flex flex-col items-center gap-2 sm:gap-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-4 sm:p-6 hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[rgba(16,185,129,0.2)] flex items-center justify-center">
              <FaArrowUp className="text-[#10b981] text-lg sm:text-xl" />
            </div>
            <div className="text-center">
              <div className="text-gray-800 dark:text-white font-medium mb-1 text-sm">
                Manual Deposit
              </div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">
                Add funds to wallet
              </div>
            </div>
          </button>

          <button
            onClick={() => setIsDeductionModalOpen(true)}
            className="flex flex-col items-center gap-2 sm:gap-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-4 sm:p-6 hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[rgba(239,68,68,0.2)] flex items-center justify-center">
              <FaArrowDown className="text-[#ef4444] text-lg sm:text-xl" />
            </div>
            <div className="text-center">
              <div className="text-gray-800 dark:text-white font-medium mb-1 text-sm">
                Manual Deduction
              </div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">
                Remove funds from wallet
              </div>
            </div>
          </button>

          <button
            onClick={() => setIsBonusModalOpen(true)}
            className="flex flex-col items-center gap-2 sm:gap-3 bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-4 sm:p-6 hover:bg-gray-100 dark:hover:bg-[#2a3441] transition-colors"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[rgba(139,92,246,0.2)] flex items-center justify-center">
              <FaGift className="text-[#8b5cf6] text-lg sm:text-xl" />
            </div>
            <div className="text-center">
              <div className="text-gray-800 dark:text-white font-medium mb-1 text-sm">
                Bonus Credit
              </div>
              <div className="text-gray-600 dark:text-[#8b8fa3] text-xs">
                Grant promotional credit
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Security Warning */}
      <div className="bg-white dark:bg-[#141b2d] border border-[#f97316] rounded-xl p-4">
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="text-[#f97316] text-lg flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-gray-800 dark:text-white font-medium mb-1">
              Security Notice
            </div>
            <div className="text-gray-600 dark:text-[#8b8fa3] text-sm">
              All wallet actions are logged and require admin authentication.
              Financial operations are audited automatically.
            </div>
          </div>
        </div>
      </div>

      {/* Add Wallet Balance Modal */}
      <AddWalletModal
        isOpen={isAddWalletModalOpen}
        onClose={() => setIsAddWalletModalOpen(false)}
        user={user}
        onConfirm={handleAddWalletBalance}
      />

      {/* Manual Deduction Modal */}
      <ManualDeductionModal
        isOpen={isDeductionModalOpen}
        onClose={() => setIsDeductionModalOpen(false)}
        user={user}
        onConfirm={handleDeductionConfirm}
      />

      {/* Bonus Credit Modal */}
      <BonusModal
        isOpen={isBonusModalOpen}
        onClose={() => setIsBonusModalOpen(false)}
        user={user}
        onConfirm={handleBonusConfirm}
      />
    </div>
  );
};

export default WalletTab;
