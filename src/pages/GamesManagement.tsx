import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import GameTable from "../components/games/GameTable";
import Pagination from "../components/common/Pagination";

const GamesManagement: React.FC = () => {
  const games = [
    {
      id: "#001",
      name: "Cyber Strike",
      category: "Action",
      ageRating: "18+",
      status: "Active",
      imageUrl: "https://github.com/shadcn.png",
    },
    {
      id: "#002",
      name: "Mystic Quest",
      category: "Adventure",
      ageRating: "New",
      status: "Active",
      imageUrl: "https://github.com/shadcn.png",
    },
    {
      id: "#003",
      name: "War Commander",
      category: "Strategy",
      ageRating: "18+",
      status: "Inactive",
      imageUrl: "https://github.com/shadcn.png",
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Games Management</h1>
          <p className="text-gray-500">Manage all games in your platform</p>
        </div>
        <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
          <FaPlus />
          Add New Game
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-md shadow-sm flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between mb-6">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search games..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Filters */}
          <select className="border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base">
            <option>All Categories</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>Strategy</option>
          </select>

          <select className="border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Showing Count */}
        <p className="text-gray-500 text-sm">Showing 24 of 156 games</p>
      </div>

      {/* Games Table */}
      <GameTable games={games} />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <Pagination
          currentPage={1}
          totalPages={156}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  );
};

export default GamesManagement;
