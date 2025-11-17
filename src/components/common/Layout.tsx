import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useUIStore } from "../../stores/uiStore";

const Layout: React.FC = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useUIStore();

  return (
    <div className="flex min-h-screen w-full max-w-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Content */}
      <div className="flex-1 flex flex-col bg-gray-50 w-full max-w-screen overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        {/* Spacer for fixed navbar */}
        <div className="h-[72px] sm:h-[88px]"></div>

        <main className="p-4 sm:p-6 flex-1 overflow-auto w-full max-w-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
