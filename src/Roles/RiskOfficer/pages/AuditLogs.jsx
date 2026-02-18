import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  ShieldAlert, 
  Settings, 
  User, 
  ArrowRightLeft, 
  ChevronRight, 
  Calendar,
  AlertCircle,
  Clock,
  ExternalLink,
  Archive,
  Database
} from 'lucide-react';

// --- Mock Data ---

const auditSummary = [
  { label: 'Total Logged Events (30D)', value: '12,482', severity: 'Low', status: 'Stable', desc: 'Aggregate system & user activities' },
  { label: 'High Severity Events', value: '14', severity: 'High', status: 'Warning', desc: 'Critical alerts requiring review' },
  { label: 'Manual Risk Overrides', value: '03', severity: 'Medium', status: 'Review', desc: 'Expert intervention events' },
  { label: 'Policy Violations', value: '06', severity: 'Critical', status: 'Critical', desc: 'Breaches of safety/compliance gates' },
];

const mainLogs = [
  { timestamp: '2026-02-18 09:42', type: 'Model Config Updated', model: 'CreditRisk_v3', user: 'Sarah Jenkins', action: 'Threshold Modified', severity: 'Medium', status: 'Logged', details: 'Alpha limit changed 0.45 -> 0.50' },
  { timestamp: '2026-02-18 08:21', type: 'Bias Threshold Exceeded', model: 'LoanApproval_v2', user: 'System', action: 'Auto Flagged', severity: 'High', status: 'Under Review', details: 'Age attribute variance > 12%' },
  { timestamp: '2026-02-17 16:11', type: 'LLM Prompt Injection', model: 'ChatAssist_v1', user: 'System', action: 'Blocked', severity: 'Critical', status: 'Resolved', details: 'Jailbreak pattern "DAN 6.0" detected' },
  { timestamp: '2026-02-17 14:05', type: 'User Login', model: 'All', user: 'Mark Thorne', action: 'Auth Success', severity: 'Low', status: 'Logged', details: 'Role: Compliance Officer' },
  { timestamp: '2026-02-17 11:30', type: 'Data Drift Detected', model: 'FraudShield_v4', user: 'System', action: 'Alert Triggered', severity: 'Medium', status: 'Logged', details: 'PSI score reached 0.18' },
];

const riskOverrides = [
  { date: '2026-02-18', model: 'CorporateLoan_X', type: 'Bias Gate Bypass', approvedBy: 'David Chen (CRO)', reason: 'High-net-worth liquidity edge case', status: 'Approved', executive: true },
  { date: '2026-02-16', model: 'RetailCredit_v4', type: 'Drift Override', approvedBy: 'Elena Rossi', reason: 'Temporary seasonality shift', status: 'Approved', executive: false },
  { date: '2026-02-15', model: 'Mortgage_Alpha', type: 'Validation Override', approvedBy: 'Robert King (HOD)', reason: 'Backtesting data gap confirmed', status: 'Approved', executive: true },
];

const configHistory = [
  { type: 'Alert Threshold', model: 'FraudShield_v4', prev: '0.15', next: '0.20', user: 'S. Jenkins', time: '2026-02-18 09:12' },
  { type: 'Model Version', model: 'LoanApproval', prev: 'v2.1', next: 'v2.2 (Candidate)', user: 'System (CI/CD)', time: '2026-02-17 23:45' },
  { type: 'PII Filter Strength', model: 'ChatAssist_v1', prev: 'Level 2', next: 'Level 4', user: 'Admin_Audit', time: '2026-02-17 10:20' },
];

// --- Reusable Components ---

const SeverityBadge = ({ level }) => {
  const styles = {
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
    High: 'bg-orange-50 text-orange-700 border-orange-100',
    Medium: 'bg-amber-50 text-amber-700 border-amber-100',
    Low: 'bg-slate-50 text-slate-600 border-slate-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[level] || styles.Low}`}>
      {level}
    </span>
  );
};

const SectionCard = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={18} className="text-slate-400" />}
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      </div>
    </div>
    {children}
  </div>
);

// --- Main Page Component ---

