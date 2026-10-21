import { formatDateOnly as formatDate } from '../../services/helper.js'
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaEye,
  FaTag,
  FaEllipsisV,
  FaStar,
  FaTrash,
  FaBan,
} from "react-icons/fa";
import { changeGameVisibility, deleteGame, updateGame } from "../../services/api/game";
import Pagination from "../Common/Pagination";
import DeleteGameModal from "./DeleteGameModal";

const GamesTable = ({
  selectedGames,
  onSelectionChange,
  games,
  handleRefresh,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const actionMenuRef = useRef(null);
  const menuPortalRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [discountUpdatingId, setDiscountUpdatingId] = useState(null);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target) &&
        menuPortalRef.current &&
        !menuPortalRef.current.contains(event.target)
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

  const gamesArray = Array.isArray(games) ? games : [];

  //pagination
  const totalPages = Math.ceil((gamesArray.length || 0) / itemsPerPage);
  const paginatedGames = gamesArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(paginatedGames.map((game) => game._id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectGame = (gameId) => {
    if (selectedGames.includes(gameId)) {
      onSelectionChange(selectedGames.filter((id) => id !== gameId));
    } else {
      onSelectionChange([...selectedGames, gameId]);
    }
  };

  

  const toggleVisibility = async (gameId, currentStatus) => {
    setIsLoading(true);
    try {
      const newStatus = !currentStatus;
      const response = await changeGameVisibility(gameId, newStatus);

      if (response?.meta?.code === 200) {
        handleRefresh();
      }
    } catch (error) {
      console.error("Error toggling game visibility:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDiscount = async (game) => {
    setDiscountUpdatingId(game._id);
    try {
      await updateGame(game._id, { isDiscountActive: !game.isDiscountManuallyActive });
      handleRefresh();
    } catch (error) {
      console.error("Error toggling game discount:", error);
    } finally {
      setDiscountUpdatingId(null);
    }
  };

  const handleAction = (action, gameId, gameSlug) => {
    setActionMenuOpen(null);
    if (action === "view") {
      navigate(`/dashboard/games/${encodeURIComponent(gameSlug)}`);
    } else if (action === "edit") {
      navigate(`/dashboard/games/${encodeURIComponent(gameId)}/edit`);
    } else if (action === "discount") {
      navigate(`/dashboard/games/${encodeURIComponent(gameId)}/edit`);
    } else if (action === "delete") {
      setGameToDelete(gamesArray.find((game) => game._id === gameId) || null);
    } else {
      // TODO: Implement other actions
      console.log("Action:", action, "Game ID:", gameId);
    }
  };

  const confirmDelete = async (password) => {
    if (!gameToDelete) return;
    await deleteGame(gameToDelete._id, password);
    setGameToDelete(null);
    onSelectionChange(selectedGames.filter((id) => id !== gameToDelete._id));
    handleRefresh();
  };


  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg sm:rounded-xl overflow-hidden max-w-full">
      <div className="overflow-x-auto -mx-4 sm:mx-0 max-w-full">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="w-full border-collapse min-w-[800px]">
            <thead className="bg-gray-100 dark:bg-[#1e2742]">
              <tr>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedGames.length === paginatedGames.length &&
                      paginatedGames.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                  />
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                  Game
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                  Price
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden sm:table-cell">
                  Visibility
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider hidden xl:table-cell">
                  Created
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#1e2742]">
            {paginatedGames.map((game, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors ${
                  selectedGames.includes(game._id)
                    ? "bg-[rgba(16,185,129,0.1)]"
                    : ""
                }`}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedGames.includes(game?._id)}
                    onChange={() => handleSelectGame(game?._id)}
                    className="w-4 h-4 rounded border-[#2a3441] bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                  />
                </td>
                <td className="px-2 sm:px-4 py-5 sm:py-6">
                  <div className="flex items-center gap-3 sm:gap-4 min-h-[76px] sm:min-h-[92px]">
                    <img
                      src={game?.thumbnail}
                      alt={game?.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-800 dark:text-white font-medium text-xs sm:text-sm truncate">
                          {game?.name}
                        </span>
                        {game?.isFeatured && (
                          <FaStar
                            className="text-[#fbbf24] text-xs flex-shrink-0"
                            title="Featured"
                          />
                        )}
                      </div>
                      <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mt-0.5">
                        {game?.totalSales} sales
                      </div>
                      <div className="md:hidden mt-1">
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] text-xs rounded">
                          {game.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4 hidden md:table-cell">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-[#1e2742] text-gray-600 dark:text-[#8b8fa3] text-xs rounded">
                    {game.category}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4">
                  <div className="flex flex-col">
                    <span className="text-gray-800 dark:text-white font-medium text-xs sm:text-sm">
                      &#8377;{game.price.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-5 sm:py-6">
                  <div className="flex flex-col text-xs">
                    <span className={game.isDiscountActive && game.discountPrice != null && game.discountPrice < game.price ? 'text-[#10b981]' : 'text-gray-500 dark:text-[#8b8fa3]'}>
                      {game.isDiscountPromotionActive ? 'Scheduled discount active' : game.isDiscountActive && game.discountPrice != null && game.discountPrice < game.price ? 'Discount active' : game.discountPrice != null && game.discountPrice < game.price ? 'Discount off' : 'No sale price'}
                    </span>
                    {game.discountPrice != null && game.discountPrice < game.price && <span className="text-gray-500 dark:text-[#8b8fa3]">-{game.discountPercentage}% · ₹{game.discountPrice.toFixed(2)}</span>}
                    <label className="mt-1 inline-flex items-center gap-2 cursor-pointer" title={game.isDiscountPromotionActive ? "This discount is active through a scheduled promotion" : game.isDiscountActive ? "Turn discount off" : "Turn discount on"}>
                      <input type="checkbox" checked={game.isDiscountActive === true} onChange={() => toggleDiscount(game)} disabled={discountUpdatingId === game._id || game.isDiscountPromotionActive === true} className="sr-only peer" aria-label={`${game.isDiscountActive ? "Disable" : "Enable"} discount for ${game.name}`} />
                      <span className="relative h-5 w-9 rounded-full bg-[#2a3441] transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-[#10b981] peer-checked:after:translate-x-4 peer-disabled:opacity-50" />
                      <span className="text-[11px] text-gray-500 dark:text-[#8b8fa3]">{game.isDiscountActive ? "On" : "Off"}</span>
                    </label>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={game.isActive === true}
                        onChange={() =>
                          toggleVisibility(game._id, game?.isActive)
                        }
                        disabled={isLoading}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 sm:w-11 sm:h-6 bg-[#2a3441] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#10b981] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-[#10b981] disabled:opacity-50 disabled:cursor-not-allowed"></div>
                    </label>
                    <span
                      className={`text-xs font-medium ${
                        game.isActive === true
                          ? "text-[#10b981]"
                          : "text-[#8b8fa3]"
                      }`}
                    >
                      {game.isActive === true ? "Live" : "Hidden"}
                    </span>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4 hidden xl:table-cell">
                  <span className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                    {formatDate(game.createdAt)}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-3 sm:py-4 relative">
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <button
                      onClick={() => handleAction("edit", game._id)}
                      className="p-1.5 sm:p-2 text-gray-600 dark:text-[#8b8fa3] hover:text-[#10b981] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="text-xs sm:text-sm" />
                    </button>
                    <button
                      onClick={() => handleAction("view", game?._id, game?.slug)}
                      className="p-1.5 sm:p-2 text-gray-600 dark:text-[#8b8fa3] hover:text-[#3b82f6] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                      title="View"
                    >
                      <FaEye className="text-xs sm:text-sm" />
                    </button>
                    <button
                      onClick={() => handleAction("discount", game._id)}
                      className="p-1.5 sm:p-2 text-gray-600 dark:text-[#8b8fa3] hover:text-[#f97316] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors hidden lg:block"
                      title="Assign Discount"
                    >
                      <FaTag className="text-xs sm:text-sm" />
                    </button>
                    <div className="relative" ref={actionMenuRef}>
                      <button
                        onClick={(e) => {
                          const button = e.currentTarget;
                          const rect = button.getBoundingClientRect();
                          setMenuPosition({
                            top: rect.bottom + 8,
                            left: rect.right - 192,
                          });
                          setActionMenuOpen(
                            actionMenuOpen === game._id ? null : game._id
                          );
                        }}
                        className="p-1.5 sm:p-2 text-gray-600 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                        title="More actions"
                      >
                        <FaEllipsisV className="text-xs sm:text-sm" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={gamesArray.length} itemsPerPage={itemsPerPage} itemLabel="games" onPageChange={setCurrentPage} onItemsPerPageChange={(size) => { setItemsPerPage(size); setCurrentPage(1); }} />


      {/* Portal for Action Menu - Renders outside table */}
      {actionMenuOpen && paginatedGames.find(game => game._id === actionMenuOpen) && (() => {
        const game = paginatedGames.find(game => game._id === actionMenuOpen);
        return createPortal(
          <div
            ref={menuPortalRef}
            className="fixed w-48 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-xl overflow-hidden z-[9999]"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleAction("feature", game._id)}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-sm"
            >
              <FaStar className="text-xs" />
              {game.isFeatured ? "Unfeature" : "Feature"}
            </button>
            <button
              onClick={() => handleAction("deactivate", game._id)}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-sm"
            >
              <FaBan className="text-xs" />
              {game.isActive === true ? "Deactivate" : "Activate"}
            </button>
            <div className="border-t border-gray-200 dark:border-[#1e2742]"></div>
            <button
              onClick={() => handleAction("delete", game._id)}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-[#ef4444] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-sm"
            >
              <FaTrash className="text-xs" />
              Delete
            </button>
          </div>,
          document.body
        );
      })()}
      <DeleteGameModal game={gameToDelete} onClose={() => setGameToDelete(null)} onConfirm={confirmDelete} />
    </div>
  );
};

export default GamesTable;
