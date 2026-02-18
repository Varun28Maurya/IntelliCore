import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DataScientistSidebar from "./DataScientistSidebar";
import GlobalNavbar from "../../components/GlobalNavbar";
import { Menu } from "lucide-react";

export default function DataScientistLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">

      {/* 🔵 Global Navbar */}
      <GlobalNavbar />

      {/* 🟦 Sidebar */}
      <DataScientistSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* 🟢 Content Area */}
      <div className="lg:ml-64 pt-20 min-h-screen">

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold text-slate-900">
            Data Scientist
          </span>
        </div>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
