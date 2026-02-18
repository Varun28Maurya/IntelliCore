import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  Rocket, 
  RefreshCcw, 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  User, 
  Clock, 
  ChevronRight, 
  Filter, 
  ArrowUpRight, 
  RotateCcw,
  Zap,
  Layers,
  History,
  Terminal,
  MoreHorizontal
} from 'lucide-react';

// --- Mock Data ---

const summaryMetrics = [
  { label: 'Active Versions', value: '18', trend: '+2 new', status: 'Stable' },
  { label: 'Successful Deployments (7d)', value: '42', trend: '100% success rate', status: 'Stable' },
  { label: 'Rollbacks (7d)', value: '3', trend: '+1 vs last week', status: 'Warning' },
  { label: 'Failed Releases', value: '1', trend: '-2 vs last month', status: 'Critical' },
];

const activityData = [
  { time: 'Feb 12', deployments: 4, rollbacks: 0, failures: 0 },
  { time: 'Feb 13', deployments: 8, rollbacks: 1, failures: 0 },
  { time: 'Feb 14', deployments: 5, rollbacks: 0, failures: 1 },
  { time: 'Feb 15', deployments: 12, rollbacks: 0, failures: 0 },
  { time: 'Feb 16', deployments: 9, rollbacks: 2, failures: 0 },
  { time: 'Feb 17', deployments: 15, rollbacks: 0, failures: 0 },
  { time: 'Feb 18', deployments: 11, rollbacks: 0, failures: 0 },
];

const versionHistory = [
  { id: 'v3.4.2-final', model: 'CreditRisk_XGB', env: 'Prod', user: 'A. Sharma', time: '2h ago', status: 'Live' },
  { id: 'v3.4.1-canary', model: 'CreditRisk_XGB', env: 'Prod', user: 'System', time: '4h ago', status: 'Canary' },
  { id: 'v2.1.0-hotfix', model: 'FraudDet_Llama', env: 'Prod', user: 'M. Patel', time: 'Yesterday', status: 'Rolled Back' },
  { id: 'v4.0.0-rc1', model: 'LoanApp_GenAI', env: 'UAT', user: 'S. Weaver', time: '2 days ago', status: 'Failed' },
  { id: 'v3.4.0-stable', model: 'CreditRisk_XGB', env: 'Prod', user: 'A. Sharma', time: '3 days ago', status: 'Live' },
];

const canaryComparison = [
  { group: 'Stable', error: 0.02, latency: 180 },
  { group: 'Canary', error: 0.05, latency: 210 },
];

const slaMetrics = [
  { label: 'Avg Deployment Time', value: 85, target: 100, unit: 'm', color: 'bg-emerald-500' },
  { label: 'Deployment Success Rate', value: 98.2, target: 99.5, unit: '%', color: 'bg-emerald-500' },
  { label: 'Approval Lead Time', value: 142, target: 120, unit: 'm', color: 'bg-amber-500' },
];

const deploymentIncidents = [
  { id: 'D-4421', version: 'v2.1.0-hotfix', service: 'Fraud-API', severity: 'Critical', cause: 'OOM during weights load', status: 'Resolved' },
  { id: 'D-4418', version: 'v4.0.0-rc1', service: 'Loan-UI', severity: 'High', cause: 'Internal API timeout', status: 'Investigating' },
];

// --- Subcomponents ---

const StatusBadge = ({ status }) => {
  const styles = {
    Live: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Stable: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Canary: 'bg-blue-50 text-blue-700 border-blue-100',
    'Rolled Back': 'bg-amber-50 text-amber-700 border-amber-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Failed: 'bg-rose-50 text-rose-700 border-rose-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
      {status?.toUpperCase()}
    </span>
  );
};

