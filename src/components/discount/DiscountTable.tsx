// components/DiscountTable.tsx
import React from "react";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import type { Discount } from "../../pages/DiscountManagement";

interface DiscountTableProps {
  discounts: Discount[];
}

export const DiscountTable: React.FC<DiscountTableProps> = ({ discounts }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow mt-4">
      {/* Title */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Discounts Overview</h2>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Game</th>
            <th className="px-4 py-2 text-left">Percentage</th>
            <th className="px-4 py-2 text-left">Start Date</th>
            <th className="px-4 py-2 text-left">End Date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {discounts.map((d) => (
            <tr key={d.id}>
              <td className="px-4 py-2">{d.id}</td>
              <td className="px-4 py-2 flex items-center gap-3">
                {/* Small image */}
                <img
                  src={d.image || "/placeholder-game.jpg"} // fallback placeholder
                  alt={d.game}
                  className="w-10 h-10 rounded object-cover bg-black"
                />
                <div>
                  <div>{d.game}</div>
                  <div className="text-gray-500 text-sm">{d.category}</div>
                </div>
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                    d.percentage >= 70
                      ? "bg-red-500"
                      : d.percentage >= 40
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {d.percentage}%
                </span>
              </td>
              <td className="px-4 py-2">{d.startDate}</td>
              <td className="px-4 py-2">{d.endDate}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-white text-sm ${
                    d.status === "Active" ? "bg-green-400" : "bg-orange-400"
                  }`}
                >
                  {d.status}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button className="text-green-500 hover:text-blue-700 cursor-pointer">
                  <FiEdit />
                </button>
                <button className="text-red-500 hover:text-red-700 text-red-500 cursor-pointer">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
