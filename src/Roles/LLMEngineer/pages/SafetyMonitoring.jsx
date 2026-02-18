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
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  Eye, 
  Activity, 
  Clock, 
  Filter, 
  Search, 
  ChevronRight, 
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Fingerprint,
  Zap
} from 'lucide-react';

// --- Mock Data ---

const kpiData = [
  { label: 'Prompt Injection Attempts', value: '142', threshold: '< 50', status: 'Critical', color: 'rose' },
  { label: 'Toxicity Score (Avg)', value: '0.04', threshold: '< 0.10', status: 'Healthy', color: 'emerald' },
  { label: 'PII Leakage Incidents', value: '3', threshold: '0', status: 'Warning', color: 'amber' },
  { label: 'Policy Violations', value: '28', threshold: '< 10', status: 'Critical', color: 'rose' },
];

const injectionTrend = [
  { time: '08:00', attempts: 12, suspicious: 24 },
  { time: '10:00', attempts: 18, suspicious: 32 },
  { time: '12:00', attempts: 45, suspicious: 58 },
  { time: '14:00', attempts: 32, suspicious: 41 },
  { time: '16:00', attempts: 28, suspicious: 35 },
  { time: '18:00', attempts: 39, suspicious: 48 },
];

const categoryData = [
  { name: 'Injection', count: 142 },
  { name: 'Toxic Content', count: 48 },
  { name: 'PII Exposure', count: 12 },
  { name: 'Exfiltration', count: 8 },
  { name: 'Jailbreak', count: 64 },
];

const severityData = [
  { name: 'Low', value: 400, color: '#94a3b8' },
  { name: 'Medium', value: 300, color: '#f59e0b' },
  { name: 'High', value: 200, color: '#f43f5e' },
  { name: 'Critical', value: 100, color: '#9f1239' },
];

const guardrailRules = [
  { name: 'PII Masking Filter', category: 'Privacy', threshold: '0 Errors', value: '3 Errors', status: 'Breached', lastTriggered: '14 mins ago' },
  { name: 'Injection Pattern Match', category: 'Security', threshold: '99% Block', value: '94% Block', status: 'Breached', lastTriggered: '2 mins ago' },
  { name: 'Toxicity Scraper v2', category: 'Safety', threshold: '< 0.1 Score', value: '0.04 Score', status: 'Healthy', lastTriggered: '5h ago' },
  { name: 'Financial Advice Guard', category: 'Policy', threshold: '100% Compliance', value: '100% Compliance', status: 'Healthy', lastTriggered: '3 days ago' },
  { name: 'Competitor Mention Block', category: 'Marketing', threshold: '0 Mentions', value: '1 Mention', status: 'Warning', lastTriggered: '1h ago' },
];

const highRiskTraces = [
  { id: 'tr-9942', rule: 'Injection Pattern Match', severity: 'Critical', action: 'Blocked', time: '2026-02-18 16:42' },
  { id: 'tr-9940', rule: 'PII Masking Filter', severity: 'High', action: 'Flagged', time: '2026-02-18 16:38' },
  { id: 'tr-9938', rule: 'Jailbreak Attempt', severity: 'Critical', action: 'Blocked', time: '2026-02-18 16:30' },
  { id: 'tr-9935', rule: 'Restricted Topic', severity: 'Medium', action: 'Logged', time: '2026-02-18 16:15' },
];

// --- Subcomponents ---

const StatusBadge = ({ status }) => {
  const styles = {
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
    Breached: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
      {status.toUpperCase()}
    </span>
  );
};

const MetricCard = ({ label, value, threshold, status, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <StatusBadge status={status} />
    </div>
    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    <div className="flex items-center mt-1">
      <p className="text-slate-400 text-xs font-medium">Threshold: {threshold}</p>
    </div>
  </div>
);

// --- Main Component ---

export default function LLMSafetyGuardrails() {
  const [env, setEnv] = useState('Prod');

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* SECTION 1: Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Safety & Guardrails Control Center</h1>
            <p className="text-slate-500 text-sm font-medium">Real-time monitoring of LLM safety signals and policy enforcement.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              {['Prod', 'UAT'].map((e) => (
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
            <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2">
              <ShieldCheck size={18} /> Run Safety Audit
            </button>
          </div>
        </div>

        {/* SECTION 2: KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, i) => (
            <MetricCard key={i} {...kpi} />
          ))}
        </div>

        {/* SECTION 3: Injection & Attack Trend */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">Injection & Attack Surface Trend</h2>
              <p className="text-sm text-slate-500">Correlation between confirmed attempts and suspicious prompt patterns</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-rose-500 rounded-full" /> Confirmed Attempts</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-300 rounded-full" /> Suspicious Patterns</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={injectionTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="attempts" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="suspicious" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 4: Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-1">Safety Categories Breakdown</h2>
            <p className="text-sm text-slate-500 mb-6">Volume of violations per policy group</p>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ left: 20, right: 40 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#475569' }} width={100} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold mb-1">Severity Distribution</h2>
            <p className="text-sm text-slate-500 mb-6">Prioritization of unresolved safety signals</p>
            <div className="h-[280px] w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SECTION 5: Guardrail Rules Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold">Guardrail Rule Performance</h2>
            <button className="text-xs font-bold text-blue-600 hover:underline">Configure Rules</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Rule Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Threshold</th>
                  <th className="px-6 py-4">Current Value</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {guardrailRules.map((rule, idx) => (
                  <tr key={idx} className={`hover:bg-slate-50 transition-colors ${rule.status === 'Breached' ? 'bg-rose-50/30' : ''}`}>
                    <td className="px-6 py-4 font-bold text-slate-900">{rule.name}</td>
                    <td className="px-6 py-4 text-slate-500">{rule.category}</td>
                    <td className="px-6 py-4 font-mono text-[11px]">{rule.threshold}</td>
                    <td className="px-6 py-4 font-mono font-bold">{rule.value}</td>
                    <td className="px-6 py-4"><StatusBadge status={rule.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:text-slate-900 transition-all">
                        View Rule
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SECTION 6: High-Risk Conversations */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold">High-Risk Conversation Audit</h2>
              <p className="text-sm text-slate-500">Recent sessions flagged for critical safety violations</p>
            </div>
            <div className="flex-1">
              {highRiskTraces.map((trace, i) => (
                <div key={i} className="flex items-center justify-between p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-1.5 h-12 rounded-full ${trace.severity === 'Critical' ? 'bg-rose-600' : 'bg-amber-400'}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400">{trace.id}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          trace.severity === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>{trace.severity}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mt-1">{trace.rule}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={12} /> {trace.time}</span>
                        <span className="flex items-center gap-1 font-bold text-slate-600"><Activity size={12} /> {trace.action}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
              <button className="text-[11px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest">
                View All High-Risk Logs
              </button>
            </div>
          </div>

          {/* SECTION 7: Compliance Score Widget */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Safety Compliance Score</h2>
            <div className="relative flex items-center justify-center">
               <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="364.4" strokeDashoffset="9.4" className="text-emerald-500" strokeLinecap="round" />
              </svg>
              <span className="absolute text-3xl font-bold text-slate-900">97.4%</span>
            </div>
            <div className="space-y-2 w-full">
              <div className="flex justify-between text-xs font-bold px-1">
                <span className="text-emerald-600">Secure</span>
                <span className="text-slate-400">Target: 95%+</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '97.4%' }} />
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Based on 14 safety checkpoints and 2 regulatory audit modules. <br/>
              <span className="font-bold text-slate-800">Status: Fully Compliant</span>
            </p>
            <button className="w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              <Fingerprint size={16} /> Detailed Audit Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}