export default function AuditLogs() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Database className="text-indigo-600" size={24} />
              System Audit Logs
            </h1>
            <p className="text-slate-500 text-sm">Comprehensive traceability for AI configuration, risk, and user activity</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 uppercase tracking-widest">
              Live Monitoring Active
            </span>
          </div>
        </div>

        {/* SECTION 1: Audit Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {auditSummary.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <SeverityBadge level={item.severity} />
                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.status}</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 leading-none">{item.value}</h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">{item.label}</p>
              <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* SECTION 2: Filters & Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by event, user, or model..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 focus:outline-none">
            <option>All Event Types</option>
            <option>Config Change</option>
            <option>Security Alert</option>
            <option>Risk Override</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 focus:outline-none">
            <option>All Severities</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors">
            <Filter size={16} /> Apply Filters
          </button>
        </div>

        {/* SECTION 3: Main Audit Log Table */}
        <SectionCard title="Master Audit Log" icon={Clock}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold border-b border-slate-100">
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Event Type</th>
                  <th className="px-6 py-4">Model</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {mainLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-500 text-xs whitespace-nowrap">{log.timestamp}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{log.type}</td>
                    <td className="px-6 py-4 text-slate-500">{log.model}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {log.user.charAt(0)}
                        </div>
                        <span className="text-slate-700 font-medium">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <SeverityBadge level={log.severity} />
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-500">{log.status}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs truncate max-w-[200px]">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-center">
            <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] hover:text-indigo-800 transition-all">
              Load More Entries
            </button>
          </div>
        </SectionCard>

        {/* SECTION 4 & 5: Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* SECTION 4: Risk Override Activity */}
          <SectionCard title="Expert Risk Overrides" icon={ShieldAlert}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold border-b border-slate-100">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Model</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Authority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {riskOverrides.map((row, idx) => (
                    <tr key={idx} className={row.executive ? 'bg-amber-50/20' : 'hover:bg-slate-50/30'}>
                      <td className="px-6 py-4 text-slate-500 text-xs">{row.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{row.model}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs">{row.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-700">{row.approvedBy}</span>
                          {row.executive && <span className="text-[9px] text-amber-700 font-bold uppercase">Executive Sign-off</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* SECTION 5: Configuration Change History */}
          <SectionCard title="Configuration Changes" icon={Settings}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold border-b border-slate-100">
                    <th className="px-6 py-4">Change</th>
                    <th className="px-6 py-4">Prev → Next</th>
                    <th className="px-6 py-4 text-right">By User</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {configHistory.map((change, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{change.type}</p>
                        <p className="text-[10px] text-slate-400">{change.model}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="text-slate-400">{change.prev}</span>
                          <ArrowRightLeft size={12} className="text-slate-300" />
                          <span className="text-indigo-600 font-bold">{change.next}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-medium text-slate-700">{change.user}</p>
                        <p className="text-[9px] text-slate-400">{change.time.split(' ')[1]}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* SECTION 6: Export & Audit Controls */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Audit Reporting & Governance Exports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
              <FileText className="text-slate-400 group-hover:text-rose-600" size={20} />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Export PDF</p>
                <p className="text-[10px] text-slate-400">Formal Audit Report</p>
              </div>
            </button>
            <button className="flex items-center justify-center gap-2 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
              <Download className="text-slate-400 group-hover:text-indigo-600" size={20} />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Download CSV</p>
                <p className="text-[10px] text-slate-400">Raw Historical Logs</p>
              </div>
            </button>
            <button className="flex items-center justify-center gap-2 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
              <Calendar className="text-slate-400 group-hover:text-emerald-600" size={20} />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Compliance Snapshot</p>
                <p className="text-[10px] text-slate-400">Current State Capture</p>
              </div>
            </button>
            <button className="flex items-center justify-center gap-2 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
              <Archive className="text-slate-400 group-hover:text-amber-600" size={20} />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Archive Batch</p>
                <p className="text-[10px] text-slate-400">Move to Cold Storage</p>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[11px] font-medium uppercase tracking-widest gap-4">
          <p>IntelliCore Forensic Audit System &copy; 2026</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Retention Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Chain of Custody</a>
            <a href="#" className="hover:text-slate-900 transition-colors">API Access</a>
          </div>
        </div>

      </div>
    </div>
  );
}