const SeverityBadge = ({ level }) => {
  const styles = {
    Critical: 'bg-rose-600 text-white',
    High: 'bg-orange-100 text-orange-700',
    Medium: 'bg-amber-100 text-amber-700',
    Low: 'bg-slate-100 text-slate-500',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${styles[level]}`}>
      {level}
    </span>
  );
};

const MetricCard = ({ label, value, trend, status }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <StatusBadge status={status} />
    </div>
    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    <p className="text-[11px] text-slate-400 mt-1 font-medium italic">{trend}</p>
  </div>
);

// --- Main Component ---

export default function DeploymentTracking() {
  const [env, setEnv] = useState('Prod');

  return (
    <div className="bg-slate-50 p-6 space-y-6 min-h-screen font-sans text-slate-900">
      
      {/* SECTION 1: Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deployment Tracking</h1>
          <p className="text-slate-500 text-sm font-medium italic">Monitor AI model releases, rollouts, and environment stability.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {['Prod', 'UAT', 'Dev'].map((e) => (
              <button 
                key={e} 
                onClick={() => setEnv(e)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${env === e ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {e}
              </button>
            ))}
          </div>
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none">
            <option>All Model Versions</option>
            <option>XGBoost (Credit)</option>
            <option>Llama-3 (Support)</option>
          </select>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95">
            <Rocket size={18} /> Deploy New Version
          </button>
        </div>
      </div>

      {/* SECTION 2: Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryMetrics.map((kpi, i) => (
          <MetricCard key={i} {...kpi} />
        ))}
      </div>

      {/* Main Grid for History and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SECTION 4: Version History Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <History size={20} className="text-slate-400" />
              Deployment History
            </h2>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
              <Terminal size={14} />
              v3.4.2 Current Stable
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Version ID</th>
                  <th className="px-6 py-4">Model Name</th>
                  <th className="px-6 py-4">Env</th>
                  <th className="px-6 py-4">Deployed By</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {versionHistory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono font-bold text-slate-600">{row.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{row.model}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{row.env}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-slate-300" />
                        <span className="text-slate-700">{row.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400">{row.time}</td>
                    <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-900">
                          <MoreHorizontal size={18} />
                        </button>
                        {row.status === 'Live' && (
                          <button className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-bold border border-amber-200 hover:bg-amber-100 transition-colors">
                            ROLLBACK
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: Deployment Activity Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-slate-400" />
            Activity Timeline
          </h2>
          <div className="h-[250px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '10px', paddingBottom: '20px' }} />
                <Line name="Deploy" type="monotone" dataKey="deployments" stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line name="Rollback" type="monotone" dataKey="rollbacks" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                <Line name="Fail" type="monotone" dataKey="failures" stroke="#f43f5e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Avg Weekly Velocity</span>
              <span className="text-slate-900">12.4 deploys/day</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION 5: Canary Monitoring Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Canary Traffic Monitoring</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">15% Traffic Allocated</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={canaryComparison} barGap={8}>
                  <XAxis dataKey="group" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold' }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="error" name="Error Rate" radius={[4, 4, 0, 0]} barSize={32}>
                    {canaryComparison.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#f43f5e'} />
                    ))}
                  </Bar>
                  <Bar dataKey="latency" name="Latency (ms)" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 justify-center flex flex-col">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Decision Status</span>
                <span className="text-sm font-bold text-blue-600">Pending Review</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm">
                  PROMOTE
                </button>
                <button className="flex-1 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-50 transition-all">
                  HALT & REVERT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: Deployment SLA Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-6">Service Level Performance</h2>
          <div className="space-y-6">
            {slaMetrics.map((sla, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600">{sla.label}</span>
                  <span className="text-slate-900">{sla.value}{sla.unit} <span className="text-slate-400 font-medium">/ {sla.target}{sla.unit} target</span></span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${sla.color}`} 
                    style={{ width: `${Math.min((sla.value / sla.target) * 100, 100)}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
            <ShieldCheck size={18} className="text-emerald-600 mt-0.5" />
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Global deployment stability is <span className="font-bold">above target (98.2%)</span>. Approval velocity has improved by 12% since v3.4 release.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 7: Recent Deployment Incidents */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <AlertCircle size={20} className="text-rose-500" />
            Recent Deployment Incidents
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Incident ID</th>
                <th className="px-6 py-4">Target Version</th>
                <th className="px-6 py-4">Impacted Service</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Root Cause</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deploymentIncidents.map((incident, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-[11px] font-bold text-slate-400">{incident.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{incident.version}</td>
                  <td className="px-6 py-4 text-slate-700">{incident.service}</td>
                  <td className="px-6 py-4"><SeverityBadge level={incident.severity} /></td>
                  <td className="px-6 py-4 text-slate-500 italic max-w-xs truncate">"{incident.cause}"</td>
                  <td className="px-6 py-4 text-right">
                    <StatusBadge status={incident.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
          <button className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest py-1 transition-colors">
            View Archived Release Issues
          </button>
        </div>
      </div>

    </div>
  );
}