import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { 
  ShieldAlert, 
  Skull, 
  Target, 
  Search, 
  Filter, 
  Plus, 
  Activity, 
  ChevronRight, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  MoreVertical,
  Zap,
  ShieldCheck,
  ZapOff
} from 'lucide-react';

// --- Mock Data ---

const kpiMetrics = [
  { label: 'Total Test Cases Executed', value: '4,820', trend: '+12% vs last cycle', status: 'Healthy' },
  { label: 'Attack Success Rate', value: '1.42%', trend: '-0.2% improvement', status: 'Healthy' },
  { label: 'Prompt Injection Resistance', value: '98.5%', trend: '+1.1% vs last week', status: 'Healthy' },
  { label: 'Critical Vulnerabilities', value: '3', trend: '+1 new detection', status: 'Critical' },
];

const categoryData = [
  { name: 'Prompt Injection', attempts: 1200, success: 15 },
  { name: 'Jailbreak Attempts', attempts: 950, success: 22 },
  { name: 'Data Exfiltration', attempts: 420, success: 4 },
  { name: 'Toxicity Trigger', attempts: 800, success: 8 },
  { name: 'System Override', attempts: 210, success: 12 },
];

const vulnerabilityFindings = [
  { id: 'RT-8012', type: 'Jailbreak', model: 'GPT-4o (Prod)', severity: 'Critical', result: 'Successful', time: '14:22:10' },
  { id: 'RT-7994', type: 'Exfiltration', model: 'Claude-3.5', severity: 'High', result: 'Blocked', time: '13:18:45' },
  { id: 'RT-7982', type: 'Injection', model: 'Llama-3-70B', severity: 'Medium', result: 'Patched', time: '12:55:20' },
  { id: 'RT-7975', type: 'Override', model: 'GPT-4o (Prod)', severity: 'High', result: 'Blocked', time: '11:40:12' },
  { id: 'RT-7960', type: 'Toxicity', model: 'Claude-3.5', severity: 'Low', result: 'Blocked', time: '10:10:05' },
];

const timelineEvents = [
  { step: 'Test Cycle Created', time: '09:00', engineer: 'Auto-Runner', desc: 'Q1 Adversarial Stress Test initiated for production endpoints.' },
  { step: 'Execution Started', time: '09:15', engineer: 'System', desc: '1,200 automated injection payloads distributed across Llama-3 and GPT instances.' },
  { step: 'Exploit Detected', time: '11:42', engineer: 'A. Sharma', desc: 'Critical jailbreak bypass detected in GPT-4o finance assistant module.' },
  { step: 'Mitigation Applied', time: '14:30', engineer: 'S. Weaver', desc: 'Prompt filtering rules updated. Rate limiting applied to suspicious IP segment.' },
  { step: 'Patch Verified', time: '16:00', engineer: 'M. Patel', desc: 'Regression tests completed. Attack success rate reduced to <0.1%.' },
];

const heatmapData = [
  { attack: 'Injection', models: { 'GPT-4': 2, 'Claude': 1, 'Llama-3': 4, 'Gemini': 2 } },
  { attack: 'Jailbreak', models: { 'GPT-4': 8, 'Claude': 2, 'Llama-3': 3, 'Gemini': 1 } },
  { attack: 'Exfiltration', models: { 'GPT-4': 1, 'Claude': 1, 'Llama-3': 2, 'Gemini': 1 } },
  { attack: 'Toxicity', models: { 'GPT-4': 0, 'Claude': 0, 'Llama-3': 1, 'Gemini': 0 } },
];

// --- Subcomponents ---

