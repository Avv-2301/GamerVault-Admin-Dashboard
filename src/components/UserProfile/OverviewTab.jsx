import {
  FaShoppingCart,
  FaRupeeSign,
  FaGamepad,
  FaWallet,
  FaTimesCircle,
} from "react-icons/fa";
import KPICard from "../Dashboard/KPICard";
import { formatDate } from "../../services/helper";

const OverviewTab = ({ user }) => {
  const metrics = user?.metrics || {};

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-full overflow-x-hidden">
        <KPICard
          icon={FaShoppingCart}
          label="Total Purchases"
          value={String(metrics.totalPurchases ?? 0)}
          change="All time purchases"
          changeType="positive"
          iconColor="green"
        />
        <KPICard
          icon={FaRupeeSign}
          label="Total Spend"
          value={`₹${Number(metrics.totalSpend ?? 0).toLocaleString()}`}
          change="Lifetime spending"
          changeType="positive"
          iconColor="green"
        />
        <KPICard
          icon={FaGamepad}
          label="Games Owned"
          value={String(metrics.gamesOwned ?? 0)}
          change="Active game licenses"
          changeType="positive"
          iconColor="purple"
        />
        <KPICard
          icon={FaWallet}
          label="Wallet Balance"
          value={`₹${Number(metrics.walletBalance ?? user?.balance ?? 0).toLocaleString()}`}
          change="Available funds"
          changeType="positive"
          iconColor="green"
        />
        <KPICard
          icon={FaTimesCircle}
          label="Failed Transactions"
          value={String(metrics.failedTransactions ?? 0)}
          change="Payment failures"
          changeType={Number(metrics.failedTransactions) > 0 ? "negative" : "positive"}
          iconColor={Number(metrics.failedTransactions) > 0 ? "red" : "green"}
        />
        <KPICard
          icon={FaShoppingCart}
          label="Total Transactions"
          value={String(metrics.totalTransactions ?? 0)}
          change="All wallet activity"
          changeType="positive"
          iconColor="purple"
        />
      </div>

      {/* Account Summary */}
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-4">
          Account Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-2">
              Account Status
            </div>
            <div className="text-gray-800 dark:text-white text-sm font-medium">
              {{ "0": "Inactive", "1": "Active", "2": "Deleted", "3": "Banned" }[user?.status] || "Unknown"}
            </div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-2">
              Verification Status
            </div>
            <div className="text-gray-800 dark:text-white text-sm font-medium">
              {user?.verified === true ? "Verified" : "Not Verified"}
            </div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-2">
              Member Since
            </div>
            <div className="text-gray-800 dark:text-white text-sm">
              {formatDate(user?.createdAt)}
            </div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-[#8b8fa3] text-xs mb-2">
              Last Activity
            </div>
            <div className="text-gray-800 dark:text-white text-sm">
              {formatDate(user?.last_login)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
