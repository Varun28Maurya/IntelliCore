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
  ShieldAlert, 
  Clock, 
  User, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  MoreVertical, 
  ChevronRight, 
  Plus, 
  Filter, 
  ArrowUpRight, 
  Zap, 
  Server, 
  Layers,
  MessageSquare,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

// --- Mock Data ---

const summaryMetrics = [
  { label: 'Open Incidents', value: '8', trend: '+2 new', status: 'Warning' },
  { label: 'Critical Incidents', value: '2', trend: 'Active triage', status: 'Critical' },
  { label: 'Avg MTTR', value: '42m', trend: '-5m vs yesterday', status: 'Healthy' },
  { label: 'SLA Breaches (7d)', value: '1', trend: 'Within target', status: 'Healthy' },
];

const activeIncidents = [
  { id: 'INC-8802', category: 'ML Drift', system: 'CreditRisk_v3', severity: 'High', engineer: 'A. Sharma', time: '14:20', status: 'Investigating' },
  { id: 'INC-8801', category: 'Infra', system: 'API Gateway', severity: 'Critical', engineer: 'M. Patel', time: '13:55', status: 'Open' },
  { id: 'INC-8798', category: 'LLM Security', system: 'SupportBot_Prod', severity: 'Critical', engineer: 'Unassigned', time: '13:42', status: 'Open' },
  { id: 'INC-8792', category: 'Infra', system: 'Vector DB Cluster', severity: 'Medium', engineer: 'S. Weaver', time: '11:10', status: 'Investigating' },
  { id: 'INC-8785', category: 'Deployment', system: 'FraudDet_Llama', severity: 'Low', engineer: 'K. Tanaka', time: '09:30', status: 'Resolved' },
];

const timelineEvents = [
  { step: 'Incident Created', time: '14:20:05', engineer: 'System Agent', desc: 'Auto-detection of prediction drift (> 0.25 PSI).' },
  { step: 'Investigation Started', time: '14:28:12', engineer: 'A. Sharma', desc: 'Pulling training vs production feature distribution logs.' },
  { step: 'Escalated', time: '14:40:00', engineer: 'A. Sharma', desc: 'Escalated to Model Governance team for validation.' },
  { step: 'Root Cause Identified', time: '15:05:45', engineer: 'M. Gupta', desc: 'Upstream schema change in "Income" field detected.' },
  { step: 'Resolved', time: 'Pending', engineer: '-', desc: 'Awaiting pipeline fix propagation.' },
];

const rootCauseData = [
  { type: 'Infra Failure', value: 30, color: '#3b82f6' },
  { type: 'Model Drift', value: 25, color: '#a855f7' },
  { type: 'Pipeline Error', value: 20, color: '#f59e0b' },
  { type: 'Security', value: 15, color: '#f43f5e' },
  { type: 'Deployment', value: 10, color: '#64748b' },
];

const trendData = [
  { day: 'Mon', total: 12, critical: 2, resolved: 10 },
  { day: 'Tue', total: 8, critical: 1, resolved: 7 },
  { day: 'Wed', total: 15, critical: 4, resolved: 11 },
  { day: 'Thu', total: 10, critical: 2, resolved: 8 },
  { day: 'Fri', total: 9, critical: 1, resolved: 8 },
  { day: 'Sat', total: 5, critical: 0, resolved: 5 },
  { day: 'Sun', total: 6, critical: 1, resolved: 5 },
];

const escalationMatrix = [
  { level: 'Critical', team: 'AI Ops + Security', response: '15 min', resolution: '2 hours' },
  { level: 'High', team: 'ML Engineering', response: '30 min', resolution: '4 hours' },
  { level: 'Medium', team: 'System SRE', response: '2 hours', resolution: '12 hours' },
  { level: 'Low', team: 'Level 1 Ops', response: '4 hours', resolution: '48 hours' },
];

// --- Subcomponents ---

