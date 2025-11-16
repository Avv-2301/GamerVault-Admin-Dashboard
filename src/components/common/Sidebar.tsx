import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaGamepad,
  FaTags,
  FaCog,
  FaChartPie,
  FaStar,
  FaHeadphonesAlt,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import { GiKnightBanner } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { HiX } from "react-icons/hi";
import { formatTime } from "../../utils/helper";
import { useAuthStore } from "../../stores/authStore";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      if (onClose) onClose();
    } catch (error) {
      navigate("/");
    }
  };

  const menuSections = [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", icon: <FaChartPie size={20} />, path: "/dashboard" },
      ],
    },
    {
      title: "Content Management",
      items: [
        { label: "Games", icon: <FaGamepad size={20} />, path: "/dashboard/games" },
        { label: "Discounts", icon: <FaTags size={20} />, path: "/dashboard/discounts" },
        { label: "Banner", icon: <GiKnightBanner size={20} />, path: "/dashboard/banner" },
        { label: "Review", icon: <FaStar size={20} />, path: "/dashboard/review" },
      ],
    },
    {
      title: "User Management",
      items: [
        { label: "Users", icon: <FaUsers size={20} />, path: "/dashboard/users" },
        { label: "Role", icon: <FaUserShield size={20} />, path: "/dashboard/roles" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "Support", icon: <FaHeadphonesAlt size={20} />, path: "/dashboard/support" },
      ],
    },
    {
      title: "System",
      items: [
        { label: "Settings", icon: <FaCog size={20} />, path: "/dashboard/settings" },
      ],
    },
  ];

  return (
    <>
      {/* Overlay (only mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
    fixed inset-y-0 left-0 w-64 bg-white shadow-md p-4 z-50
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    sm:translate-x-0 sm:static sm:block
    flex flex-col
    
  `}
      >
        {/* Logo + Close button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-2">
              <IoGameController size={20} />
            </div>
            <h1 className="font-bold text-2xl">GamerVault</h1>
          </div>

          <button
            onClick={onClose}
            className="sm:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <hr className="mb-6 bg-gray-300" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto flex flex-col space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-2">
              {/* Section Header */}
              <div className="px-4 py-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
              
              {/* Section Items */}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-2 rounded-md text-gray-700 font-semibold hover:bg-green-50 hover:text-green-600 transition-colors ${
                        isActive ? "bg-green-100 text-green-600 font-bold" : ""
                      }`
                    }
                    onClick={onClose}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
              
              {/* Section Separator (except for last section) */}
              {sectionIndex < menuSections.length - 1 && (
                <hr className="mt-4 border-gray-200" />
              )}
            </div>
          ))}
        </nav>

        {/* Time at the very bottom */}
        <div className="mt-auto pt-4">
          <div className="w-full flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg">
              <h1 className="font-mono font-bold text-2xl tracking-wider">
                {formatTime(time)}
              </h1>
            </div>
          </div>

          {/* Logout button - Mobile only */}
          <button
            onClick={handleLogout}
            className="sm:hidden w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
