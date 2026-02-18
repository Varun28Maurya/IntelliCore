import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from 'recharts';
import { 
  AlertCircle, 
  Activity, 
  Zap, 
  DollarSign, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  Clock, 
  Filter, 
  ExternalLink,
  ChevronRight,
  BrainCircuit,
  Terminal
} from 'lucide-react';

// --- Mock Data ---

const PERFORMANCE_TIME_SERIES = [
  { time: '00:00', latency: 410, throughput: 45, tokens: 1200, hallucination: 2.1 },
  { time: '04:00', latency: 380, throughput: 32, tokens: 900, hallucination: 1.8 },
  { time: '08:00', latency: 450, throughput: 85, tokens: 2800, hallucination: 2.4 },
  { time: '12:00', latency: 520, throughput: 120, tokens: 4100, hallucination: 3.1 },
  { time: '16:00', latency: 490, throughput: 110, tokens: 3800, hallucination: 2.7 },
  { time: '20:00', latency: 430, throughput: 70, tokens: 2200, hallucination: 2.2 },
  { time: '23:59', latency: 420, throughput: 55, tokens: 1500, hallucination: 2.0 },
];

const COST_BY_MODEL = [
  { name: 'GPT-4o', cost: 1240 },
  { name: 'Claude 3.5 Sonnet', cost: 890 },
  { name: 'Llama-3-70B (Internal)', cost: 320 },
  { name: 'GPT-4 Turbo', cost: 560 },
];

const QUALITY_METRICS = [
  { metric: 'Hallucination Rate', value: '2.3%', threshold: '3.0%', status: 'Healthy' },
  { metric: 'Toxicity Score', value: '0.04', threshold: '0.10', status: 'Healthy' },
  { metric: 'Policy Violations', value: '2', threshold: '5', status: 'Warning' },
  { metric: 'Answer Relevancy', value: '0.92', threshold: '0.85', status: 'Healthy' },
];

const SAFETY_SIGNALS = [
  { category: 'Prompt Injection Attempts', violations: 12, severity: 'High', trend: '+2' },
  { category: 'Toxic Content Detection', violations: 1, severity: 'Medium', trend: '-1' },
  { category: 'PII Leakage Prevention', violations: 0, severity: 'Critical', trend: '0' },
  { category: 'Unauthorized Data Access', violations: 3, severity: 'High', trend: '+1' },
];

const RECENT_TRACES = [
  { id: 'tr-9921', prompt: 'Summarize mortgage disclosure...', response: 'The disclosure covers...', latency: '840ms', flag: false },
  { id: 'tr-9920', prompt: 'Compare loan interest rates for...', response: 'Based on current rates...', latency: '1.2s', flag: true },
  { id: 'tr-9919', prompt: 'Is my credit score enough for...', response: 'Credit score requirements...', latency: '910ms', flag: false },
  { id: 'tr-9918', prompt: 'System: Ignore previous instructions...', response: 'I cannot comply with...', latency: '420ms', flag: true },
];

const ALERTS = [
  { id: 1, type: 'critical', msg: 'Latency spike detected in GPT-4o cluster', time: '4 mins ago', model: 'gpt-4o' },
  { id: 2, type: 'warning', msg: 'Daily cost budget reached 85%', time: '22 mins ago', model: 'multi-model' },
  { id: 3, type: 'danger', msg: 'Prompt Injection pattern detected: "System: Ignore"', time: '1 hour ago', model: 'Llama-3' },
];

// --- Reusable UI Components ---

