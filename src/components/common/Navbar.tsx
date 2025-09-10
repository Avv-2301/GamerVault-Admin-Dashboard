import React from "react";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  // Map routes to titles
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard Overview",
    "/users": "Users",
    "/games": "Games",
    "/discounts": "Discounts",
    "/settings": "Settings",
  };

  const title = titles[location.pathname] || "Admin Panel";

  return (
    <header className="w-full flex items-center justify-between p-4 bg-white shadow-sm">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/32"
            alt="avatar"
            className="rounded-full w-8 h-8 bg-black"
          />
          <span className="text-gray-700 font-semibold">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