const StatusBadge = ({ status }) => {
  const styles = {
    Open: 'bg-rose-50 text-rose-700 border-rose-100',
    Investigating: 'bg-amber-50 text-amber-700 border-amber-100',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
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

// --- Main Component ---

export default function App() {
  const [selectedIncident] = useState('INC-8802');

  return (
    <div className="bg-slate-50 p-6 space-y-6 min-h-screen font-sans text-slate-900">
      
      {/* SECTION 1: Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Incident Management</h1>
          <p className="text-slate-500 text-sm font-medium italic">Track and resolve AI infrastructure and model incidents.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none">
              <option>Severity: All</option>
              <option>Critical</option>
              <option>High</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none">
              <option>Status: Open</option>
              <option>Investigating</option>
              <option>Resolved</option>
            </select>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95">
            <Plus size={18} /> Create Incident
          </button>
        </div>
      </div>

      {/* SECTION 2: Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryMetrics.map((kpi, i) => (
          <MetricCard key={i} {...kpi} />
        ))}
      </div>

      {/* Main Grid: Incidents Table and Lifecycle */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* SECTION 3: Active Incidents Table */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Activity size={20} className="text-slate-400" />
              Incident Command Registry
            </h2>
            <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              LIVE UPDATE
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">System / Category</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Engineer</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-slate-50 transition-colors group cursor-default">
                    <td className="px-6 py-5 font-mono font-bold text-slate-500">{incident.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{incident.system}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{incident.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5"><SeverityBadge level={incident.severity} /></td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-700 font-medium italic">
                        <User size={14} className="text-slate-300" />
                        {incident.engineer}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-mono text-[11px] text-slate-400">{incident.time}</td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        incident.status === 'Open' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        incident.status === 'Investigating' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {incident.status}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-900">
                          <ChevronRight size={18} />
                        </button>
                        {incident.severity === 'Critical' && incident.status !== 'Resolved' && (
                          <button className="px-2 py-1 bg-slate-900 text-white rounded-lg text-[9px] font-bold hover:bg-slate-800 transition-all">
                            ESCALATE
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

        {/* SECTION 4: Incident Lifecycle Timeline */}
        <div className="xl:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <Clock size={18} className="text-slate-400" />
            Timeline: {selectedIncident}
          </h2>
          <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 flex-1">
            {timelineEvents.map((event, i) => (
              <div key={i} className="relative pl-8 group">
                <div className={`absolute left-0 top-1 w-6 h-6 bg-white border-2 rounded-full flex items-center justify-center z-10 transition-colors ${
                  event.time === 'Pending' ? 'border-slate-200' : 'border-slate-900 group-hover:border-blue-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${event.time === 'Pending' ? 'bg-slate-100' : 'bg-slate-900 group-hover:bg-blue-600'}`} />
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-bold text-slate-900">{event.step}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{event.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{event.desc}</p>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  <User size={10} /> {event.engineer}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all uppercase tracking-widest">
            Detailed Audit History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION 5: Root Cause Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold mb-6">Root Cause Attribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rootCauseData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold' }} width={100} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {rootCauseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
               {rootCauseData.map((item, i) => (
                 <div key={i} className="flex justify-between items-center text-xs font-bold">
                   <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                     <span className="text-slate-600">{item.type}</span>
                   </div>
                   <span className="text-slate-900">{item.value}%</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* SECTION 6: Incident Trend Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Severity Trends</h2>
            <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" /> Total</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-rose-500 rounded-sm" /> Critical</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /> Resolved</span>
            </div>
          </div>
          <div className="h-[250px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line name="Total" type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line name="Critical" type="monotone" dataKey="critical" stroke="#f43f5e" strokeWidth={3} dot={false} />
                <Line name="Resolved" type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        
        {/* SECTION 7: SLA Compliance Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShieldCheck size={20} className="text-slate-400" />
            Service Level Compliance
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Current MTTR Performance</span>
                  <span className="text-emerald-600">92.4%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92.4%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>On-Time Resolution</span>
                  <span className="text-emerald-600">98.1%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98.1%' }} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Target SLA</p>
                <p className="text-xl font-bold text-slate-900">99.9%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Breach Count</p>
                <p className="text-xl font-bold text-rose-600">1</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Avg Response</p>
                <p className="text-xl font-bold text-slate-900">12m</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 8: Escalation Matrix */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h2 className="text-lg font-bold mb-6">Escalation Policy Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Team</th>
                  <th className="px-4 py-3">Response</th>
                  <th className="px-4 py-3 text-right">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {escalationMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4"><SeverityBadge level={row.level} /></td>
                    <td className="px-4 py-4 font-bold text-slate-700">{row.team}</td>
                    <td className="px-4 py-4 font-mono text-slate-500">{row.response}</td>
                    <td className="px-4 py-4 text-right font-mono text-slate-900 font-bold">{row.resolution}</td>
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