import { FaGamepad, FaTrophy, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import KPICard from "../Dashboard/KPICard";
import GamePerformanceChart from "./GamePerformanceChart";
import TopGamesTable from "./TopGamesTable";
import { formatReportCurrency, formatReportNumber } from "../../services/helper";

const GameReport = ({ report }) => {
  const summary = report.summary;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard icon={FaGamepad} label="Available Games" value={formatReportNumber(summary.totalGames)} iconColor="green" />
        <KPICard icon={FaShoppingCart} label="Games Sold" value={formatReportNumber(summary.unitsSold)} iconColor="purple" />
        <KPICard icon={FaTrophy} label="Most Sold Game" value={summary.mostSoldGame || "No sales"} iconColor="orange" />
        <KPICard icon={FaRupeeSign} label="Game Revenue" value={formatReportCurrency(summary.gameRevenue)} iconColor="green" />
      </div>
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-1">Most Sold Games</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-6">Completed purchases in the selected period</p>
        <GamePerformanceChart games={report.topGames} />
      </div>
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden">
        <h3 className="p-6 border-b border-gray-200 dark:border-[#1e2742] text-gray-800 dark:text-white text-lg font-semibold">Top Selling Games</h3>
        <TopGamesTable games={report.topGames} />
      </div>
    </div>
  );
};

export default GameReport;
