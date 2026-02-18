import React from 'react';
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
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { 
  ShieldAlert, 
  Activity, 
  Target, 
  Lock, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Info,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

// --- Mock Data ---

const riskContributionData = [
  {
    name: 'Total Risk',
    Performance: 25,
    Drift: 20,
    Bias: 18,
    Security: 22,
    Compliance: 15,
  },
];

const timelineData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  score: Math.floor(70 + Math.random() * 15) - (i < 10 ? 5 : 0),
}));

const highImpactModels = [
  { name: 'Loan Approval v3', type: 'ML', score: 88, driver: 'Bias', status: 'Critical' },
  { name: 'Credit Scoring Alpha', type: 'ML', score: 81, driver: 'Compliance', status: 'Critical' },
  { name: 'Customer Service Bot', type: 'LLM', score: 74, driver: 'Security', status: 'Warning' },
  { name: 'Fraud Detection Engine', type: 'ML', score: 68, driver: 'Performance', status: 'Warning' },
  { name: 'Inventory Predictor', type: 'ML', score: 42, driver: 'Drift', status: 'Healthy' },
];

const dimensions = [
  { name: 'Performance Risk', score: 76, trend: '+2.1%', status: 'Critical', icon: Target },
  { name: 'Drift Risk', score: 58, trend: '-0.5%', status: 'Healthy', icon: Activity },
  { name: 'Bias Risk', score: 82, trend: '+4.2%', status: 'Critical', icon: ShieldAlert },
  { name: 'Security Risk', score: 64, trend: '+1.0%', status: 'Warning', icon: Lock },
  { name: 'Compliance Risk', score: 45, trend: '-1.2%', status: 'Healthy', icon: FileText },
];

// --- Reusable Components ---

const StatusBadge = ({ status }) => {
  const colors = {
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[status]}`}>
      {status}
    </span>
  );
};

const DimensionCard = ({ name, score, trend, status, icon: Icon }) => {
  const isHigh = score > 75;
  const isMed = score >= 60 && score <= 75;
  
  const scoreColor = isHigh ? 'text-rose-600' : isMed ? 'text-amber-600' : 'text-emerald-600';

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
          <Icon size={18} />
        </div>
        <StatusBadge status={status} />
      </div>
      <p className="text-sm font-medium text-slate-500 mb-1">{name}</p>
      <div className="flex items-baseline gap-2">
        <h4 className={`text-2xl font-bold ${scoreColor}`}>{score}</h4>
        <span className="text-xs text-slate-400">/ 100</span>
      </div>
      <div className={`mt-2 flex items-center text-[11px] font-semibold ${trend.startsWith('+') ? 'text-rose-500' : 'text-emerald-500'}`}>
        {trend.startsWith('+') ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
        {trend} vs last week
      </div>
    </div>
  );
};

// --- Main Page ---

export default function AIRiskIndex() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Risk Index Analysis</h1>
            <p className="text-slate-500 text-sm">Detailed governance breakdown and scoring methodology</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Live Audit Mode</span>
          </div>
        </div>

        {/* SECTION 1: Risk Index Scorecard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="relative mb-4">
              {/* Semi-gauge look using SVG */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <circle 
                  cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={(2 * Math.PI * 80) * (1 - 78 / 100)}
                  className="text-rose-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-slate-900">78</span>
                <span className="text-sm font-bold text-slate-400 uppercase">High Risk</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Composite Risk Index</h2>
            <p className="text-sm text-slate-500 max-w-[240px]">
              Calculated based on drift, bias, performance, and governance signals across all active models.
            </p>
          </div>

          {/* SECTION 2: Risk Contribution Breakdown */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-slate-800 tracking-tight">Risk Contribution Breakdown</h2>
              <div className="flex items-center gap-1 text-slate-400 cursor-help">
                <Info size={14} />
                <span className="text-[10px] uppercase font-bold tracking-wider">Methodology</span>
              </div>
            </div>
            
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskContributionData} layout="vertical" barGap={0}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="Performance" stackId="a" fill="#6366f1" radius={[4, 0, 0, 4]} />
                  <Bar dataKey="Drift" stackId="a" fill="#8b949e" />
                  <Bar dataKey="Bias" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="Security" stackId="a" fill="#ef4444" />
                  <Bar dataKey="Compliance" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              {[
                { label: 'Performance', val: '25%', color: 'bg-indigo-500' },
                { label: 'Drift', val: '20%', color: 'bg-slate-400' },
                { label: 'Bias', val: '18%', color: 'bg-amber-500' },
                { label: 'Security', val: '22%', color: 'bg-rose-500' },
                { label: 'Compliance', val: '15%', color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item.val}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-slate-400 italic">
              * Risk index is a weighted composite scoring model approved under Governance Framework v4.2.
            </p>
          </div>
        </div>

        {/* SECTION 3: Risk Dimension Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dimensions.map((dim) => (
            <DimensionCard key={dim.name} {...dim} />
          ))}
        </div>

        {/* SECTION 4: Risk Trend Timeline */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Risk Movement Timeline</h2>
              <p className="text-xs text-slate-400">30-day historical trend of the composite index</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-[11px] font-bold bg-slate-100 text-slate-600 rounded-lg">1M</button>
              <button className="px-3 py-1 text-[11px] font-bold text-slate-400 hover:bg-slate-50 rounded-lg">3M</button>
            </div>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" hide />
                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#6366f1" 
                  strokeWidth={2.5} 
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#6366f1' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 5: High Impact Models Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 font-sans">High Impact Assets Oversight</h2>
            <AlertCircle size={18} className="text-slate-300" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Model Asset</th>
                  <th className="px-6 py-4">System Architecture</th>
                  <th className="px-6 py-4">Index Score</th>
                  <th className="px-6 py-4">Primary Driver</th>
                  <th className="px-6 py-4">Governance Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {highImpactModels.map((model, idx) => (
                  <tr key={idx} className={`${model.score > 75 ? 'bg-rose-50/20' : 'hover:bg-slate-50/50'} transition-colors`}>
                    <td className="px-6 py-4 font-bold text-slate-700">{model.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">
                        {model.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-mono font-bold ${model.score > 75 ? 'text-rose-600' : 'text-slate-600'}`}>
                        {model.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{model.driver}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={model.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </td>
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