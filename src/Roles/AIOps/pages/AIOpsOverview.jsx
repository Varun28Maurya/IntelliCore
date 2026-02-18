import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from 'recharts';
import { 
  Activity, 
  Server, 
  Layers, 
  ShieldAlert, 
  Zap, 
  Database, 
  Clock, 
  ChevronRight, 
  MoreHorizontal,
  ArrowUpRight,
  RefreshCcw,
  Cpu,
  Globe,
  HardDrive,
  Box,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

// --- Mock Data ---

const kpiData = [
  { label: 'System Uptime', value: '99.98%', trend: '+0.02%', status: 'Healthy' },
  { label: 'Active Deployments', value: '24', trend: '+2 new', status: 'Healthy' },
  { label: 'Healthy Pipelines', value: '142/145', trend: '3 warning', status: 'Warning' },
  { label: 'Active Incidents', value: '3', trend: '-2 vs last 24h', status: 'Critical' },
  { label: 'Avg API Latency', value: '184ms', trend: '-12ms', status: 'Healthy' },
  { label: 'Resource Utilization', value: '62.4%', trend: '+4.1%', status: 'Healthy' },
];

const infraHealth = [
  { name: 'Compute Nodes', status: 'Healthy', details: '128/128 Online' },
  { name: 'API Gateway', status: 'Healthy', details: 'p99 240ms' },
  { name: 'Database Cluster', status: 'Degraded', details: 'Replica lag: 200ms' },
  { name: 'Feature Store', status: 'Healthy', details: 'Sync latency: 12ms' },
  { name: 'Model Serving', status: 'Healthy', details: '14 endpoints active' },
];

const deploymentHistory = [
  { time: '08:00', deployments: 4, rollbacks: 0 },
  { time: '10:00', deployments: 8, rollbacks: 1 },
  { time: '12:00', deployments: 12, rollbacks: 0 },
  { time: '14:00', deployments: 15, rollbacks: 0 },
  { time: '16:00', deployments: 9, rollbacks: 1 },
  { time: '18:00', deployments: 6, rollbacks: 0 },
];

const pipelines = [
  { name: 'Credit_Scoring_Batch', type: 'Batch', lastRun: '12m ago', status: 'Success', errors: 0 },
  { name: 'Fraud_Realtime_Ingest', type: 'Real-time', lastRun: 'Active', status: 'Running', errors: 0 },
  { name: 'Customer_Churn_Training', type: 'Batch', lastRun: '2h ago', status: 'Failed', errors: 14 },
  { name: 'LLM_FineTune_Sync', type: 'Batch', lastRun: 'Delayed', status: 'Delayed', errors: 0 },
];

const resourceUtilization = [
  { category: 'CPU', value: 68 },
  { category: 'Memory', value: 82 },
  { category: 'GPU', value: 45 },
  { category: 'Network', value: 34 },
];

const resourceStats = [
  { label: 'Container Count', value: '1,240' },
  { label: 'Avg Scaling Time', value: '42s' },
  { label: 'Infra Cost (7d)', value: '$14.2k' },
  { label: 'Peak Load %', value: '88.4%' },
];

const incidents = [
  { id: 'INC-4421', severity: 'Critical', service: 'Serving Cluster', status: 'Investigating', time: '1h 12m' },
  { id: 'INC-4418', severity: 'High', service: 'Feature Store', status: 'Mitigated', time: '2h 45m' },
  { id: 'INC-4410', severity: 'Medium', service: 'API Gateway', status: 'Resolved', time: '5h 10m' },
];

// --- Subcomponents ---

const StatusBadge = ({ status }) => {
  const styles = {
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Delayed: 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
    Failed: 'bg-rose-50 text-rose-700 border-rose-100',
    Running: 'bg-blue-50 text-blue-700 border-blue-100',
    Investigating: 'bg-rose-50 text-rose-700 border-rose-100',
    Mitigated: 'bg-amber-50 text-amber-700 border-amber-100',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
      {status.toUpperCase()}
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

// --- Main Application Component ---

export default function AIOpsOverview() {
  const [env, setEnv] = useState('Prod');

  return (
    <div className="bg-slate-50 p-6 space-y-6 min-h-screen font-sans text-slate-900">
      
      {/* SECTION 1: Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AIOps Overview</h1>
          <p className="text-slate-500 text-sm font-medium italic">Unified infrastructure and deployment monitoring across AI systems.</p>
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
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* SECTION 2: Top KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, i) => (
          <MetricCard key={i} {...kpi} />
        ))}
      </div>

      {/* SECTION 3: Infrastructure Health Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Server size={20} className="text-slate-400" />
          Infrastructure Stack Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {infraHealth.map((item, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 transition-all hover:border-slate-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</span>
                <div className={`w-2 h-2 rounded-full ${item.status === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </div>
              <p className="text-xs font-bold text-slate-800">{item.status}</p>
              <p className="text-[10px] text-slate-500 mt-1">{item.details}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 4: Deployment Activity Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Layers size={20} className="text-slate-400" />
            Deployment & Rollback Activity
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deploymentHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '11px', paddingBottom: '20px', fontWeight: 'bold' }} />
                <Line name="Deployments" type="monotone" dataKey="deployments" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                <Line name="Rollbacks" type="monotone" dataKey="rollbacks" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 5: Pipeline Monitoring Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Zap size={20} className="text-slate-400" />
              Pipeline Execution Summary
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Pipeline Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Last Run</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Errors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pipelines.map((pipe, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{pipe.name}</td>
                    <td className="px-6 py-4 text-slate-500">{pipe.type}</td>
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-600">{pipe.lastRun}</td>
                    <td className="px-6 py-4"><StatusBadge status={pipe.status} /></td>
                    <td className={`px-6 py-4 text-right font-bold ${pipe.errors > 0 ? 'text-rose-600' : 'text-slate-400'}`}>{pipe.errors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 6: Resource Utilization Panel */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-slate-400" />
            Computing Resource Utilization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceUtilization} margin={{ top: 0, right: 30, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 'bold' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[0, 100]} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40}>
                    {resourceUtilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 80 ? '#f43f5e' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {resourceStats.map((stat, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  <p className="text-xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 7: Incident Snapshot */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShieldAlert size={20} className="text-slate-400" />
              Incident Snapshot
            </h2>
          </div>
          <div className="flex-1">
            {incidents.map((incident, i) => (
              <div key={i} className="flex items-center justify-between p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-default">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">{incident.id}</span>
                    <SeverityBadge level={incident.severity} />
                  </div>
                  <p className="text-sm font-bold text-slate-900">{incident.service}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={incident.status} />
                    <span className="text-[10px] text-slate-400 font-medium">Open: {incident.time}</span>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <button className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
              View All Incidents
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}