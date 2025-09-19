import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface GameRowProps {
  id: string;
  name: string;
  category: string;
  ageRating: string;
  status: string;
  imageUrl: string;
}

const badgeColors: Record<string, string> = {
  Action: "bg-blue-100 text-blue-600",
  Adventure: "bg-purple-100 text-purple-600",
  Strategy: "bg-yellow-100 text-yellow-600",
  Active: "bg-green-100 text-green-600",
  Inactive: "bg-gray-100 text-gray-600",
  "18+": "bg-red-100 text-red-600",
  New: "bg-green-100 text-green-600",
};

const GameRow: React.FC<GameRowProps> = ({
  id,
  name,
  category,
  ageRating,
  status,
  imageUrl,
}) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      {/* Game info */}
      <td className="px-4 py-3 flex items-center space-x-3">
        <img src={imageUrl} alt={name} className="w-10 h-10 rounded-md" />
        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">ID: {id}</p>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColors[category] || "bg-gray-100 text-gray-600"}`}>
          {category}
        </span>
      </td>

      {/* Age Rating */}
      <td className="px-4 py-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColors[ageRating] || "bg-gray-100 text-gray-600"}`}>
          {ageRating}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColors[status] || "bg-gray-100 text-gray-600"}`}>
          {status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 flex items-center space-x-3">
        <button className="text-green-600 hover:text-green-800 cursor-pointer">
          <FaEdit size={15}/>
        </button>
        <button className="text-red-600 hover:text-red-800 cursor-pointer">
          <FaTrash size={15}/>
        </button>
      </td>
    </tr>
  );
};

export default GameRow;