const StatusBadge = ({ status }) => {
  const styles = {
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
    Blocked: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Successful: 'bg-rose-50 text-rose-700 border-rose-100',
    Patched: 'bg-blue-50 text-blue-700 border-blue-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
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

const HeatmapCell = ({ score }) => {
  // Score 0-10 logic
  const colors = [
    'bg-slate-50 text-slate-300',      // 0
    'bg-rose-50 text-rose-500',       // 1-2
    'bg-rose-100 text-rose-600',      // 3-4
    'bg-rose-200 text-rose-700',      // 5-6
    'bg-rose-300 text-rose-800',      // 7-8
    'bg-rose-400 text-rose-900',      // 9+
  ];
  const idx = score === 0 ? 0 : Math.min(Math.floor(score / 2) + 1, 5);
  return (
    <div className={`h-10 w-full flex items-center justify-center rounded font-bold text-xs ${colors[idx]}`}>
      {score}
    </div>
  );
};

// --- Main Application Component ---

export default function RedTeamTesting() {
  const [env, setEnv] = useState('Prod');

  return (
    <div className="bg-slate-50 p-6 space-y-6 min-h-screen font-sans text-slate-900">
      
      {/* SECTION 1: Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Red Team & Adversarial Testing</h1>
          <p className="text-slate-500 text-sm font-medium italic">Evaluate model resilience against malicious and adversarial prompts.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <select 
              value={env} 
              onChange={(e) => setEnv(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-slate-100 transition-all"
            >
              <option>Environment: Prod</option>
              <option>Environment: UAT</option>
              <option>Environment: Staging</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-slate-100 transition-all">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95">
            <Zap size={18} /> Run New Test
          </button>
        </div>
      </div>

      {/* SECTION 2: Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((kpi, i) => (
          <MetricCard key={i} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* SECTION 3: Attack Category Breakdown */}
        <div className="xl:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Skull size={20} className="text-slate-400" />
              Attack Category Distribution
            </h2>
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" /> Attempts</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-rose-500 rounded-sm" /> Successful</div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 40, right: 30, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 'bold', fill: '#475569' }} 
                  width={120}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar name="Attempts" dataKey="attempts" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
                <Bar name="Successful" dataKey="success" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 5: Defense Effectiveness Panel */}
        <div className="xl:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShieldCheck size={20} className="text-slate-400" />
            Defense Effectiveness
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Safety Filter Coverage', value: '99.2%', icon: ShieldCheck, color: 'text-emerald-600' },
              { label: 'Response Refusal Rate', value: '14.5%', icon: Activity, color: 'text-blue-600' },
              { label: 'Detection Time (SLA)', value: '1.4m', icon: Clock, color: 'text-emerald-600' },
              { label: 'Patch Deployment SLA', value: '4.2h', icon: Zap, color: 'text-amber-600' },
              { label: 'Residual Risk Score', value: '12/100', icon: Target, color: 'text-emerald-600' },
              { label: 'Unmitigated Threats', value: '2', icon: ShieldAlert, color: 'text-rose-600' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                  <item.icon size={14} className="text-slate-300" />
                </div>
                <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* SECTION 4: Vulnerability Findings Table */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold">Vulnerability Findings</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Activity size={14} className="text-blue-500" />
              Updated 4m ago
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Test ID</th>
                  <th className="px-6 py-4">Attack Type</th>
                  <th className="px-6 py-4">Target Model</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Result</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vulnerabilityFindings.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors group cursor-default">
                    <td className="px-6 py-4 font-mono font-bold text-slate-600">{row.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{row.type}</td>
                    <td className="px-6 py-4 text-slate-500">{row.model}</td>
                    <td className="px-6 py-4"><SeverityBadge level={row.severity} /></td>
                    <td className="px-6 py-4"><StatusBadge status={row.result} /></td>
                    <td className="px-6 py-4 font-mono text-slate-500">{row.time}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[11px] font-bold text-slate-900 hover:text-blue-600 transition-colors uppercase flex items-center justify-end ml-auto group-hover:translate-x-1 duration-200">
                        View <ChevronRight size={14} className="ml-0.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 6: Adversarial Test Timeline */}
        <div className="xl:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <Clock size={18} className="text-slate-400" />
            Execution Timeline
          </h2>
          <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 flex-1">
            {timelineEvents.map((event, i) => (
              <div key={i} className="relative pl-8 group">
                <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center z-10 group-hover:border-blue-600 transition-colors">
                  <div className="w-2 h-2 bg-slate-900 rounded-full group-hover:bg-blue-600" />
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
          <button className="mt-8 w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 transition-all uppercase tracking-widest">
            Full History
          </button>
        </div>
      </div>

      {/* SECTION 7: Risk Heatmap */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <AlertTriangle size={20} className="text-rose-500" />
          Cross-Model Risk Heatmap
        </h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1" />
          {['GPT-4o', 'Claude 3.5', 'Llama-3', 'Gemini Pro'].map(m => (
            <div key={m} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m}</div>
          ))}
          {heatmapData.map((row, i) => (
            <React.Fragment key={i}>
              <div className="col-span-1 text-xs font-bold text-slate-700 flex items-center">{row.attack}</div>
              <HeatmapCell score={row.models['GPT-4']} />
              <HeatmapCell score={row.models['Claude']} />
              <HeatmapCell score={row.models['Llama-3']} />
              <HeatmapCell score={row.models['Gemini']} />
            </React.Fragment>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-end gap-4">
           <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase">
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-50 border border-slate-200 rounded-sm" /> No Risk</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-rose-400 rounded-sm" /> High Exposure</span>
           </div>
        </div>
      </div>

    </div>
  );
}