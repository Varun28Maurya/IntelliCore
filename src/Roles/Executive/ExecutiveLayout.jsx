import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ExecutiveSidebar from "./ExecutiveSidebar";
import GlobalNavbar from "../../components/GlobalNavbar";
import { Menu } from "lucide-react";

export default function ExecutiveLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">

      {/* 🔵 Global Navbar (Fixed Top) */}
      <GlobalNavbar />

      {/* 🟦 Sidebar (Fixed Below Navbar) */}
      <ExecutiveSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* 🟢 Content Area */}
      <div className="lg:ml-64 pt-16 min-h-screen">

        {/* Mobile Header (Only below navbar) */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold text-slate-900">Executive</span>
        </div>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
