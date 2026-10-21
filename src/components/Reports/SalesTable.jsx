import { formatReportCurrency, formatReportNumber } from "../../services/helper";

const SalesTable = ({ games = [] }) => (
  <div className="overflow-x-auto max-w-full">
    <table className="w-full border-collapse min-w-[500px]">
      <thead className="bg-gray-50 dark:bg-[#1e2742]"><tr>
        {['Game', 'Units Sold', 'Revenue', 'Average Sale'].map((heading) => (
          <th key={heading} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">{heading}</th>
        ))}
      </tr></thead>
      <tbody>
        {games.map((game) => (
          <tr key={game.id} className="border-b border-gray-200 dark:border-[#1e2742]">
            <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">{game.name}</td>
            <td className="px-6 py-4 text-gray-700 dark:text-[#e0e0e0]">{formatReportNumber(game.unitsSold)}</td>
            <td className="px-6 py-4 text-gray-800 dark:text-white font-semibold">{formatReportCurrency(game.revenue)}</td>
            <td className="px-6 py-4 text-gray-700 dark:text-[#e0e0e0]">{formatReportCurrency(game.unitsSold ? game.revenue / game.unitsSold : 0)}</td>
          </tr>
        ))}
        {!games.length && <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-500 dark:text-[#8b8fa3]">No completed game purchases in this period.</td></tr>}
      </tbody>
    </table>
  </div>
);

export default SalesTable;