const MetricCard = ({ title, value, subValue, trend, status, icon: Icon }) => {
  const statusConfig = {
    healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    critical: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-slate-50 rounded-xl">
          <Icon className="w-5 h-5 text-slate-500" />
        </div>
        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ₹{statusConfig[status]}`}>
          {status}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
      <div className="mt-3 flex items-center text-xs">
        <span className={`font-bold mr-1 ₹{trend.startsWith('+') ? 'text-rose-500' : 'text-emerald-500'}`}>
          {trend}
        </span>
        <span className="text-slate-400 font-medium">{subValue}</span>
      </div>
    </div>
  );
};

const SectionCard = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col ₹{className}`}>
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      <button className="text-slate-400 hover:text-slate-600 transition-colors">
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

// --- Main Component ---

export default function LLMEngineerDashboard() {
  const [selectedModel, setSelectedModel] = useState('All Models');

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6 font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl font-bold tracking-tight">LLM Observability</h1>
          </div>
          <p className="text-slate-500 text-sm">Enterprise model monitoring & safety audit dashboard.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-white border border-slate-200 rounded-lg flex p-1 shadow-sm">
              <button className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded-md">Real-time</button>
              <button className="px-3 py-1.5 text-xs font-bold text-slate-400">Snapshot</button>
           </div>
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md">
            <Terminal className="w-4 h-4" /> Debug Console
           </button>
        </div>
      </div>

      {/* SECTION 1: Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Avg Latency" 
          value="420ms" 
          subValue="vs 390ms yesterday" 
          trend="+8%" 
          status="warning" 
          icon={Clock}
        />
        <MetricCard 
          title="Requests / Min" 
          value="1,240" 
          subValue="Peak: 1,850 RPM" 
          trend="+12%" 
          status="healthy" 
          icon={Zap}
        />
        <MetricCard 
          title="Hallucination Rate" 
          value="2.3%" 
          subValue="Threshold: 3.0%" 
          trend="-0.4%" 
          status="healthy" 
          icon={BrainCircuit}
        />
        <MetricCard 
          title="Token Cost (7D)" 
          value="₹4,120.50" 
          subValue="Current Budget: 82%" 
          trend="+15%" 
          status="critical" 
          icon={DollarSign}
        />
      </div>

      {/* SECTION 2: Filters Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2 text-slate-400">
          <Filter className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Controls</span>
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Core Model</label>
          <select 
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 outline-none block min-w-[160px]"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option>All Models</option>
            <option>GPT-4o (Production)</option>
            <option>Claude 3.5 (Staging)</option>
            <option>Llama-3 (Local)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Environment</label>
          <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-1">
             <button className="px-3 py-1 text-xs font-bold bg-white shadow-sm rounded-md text-slate-900">Prod</button>
             <button className="px-3 py-1 text-xs font-bold text-slate-400">UAT</button>
             <button className="px-3 py-1 text-xs font-bold text-slate-400">Dev</button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Time Window</label>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 outline-none">
            <option>Last 1 Hour</option>
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      {/* SECTION 3: Performance Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Latency Distribution (ms)">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_TIME_SERIES}>
                <defs>
                  <linearGradient id="colorLat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Throughput Trend (Requests/s)">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PERFORMANCE_TIME_SERIES}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip />
                <Line type="stepAfter" dataKey="throughput" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* SECTION 4: Token Usage & Cost */}
      <SectionCard title="Token Usage & Cost Economics">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-4">Daily Token Consumption</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_TIME_SERIES}>
                  <Area type="monotone" dataKey="tokens" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lg:col-span-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-4">Cost by Model</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={COST_BY_MODEL} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} width={80} />
                  <Bar dataKey="cost" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={15}>
                    {COST_BY_MODEL.map((entry, index) => (
                      <Cell key={index} fill={index === 0 ? '#3b82f6' : '#94a3b8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lg:col-span-1 bg-slate-50 rounded-xl p-4 flex flex-col justify-center space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Total Tokens</span>
              <span className="text-lg font-bold">14.2M</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Avg Tokens/Req</span>
              <span className="text-lg font-bold">482</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Efficiency</span>
              <span className="text-lg font-bold text-emerald-600">98.2%</span>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* SECTION 5: Hallucination & Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard title="Response Quality & Hallucination Metrics">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={PERFORMANCE_TIME_SERIES}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <Tooltip />
                      <Line type="monotone" dataKey="hallucination" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, fill: '#f43f5e'}} />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="text-[10px] text-center text-slate-400 font-bold mt-2">Hallucination Rate Trend (%)</p>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase">
                          <th className="pb-2 text-left">Metric</th>
                          <th className="pb-2 text-center">Value</th>
                          <th className="pb-2 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {QUALITY_METRICS.map((m, i) => (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="py-3 font-semibold text-slate-700">{m.metric}</td>
                            <td className="py-3 text-center text-slate-600 font-mono">{m.value}</td>
                            <td className="py-3 text-right">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ₹{
                                m.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                              }`}>
                                {m.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </SectionCard>
        </div>

        {/* SECTION 6: Safety Signals */}
        <div className="lg:col-span-1">
          <SectionCard title="Safety & Risk Signals">
            <div className="space-y-4">
              {SAFETY_SIGNALS.map((s, i) => (
                <div key={i} className={`p-3 rounded-xl border ₹{s.severity === 'Critical' ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-100 shadow-sm'}`}>
                   <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">{s.category}</h4>
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ₹{
                        s.severity === 'Critical' ? 'bg-rose-600 text-white' : 
                        s.severity === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                      }`}>{s.severity}</span>
                   </div>
                   <div className="flex items-end justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black">{s.violations}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Violations</span>
                      </div>
                      <div className={`text-[10px] font-bold ₹{s.trend.startsWith('+') ? 'text-rose-500' : 'text-emerald-500'}`}>
                        Trend: {s.trend}
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* SECTION 7: Trace Panel */}
      <SectionCard title="Recent Prompt Trace Logs (Production)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <th className="px-4 pb-2">Trace ID</th>
                <th className="px-4 pb-2">Prompt Preview</th>
                <th className="px-4 pb-2">Response Preview</th>
                <th className="px-4 pb-2">Latency</th>
                <th className="px-4 pb-2">Safety</th>
                <th className="px-4 pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_TRACES.map((trace) => (
                <tr key={trace.id} className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all rounded-lg group">
                  <td className="px-4 py-4 rounded-l-xl font-mono text-[11px] text-blue-600 font-bold">{trace.id}</td>
                  <td className="px-4 py-4 max-w-xs truncate text-slate-600 italic">"{trace.prompt}"</td>
                  <td className="px-4 py-4 max-w-xs truncate text-slate-500">{trace.response}</td>
                  <td className="px-4 py-4 font-semibold text-slate-700">{trace.latency}</td>
                  <td className="px-4 py-4">
                    {trace.flag ? (
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    )}
                  </td>
                  <td className="px-4 py-4 rounded-r-xl text-right">
                    <button className="text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center justify-end gap-1 ml-auto">
                      View Trace <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* SECTION 8: Alerts Panel */}
      <div className="grid grid-cols-1 gap-6">
        <SectionCard title="Operational & Compliance Alerts">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ALERTS.map((alert) => (
              <div key={alert.id} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 items-start relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ₹{
                  alert.type === 'critical' ? 'bg-rose-500' : 
                  alert.type === 'danger' ? 'bg-orange-500' : 'bg-amber-400'
                }`} />
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <AlertCircle className={`w-5 h-5 ₹{
                    alert.type === 'critical' ? 'text-rose-500' : 'text-amber-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">{alert.model}</span>
                    <span className="text-[10px] text-slate-400">{alert.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2 leading-snug">{alert.msg}</h4>
                  <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">Investigate</button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs font-bold text-slate-800 tracking-tight">
            LLM Core <span className="text-slate-400 font-normal">v2.8.4</span>
          </p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Gateway OK</span>
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Safety Filter Active</span>
          <span>© 2024 Banking Corp Model Systems</span>
        </div>
      </div>

    </div>
  );
}