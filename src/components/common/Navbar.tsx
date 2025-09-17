import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger & Close icons

interface NavbarProps {
  toggleSidebar?: () => void; // <-- define props at the top
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard Overview",
    "/users": "Users",
    "/games": "Games",
    "/discounts": "Discounts",
    "/settings": "Settings",
  };

  const title = titles[location.pathname] || "Admin Panel";

  return (
    <header className="w-full bg-white shadow-sm p-4 sm:p-6 flex items-center justify-between">
      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>

      {/* Desktop / larger screens */}
      <div className="hidden sm:flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://github.com/shadcn.png"
            alt="avatar"
            className="rounded-full w-8 h-8"
          />
          <span className="text-gray-700 font-semibold">Admin</span>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden flex items-center space-x-2">
        <button
          onClick={toggleSidebar || (() => setIsMenuOpen(!isMenuOpen))}
          className="text-gray-700 focus:outline-none"
        >
          {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu (if no sidebar toggle provided) */}
      {isMenuOpen && !toggleSidebar && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 sm:hidden">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/32"
                alt="avatar"
                className="rounded-full w-8 h-8 bg-black"
              />
              <span className="text-gray-700 font-semibold">Admin</span>
            </div>
            <nav className="flex flex-col space-y-2">
              <a href="/dashboard" className="text-gray-700 hover:text-green-600 font-medium">
                Dashboard
              </a>
              <a href="/users" className="text-gray-700 hover:text-green-600 font-medium">
                Users
              </a>
              <a href="/games" className="text-gray-700 hover:text-green-600 font-medium">
                Games
              </a>
              <a href="/discounts" className="text-gray-700 hover:text-green-600 font-medium">
                Discounts
              </a>
              <a href="/settings" className="text-gray-700 hover:text-green-600 font-medium">
                Settings
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
