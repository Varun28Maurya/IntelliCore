import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Activity, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Server, 
  Zap, 
  BarChart3, 
  RefreshCcw, 
  Filter, 
  ChevronRight,
  ShieldCheck,
  Globe,
  Database,
  Cpu
} from 'lucide-react';

// --- Mock Data ---

const latencyTrendData = [
  { time: '14:00', avg: 420, p95: 850 },
  { time: '14:05', avg: 435, p95: 890 },
  { time: '14:10', avg: 410, p95: 820 },
  { time: '14:15', avg: 480, p95: 1100 },
  { time: '14:20', avg: 520, p95: 1250 },
  { time: '14:25', avg: 460, p95: 980 },
  { time: '14:30', avg: 440, p95: 910 },
];

const throughputData = [
  { time: '14:00', reqs: 85 },
  { time: '14:05', reqs: 92 },
  { time: '14:10', reqs: 78 },
  { time: '14:15', reqs: 115 },
  { time: '14:20', reqs: 142 },
  { time: '14:25', reqs: 128 },
  { time: '14:30', reqs: 110 },
];

const errorRateData = [
  { time: '14:00', errors: 0.2, timeouts: 0.1 },
  { time: '14:05', errors: 0.1, timeouts: 0.1 },
  { time: '14:10', errors: 0.3, timeouts: 0.2 },
  { time: '14:15', errors: 1.2, timeouts: 0.8 },
  { time: '14:20', errors: 0.8, timeouts: 0.5 },
  { time: '14:25', errors: 0.4, timeouts: 0.2 },
  { time: '14:30', errors: 0.2, timeouts: 0.1 },
];

const modelPerformance = [
  { id: 1, model: 'GPT-4o (Production)', avg: '420ms', p95: '850ms', throughput: '42 r/s', errors: '0.02%', status: 'Healthy' },
  { id: 2, model: 'Claude-3.5-Sonnet', avg: '380ms', p95: '720ms', throughput: '28 r/s', errors: '0.01%', status: 'Healthy' },
  { id: 3, model: 'Llama-3-70B (Internal)', avg: '840ms', p95: '1850ms', throughput: '12 r/s', errors: '1.42%', status: 'Warning' },
  { id: 4, model: 'Gemini-1.5-Pro', avg: '410ms', p95: '810ms', throughput: '15 r/s', errors: '0.04%', status: 'Healthy' },
];

const infrastructure = [
  { service: 'API Gateway', status: 'OK', icon: Globe },
  { service: 'Inference Load Balancer', status: 'OK', icon: Server },
  { service: 'Safety Guardrail Filter', status: 'OK', icon: ShieldCheck },
  { service: 'Vector DB (Pinecone)', status: 'OK', icon: Database },
  { service: 'Tokenization Service', status: 'OK', icon: Cpu },
];

// --- Subcomponents ---

