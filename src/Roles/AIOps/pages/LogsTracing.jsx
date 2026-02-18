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
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Terminal, 
  Search, 
  Download, 
  Filter, 
  Clock, 
  Activity, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  Cpu, 
  Database, 
  Globe, 
  Zap, 
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';

// --- Mock Data ---

const summaryMetrics = [
  { label: 'Total Logs (24h)', value: '1.2M', trend: '+12% vs avg', status: 'Normal' },
  { label: 'Error Logs', value: '428', trend: '+86 since 08:00', status: 'Warning' },
  { label: 'Critical Events', value: '12', trend: 'Unchanged', status: 'Critical' },
  { label: 'Avg Response Time', value: '184ms', trend: '-12ms optimization', status: 'Normal' },
];

const logTrendData = [
  { time: '08:00', info: 4200, warning: 120, error: 15, critical: 1 },
  { time: '10:00', info: 5100, warning: 145, error: 22, critical: 0 },
  { time: '12:00', info: 4800, warning: 210, error: 45, critical: 3 },
  { time: '14:00', info: 6200, warning: 180, error: 38, critical: 2 },
  { time: '16:00', info: 5900, warning: 160, error: 28, critical: 1 },
  { time: '18:00', info: 5500, warning: 130, error: 20, critical: 0 },
];

const liveLogs = [
  { time: '14:42:10.402', service: 'API-Gateway', level: 'INFO', traceId: 'tr-99021', msg: 'Incoming request POST /v1/models/credit-risk/predict' },
  { time: '14:42:10.422', service: 'Auth-Service', level: 'INFO', traceId: 'tr-99021', msg: 'JWT validation successful for uid_8842' },
  { time: '14:42:10.510', service: 'Model-Service', level: 'WARNING', traceId: 'tr-99021', msg: 'Prediction confidence below threshold (0.64)' },
  { time: '14:41:55.102', service: 'Vector-DB', level: 'ERROR', traceId: 'tr-99018', msg: 'Connection timeout during index lookup' },
  { time: '14:41:30.005', service: 'Inference-Node', level: 'CRITICAL', traceId: 'tr-99012', msg: 'OOM Killer terminated worker process 1402' },
  { time: '14:40:12.882', service: 'Feature-Store', level: 'INFO', traceId: 'tr-99008', msg: 'Cache hit for entity "customer_prime_99"' },
];

const traceBreakdown = {
  id: 'tr-99021',
  path: 'POST /v1/models/credit-risk/predict',
  total: '184ms',
  status: 'Completed',
  segments: [
    { name: 'API Gateway', duration: 12, color: 'bg-blue-400' },
    { name: 'Auth Service', duration: 8, color: 'bg-indigo-400' },
    { name: 'Model Service', duration: 124, color: 'bg-purple-500' },
    { name: 'Feature Store', duration: 15, color: 'bg-emerald-400' },
    { name: 'Database', duration: 25, color: 'bg-amber-400' },
  ]
};

const errorDistData = [
  { category: 'Model Errors', value: 45 },
  { category: 'Timeout Errors', value: 25 },
  { category: 'Dependency Failures', value: 15 },
  { category: 'Validation Errors', value: 10 },
  { category: 'Security Alerts', value: 5 },
];

const anomalySparkline = [
  { val: 10 }, { val: 12 }, { val: 45 }, { val: 32 }, { val: 28 }, { val: 15 }, { val: 18 }
];

// --- Subcomponents ---

