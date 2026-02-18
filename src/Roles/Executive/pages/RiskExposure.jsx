import React from 'react';
import { 
  RadialBarChart, 
  RadialBar, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar,
  Cell
} from 'recharts';
import { 
  ShieldCheck, 
  BrainCircuit, 
  Scale, 
  AlertTriangle, 
  Activity, 
  ShieldAlert,
  ArrowRight,
  Info
} from 'lucide-react';

/**
 * RiskExposure Component
 * Executive-level oversight of AI risk posture.
 * Provides abstracted views of ML Drift, LLM Safety, and Compliance standing.
 */

// --- Mock Data ---
const riskScoreData = [
  { name: 'Risk', value: 28, fill: '#10b981' } // Emerald for low risk
];

const riskTrendData = [
  { month: 'Oct', score: 32 },
  { month: 'Nov', score: 30 },
  { month: 'Dec', score: 34 },
  { month: 'Jan', score: 29 },
  { month: 'Feb', score: 31 },
  { month: 'Mar', score: 28 },
];

const comparisonData = [
  { category: 'Traditional ML', score: 22, color: '#94a3b8' },
  { category: 'LLM Cluster', score: 35, color: '#3b82f6' },
];

const alerts = [
  { id: 1, type: 'amber', title: 'LLM hallucination rate exceeded threshold', time: '4h ago', desc: 'Retail banking cluster recorded 1.2% rate vs 0.8% threshold.', dept: 'Retail Banking' },
  { id: 2, type: 'rose', title: 'ML drift spike detected in Credit Risk model', time: '6h ago', desc: 'Significant statistical deviation in feature weights for CR-01.', dept: 'Risk Management' },
  { id: 3, type: 'amber', title: 'Compliance review pending for AML model', time: '1d ago', desc: 'Model version 4.2 requires executive sign-off for EU-AI Act compliance.', dept: 'Legal/Ops' },
];

// --- Sub-components ---

const RiskBadge = ({ level }) => {
  const styles = {
    low: "bg-emerald-50 text-emerald-600 border-emerald-100",
    moderate: "bg-amber-50 text-amber-600 border-amber-100",
    high: "bg-rose-50 text-rose-600 border-rose-100"
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${styles[level]}`}>
      {level === 'low' ? 'Low Risk' : level === 'moderate' ? 'Moderate' : 'High Risk'}
    </span>
  );
};

const App = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Risk Exposure</h1>
        <p className="text-slate-500 text-sm">Strategic AI risk posture and governance oversight.</p>
      </div>

      {/* SECTION 1 — Unified AI Risk Index (Hero Card) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/3 h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              cx="50%" cy="50%" 
              innerRadius="70%" outerRadius="100%" 
              barSize={16} 
              data={riskScoreData} 
              startAngle={180} endAngle={0}
            >
              <RadialBar background dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
            <span className="text-4xl font-bold text-slate-900">28</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Index / 100</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <RiskBadge level="low" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Postures remain stable</h2>
          </div>
          <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
            Overall AI risk exposure remains within acceptable governance thresholds. LLM safety performance has improved by 4% MoM following the deployment of new mediation layers.
          </p>
          <div className="flex gap-6 pt-2">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Last Assessment</p>
              <p className="text-sm font-semibold text-slate-700">Mar 12, 2024</p>
            </div>
            <div className="h-10 w-px bg-slate-100"></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Governance Status</p>
              <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
                <ShieldCheck size={14} /> Fully Compliant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 — Risk Breakdown (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Traditional ML Risk */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-600">
              <Activity size={20} />
            </div>
            <RiskBadge level="low" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Traditional ML Risk</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Drift Exposure</span>
              <span className="text-slate-900 font-bold">12%</span>
            </li>
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Bias Index</span>
              <span className="text-slate-900 font-bold text-emerald-600">Optimal</span>
            </li>
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Degradation Alerts</span>
              <span className="text-slate-900 font-bold">2 Active</span>
            </li>
          </ul>
        </div>

        {/* LLM Risk */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100 text-blue-600">
              <BrainCircuit size={20} />
            </div>
            <RiskBadge level="moderate" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">LLM Risk Posture</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Hallucination Rate</span>
              <span className="text-slate-900 font-bold">0.8%</span>
            </li>
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Safety Violations</span>
              <span className="text-slate-900 font-bold text-amber-600">12 (30d)</span>
            </li>
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Prompt Injections</span>
              <span className="text-slate-900 font-bold">5 Blocked</span>
            </li>
          </ul>
        </div>

        {/* Compliance Risk */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600">
              <Scale size={20} />
            </div>
            <RiskBadge level="low" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Compliance Standing</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Open Violations</span>
              <span className="text-slate-900 font-bold">0</span>
            </li>
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Pending Reviews</span>
              <span className="text-slate-900 font-bold">4 Modules</span>
            </li>
            <li className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">EU AI Act Readiness</span>
              <span className="text-slate-900 font-bold text-emerald-600">92%</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION 3 — Risk Trend Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">AI Risk Score Trend (6 Months)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">ML vs LLM Risk Profile</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="category" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                  width={110}
                />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="score" barSize={32} radius={[0, 8, 8, 0]}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECTION 4 — Critical Exposure Summary */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">High-Risk Models</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">03</span>
              <span className="text-xs font-bold text-slate-400">Total</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Critical Alerts</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-rose-600">02</span>
              <span className="text-xs font-bold text-rose-400">Active</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Policy Breaches</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">00</span>
              <span className="text-xs font-bold text-emerald-500">None</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Escalated Cases</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">01</span>
              <span className="text-xs font-bold text-amber-500">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5 — Executive Risk Alerts */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Risk Intervention Queue</h3>
        <div className="grid grid-cols-1 gap-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex items-center group hover:border-slate-300 transition-all cursor-pointer">
              <div className={`w-1.5 self-stretch ${alert.type === 'rose' ? 'bg-rose-500' : 'bg-amber-500'}`} />
              <div className="flex-1 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${alert.type === 'rose' ? 'bg-rose-50' : 'bg-amber-50'}`}>
                    <ShieldAlert size={18} className={alert.type === 'rose' ? 'text-rose-600' : 'text-amber-600'} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{alert.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{alert.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">{alert.time}</span>
                    <span className="text-[11px] font-semibold text-slate-500">{alert.dept}</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Briefing <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default App;