import React from "react";
import { FaEdit, FaTrash, FaUserShield } from "react-icons/fa";

interface UserRowProps {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  avatarUrl: string;
}

const UserRow: React.FC<UserRowProps> = ({
  id,
  name,
  email,
  role,
  status,
  lastLogin,
  avatarUrl,
}) => {
  const statusColors: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-yellow-100 text-yellow-700",
    Suspended: "bg-red-100 text-red-700",
  };

  const roleColor: Record<string, string> = {
    Admin: "bg-green-100 text-green-700",
    Moderator: "bg-blue-100 text-blue-700",
    Premium_User: "bg-purple-100 text-purple-700",
  };

  return (
    <tr className="border-t text-sm">
      <td className="px-4 py-3">{id}</td>
      <td className="px-4 py-3 flex items-center space-x-2">
        <img src={avatarUrl} alt={name} className="w-8 h-8 rounded-full" />
        <span className="font-medium">{name}</span>
      </td>
      <td className="px-4 py-3">{email}</td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            roleColor[role] || "bg-gray-100 text-gray-700"
          }`}
        >
          {role}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            statusColors[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-3 font-semibold">{lastLogin}</td>
      <td className="px-4 py-3 flex space-x-2 text-gray-600">
        <button>
          <FaEdit size={18} className="text-green-600 cursor-pointer" />
        </button>
        <button>
          <FaUserShield size={18} className="text-blue-600 cursor-pointer" />
        </button>
        <button>
          <FaTrash size={18} className="text-red-600 cursor-pointer" />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
