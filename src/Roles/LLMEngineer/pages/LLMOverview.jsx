import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  Activity, 
  ShieldAlert, 
  Zap, 
  Database, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Filter, 
  ChevronRight,
  MoreHorizontal,
  DollarSign
} from 'lucide-react';

// --- Mock Data ---

const latencyTrend = [
  { time: '08:00', latency: 380 }, { time: '09:00', latency: 410 },
  { time: '10:00', latency: 450 }, { time: '11:00', latency: 420 },
  { time: '12:00', latency: 480 }, { time: '13:00', latency: 510 },
  { time: '14:00', latency: 420 },
];

const throughputData = [
  { time: '08:00', rpm: 850 }, { time: '09:00', rpm: 980 },
  { time: '10:00', rpm: 1100 }, { time: '11:00', rpm: 1250 },
  { time: '12:00', rpm: 1150 }, { time: '13:00', rpm: 1300 },
  { time: '14:00', rpm: 1200 },
];

const tokenConsumption = [
  { day: 'Mon', tokens: 450000 }, { day: 'Tue', tokens: 520000 },
  { day: 'Wed', tokens: 480000 }, { day: 'Thu', tokens: 610000 },
  { day: 'Fri', tokens: 590000 }, { day: 'Sat', tokens: 320000 },
  { day: 'Sun', tokens: 350000 },
];

const costByModel = [
  { model: 'GPT-4o', cost: 8400 },
  { model: 'Claude-3.5', cost: 4200 },
  { model: 'Llama-3-70B', cost: 1200 },
  { model: 'Gemini-1.5', cost: 400 },
];

const hallucinationData = [
  { time: '10:00', rate: 0.72 }, { time: '11:00', rate: 0.85 },
  { time: '12:00', rate: 0.78 }, { time: '13:00', rate: 0.92 },
  { time: '14:00', rate: 0.80 },
];

const traces = [
  { id: 'tr-8231', prompt: 'Analyze Q3 credit risk...', response: 'Based on current data, the risk...', latency: '420ms', safety: 'Pass' },
  { id: 'tr-8230', prompt: 'Generate summary for...', response: 'The document outlines three...', latency: '380ms', safety: 'Pass' },
  { id: 'tr-8229', prompt: 'Explain the policy on...', response: 'Internal policy section 4.2...', latency: '890ms', safety: 'Flag' },
];

const alerts = [
  { id: 1, type: 'Latency Spike', msg: 'Avg latency exceeded 500ms', time: '12 mins ago', severity: 'High', model: 'GPT-4o' },
  { id: 2, type: 'Budget Alert', msg: 'Daily spend reached 90%', time: '45 mins ago', severity: 'Medium', model: 'Portfolio' },
  { id: 3, type: 'Security', msg: 'Injection pattern detected', time: '2 hours ago', severity: 'Critical', model: 'Claude-3.5' },
];

// --- Subcomponents ---

