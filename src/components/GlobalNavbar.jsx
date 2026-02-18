import React from "react";
import { Search, Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
export default function GlobalNavbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-50">

      {/* LEFT – Brand */}
      <div className="flex items-center gap-3">
  
  {/* Logo Image */}
  <img
    src={logo}
    alt="IntelliCore Logo"
    className="h-8 w-8 object-contain"
  />

  {/* Brand Name */}
  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
    IntelliCore
  </h1>

        <span className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full font-semibold">
          PROD
        </span>
      </div>

      {/* CENTER – Bigger Curvy Search */}
      <div className="flex-1 max-w-3xl mx-12 hidden md:block">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search models, alerts, reports..."
            className="w-full pl-14 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* RIGHT – Controls */}
      <div className="flex items-center gap-6">

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <Bell size={22} className="text-slate-600 hover:text-slate-900" />
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] px-1.5 rounded-full">
            3
          </span>
        </div>

        {/* User Name */}
        <span
          onClick={() => navigate("/profile")}
          className="hidden sm:block text-sm font-semibold text-slate-700 cursor-pointer hover:text-slate-900 transition"
        >
          Varun Maurya
        </span>



        {/* Avatar */}
        <div
          onClick={() => navigate("/profile")}
          className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-300 transition"
        >
          VM
        </div>



        {/* Settings */}
        <Settings
  size={22}
  onClick={() => navigate("/settings")}
  className="text-slate-600 hover:text-slate-900 cursor-pointer transition"
/>
      </div>
    </header>
  );
}
