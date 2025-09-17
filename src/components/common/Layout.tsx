import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with animation */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4 sm:p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
