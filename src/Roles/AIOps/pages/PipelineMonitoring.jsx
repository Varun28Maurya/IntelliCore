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
  Zap, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  Filter, 
  ChevronRight, 
  Play, 
  Pause, 
  Settings, 
  History,
  ShieldCheck,
  User,
  MoreHorizontal
} from 'lucide-react';

// --- Mock Data ---

const summaryData = [
  { label: 'Active Pipelines', value: '24', trend: '+2 new', status: 'Stable' },
  { label: 'Failed Jobs (24h)', value: '3', trend: '-1 vs yesterday', status: 'Failed' },
  { label: 'Avg Job Duration', value: '14.2m', trend: '-1.5m', status: 'Stable' },
  { label: 'Delayed Pipelines', value: '5', trend: '+2 vs last cycle', status: 'Delayed' },
];

const pipelineStatus = [
  { name: 'Credit_Risk_Inference_Batch', type: 'Batch', owner: 'A. Sharma', lastRun: '12m ago', duration: '18m 20s', status: 'Success', errors: 0 },
  { name: 'Fraud_Detection_Streaming', type: 'Real-time', owner: 'M. Patel', lastRun: 'Active', duration: 'N/A', status: 'Running', errors: 0 },
  { name: 'Customer_Sentiment_ETL', type: 'Batch', owner: 'S. Weaver', lastRun: '1h 04m ago', status: 'Failed', duration: '4m 12s', errors: 12 },
  { name: 'Feature_Store_Sync_Global', type: 'Real-time', owner: 'System', lastRun: 'Active', duration: 'N/A', status: 'Delayed', errors: 2 },
  { name: 'Retraining_Llama3_LoanApp', type: 'Batch', owner: 'A. Sharma', lastRun: 'Yesterday', duration: '4h 12m', status: 'Paused', errors: 0 },
];

const executionTrend = [
  { time: '08:00', success: 42, failed: 1, duration: 12 },
  { time: '10:00', success: 38, failed: 2, duration: 15 },
  { time: '12:00', success: 45, failed: 0, duration: 14 },
  { time: '14:00', success: 52, failed: 4, duration: 18 },
  { time: '16:00', success: 48, failed: 1, duration: 16 },
  { time: '18:00', success: 44, failed: 1, duration: 13 },
];

const failureAnalysis = [
  { type: 'Schema Mismatch', count: 42, percent: 45 },
  { type: 'Data Validation', count: 28, percent: 30 },
  { type: 'Timeout', count: 14, percent: 15 },
  { type: 'Dependency Error', count: 9, percent: 10 },
];

const pipelineIncidents = [
  { id: 'INC-7721', pipeline: 'Credit_Risk_Batch', cause: 'Upstream schema change', severity: 'High', status: 'Open', time: '1h 12m' },
  { id: 'INC-7718', pipeline: 'Fraud_Detection_Stream', cause: 'Kafka consumer lag', severity: 'Medium', status: 'Investigating', time: '2h 45m' },
  { id: 'INC-7710', pipeline: 'Customer_Sentiment', cause: 'OOM Exception', severity: 'Critical', status: 'Resolved', time: '5h 10m' },
];

// --- Subcomponents ---

