import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchFilterBarProps {
  onSearch: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  onSearch,
  onRoleChange,
  onStatusChange,
}) => {
  return (
    <div className="bg-white p-2 rounded-md shadow-sm flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
      {/* Search Input with Icon */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search users by name, email, or ID..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-sm sm:text-base"
        />
      </div>

      {/* Role Select */}
      <select
        onChange={(e) => onRoleChange(e.target.value)}
        className="border border-gray-400 rounded-md px-4 py-2 text-sm sm:text-base w-1/2 sm:w-auto min-w-[250px]"
      >
        <option value="">User</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
        <option value="premium">Premium</option>
      </select>

      {/* Status Select */}
      <select
        onChange={(e) => onStatusChange(e.target.value)}
        className="border border-gray-400 rounded-md px-4 py-2 text-sm sm:text-base w-1/2 sm:w-auto min-w-[250px]"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="suspended">Suspended</option>
      </select>
    </div>
  );
};

export default SearchFilterBar;
