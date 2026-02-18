import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  User, 
  ShieldAlert, 
  MessageSquare, 
  ArrowRight, 
  ChevronRight,
  Filter,
  Plus,
  MoreVertical,
  Activity,
  UserPlus
} from 'lucide-react';

// --- Mock Data ---

const summaryData = [
  { label: 'Active Alerts', value: '14', trend: '+2 since last hour', status: 'Warning' },
  { label: 'Critical Incidents', value: '2', trend: 'Unchanged', status: 'Critical' },
  { label: 'Avg Resolution Time', value: '24m', trend: '-4m vs yesterday', status: 'Stable' },
  { label: 'Open Investigations', value: '5', trend: '+1 new', status: 'Warning' },
];

const activeAlerts = [
  { id: 'AL-9021', category: 'Security', model: 'GPT-4o (Prod)', severity: 'Critical', triggered: '14:22:10', status: 'Open' },
  { id: 'AL-8994', category: 'Accuracy', model: 'Claude-3.5', severity: 'High', triggered: '14:18:45', status: 'Investigating' },
  { id: 'AL-8982', category: 'Latency', model: 'Llama-3-70B', severity: 'Medium', triggered: '13:55:20', status: 'Investigating' },
  { id: 'AL-8975', category: 'Safety', model: 'GPT-4o (Prod)', severity: 'High', triggered: '13:40:12', status: 'Resolved' },
  { id: 'AL-8960', category: 'Infrastructure', model: 'Vector DB', severity: 'Low', triggered: '13:10:05', status: 'Resolved' },
];

const timelineEvents = [
  { step: 'Incident Created', time: '14:22', engineer: 'System Agent', desc: 'Critical prompt injection pattern detected in stream.' },
  { step: 'Investigation Started', time: '14:28', engineer: 'A. Sharma', desc: 'Analyzing trace logs for specific user IP segment.' },
  { step: 'Escalated', time: '14:35', engineer: 'A. Sharma', desc: 'Internal security team notified for firewall rule update.' },
  { step: 'Resolved', time: 'Pending', engineer: '-', desc: 'Awaiting confirmation of rule propagation.' },
];

const alertTrend = [
  { time: '10:00', alerts: 4, incidents: 1 },
  { time: '11:00', alerts: 7, incidents: 1 },
  { time: '12:00', alerts: 5, incidents: 0 },
  { time: '13:00', alerts: 12, incidents: 2 },
  { time: '14:00', alerts: 15, incidents: 3 },
  { time: '15:00', alerts: 9, incidents: 1 },
];

const escalationPolicies = [
  { category: 'Prompt Injection', threshold: 'Critical', path: 'Security Team', sla: '15 min' },
  { category: 'Hallucination Spike', threshold: 'High', path: 'LLM Engineering', sla: '60 min' },
  { category: 'Latency Degradation', threshold: 'Medium', path: 'DevOps / SRE', sla: '2 hours' },
  { category: 'Token Exhaustion', threshold: 'High', path: 'Finance Ops', sla: '30 min' },
];

// --- Subcomponents ---

const StatusBadge = ({ status }) => {
  const styles = {
    Open: 'bg-rose-50 text-rose-700 border-rose-100',
    Investigating: 'bg-amber-50 text-amber-700 border-amber-100',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Stable: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

const SeverityIndicator = ({ level }) => {
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

const KPICard = ({ label, value, trend, status }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <StatusBadge status={status} />
    </div>
    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    <p className="text-[11px] text-slate-400 mt-1 font-medium italic">{trend}</p>
  </div>
);

// --- Main Component ---

export default function LLMAlertsIncidents() {
  const [selectedIncident, setSelectedIncident] = useState('INC-9021');

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* SECTION 1: Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Alerts & Incident Management</h1>
            <p className="text-slate-500 text-sm font-medium italic">Monitor and resolve LLM operational and safety incidents across production fleet.</p>
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
            <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2">
              <Plus size={18} /> Create Incident
            </button>
          </div>
        </div>

        {/* SECTION 2: Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((kpi, i) => (
            <KPICard key={i} {...kpi} />
          ))}
        </div>

        {/* SECTION 3: Active Alerts Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold">Active Alerts Stream</h2>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
              <Activity size={14} className="text-emerald-500" />
              Real-time monitoring enabled
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Alert ID</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Target Model</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Triggered At</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-600">{alert.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{alert.category}</td>
                    <td className="px-6 py-4 text-slate-500">{alert.model}</td>
                    <td className="px-6 py-4"><SeverityIndicator level={alert.severity} /></td>
                    <td className="px-6 py-4 font-mono text-slate-500">{alert.triggered}</td>
                    <td className="px-6 py-4"><StatusBadge status={alert.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[11px] font-bold text-slate-900 hover:underline uppercase flex items-center justify-end ml-auto">
                        View <ChevronRight size={14} className="ml-0.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* SECTION 4: Incident Timeline Panel */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Clock size={18} className="text-slate-400" />
              Incident Timeline: {selectedIncident}
            </h2>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 flex-1">
              {timelineEvents.map((event, i) => (
                <div key={i} className="relative pl-8">
                  <div className={`absolute left-0 top-1 w-6 h-6 bg-white border-2 rounded-full flex items-center justify-center z-10 ${event.time === 'Pending' ? 'border-slate-200' : 'border-slate-900'}`}>
                    <div className={`w-2 h-2 rounded-full ${event.time === 'Pending' ? 'bg-slate-100' : 'bg-slate-900'}`} />
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
            <button className="mt-8 w-full py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
              View Audit History
            </button>
          </div>

          {/* SECTION 5: Incident Detail Panel */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <ShieldAlert size={20} className="text-rose-600" />
                  Incident Details: {selectedIncident}
                </h2>
                <p className="text-xs text-slate-400 font-medium">Categorized as High-Risk Security Event</p>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><MoreVertical size={20} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Impact Level</span>
                <p className="text-sm font-bold text-rose-600">Tier 1 - High Exposure</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Affected Models</span>
                <p className="text-sm font-bold text-slate-900">GPT-4o, Claude-3.5</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Related Alerts</span>
                <p className="text-sm font-bold text-slate-900 underline">AL-9021, AL-8994</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Root Cause Summary</h4>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed">
                  Malicious prompt payload bypassed standard string-matching guardrails via base64 encoded sequence. System agent flagged anomaly based on unusual token distribution variance.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Assign Lead Engineer</label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <select className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-slate-100">
                      <option>A. Sharma (Security)</option>
                      <option>M. Patel (LLM Ops)</option>
                      <option>J. Doe (Platform)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Update Status</label>
                  <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-slate-100">
                    <option>Investigating</option>
                    <option>On Hold</option>
                    <option>Mitigated</option>
                    <option>Resolved</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Internal Discussion</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <MessageSquare className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Add a comment or update to the incident log..." 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
                    />
                  </div>
                  <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6 & 7: Trend & Policy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-6">Alert & Incident Volume Trend</h2>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={alertTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '11px', paddingBottom: '20px', fontWeight: 'bold' }} />
                  <Line name="Alerts" type="monotone" dataKey="alerts" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  <Line name="Incidents" type="monotone" dataKey="incidents" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Escalation Policy Matrix</h2>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">V2.4 Compliance</span>
            </div>
            <div className="space-y-3">
              {escalationPolicies.map((policy, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 group-hover:text-slate-900 transition-colors">
                      <ShieldAlert size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{policy.category}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">SLA: {policy.sla}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Path</p>
                      <p className="text-xs font-bold text-slate-700">{policy.path}</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}