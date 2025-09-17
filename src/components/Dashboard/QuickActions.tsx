import React from "react";
import { FaPlus, FaTag, FaChartBar, FaBell } from "react-icons/fa";

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white shadow-sm p-4 sm:p-6 rounded-md">
      <h3 className="font-semibold text-lg sm:text-xl mb-4">Quick Actions</h3>
      <div className="space-y-2 sm:space-y-3">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 rounded-md text-sm sm:text-base flex items-center justify-center space-x-2">
          <FaPlus />
          <span>Add New Game</span>
        </button>
        <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-2 sm:py-3 rounded-md text-sm sm:text-base flex items-center justify-center space-x-2">
          <FaTag />
          <span>Create Discount</span>
        </button>
        <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 sm:py-3 rounded-md text-sm sm:text-base flex items-center justify-center space-x-2">
          <FaChartBar />
          <span>View Reports</span>
        </button>
        <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 sm:py-3 rounded-md text-sm sm:text-base flex items-center justify-center space-x-2">
          <FaBell />
          <span>Send Notification</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