const KPIBox = ({ label, value, delta, status }) => {
  const statusStyles = {
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusStyles[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <div className="flex items-center mt-1">
          <span className={`text-xs font-bold ${delta.startsWith('-') ? 'text-emerald-600' : 'text-rose-600'}`}>
            {delta}
          </span>
          <span className="text-slate-400 text-[10px] ml-2 font-medium uppercase">vs last 5m</span>
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

export default function LLMPerformanceMonitoring() {
  const [model, setModel] = useState('All Models');

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* SECTION 1: Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Performance & Latency Monitoring</h1>
            <p className="text-slate-500 text-sm font-medium italic">Real-time inference metrics and infrastructure performance analytics.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              LIVE DATA
            </div>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none"
            >
              <option>All Models</option>
              <option>GPT-4o</option>
              <option>Claude-3.5</option>
              <option>Llama-3</option>
            </select>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
              <Clock size={16} className="text-slate-400 mr-2" />
              <select className="text-sm font-bold outline-none bg-transparent">
                <option>Last 30 Minutes</option>
                <option>Last 1 Hour</option>
                <option>Last 24 Hours</option>
              </select>
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 shadow-sm transition-all">
              <RefreshCcw size={18} />
            </button>
          </div>
        </div>

        {/* SECTION 2: Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <KPIBox label="Avg Latency" value="420ms" delta="+12ms" status="Healthy" />
          <KPIBox label="p95 Latency" value="850ms" delta="+45ms" status="Healthy" />
          <KPIBox label="Throughput" value="124 r/s" delta="+18%" status="Healthy" />
          <KPIBox label="Error Rate" value="0.42%" delta="+0.12%" status="Warning" />
          <KPIBox label="Timeout Rate" value="0.18%" delta="+0.04%" status="Healthy" />
        </div>

        {/* SECTION 3: Latency Trend Chart */}
        <SectionCard title="Inference Latency Trend" subtitle="Millisecond response times: Average vs. p95 (Tail Latency)">
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: 'bold' }} />
                <Line name="p95 Latency" type="monotone" dataKey="p95" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                <Line name="Avg Latency" type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* SECTION 4: Throughput & Error Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Throughput (RPM)" subtitle="Volume of incoming inference requests across active endpoints">
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={throughputData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReqs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="reqs" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorReqs)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Error & Timeout Rate" subtitle="Percentage of requests failing to return valid completions">
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={errorRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="top" align="right" iconType="rect" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                  <Line name="Error Rate %" type="monotone" dataKey="errors" stroke="#e11d48" strokeWidth={2} dot={false} />
                  <Line name="Timeout Rate %" type="monotone" dataKey="timeouts" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* SECTION 5: Model Performance Table */}
        <SectionCard title="Model Performance Breakdown" subtitle="Detailed health and operational telemetry across the model fleet">
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Model Instance</th>
                  <th className="px-6 py-4">Avg Latency</th>
                  <th className="px-6 py-4">p95</th>
                  <th className="px-6 py-4">Throughput</th>
                  <th className="px-6 py-4">Error %</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modelPerformance.map((row) => (
                  <tr key={row.id} className={`hover:bg-slate-50 transition-all ${row.status === 'Warning' ? 'bg-amber-50/20' : ''}`}>
                    <td className="px-6 py-4 font-bold text-slate-900">{row.model}</td>
                    <td className="px-6 py-4 font-mono text-slate-600">{row.avg}</td>
                    <td className="px-6 py-4 font-mono text-slate-600 font-bold">{row.p95}</td>
                    <td className="px-6 py-4 text-slate-500">{row.throughput}</td>
                    <td className={`px-6 py-4 font-mono ${parseFloat(row.errors) > 0.5 ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                      {row.errors}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          row.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {row.status}
                        </span>
                        <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-900">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* SECTION 6 & 7: Infrastructure Health & SLA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Infrastructure Stack Status" subtitle="Component health for the banking gateway and orchestration layer">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {infrastructure.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400">
                      <item.icon size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item.service}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Online</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Service Level Agreement (SLA)" subtitle="Aggregated availability and uptime performance tracking">
            <div className="mt-6 flex flex-col items-center justify-center text-center">
              <div className="relative flex items-center justify-center mb-6">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                  <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="464.7" strokeDashoffset="1.2" className="text-emerald-500" strokeLinecap="round" />
                </svg>
                <div className="absolute">
                  <span className="text-4xl font-bold text-slate-900 block">99.72%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uptime</span>
                </div>
              </div>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between text-xs font-bold px-2">
                  <span className="text-slate-500 uppercase tracking-tighter">SLA Target: 99.5%</span>
                  <span className="text-emerald-600">+0.22% Threshold Surplus</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.72%' }} />
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3 mt-4">
                  <AlertCircle size={16} className="text-amber-600 mt-0.5" />
                  <p className="text-[11px] text-amber-800 text-left leading-relaxed">
                    <span className="font-bold">Last Incident:</span> 2 days ago – 3 min degradation in "Inference Load Balancer" caused by region-wide latency spike.
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

      </div>
    </div>
  );
}