import React from "react";
import { FaPlus, FaTag, FaHeadphonesAlt } from "react-icons/fa";
import { GiKnightBanner } from "react-icons/gi";
import { Link } from "react-router-dom";

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white shadow-sm p-4 sm:p-6 rounded-md">
      <h3 className="font-semibold text-lg sm:text-xl mb-4">Quick Actions</h3>
      <div className="space-y-2 sm:space-y-3">
        <Link to={"/dashboard/games"} className="block">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 rounded-md text-sm sm:text-base flex items-center justify-center space-x-2 cursor-pointer">
            <FaPlus size={18} />
            <span>Add New Game</span>
          </button>
        </Link>
        <Link to={"/dashboard/discounts"} className="block">
          <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-2 sm:py-3 rounded-md text-sm sm:text-base flex items-center justify-center space-x-2 cursor-pointer">
            <FaTag size={18} />
            <span>Create Discount</span>
          </button>
        </Link>
        <Link to={"/dashboard/banner"} className="block">
          <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 sm:py-3 rounded-md text-sm sm:text-base flex items-center justify-center space-x-2 cursor-pointer">
            <GiKnightBanner size={22} />
            <span>Add Banner</span>
          </button>
        </Link>
        <Link to={"/dashboard/support"} className="block">
          <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 sm:py-3 rounded-md text-sm sm:text-base flex items-center justify-center space-x-2 cursor-pointer">
            <FaHeadphonesAlt size={22} />
            <span>Support</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
