import React from "react";
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
import { IoGameController } from "react-icons/io5";

const Sidebar: React.FC = () => {
  const menuItems = [
    { label: "Dashboard", icon: <FaChartPie size={20} />, path: "/dashboard" },
    { label: "Users", icon: <FaUsers size={20} />, path: "/users" },
    { label: "Games", icon: <FaGamepad size={20} />, path: "/games" },
    { label: "Discounts", icon: <FaTags size={20} />, path: "/discounts" },
    { label: "Review", icon: <FaStar size={20} />, path: "/review" },
    { label: "Role", icon: <FaUserShield size={20} />, path: "/role" },
    { label: "Support", icon: <FaHeadphonesAlt size={20} />, path: "/support" },
    { label: "Settings", icon: <FaCog size={20} />, path: "/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-md p-4 ">
      {/* Logo */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-2">
            <IoGameController size={20} />
          </div>
          <h1 className="font-bold text-lg">GamerVault</h1>
        </div>
        <hr className="mb-6 bg-gray-300"></hr>
      </div>

      {/* Menu */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-md text-gray-700 font-semibold hover:bg-green-50 hover:text-green-600 ${
                isActive ? "bg-green-100 text-green-600 font-bold" : ""
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
