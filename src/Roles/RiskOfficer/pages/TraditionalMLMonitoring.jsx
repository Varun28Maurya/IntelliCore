import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { 
  Database, 
  AlertCircle, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  FileSpreadsheet,
  Search
} from 'lucide-react';

// --- Mock Data ---

const psiTrendData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  psi: (0.05 + Math.random() * 0.22).toFixed(3),
}));

const performanceData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  auc: (0.88 - (i * 0.008) + (Math.random() * 0.02)).toFixed(3),
  accuracy: (0.94 - (i * 0.006) + (Math.random() * 0.015)).toFixed(3),
}));

const featureStability = [
  { name: 'Credit_Score_Internal', psi: 0.284, ks: 0.22, status: 'Drift Detected', impact: 'High' },
  { name: 'Annual_Income_Reported', psi: 0.082, ks: 0.05, status: 'Stable', impact: 'Medium' },
  { name: 'Debt_To_Income_Ratio', psi: 0.312, ks: 0.25, status: 'Drift Detected', impact: 'High' },
  { name: 'Employment_Duration', psi: 0.045, ks: 0.03, status: 'Stable', impact: 'Low' },
  { name: 'Previous_Default_Flag', psi: 0.110, ks: 0.09, status: 'Stable', impact: 'High' },
];

const modelRiskRegistry = [
  { name: 'Retail Credit v4.2', function: 'Underwriting', date: '2024-05-12', risk: 'High', impact: 'Tier 1 (SR 11-7)', action: 'Re-validation Required' },
  { name: 'Fraud Shield Pro', function: 'Payments', date: '2024-05-10', risk: 'Medium', impact: 'Tier 2', action: 'Monitor Features' },
  { name: 'Loan Default Alpha', function: 'Collections', date: '2024-04-28', risk: 'Low', impact: 'Tier 2', action: 'Routine Check' },
  { name: 'AML Transaction Scorer', function: 'Compliance', date: '2024-05-14', risk: 'High', impact: 'Tier 1 (Regulatory)', action: 'Urgent Review' },
  { name: 'Customer LTV Predictor', function: 'Marketing', date: '2024-05-01', risk: 'Low', impact: 'Tier 3', action: 'None' },
];

// --- Reusable Components ---

const StatCard = ({ title, value, trend, icon: Icon, color = "blue" }) => {
  const isNegative = trend.startsWith('-');
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
          <Icon size={20} />
        </div>
        <div className={`flex items-center text-xs font-bold ${isNegative ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend} {isNegative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 leading-tight">{value}</h3>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">{title}</p>
    </div>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
  </div>
);

// --- Main Component ---

export default function TraditionalMLMonitoring() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-indigo-950">Traditional ML Risk Monitoring</h1>
            <p className="text-slate-500 text-sm">Regulatory governance of classical statistical models and scorecards</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
              <FileSpreadsheet size={16} /> Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm transition-all">
              Validate All
            </button>
          </div>
        </div>

        {/* SECTION 1: Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active ML Models" value="24" trend="+2" icon={Database} color="indigo" />
          <StatCard title="Models Under Watch" value="05" trend="+1" icon={Activity} color="amber" />
          <StatCard title="Drift Alerts (7D)" value="12" trend="+18%" icon={AlertCircle} color="rose" />
          <StatCard title="Validation Failures" value="03" trend="-1" icon={ShieldCheck} color="emerald" />
        </div>

        {/* SECTION 2: PSI Trend Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <SectionHeader 
            title="Population Stability Index (PSI) Trend" 
            subtitle="Monitoring the 30-day shift in population distributions for high-tier models"
          />
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={psiTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" hide />
                <YAxis domain={[0, 0.5]} axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <ReferenceLine y={0.1} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'Warning', position: 'right', fill: '#f59e0b', fontSize: 10 }} />
                <ReferenceLine y={0.25} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Critical', position: 'right', fill: '#ef4444', fontSize: 10 }} />
                <Line type="monotone" dataKey="psi" stroke="#4f46e5" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-400">
            <div className="flex items-center gap-2"><div className="w-3 h-1 bg-indigo-500 rounded-full"/> PSI Score</div>
            <div className="flex items-center gap-2">PSI &lt; 0.10 : Stable</div>
            <div className="flex items-center gap-2">PSI 0.10–0.25 : Minor Shift</div>
            <div className="flex items-center gap-2">PSI &gt; 0.25 : Major Shift</div>
          </div>
        </div>

        {/* SECTION 3: Feature Stability Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <SectionHeader title="Feature Stability Analysis" subtitle="KS Statistic and PSI breakdown for core features" />
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <Filter size={18} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Feature Name</th>
                  <th className="px-6 py-4">Current PSI</th>
                  <th className="px-6 py-4">KS Statistic</th>
                  <th className="px-6 py-4">Drift Status</th>
                  <th className="px-6 py-4">Impact Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {featureStability.map((f, i) => {
                  const hasDrift = f.psi > 0.25 || f.ks > 0.2;
                  return (
                    <tr key={i} className={`hover:bg-slate-50/50 transition-colors ${hasDrift ? 'bg-rose-50/20' : ''}`}>
                      <td className="px-6 py-4 font-bold text-slate-700">{f.name}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">{f.psi.toFixed(3)}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">{f.ks.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${hasDrift ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'}`}>
                          {f.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${f.impact === 'High' ? 'text-rose-600' : 'text-slate-500'}`}>{f.impact}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: Performance Degradation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <SectionHeader title="AUC Performance Trend" subtitle="Area Under Curve (Validation Set vs Production)" />
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                  <YAxis domain={[0.7, 1.0]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                  <Tooltip />
                  <Line type="stepAfter" dataKey="auc" stroke="#4f46e5" strokeWidth={2} dot={{r: 3, fill: '#4f46e5'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <SectionHeader title="Accuracy Convergence" subtitle="Monthly classification accuracy monitoring" />
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                  <YAxis domain={[0.8, 1.0]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="accuracy" stroke="#64748b" strokeWidth={2} dot={{r: 3, fill: '#64748b'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SECTION 5: Model Risk Classification Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <SectionHeader title="Model Risk Inventory Registry" subtitle="Official record of model tiers and validation cycles" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search models..." 
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48 md:w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Model Asset</th>
                  <th className="px-6 py-4">Business Function</th>
                  <th className="px-6 py-4">Last Validation</th>
                  <th className="px-6 py-4">Risk Category</th>
                  <th className="px-6 py-4">Regulatory Impact</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {modelRiskRegistry.map((model, idx) => (
                  <tr key={idx} className={`hover:bg-slate-50/50 transition-colors ${model.risk === 'High' ? 'border-l-4 border-l-rose-500' : 'border-l-4 border-l-transparent'}`}>
                    <td className="px-6 py-4 font-bold text-slate-700">{model.name}</td>
                    <td className="px-6 py-4 text-slate-500 uppercase text-[10px] font-bold">{model.function}</td>
                    <td className="px-6 py-4 text-slate-500">{model.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        model.risk === 'High' ? 'text-rose-700 border-rose-100 bg-rose-50' : 
                        model.risk === 'Medium' ? 'text-amber-700 border-amber-100 bg-amber-50' : 
                        'text-emerald-700 border-emerald-100 bg-emerald-50'
                      }`}>
                        {model.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{model.impact}</td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 font-bold hover:underline text-xs">
                        {model.action}
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