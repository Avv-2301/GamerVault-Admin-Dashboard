import { useEffect, useState } from "react";
import { FaGamepad, FaCheckCircle, FaTimesCircle, FaShoppingCart, FaGift, FaUserShield } from "react-icons/fa";
import { formatDateOnly as formatDate, getGameSourceLabel as getSourceLabel } from "../../services/helper.js";
import { getUserGames } from "../../services/api/users";

const sourceIcons = { purchase: FaShoppingCart, free: FaGift, admin: FaUserShield };

export default function GamesOwnedTab({ userId }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    getUserGames(userId).then((response) => {
      if (!active) return;
      if (response?.meta?.code === 200) setGames(Array.isArray(response.data) ? response.data : []);
      else setError(response?.meta?.message || "Could not load this user’s games.");
    }).catch((requestError) => {
      if (active) setError(requestError.message || "Could not load this user’s games.");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [userId]);

  if (loading) return <div className="rounded-xl border border-gray-200 dark:border-[#1e2742] bg-white dark:bg-[#141b2d] p-10 text-center text-gray-600 dark:text-[#8b8fa3]">Loading owned games…</div>;
  if (error) return <div className="rounded-xl border border-red-300 bg-white dark:bg-[#141b2d] p-6 text-sm text-red-600" role="alert">{error}</div>;
  if (games.length === 0) return (
    <div className="rounded-xl border border-gray-200 dark:border-[#1e2742] bg-white dark:bg-[#141b2d] p-12 text-center">
      <FaGamepad className="mx-auto mb-4 text-4xl text-gray-400 dark:text-[#8b8fa3]" />
      <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">No Games Owned</h3>
      <p className="text-sm text-gray-600 dark:text-[#8b8fa3]">This user has no games in their library.</p>
    </div>
  );

  return (
    <div className="max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-[#1e2742] dark:bg-[#141b2d]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-[#1e2742]"><tr>
            {["Game", "Purchase Date", "Price Paid", "Discount", "Source", "Status"].map((heading) => <th key={heading} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-[#8b8fa3]">{heading}</th>)}
          </tr></thead>
          <tbody>{games.map((game) => {
            const SourceIcon = sourceIcons[game.source] || FaGamepad;
            const active = game.status === "active";
            return <tr key={game.id} className="border-b border-gray-200 hover:bg-gray-50 dark:border-[#1e2742] dark:hover:bg-[#1e2742]">
              <td className="px-3 py-3"><div className="flex items-center gap-3"><div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-[#1e2742]">{game.thumbnail && <img src={game.thumbnail} alt="" className="h-full w-full object-cover" />}</div><div className="min-w-0"><div className="truncate text-sm font-medium text-gray-800 dark:text-white">{game.name}</div><div className="text-xs text-gray-500 dark:text-[#8b8fa3]">ID: {game.id}</div></div></div></td>
              <td className="px-3 py-3 text-sm text-gray-700 dark:text-[#e0e0e0]">{formatDate(game.purchaseDate)}</td>
              <td className="px-3 py-3 text-sm text-gray-700 dark:text-[#e0e0e0]">{Number(game.pricePaid) > 0 ? `₹${Number(game.pricePaid).toFixed(2)}` : "Free / not recorded"}</td>
              <td className="px-3 py-3 text-sm text-gray-700 dark:text-[#e0e0e0]">{Number(game.discountApplied) > 0 ? `₹${Number(game.discountApplied).toFixed(2)}` : "—"}</td>
              <td className="px-3 py-3"><span className="inline-flex items-center gap-2 text-sm capitalize text-gray-700 dark:text-[#e0e0e0]"><SourceIcon />{getSourceLabel(game.source)}</span></td>
              <td className="px-3 py-3">{active ? <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(16,185,129,0.2)] px-2 py-1 text-xs font-medium text-[#10b981]"><FaCheckCircle />Active</span> : <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(239,68,68,0.2)] px-2 py-1 text-xs font-medium text-[#ef4444]"><FaTimesCircle />{game.status}</span>}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </div>
  );
}
