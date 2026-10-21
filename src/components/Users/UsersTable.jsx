import { formatDateOnly as formatDate } from '../../services/helper.js'
import Pagination from "../Common/Pagination";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaEye,
  FaEllipsisV,
  FaBan,
  FaCheckCircle,
  FaTrash,
  FaUserShield,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import EmptyState from "./EmptyState";

const UsersTable = ({
  selectedUsers,
  onSelectionChange,
  onBulkAction,
  allUsers,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const actionMenuRef = useRef(null);
  const menuPortalRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target) &&
        menuPortalRef.current &&
        !menuPortalRef.current.contains(event.target)
      ) {
        setActionMenuOpen(null);
      }
    };

    if (actionMenuOpen !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionMenuOpen]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(paginatedUsers.map((user) => user._id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      onSelectionChange(selectedUsers.filter((id) => id !== userId));
    } else {
      onSelectionChange([...selectedUsers, userId]);
    }
  };

  const handleAction = (action, userId) => {
    setActionMenuOpen(null);
    if (action === "view") {
      navigate(`/dashboard/users/${userId}`);
    } else {
      // TODO: Implement other actions
      console.log("Action:", action, "User ID:", userId);
    }
  };

  // Pagination
  const totalPages = Math.ceil(allUsers.length / itemsPerPage);
  const paginatedUsers = allUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const getStatusBadge = (status) => {
    // Convert status to string to handle both string and number formats
    const statusStr = String(status);

    const statusConfig = {
      1: {
        bg: "bg-[rgba(16,185,129,0.2)]",
        text: "text-[#10b981]",
        label: "Active",
      },
      0: {
        bg: "bg-[rgba(139,143,163,0.2)]",
        text: "text-[#8b8fa3]",
        label: "Inactive",
      },
      3: {
        bg: "bg-[rgba(239,68,68,0.2)]",
        text: "text-[#ef4444]",
        label: "Banned",
      },
    };
    const config = statusConfig[statusStr] || statusConfig["0"];
    return (
      <span
        className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded font-medium`}
      >
        {config.label}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: {
        bg: "bg-[rgba(239,68,68,0.2)]",
        text: "text-[#ef4444]",
        label: "Admin",
      },
      premium: {
        bg: "bg-[rgba(251,191,36,0.2)]",
        text: "text-[#fbbf24]",
        label: "Premium",
      },
      user: {
        bg: "bg-[rgba(59,130,246,0.2)]",
        text: "text-[#3b82f6]",
        label: "User",
      },
    };
    const config = roleConfig[role] || roleConfig.user;
    return (
      <span
        className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded font-medium`}
      >
        {config.label}
      </span>
    );
  };

  if (allUsers.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-xl overflow-hidden max-w-full">
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="bg-gray-50 dark:bg-[#1e2742]">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedUsers.length === paginatedUsers.length &&
                    paginatedUsers.length > 0
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Verified
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Joined
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Balance
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-[#8b8fa3] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#1e2742]">
            {paginatedUsers.map((user) => (
              <tr
                key={user._id}
                className={`hover:bg-gray-50 dark:hover:bg-[#1e2742] transition-colors ${
                  selectedUsers.includes(user._id)
                    ? "bg-[rgba(16,185,129,0.1)]"
                    : ""
                }`}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleSelectUser(user._id)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-[#2a3441] bg-white dark:bg-[#1e2742] text-[#10b981] focus:ring-[#10b981] focus:ring-2"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-gray-800 dark:text-white font-medium text-sm">
                        {user.name?.toUpperCase()}
                      </div>
                      <div className="text-gray-500 dark:text-[#8b8fa3] text-xs mt-0.5">
                        {user.gamesOwned ?? 0} games
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-500 dark:text-[#8b8fa3] text-xs" />
                    <span className="text-gray-800 dark:text-[#e0e0e0] text-sm">
                      {user.email}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">{getRoleBadge(user.role)}</td>
                <td className="px-4 py-4">{getStatusBadge(user.status)}</td>
                <td className="px-4 py-4">
                  {user.verified === true ? (
                    <span className="flex items-center gap-1 text-[#10b981] text-xs">
                      <FaCheckCircle />
                      Verified
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                      Not verified
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-500 dark:text-[#8b8fa3] text-xs">
                    {formatDate(user?.createdAt)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-800 dark:text-white font-medium text-sm">
                    &#8377;{user?.balance?.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-4 relative">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleAction("view", user._id)}
                      className="p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#3b82f6] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                      title="View"
                    >
                      <FaEye className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleAction("edit", user._id)}
                      className="p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-[#10b981] hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <div className="relative" ref={actionMenuRef}>
                      <button
                        onClick={(e) => {
                          const button = e.currentTarget;
                          const rect = button.getBoundingClientRect();
                          setMenuPosition({
                            top: rect.bottom + 8, // 8px margin
                            left: rect.right - 192, // 192px = w-48 (width of menu), align to right
                          });
                          setActionMenuOpen(
                            actionMenuOpen === user._id ? null : user._id
                          );
                        }}
                        className="p-2 text-gray-500 dark:text-[#8b8fa3] hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742] rounded-lg transition-colors"
                        title="More actions"
                      >
                        <FaEllipsisV className="text-sm" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<Pagination currentPage={currentPage} totalPages={totalPages} totalItems={allUsers.length} itemsPerPage={itemsPerPage} itemLabel="users" onPageChange={setCurrentPage} onItemsPerPageChange={(size) => { setItemsPerPage(size); setCurrentPage(1); }} />

      {/* Portal for Action Menu - Renders outside table */}
      {actionMenuOpen &&
        paginatedUsers.find((user) => user._id === actionMenuOpen) &&
        (() => {
          const user = paginatedUsers.find(
            (user) => user._id === actionMenuOpen
          );
          return createPortal(
            <div
              ref={menuPortalRef}
              className="fixed w-48 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg shadow-xl overflow-hidden z-[9999]"
              style={{
                top: `${menuPosition.top}px`,
                left: `${menuPosition.left}px`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {!user.verified && (
                <button
                  onClick={() => handleAction("verify", user._id)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-sm"
                >
                  <FaCheckCircle className="text-xs text-[#10b981]" />
                  Verify
                </button>
              )}
              <button
                onClick={() => handleAction("promote", user._id)}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-sm"
              >
                <FaUserShield className="text-xs text-[#fbbf24]" />
                Change Role
              </button>
              <button
                onClick={() => handleAction("ban", user._id)}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 dark:text-[#e0e0e0] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-sm"
              >
                <FaBan className="text-xs text-[#ef4444]" />
                {String(user.status) === "3" ? "Unban" : "Ban User"}
              </button>
              <div className="border-t border-gray-200 dark:border-[#1e2742]"></div>
              <button
                onClick={() => handleAction("delete", user._id)}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-[#ef4444] hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors text-sm"
              >
                <FaTrash className="text-xs" />
                Delete
              </button>
            </div>,
            document.body
          );
        })()}
    </div>
  );
};

export default UsersTable;
