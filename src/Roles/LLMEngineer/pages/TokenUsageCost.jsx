import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';
import { 
  DollarSign, 
  Layers, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Filter, 
  Download, 
  ChevronRight, 
  MoreHorizontal,
  Wallet,
  PieChart,
  ArrowUpRight,
  Target,
  AlertCircle
} from 'lucide-react';

// --- Mock Data ---

const usageTrend = [
  { time: 'Feb 12', tokens: 420000 }, { time: 'Feb 13', tokens: 510000 },
  { time: 'Feb 14', tokens: 480000 }, { time: 'Feb 15', tokens: 610000 },
  { time: 'Feb 16', tokens: 590000 }, { time: 'Feb 17', tokens: 720000 },
  { time: 'Feb 18', tokens: 680000 },
];

const modelCosts = [
  { name: 'GPT-4o', cost: 18400, color: '#1e293b' },
  { name: 'GPT-4 Turbo', cost: 12200, color: '#334155' },
  { name: 'Claude-3.5', cost: 7400, color: '#475569' },
  { name: 'Llama-3-70B', cost: 2800, color: '#64748b' },
  { name: 'Other', cost: 400, color: '#94a3b8' },
];

const modelPerformance = [
  { model: 'GPT-4o', requests: '14.2k', tokens: '42M', cost: '$18,400', perReq: '$1.29', efficiency: 94, status: 'Healthy' },
  { model: 'GPT-4 Turbo', requests: '8.4k', tokens: '28M', cost: '$12,200', perReq: '$1.45', efficiency: 82, status: 'Inefficient' },
  { model: 'Claude-3.5', requests: '12.1k', tokens: '18M', cost: '$7,400', perReq: '$0.61', efficiency: 98, status: 'Healthy' },
  { model: 'Llama-3-70B', requests: '4.2k', tokens: '14M', cost: '$2,800', perReq: '$0.66', efficiency: 88, status: 'Healthy' },
];

const promptAudit = [
  { id: 'PR-823', tokens: '4.2k', latency: '2.1s', impact: 'High', rec: 'Reduce context' },
  { id: 'PR-819', tokens: '3.8k', latency: '1.8s', impact: 'Medium', rec: 'Enable caching' },
  { id: 'PR-792', tokens: '8.1k', latency: '4.5s', impact: 'Critical', rec: 'Switch to v3-mini' },
  { id: 'PR-744', tokens: '2.9k', latency: '1.2s', impact: 'Low', rec: 'Shorten system prompt' },
];

// --- Subcomponents ---

const StatusBadge = ({ status }) => {
  const styles = {
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Inefficient: 'bg-amber-50 text-amber-700 border-amber-100',
    'Over Budget': 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
      {status.toUpperCase()}
    </span>
  );
};

