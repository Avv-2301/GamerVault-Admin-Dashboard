import { formatReportNumber } from "../../services/helper";

const UserActivityTable = ({ summary }) => {
  const rows = [
    ["Total registered users", summary.totalUsers],
    ["New users in selected period", summary.newUsers],
    ["Users whose latest login is in period", summary.activeUsers],
    ["Users verified in selected period", summary.verifiedUsers],
  ];
  return (
    <div className="overflow-x-auto max-w-full">
      <table className="w-full border-collapse min-w-[420px]">
        <thead className="bg-gray-50 dark:bg-[#1e2742]"><tr>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">Metric</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase">Value</th>
        </tr></thead>
        <tbody>{rows.map(([label, value]) => (
          <tr key={label} className="border-b border-gray-200 dark:border-[#1e2742]">
            <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">{label}</td>
            <td className="px-6 py-4 text-gray-800 dark:text-white font-semibold">{formatReportNumber(value)}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
};

export default UserActivityTable;
