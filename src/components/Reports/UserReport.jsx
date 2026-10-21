import { FaUsers, FaUserPlus, FaUserCheck, FaCheckCircle } from "react-icons/fa";
import KPICard from "../Dashboard/KPICard";
import UserGrowthChart from "./UserGrowthChart";
import UserActivityTable from "./UserActivityTable";
import { formatReportNumber } from "../../services/helper";

const UserReport = ({ report }) => {
  const summary = report.summary;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard icon={FaUsers} label="Total Users" value={formatReportNumber(summary.totalUsers)} iconColor="purple" />
        <KPICard icon={FaUserPlus} label="New Users" value={formatReportNumber(summary.newUsers)} iconColor="green" />
        <KPICard icon={FaUserCheck} label="Users with Recent Login" value={formatReportNumber(summary.activeUsers)} iconColor="orange" />
        <KPICard icon={FaCheckCircle} label="Verified Users" value={formatReportNumber(summary.verifiedUsers)} iconColor="green" />
      </div>
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl p-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-1">User Growth</h3>
        <p className="text-gray-600 dark:text-[#8b8fa3] text-sm mb-6">Registrations and most recent logins by period</p>
        <UserGrowthChart series={report.series} />
      </div>
      <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden">
        <h3 className="p-6 border-b border-gray-200 dark:border-[#1e2742] text-gray-800 dark:text-white text-lg font-semibold">User Activity Overview</h3>
        <UserActivityTable summary={summary} />
      </div>
    </div>
  );
};

export default UserReport;