const KPIBox = ({ label, value, delta, status }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <StatusBadge status={status} />
    </div>
    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    <div className="flex items-center mt-1">
      <span className={`flex items-center text-xs font-bold ${delta.startsWith('+') ? 'text-rose-600' : 'text-emerald-600'}`}>
        {delta.startsWith('+') ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
        {delta}
      </span>
      <span className="text-slate-400 text-xs ml-2 font-medium">vs last period</span>
    </div>
  </div>
);

const SectionCard = ({ title, subtitle, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    <div className="mb-6">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
    {children}
  </div>
);

// --- Main Component ---

export default function LLMCostOptimization() {
  const [range, setRange] = useState('7d');

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* SECTION 1: Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Token Usage & Cost Optimization</h1>
            <p className="text-slate-500 text-sm font-medium">Monitor token economics, cost distribution, and inference efficiency.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              {['24h', '7d', '30d'].map((r) => (
                <button 
                  key={r} 
                  onClick={() => setRange(r)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${range === r ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none">
              <option>All Models</option>
              <option>OpenAI Suite</option>
              <option>Anthropic Suite</option>
            </select>
            <button className="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-500 hover:text-slate-900 shadow-sm transition-all">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* SECTION 2: KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPIBox label="Total Tokens" value="4.2M" delta="+12.4%" status="Healthy" />
          <KPIBox label="Total Cost" value="$41,200" delta="+8.2%" status="Healthy" />
          <KPIBox label="Avg Tokens / Req" value="2.8k" delta="+4.1%" status="Warning" />
          <KPIBox label="Budget Util." value="82.4%" delta="+15.0%" status="Warning" />
        </div>

        {/* SECTION 3: Token Usage Over Time */}
        <SectionCard title="Token Consumption Trend" subtitle="Daily aggregated token volume across all inference endpoints">
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="tokens" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* SECTION 4 & 7: Cost Analysis & Budget Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard title="Expenditure by Model" subtitle="Cumulative USD cost distribution per provider" className="lg:col-span-2">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelCosts} layout="vertical" margin={{ left: 20, right: 40 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#475569' }} width={100} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={28}>
                    {modelCosts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <div className="space-y-6">
            <SectionCard title="Monthly Budget Monitor" subtitle="Pacing against $50k target limit">
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-900 rounded-xl text-white">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Used to Date</p>
                    <p className="text-2xl font-bold text-slate-900">$41,200</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Limit</p>
                  <p className="text-lg font-bold text-slate-500">$50,000</p>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-amber-600">Usage Warning (82%)</span>
                  <span className="text-slate-400">Target &lt; 75%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '82.4%' }} />
                </div>
              </div>

              <div className="mt-10 p-4 bg-rose-50 rounded-xl border border-rose-100 flex items-start gap-3">
                <AlertCircle className="text-rose-600 mt-0.5" size={18} />
                <div>
                  <p className="text-xs font-bold text-rose-900">Budget Forecast Exception</p>
                  <p className="text-[11px] text-rose-700 leading-relaxed mt-1">
                    Projected Month-End: <span className="font-bold underline">$54,300</span>. Current trend exceeds allocated monthly credit by 8.6%.
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* SECTION 5: Cost Breakdown Table */}
        <SectionCard title="Inference Efficiency Registry" subtitle="Detailed performance and economic metrics across the fleet">
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Model Instance</th>
                  <th className="px-6 py-4">Requests</th>
                  <th className="px-6 py-4">Total Tokens</th>
                  <th className="px-6 py-4">Total Cost</th>
                  <th className="px-6 py-4">Avg Cost/Req</th>
                  <th className="px-6 py-4">Efficiency</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modelPerformance.map((row, idx) => (
                  <tr key={idx} className={`hover:bg-slate-50 transition-colors ${row.status === 'Inefficient' ? 'bg-amber-50/20' : ''}`}>
                    <td className="px-6 py-4 font-bold text-slate-900">{row.model}</td>
                    <td className="px-6 py-4 text-slate-600">{row.requests}</td>
                    <td className="px-6 py-4 font-mono text-xs">{row.tokens}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{row.cost}</td>
                    <td className="px-6 py-4 text-slate-500">{row.perReq}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{row.efficiency}%</span>
                        <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${row.efficiency > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                            style={{ width: `${row.efficiency}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* SECTION 6: Inefficient Prompts Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard title="Inference Optimization Targets" subtitle="High-impact prompts identified for immediate review" className="lg:col-span-2">
            <div className="space-y-3 mt-2">
              {promptAudit.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-300 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      p.impact === 'Critical' ? 'bg-rose-100 text-rose-600' : 
                      p.impact === 'High' ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-600'
                    }`}>
                      <Zap size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400">{p.id}</span>
                        <span className="text-xs font-bold text-slate-700">{p.tokens} tokens avg</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{p.rec}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Impact</p>
                      <p className={`text-xs font-bold ${p.impact === 'Critical' ? 'text-rose-600' : 'text-slate-600'}`}>{p.impact}</p>
                    </div>
                    <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:text-slate-900 transition-all">
                      Optimize
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest py-2 transition-colors">
              View All Performance Anomalies
            </button>
          </SectionCard>

          <SectionCard title="Economic Efficiency Index" subtitle="Cost-to-Performance weighting (0-100)">
            <div className="flex flex-col items-center justify-center space-y-6 mt-8">
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                  <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="401.9" strokeDashoffset="44.2" className="text-blue-600" strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-bold text-slate-900 block">89.2</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
                </div>
              </div>
              <div className="space-y-4 w-full">
                <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <TrendingUp className="text-blue-600 mt-0.5" size={16} />
                  <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                    Fleet efficiency improved by <span className="font-bold">3.2%</span> following GPT-4o context window optimizations.
                  </p>
                </div>
                <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  <Target size={16} /> Strategy Report
                </button>
              </div>
            </div>
          </SectionCard>
        </div>

      </div>
    </div>
  );
}