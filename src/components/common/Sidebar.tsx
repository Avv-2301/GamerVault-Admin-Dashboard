import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaGamepad,
  FaTags,
  FaCog,
  FaChartPie,
  FaStar,
  FaHeadphonesAlt,
  FaUserShield,
} from "react-icons/fa";
import { GiKnightBanner } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { HiX } from "react-icons/hi";
import { formatTime } from "../../utils/helper";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const menuItems = [
    { label: "Dashboard", icon: <FaChartPie size={20} />, path: "/dashboard" },
    { label: "Users", icon: <FaUsers size={20} />, path: "/dashboard/users" },
    { label: "Games", icon: <FaGamepad size={20} />, path: "/dashboard/games" },
    {
      label: "Discounts",
      icon: <FaTags size={20} />,
      path: "/dashboard/discounts",
    },
    { label: "Review", icon: <FaStar size={20} />, path: "/dashboard/review" },
    {
      label: "Role",
      icon: <FaUserShield size={20} />,
      path: "/dashboard/roles",
    },
    {
      label: "Banner",
      icon: <GiKnightBanner size={20} />,
      path: "/dashboard/banner",
    },
    {
      label: "Support",
      icon: <FaHeadphonesAlt size={20} />,
      path: "/dashboard/support",
    },
    {
      label: "Settings",
      icon: <FaCog size={20} />,
      path: "/dashboard/settings",
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
        <nav className="flex-1 overflow-y-auto flex flex-col space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-md text-gray-700 font-semibold hover:bg-green-50 hover:text-green-600 ${
                  isActive ? "bg-green-100 text-green-600 font-bold" : ""
                }`
              }
              onClick={onClose}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Time at the very bottom */}
        <div className="absolute bottom-6 w-full flex justify-center">
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg mr-8">
            <h1 className="font-mono font-bold text-2xl tracking-wider">
              {formatTime(time)}
            </h1>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