const MetricCard = ({ title, value, subtitle, delta, status }) => {
  const statusColors = {
    healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    critical: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
        <div className="flex items-center mt-1">
          <span className={`flex items-center text-xs font-bold ${delta.startsWith('+') ? 'text-rose-600' : 'text-emerald-600'}`}>
            {delta.startsWith('+') ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            {delta}
          </span>
          <span className="text-slate-400 text-xs ml-2 font-medium">vs yesterday</span>
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({ title, subtitle, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    <div className="mb-6 flex justify-between items-start">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

// --- Main Component ---

export default function LLMOverview() {
  const [env, setEnv] = useState('Production');

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">LLM Production Overview</h1>
            <p className="text-slate-500 text-sm font-medium">Model Observability & AI Safety Dashboard</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">Audit Logs</button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-slate-800 transition-all">System Configuration</button>
          </div>
        </div>

        {/* SECTION 1: Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Avg Latency" value="420ms" delta="+8%" status="warning" />
          <MetricCard title="Requests per Min" value="1.2k" delta="+12%" status="healthy" />
          <MetricCard title="Hallucination Rate" value="0.8%" delta="-2%" status="healthy" />
          <MetricCard title="Token Spend (7D)" value="$14.2k" delta="+5%" status="healthy" />
        </div>

        {/* SECTION 2: Model Controls Row */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full flex items-center gap-4">
            <div className="relative flex-1 max-w-xs">
              <Database className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <select className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium appearance-none focus:outline-none">
                <option>All Production Models</option>
                <option>GPT-4o (Standard)</option>
                <option>Claude 3.5 Sonnet</option>
              </select>
            </div>
            <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1">
              {['Prod', 'UAT', 'Dev'].map((e) => (
                <button 
                  key={e} 
                  onClick={() => setEnv(e)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${env === e ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <select className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium appearance-none focus:outline-none">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Custom Range</option>
              </select>
            </div>
            <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* SECTION 3: Performance Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Latency Distribution (P95)" subtitle="Response time trend across active inferences">
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={latencyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLat)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Throughput (RPM)" subtitle="Request volume handled by model routing layer">
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={throughputData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="rpm" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* SECTION 4: Token Usage & Cost */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard title="Daily Token Consumption" subtitle="Aggregated volume across all provider endpoints" className="lg:col-span-2">
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tokenConsumption} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="tokens" stroke="#6366f1" fill="#6366f1" fillOpacity={0.05} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Tokens</p>
                <p className="text-xl font-bold">3.4M</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Tokens/Req</p>
                <p className="text-xl font-bold">2.8k</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Efficiency %</p>
                <p className="text-xl font-bold">94.2%</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Cost by Model" subtitle="Expenditure breakdown (USD)">
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costByModel} layout="vertical" margin={{ left: 20, right: 40 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="model" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700 }} width={80} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="cost" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24}>
                    {costByModel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#94a3b8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-slate-900 rounded-xl text-white flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign size={20} className="text-emerald-400 mr-3" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Est. Monthly Total</p>
                  <p className="text-lg font-bold">$14,200.00</p>
                </div>
              </div>
              <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Details</button>
            </div>
          </SectionCard>
        </div>

        {/* SECTION 5: Hallucination & Quality Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard title="Hallucination Trend" subtitle="Faithfulness score over time (inverted)" className="lg:col-span-1">
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hallucinationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis hide domain={[0, 2]} />
                  <Tooltip />
                  <Line type="stepAfter" dataKey="rate" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Model Quality Benchmarks" subtitle="Automated evaluation metrics vs. threshold" className="lg:col-span-2">
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-4 py-4">Quality Metric</th>
                    <th className="px-4 py-4">Current Value</th>
                    <th className="px-4 py-4">Threshold</th>
                    <th className="px-4 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { m: 'Hallucination Rate', v: '0.82%', t: '1.0%', s: 'Green' },
                    { m: 'Toxicity Score', v: '0.04%', t: '0.1%', s: 'Green' },
                    { m: 'Policy Violations', v: '2', t: '0', s: 'Red' },
                    { m: 'Answer Relevancy', v: '92.4%', t: '90%', s: 'Green' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4 font-bold text-slate-700">{row.m}</td>
                      <td className="px-4 py-4 font-mono">{row.v}</td>
                      <td className="px-4 py-4 font-mono text-slate-400">{row.t}</td>
                      <td className="px-4 py-4 text-right">
                        <div className={`inline-block w-2.5 h-2.5 rounded-full ${row.s === 'Green' ? 'bg-emerald-500' : row.s === 'Amber' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* SECTION 6: Safety Signals Panel */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Safety & Guardrail Signals</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Prompt Injection Attempts', count: '142', severity: 'High', trend: '+12%' },
              { label: 'Toxic Content Detections', count: '8', severity: 'Medium', trend: '-2%' },
              { label: 'PII Leakage Prevention', count: '56', severity: 'Critical', trend: '0%' },
              { label: 'Unauthorized Access', count: '0', severity: 'Low', trend: '0%' },
            ].map((sig, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    sig.severity === 'Critical' ? 'bg-rose-600 text-white' : 
                    sig.severity === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sig.severity}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{sig.trend}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-700 mb-1">{sig.label}</h4>
                <p className="text-2xl font-bold text-slate-900">{sig.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: Recent Prompt Traces */}
        <SectionCard title="Recent Prompt Traces" subtitle="Real-time log of inference traffic and guardrail status">
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-4 py-4">Trace ID</th>
                  <th className="px-4 py-4">Prompt Preview</th>
                  <th className="px-4 py-4">Response Preview</th>
                  <th className="px-4 py-4">Latency</th>
                  <th className="px-4 py-4">Safety Flag</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {traces.map((trace, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-all cursor-default group">
                    <td className="px-4 py-4 font-mono text-[11px] text-slate-400">{trace.id}</td>
                    <td className="px-4 py-4 text-slate-700 max-w-xs truncate font-medium">{trace.prompt}</td>
                    <td className="px-4 py-4 text-slate-500 max-w-xs truncate">{trace.response}</td>
                    <td className="px-4 py-4 font-mono font-bold text-slate-700">{trace.latency}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        trace.safety === 'Pass' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {trace.safety}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-slate-300 hover:text-slate-900 transition-colors"><MoreHorizontal size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* SECTION 8: Alerts Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex relative group">
              <div className={`w-1.5 shrink-0 ${
                alert.severity === 'Critical' ? 'bg-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.4)]' : 
                alert.severity === 'High' ? 'bg-rose-400' : 'bg-amber-400'
              }`} />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{alert.type}</span>
                    <span className="text-[10px] text-slate-400 flex items-center"><Clock size={10} className="mr-1" /> {alert.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{alert.msg}</h4>
                  <span className="inline-block mt-2 px-1.5 py-0.5 bg-slate-100 text-[9px] font-bold text-slate-500 rounded uppercase">{alert.model}</span>
                </div>
                <button className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors flex items-center group-hover:translate-x-1 transition-transform">
                  Investigate <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}