const Badge = ({ status }) => {
  const styles = {
    Success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Stable: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Running: 'bg-blue-50 text-blue-700 border-blue-100',
    Delayed: 'bg-amber-50 text-amber-700 border-amber-100',
    Amber: 'bg-amber-50 text-amber-700 border-amber-100',
    Failed: 'bg-rose-50 text-rose-700 border-rose-100',
    Paused: 'bg-slate-100 text-slate-500 border-slate-200',
    Investigating: 'bg-blue-50 text-blue-700 border-blue-100',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Open: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
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

const KPIBox = ({ label, value, trend, status }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <Badge status={status} />
    </div>
    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    <p className="text-[11px] text-slate-400 mt-1 font-medium italic">{trend}</p>
  </div>
);

// --- Main Component ---

export default function PipelineMonitoring() {
  const [filter, setFilter] = useState('All');

  return (
    <div className="bg-slate-50 p-6 space-y-6 min-h-screen font-sans text-slate-900">
      
      {/* SECTION 1: Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline Monitoring</h1>
          <p className="text-slate-500 text-sm font-medium italic">Real-time tracking of ML and LLM data workflows.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {['All', 'Batch', 'Real-time'].map((type) => (
              <button 
                key={type} 
                onClick={() => setFilter(type)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === type ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {type}
              </button>
            ))}
          </div>
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none">
            <option>Production</option>
            <option>UAT</option>
          </select>
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
          </select>
        </div>
      </div>

      {/* SECTION 2: Pipeline Health Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((kpi, i) => (
          <KPIBox key={i} {...kpi} />
        ))}
      </div>

      {/* SECTION 3: Pipeline Status Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Activity size={20} className="text-slate-400" />
            Live Pipeline Registry
          </h2>
          <button className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-1 transition-colors">
            <History size={14} /> Historical View
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Pipeline Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Last Run</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Errors</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pipelineStatus.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-900">{row.name}</td>
                  <td className="px-6 py-4 text-slate-500">{row.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-300" />
                      {row.owner}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-[11px] text-slate-600">{row.lastRun}</td>
                  <td className="px-6 py-4 text-slate-500">{row.duration}</td>
                  <td className="px-6 py-4"><Badge status={row.status} /></td>
                  <td className={`px-6 py-4 font-bold ${row.errors > 0 ? 'text-rose-600' : 'text-slate-300'}`}>{row.errors}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-300 hover:text-slate-900 group-hover:scale-110 transition-transform">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 4: Job Execution Trend Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">Execution Trend</h2>
              <p className="text-sm text-slate-500">Volume and success metrics across all trigger events</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={executionTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '11px', paddingBottom: '20px', fontWeight: 'bold' }} />
                <Line name="Success" type="monotone" dataKey="success" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                <Line name="Failures" type="monotone" dataKey="failed" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }} />
                <Line name="Duration (m)" type="monotone" dataKey="duration" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 5: Failure Analysis Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-bold">Failure Type Analysis</h2>
            <p className="text-sm text-slate-500">Breakdown of primary pipeline interruption causes</p>
          </div>
          <div className="flex-1 space-y-6">
            {failureAnalysis.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">{item.type}</span>
                  <span className="text-slate-400">{item.count} incidents ({item.percent}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${i === 0 ? 'bg-rose-500' : i === 1 ? 'bg-amber-500' : 'bg-slate-400'}`} 
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-slate-100 flex items-start gap-3">
              <AlertCircle className="text-amber-500 mt-0.5" size={18} />
              <p className="text-xs text-slate-500 leading-relaxed italic">
                Recommendation: Schema mismatch incidents have increased by 15% this week. Review upstream data contract stability.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 6: SLA Compliance */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
            <ShieldCheck size={20} className="text-slate-400" />
            SLA Compliance
          </h2>
          <div className="flex flex-col items-center justify-center py-4 flex-1">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="364.4" strokeDashoffset="22" className="text-emerald-500" strokeLinecap="round" />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold text-slate-900 block">94.2%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global SLA</span>
              </div>
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-xs font-bold px-1">
              <span className="text-slate-500">SLA Target: 99.0%</span>
              <span className="text-rose-600">-4.8% Gap</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Missed Deadlines</p>
                <p className="text-lg font-bold">14</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Delay</p>
                <p className="text-lg font-bold">42m</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: Recent Pipeline Incidents */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Zap size={20} className="text-slate-400" />
              Recent Service Incidents
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Incident ID</th>
                  <th className="px-6 py-4">Pipeline</th>
                  <th className="px-6 py-4">Root Cause</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Time Open</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pipelineIncidents.map((incident, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors cursor-default">
                    <td className="px-6 py-4 font-mono text-[11px] font-bold text-slate-400">{incident.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{incident.pipeline}</td>
                    <td className="px-6 py-4 text-slate-600 italic">"{incident.cause}"</td>
                    <td className="px-6 py-4"><SeverityBadge level={incident.severity} /></td>
                    <td className="px-6 py-4"><Badge status={incident.status} /></td>
                    <td className="px-6 py-4 text-right font-medium text-slate-400">{incident.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}