import React, { useState } from "react";
import { FaUserShield, FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import AdminPermissionCard from "../components/admin-permissions/AdminPermissionCard";
import type { AdminUser, PagePermission } from "../components/admin-permissions/AdminPermissionCard";
import { showSuccess, showError, showInfo } from "../utils/notifications";
import { apiGet, apiPost, apiPut, apiDelete } from "../services/api";
import { API_CONFIG } from "../services/config";

// Define all available pages
const AVAILABLE_PAGES: PagePermission[] = [
  { page: "Dashboard", path: "/dashboard", enabled: false },
  { page: "Users", path: "/dashboard/users", enabled: false },
  { page: "Roles", path: "/dashboard/roles", enabled: false },
  { page: "Games", path: "/dashboard/games", enabled: false },
  { page: "Banner", path: "/dashboard/banner", enabled: false },
  { page: "Discounts", path: "/dashboard/discounts", enabled: false },
  { page: "Review", path: "/dashboard/review", enabled: false },
  { page: "Support", path: "/dashboard/support", enabled: false },
  { page: "Settings", path: "/dashboard/settings", enabled: false },
];

const AdminPermissions: React.FC = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([
    // Mock data - replace with API call
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      role: "Super Admin",
      permissions: AVAILABLE_PAGES.map((p) => ({ ...p, enabled: true })),
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "Admin",
      permissions: AVAILABLE_PAGES.map((p) => ({
        ...p,
        enabled: ["Dashboard", "Users", "Games", "Support"].includes(p.page),
      })),
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      email: "mike.rodriguez@email.com",
      role: "Content Manager",
      permissions: AVAILABLE_PAGES.map((p) => ({
        ...p,
        enabled: ["Dashboard", "Games", "Banner", "Discounts", "Review"].includes(p.page),
      })),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Filter admins based on search and role
  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || admin.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Get unique roles for filter
  const uniqueRoles = Array.from(new Set(admins.map((admin) => admin.role)));

  // Handle permission change
  const handlePermissionChange = async (
    adminId: string,
    page: string,
    enabled: boolean
  ) => {
    try {
      setIsLoading(true);
      
      // Update local state optimistically
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.id === adminId
            ? {
                ...admin,
                permissions: admin.permissions.map((perm) =>
                  perm.page === page ? { ...perm, enabled } : perm
                ),
              }
            : admin
        )
      );

      // TODO: Replace with actual API call
      // await apiPut(API_CONFIG.endpoints.permissions.update(adminId), {
      //   page,
      //   enabled,
      // });

      showSuccess(`Access to ${page} ${enabled ? "granted" : "revoked"} successfully`);
    } catch (error) {
      // Revert on error
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.id === adminId
            ? {
                ...admin,
                permissions: admin.permissions.map((perm) =>
                  perm.page === page ? { ...perm, enabled: !enabled } : perm
                ),
              }
            : admin
        )
      );
      showError("Failed to update permission. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add new admin
  const handleAddAdmin = () => {
    showInfo("Add admin feature - integrate with user management");
    // TODO: Open modal or navigate to add admin page
  };

  // Handle edit admin
  const handleEditAdmin = (admin: AdminUser) => {
    showInfo(`Edit admin: ${admin.name} - feature coming soon`);
    // TODO: Open edit modal
  };

  // Handle delete admin
  const handleDeleteAdmin = async (adminId: string) => {
    if (!window.confirm("Are you sure you want to remove this admin's access?")) {
      return;
    }

    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // await apiDelete(API_CONFIG.endpoints.permissions.delete(adminId));

      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminId));
      showSuccess("Admin access removed successfully");
    } catch (error) {
      showError("Failed to remove admin access. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
              <FaUserShield className="text-green-600" />
              <span>Admin Permissions</span>
            </h1>
            <p className="text-gray-600">
              Manage page access permissions for admin users
            </p>
          </div>
          <button
            onClick={handleAddAdmin}
            className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold flex items-center space-x-2 transition-colors"
          >
            <FaPlus />
            <span>Add Admin</span>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search admins by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
            >
              <option value="all">All Roles</option>
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Admins</p>
          <p className="text-2xl font-bold text-gray-800">{admins.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Active Admins</p>
          <p className="text-2xl font-bold text-green-600">
            {admins.filter((a) => a.permissions.some((p) => p.enabled)).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Available Pages</p>
          <p className="text-2xl font-bold text-gray-800">{AVAILABLE_PAGES.length}</p>
        </div>
      </div>

      {/* Admin Cards */}
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Updating permissions...</p>
        </div>
      )}

      {filteredAdmins.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <FaUserShield className="mx-auto text-gray-400 text-5xl mb-4" />
          <p className="text-gray-600 text-lg mb-2">No admins found</p>
          <p className="text-gray-500 text-sm">
            {searchQuery || roleFilter !== "all"
              ? "Try adjusting your search or filter"
              : "Add your first admin to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAdmins.map((admin) => (
            <AdminPermissionCard
              key={admin.id}
              admin={admin}
              onPermissionChange={handlePermissionChange}
              onEdit={handleEditAdmin}
              onDelete={handleDeleteAdmin}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPermissions;

