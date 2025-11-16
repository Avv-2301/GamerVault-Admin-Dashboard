import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHistory, FaLock, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "../../stores/authStore";
import LoginHistoryModal from "./modals/LoginHistoryModal";
import ChangePasswordModal from "./modals/ChangePasswordModal";

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginHistoryOpen, setIsLoginHistoryOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await logout();
      navigate("/");
    } catch (error) {
      // Even if logout fails, navigate to login
      navigate("/");
    }
  };

  const handleLoginHistory = () => {
    setIsLoginHistoryOpen(true);
    setIsDropdownOpen(false);
  };

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true);
    setIsDropdownOpen(false);
  };

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard Overview",
    "/dashboard/users": "Users Overview",
    "/dashboard/games": "Games Overview",
    "/dashboard/discounts": "Discounts Overview",
    "/dashboard/review": "Review Overview",
    "/dashboard/roles": "Roles Overview",
    "/dashboard/banner": "Banner Overview",
    "/dashboard/support": "Support Overview",
    "/dashboard/settings": "Settings Overview",
  };

  const title = titles[location.pathname] || "Admin Panel";

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white shadow-sm p-4 sm:p-6 flex items-center justify-between z-40 sm:left-64 sm:w-[calc(100%-16rem)]">
  {/* Title */}
  <h2 className="text-xl sm:text-2xl font-bold truncate">{title}</h2>

  {/* Desktop */}
  <div className="hidden sm:flex items-center space-x-4">
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-2">
        <img
          src={user?.avatar || "https://github.com/shadcn.png"}
          alt="avatar"
          className="rounded-full w-8 h-8 cursor-pointer hover:ring-2 hover:ring-green-500 transition-all"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        <span className="text-gray-700 font-semibold">{user?.name || "Admin"}</span>
      </div>
      
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-[100] overflow-hidden transform transition-all duration-200 ease-out opacity-100">
          <div className="py-2">
            <button
              onClick={handleLoginHistory}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center space-x-3 transition-all duration-200 cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors">
                <FaHistory size={16} />
              </div>
              <span className="font-medium">Login History</span>
            </button>
            <button
              onClick={handleChangePassword}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center space-x-3 transition-all duration-200 cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors">
                <FaLock size={16} />
              </div>
              <span className="font-medium">Change Password</span>
            </button>
            <div className="border-t border-gray-100 my-2"></div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-all duration-200 cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors">
                <FaSignOutAlt size={16} />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Mobile hamburger */}
  <div className="sm:hidden flex items-center">
    <button
      onClick={toggleSidebar || (() => setIsMenuOpen(!isMenuOpen))}
      className="text-gray-700 focus:outline-none"
    >
      {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
    </button>
  </div>

  {/* Mobile menu */}
  {isMenuOpen && !toggleSidebar && (
    <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 sm:hidden max-w-screen overflow-x-hidden z-[100]">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2 pb-3 border-b border-gray-200">
          <img
            src={user?.avatar || "https://github.com/shadcn.png"}
            alt="avatar"
            className="rounded-full w-8 h-8"
          />
          <span className="text-gray-700 font-semibold">{user?.name || "Admin"}</span>
        </div>
        <div className="flex flex-col space-y-2 pt-2">
          <button
            onClick={handleLoginHistory}
            className="text-left px-2 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md font-medium flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <FaHistory className="text-gray-500" />
            <span>Login History</span>
          </button>
          <button
            onClick={handleChangePassword}
            className="text-left px-2 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md font-medium flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <FaLock className="text-gray-500" />
            <span>Change Password</span>
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={handleLogout}
            className="text-left px-2 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md font-medium flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <FaSignOutAlt className="text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Modals */}
  <LoginHistoryModal
    isOpen={isLoginHistoryOpen}
    onClose={() => setIsLoginHistoryOpen(false)}
  />
  <ChangePasswordModal
    isOpen={isChangePasswordOpen}
    onClose={() => setIsChangePasswordOpen(false)}
  />
</header>
  );
};

export default Navbar;
