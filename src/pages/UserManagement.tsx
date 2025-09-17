import React, { useState } from "react";
import PageHeader from "../components/User/PageHeader";
import SearchFilterBar from "../components/User/SearchFilterBar";
import UserTable from "../components/User/UserTable";
import Pagination from "../components/common/Pagination";

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
    <div className="p-4 sm:p-6">
      <PageHeader
        title="User Management"
        subtitle="Manage users, roles, and permissions for your gaming platform"
        onAddUser={() => alert("Add user clicked")}
      />
      <SearchFilterBar
        onSearch={(val) => console.log("Searching:", val)}
        onRoleChange={(val) => console.log("Role filter:", val)}
        onStatusChange={(val) => console.log("Status filter:", val)}
      />
      <UserTable users={users} />
      <Pagination
        currentPage={1}
        totalPages={125}
        onPageChange={(page) => console.log("Page:", page)}
      />
    </div>
  );
};

export default UserManagement;
