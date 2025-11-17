import React, { useState } from "react";
import PageHeader from "../components/User/PageHeader";
import SearchFilterBar from "../components/User/SearchFilterBar";
import UserTable from "../components/User/UserTable";
import Pagination from "../components/common/Pagination";
import { showInfo } from "../utils/notifications";

const UserManagement: React.FC = () => {
  const [users] = useState([
    {
      id: "#001",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2 hours ago",
      avatarUrl: "https://github.com/shadcn.png",
    },
    {
      id: "#002",
      name: "Mike Rodriguez",
      email: "mike.rodriguez@email.com",
      role: "Moderator",
      status: "Active",
      lastLogin: "5 hours ago",
      avatarUrl: "https://github.com/shadcn.png",
    },
    {
      id: "#003",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      role: "Premium_User",
      status: "Inactive",
      lastLogin: "2 days ago",
      avatarUrl: "https://github.com/shadcn.png",
    },
    {
      id: "#004",
      name: "David Chen",
      email: "david.chen@email.com",
      role: "User",
      status: "Suspended",
      lastLogin: "1 week ago",
      avatarUrl: "https://github.com/shadcn.png",
    },
  ]);

  return (
    <div className="flex flex-col h-screen p-4 sm:p-6 overflow-hidden">
  {/* Fixed Header */}
  <div className="flex-shrink-0">
    <PageHeader
      title="User Management"
      subtitle="Manage users, roles, and permissions for your gaming platform"
      onAddUser={() => showInfo("Add user feature coming soon")}
    />
  </div>

  {/* Fixed Search/Filters */}
  <div className="flex-shrink-0">
    <SearchFilterBar
      onSearch={(val) => console.log("Searching:", val)}
      onRoleChange={(val) => console.log("Role filter:", val)}
      onStatusChange={(val) => console.log("Status filter:", val)}
    />
  </div>

  {/* Scrollable Table ONLY */}
  <div className="flex-1 border rounded-md overflow-auto">
  <div className="min-w-full">
    <UserTable users={users} />
  </div>
</div>

  {/* Fixed Pagination */}
  <div className="flex-shrink-0 mt-4">
    <Pagination
      currentPage={1}
      totalPages={125}
      onPageChange={(page) => console.log("Page:", page)}
    />
  </div>
</div>
  );
};

export default UserManagement;
