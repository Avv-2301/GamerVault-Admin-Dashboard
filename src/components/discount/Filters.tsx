// components/Filters.tsx
import React from "react";

export const Filters: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center bg-white shadow p-4 rounded-lg">
      <input
        type="text"
        placeholder="Search games..."
        className="p-2 rounded border border-gray-300 flex-1"
      />
      <select className="p-2 rounded border border-gray-300">
        <option>All Status</option>
        <option>Active</option>
        <option>Expiring</option>
      </select>
      <select className="p-2 rounded border border-gray-300">
        <option>All Categories</option>
        <option>RPG</option>
        <option>Action/RPG</option>
      </select>
    </div>
  );
};
