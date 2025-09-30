import React from "react";
import { FaCrown, FaHeadset, FaUserTie, FaGamepad } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa";
import RoleCard from "../components/Role/RoleCard";

const RoleManagement: React.FC = () => {
  const roles = [
    {
      roleName: "Admin",
      description: "Full system access",
      icon: <FaCrown size={20} />,
      accentColor: "bg-red-400",
      userCount: 3,
      users: [
        {
          name: "John Smith",
          email: "john@bigamer.com",
          avatarUrl: "https://i.pravatar.cc/100?img=1",
        },
        {
          name: "Sarah Wilson",
          email: "sarah@bigamer.com",
          avatarUrl: "https://i.pravatar.cc/100?img=2",
        },
        {
          name: "Mike Johnson",
          email: "mike@bigamer.com",
          avatarUrl: "https://i.pravatar.cc/100?img=3",
        },
      ],
    },
    {
      roleName: "Support",
      description: "Customer support access",
      icon: <FaHeadset size={20} />,
      accentColor: "bg-blue-400",
      userCount: 5,
      users: [
        {
          name: "Emma Davis",
          email: "emma@bigamer.com",
          avatarUrl: "https://i.pravatar.cc/100?img=4",
        },
        {
          name: "Alex Brown",
          email: "alex@bigamer.com",
          avatarUrl: "https://i.pravatar.cc/100?img=5",
        },
      ],
    },
    {
      roleName: "Executive",
      description: "Management level access",
      icon: <FaUserTie size={20} />,
      accentColor: "bg-purple-400",
      userCount: 2,
      users: [
        {
          name: "Lisa Anderson",
          email: "lisa@bigamer.com",
          avatarUrl: "https://i.pravatar.cc/100?img=6",
        },
        {
          name: "David Lee",
          email: "david@bigamer.com",
          avatarUrl: "https://i.pravatar.cc/100?img=7",
        },
      ],
    },
    {
      roleName: "Gamer",
      description: "Player account access",
      icon: <FaGamepad size={20} />,
      accentColor: "bg-green-400",
      userCount: 1247,
      users: [
        {
          name: "Chris Taylor",
          email: "chris@bigamer.com",
          avatarUrl: "https://i.pravatar.cc/100?img=8",
        },
      ],
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Role Management</h1>
          <p className="text-gray-500">Manage user roles and permissions</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
          + Assign Role
        </button>
      </div>

      {/* Role Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {roles.map((role, idx) => (
          <RoleCard key={idx} {...role} />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold cursor-pointer">
          <FaPlus className="w-4 h-4" />
          Assign Role
        </button>
        <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold cursor-pointer">
          <FaTrash className="w-4 h-4" />
          Remove Role
        </button>
      </div>
    </div>
  );
};

export default RoleManagement;
