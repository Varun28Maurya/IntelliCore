import React from "react";
import { NavLink } from "react-router-dom";
import {
  ShieldCheck,
  AlertTriangle,
  Brain,
  Scale,
  FileSearch,
  ClipboardList,
  BarChart3,
  ChevronRight,
} from "lucide-react";

export default function RiskOfficerSidebar() {
  const navItems = [
    { name: "Risk Overview", path: "/risk", icon: ShieldCheck },
    { name: "AI Risk Index", path: "/risk/index", icon: AlertTriangle },
    { name: "Traditional ML Monitoring", path: "/risk/ml", icon: Brain },
    { name: "LLM Risk Monitoring", path: "/risk/llm", icon: Brain },
    { name: "Bias & Fairness", path: "/risk/bias", icon: Scale },
    { name: "Compliance & Governance", path: "/risk/compliance", icon: FileSearch },
    { name: "Audit Logs", path: "/risk/audit", icon: ClipboardList },
  ];

  const systemStatus = {
    label: "Risk Monitoring Active",
    color: "bg-emerald-500",
  };

  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 flex flex-col">

      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
            <BarChart3 size={22} />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              Risk Governance
            </h1>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-tight">
              Compliance & AI Supervision
            </p>
          </div>
        </div>

        {/* System Indicator */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <span className={`w-2 h-2 rounded-full ${systemStatus.color}`} />
          <span className="text-[11px] font-bold text-slate-600 tracking-tight">
            {systemStatus.label}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/risk"}
              className={({ isActive }) =>
                `w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200
                text-sm font-semibold group border-l-4
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-blue-600 shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={`transition-colors ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {isActive && (
                    <ChevronRight
                      size={14}
                      className="text-blue-400 opacity-60"
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-6 pb-8">
        <div className="border-t border-slate-200 mt-6 pt-5">
          <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">
            Intellicore Risk Office
          </p>
          <p className="text-[10px] text-slate-400 font-medium">
            Governance Control Panel • v2.8.4
          </p>

          <button className="mt-5 w-full py-2 px-3 text-[11px] font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm">
            Review Compliance Report
          </button>
        </div>
      </div>
    </aside>
  );
}