const LogLevelBadge = ({ level }) => {
  const styles = {
    INFO: 'bg-slate-100 text-slate-500 border-slate-200',
    WARNING: 'bg-amber-50 text-amber-600 border-amber-100',
    ERROR: 'bg-orange-50 text-orange-600 border-orange-100',
    CRITICAL: 'bg-rose-600 text-white border-rose-600',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${styles[level]}`}>
      {level}
    </span>
  );
};

const KPICard = ({ label, value, trend, status }) => {
  const statusColors = {
    Normal: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
      <p className="text-[11px] text-slate-400 mt-1 font-medium italic">{trend}</p>
    </div>
  );
};

// --- Main Application Component ---

export default function LogsTracing() {
  return (
    <div className="bg-slate-50 p-6 space-y-6 min-h-screen font-sans text-slate-900">
      
      {/* SECTION 1: Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Logs & Tracing</h1>
          <p className="text-slate-500 text-sm font-medium italic">Real-time log monitoring and distributed tracing analysis.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none transition-all focus:ring-2 focus:ring-slate-100">
              <option>Level: All</option>
              <option>Info</option>
              <option>Warning</option>
              <option>Error</option>
              <option>Critical</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none transition-all focus:ring-2 focus:ring-slate-100">
              <option>All Services</option>
              <option>Model-Service</option>
              <option>API-Gateway</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none transition-all focus:ring-2 focus:ring-slate-100">
              <option>Last 1 Hour</option>
              <option>Last 24 Hours</option>
            </select>
          </div>
          <button className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* SECTION 2: Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryMetrics.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </div>

      {/* SECTION 3: Log Volume Trend Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Activity size={20} className="text-slate-400" />
            System Log Volume Trends
          </h2>
          <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase">
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-slate-300 rounded-sm" /> Info</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-amber-400 rounded-sm" /> Warning</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-orange-400 rounded-sm" /> Error</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-rose-500 rounded-sm" /> Critical</span>
          </div>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={logTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Line name="Info" type="monotone" dataKey="info" stroke="#cbd5e1" strokeWidth={2} dot={false} />
              <Line name="Warning" type="monotone" dataKey="warning" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line name="Error" type="monotone" dataKey="error" stroke="#fb923c" strokeWidth={2} dot={false} />
              <Line name="Critical" type="monotone" dataKey="critical" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e', stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* SECTION 4: Live Log Stream Panel */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <Terminal size={16} className="text-slate-400" />
                Live Log Console
              </h2>
              <div className="relative max-w-xs flex-1">
                <Search className="absolute left-2.5 top-2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Filter logs..." 
                  className="w-full pl-8 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-100" 
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              CONNECTED
            </div>
          </div>
          <div className="overflow-auto flex-1 font-mono text-[11px] bg-slate-900 text-slate-300">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-800 text-slate-400 uppercase text-[9px] font-bold">
                <tr>
                  <th className="px-4 py-2">Timestamp</th>
                  <th className="px-4 py-2">Service</th>
                  <th className="px-4 py-2">Level</th>
                  <th className="px-4 py-2">Trace ID</th>
                  <th className="px-4 py-2">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {liveLogs.map((log, i) => (
                  <tr key={i} className={`hover:bg-slate-800/50 transition-colors ${log.level === 'CRITICAL' ? 'bg-rose-900/20' : ''}`}>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{log.time}</td>
                    <td className="px-4 py-3 font-bold text-slate-400">{log.service}</td>
                    <td className="px-4 py-3"><LogLevelBadge level={log.level} /></td>
                    <td className="px-4 py-3 text-blue-400 underline cursor-pointer">{log.traceId}</td>
                    <td className={`px-4 py-3 ${log.level === 'ERROR' ? 'text-orange-300' : log.level === 'CRITICAL' ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                      {log.msg}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5: Distributed Trace Viewer */}
        <div className="xl:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Zap size={18} className="text-slate-400" />
            Distributed Trace Viewer
          </h2>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Trace</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={12} /> {traceBreakdown.status}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 font-mono truncate">{traceBreakdown.id}</p>
            <p className="text-xs text-slate-500 mt-1">{traceBreakdown.path}</p>
            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Latency</p>
                <p className="text-xl font-bold text-slate-900">{traceBreakdown.total}</p>
              </div>
              <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase">View Full Graph</button>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Latency Breakdown</p>
            {traceBreakdown.segments.map((seg, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-700">{seg.name}</span>
                  <span className="text-slate-900">{seg.duration}ms</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${seg.color}`} 
                    style={{ width: `${(seg.duration / 184) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        
        {/* SECTION 6: Error Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-6">Error Category Distribution</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={errorDistData} layout="vertical" margin={{ left: 20, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold' }} width={120} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {errorDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : '#64748b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-end gap-2">
             <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">N = 428 failures detected</span>
          </div>
        </div>

        {/* SECTION 7: Anomaly Detection Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold">Log Anomaly Signals</h2>
              <p className="text-sm text-slate-500">Pattern recognition across service stdout</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 flex items-center gap-1">
                <AlertTriangle size={14} /> High Confidence
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 flex-1">
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Anomalies Detected</p>
                <p className="text-2xl font-bold text-rose-600">08</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Most Impacted</p>
                <p className="text-sm font-bold text-slate-900">Inference-Node-A2</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Confidence Score</p>
                <p className="text-sm font-bold text-emerald-600 underline decoration-emerald-200 decoration-2">94.2% ML Verified</p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={anomalySparkline}>
                    <Area type="monotone" dataKey="val" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-4 shadow-sm">
                 Run Root Cause Analysis <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}