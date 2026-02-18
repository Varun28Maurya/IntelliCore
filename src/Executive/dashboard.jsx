import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  ShieldAlert, 
  DollarSign, 
  Users, 
  Globe, 
  Activity,
  ChevronRight,
  Clock,
  AlertCircle,
  Building2
} from 'lucide-react';

// --- Mock Strategic Data ---

const RELIABILITY_TREND = [
  { day: 'Mon', uptime: 99.92 },
  { day: 'Tue', uptime: 99.95 },
  { day: 'Wed', uptime: 99.88 },
  { day: 'Thu', uptime: 99.91 },
  { day: 'Fri', uptime: 99.98 },
  { day: 'Sat', uptime: 99.99 },
  { day: 'Sun', uptime: 99.97 },
];

const ADOPTION_BY_DEPT = [
  { name: 'Retail', usage: 45, fill: '#2563eb' },
  { name: 'Wealth', usage: 32, fill: '#3b82f6' },
  { name: 'Risk', usage: 58, fill: '#60a5fa' },
  { name: 'Ops', usage: 24, fill: '#93c5fd' },
  { name: 'Legal', usage: 12, fill: '#bfdbfe' },
];

const STRATEGIC_ALERTS = [
  { id: 1, type: 'warning', msg: 'AI Operating Cost exceeded projected budget by 4%', time: '2h ago', level: 'Moderate' },
  { id: 2, type: 'critical', msg: 'SLA compliance dropped below 99.9% in APAC region', time: '5h ago', level: 'High' },
  { id: 3, type: 'info', msg: 'Corporate AI Risk Index updated: New policy controls active', time: '1d ago', level: 'Low' },
];

// --- Reusable Executive Components ---

const StatBox = ({ label, value, trend, trendValue, icon: Icon, color = "blue" }) => {
  const isPositive = trend === 'up';
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-xl bg-₹{color}-50 text-₹{color}-600`}>
          <Icon size={20} />
        </div>
        <div className={`flex items-center text-xs font-bold ₹{isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
          {trendValue}
        </div>
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl font-black text-slate-900">{value}</h3>
    </div>
  );
};

const SectionHeader = ({ title, description }) => (
  <div className="mb-4">
    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{title}</h3>
    {description && <p className="text-xs text-slate-500">{description}</p>}
  </div>
);

// --- Main Component ---

export default function ExecutiveDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-8 font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Executive Insight</h1>
          <p className="text-slate-500 text-sm font-medium">AI Strategy & Risk Performance Overview — Q1 2024</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider">Systems Nominal</span>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all">
            Share Report
          </button>
        </div>
      </div>

      {/* SECTION 1: AI Risk Overview (Hero) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-10">
          <div className="relative flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
              <circle 
                cx="80" 
                cy="80" 
                r="70" 
                stroke="#f59e0b" 
                strokeWidth="12" 
                fill="transparent" 
                strokeDasharray={440} 
                strokeDashoffset={440 - (440 * 62) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-slate-900">62</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Moderate</span>
            </div>
          </div>
          <div className="flex-1">
            <SectionHeader 
              title="Overall AI Risk Posture" 
              description="Consolidated index across safety, compliance, and reliability." 
            />
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 mt-6">
              {[
                { label: 'Drift Exposure', val: 'Low', color: 'text-emerald-500' },
                { label: 'Bias Exposure', val: 'Moderate', color: 'text-amber-500' },
                { label: 'Safety Risk', val: 'Minimal', color: 'text-emerald-500' },
                { label: 'SLA Risk', val: 'Critical', color: 'text-rose-500' }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className={`text-sm font-black ₹{item.color}`}>{item.val}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block w-px h-32 bg-slate-100" />
          <div className="flex flex-col justify-center items-center text-center">
             <ShieldAlert className="text-amber-500 mb-2" size={32} />
             <p className="text-xs font-bold text-slate-800">Action Required</p>
             <p className="text-[10px] text-slate-500 max-w-[120px] mt-1 italic">Bias detection in Wealth Advisor cluster.</p>
          </div>
        </div>

        {/* Governance Quick Look */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col justify-between">
           <div>
             <SectionHeader title="Governance Health" />
             <div className="space-y-6 mt-4">
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Compliance Score</p>
                     <p className="text-3xl font-black">94.2%</p>
                   </div>
                   <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded font-bold uppercase">Healthy</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Pending Review</p>
                    <p className="text-lg font-bold">04</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Violations</p>
                    <p className="text-lg font-bold">01</p>
                  </div>
                </div>
             </div>
           </div>
           <button className="mt-8 flex items-center justify-between w-full p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-all group">
             <span className="text-xs font-bold">Full Compliance Audit</span>
             <ChevronRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>

      {/* SECTION 2: Financial Overview */}
      <div>
        <SectionHeader title="Financial & Operational Impact" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <StatBox label="Total AI Cost (MTD)" value="₹1.24M" trend="up" trendValue="+5.2%" icon={DollarSign} color="blue" />
          <StatBox label="Efficiency Gain" value="₹420K" trend="up" trendValue="+12%" icon={TrendingUp} color="emerald" />
          <StatBox label="ML vs LLM Cost" value="42 / 58" trend="down" trendValue="-2.1%" icon={Activity} color="indigo" />
          <StatBox label="Forecasted Spend" value="₹1.58M" trend="up" trendValue="+8.0%" icon={Clock} color="slate" />
        </div>
      </div>

      {/* SECTION 3 & 4: SLA & Adoption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SLA & Reliability */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-8">
            <SectionHeader title="SLA & System Reliability" description="Uptime performance across all production models." />
            <div className="text-right">
              <p className="text-3xl font-black text-slate-900">99.8%</p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Target Met</p>
            </div>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RELIABILITY_TREND}>
                <defs>
                  <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <YAxis domain={[99.5, 100]} hide />
                <Tooltip />
                <Area type="monotone" dataKey="uptime" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorUptime)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Adoption & Usage */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col">
          <SectionHeader title="AI Adoption & Departmental Usage" description="Deployment scale across organizational divisions." />
          <div className="flex flex-1 items-center gap-8 mt-4">
             <div className="grid grid-cols-2 gap-6 flex-1">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Active Models</p>
                  <p className="text-2xl font-black text-slate-900">42</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Avg Requests/Day</p>
                  <p className="text-2xl font-black text-slate-900">15.2M</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Business Units</p>
                  <p className="text-2xl font-black text-slate-900">08</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Adoption Growth</p>
                  <p className="text-2xl font-black text-emerald-600">+22%</p>
                </div>
             </div>
             <div className="w-[180px] h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ADOPTION_BY_DEPT}>
                    <Bar dataKey="usage" radius={[4, 4, 4, 4]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase mt-2">Usage by Dept</p>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: Strategic Alerts */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-4 border-b border-slate-100 flex items-center gap-2">
           <ShieldAlert size={18} className="text-slate-400" />
           <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Executive Alerts</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {STRATEGIC_ALERTS.map((alert) => (
            <div key={alert.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-6">
                <div className={`w-2 h-2 rounded-full ₹{
                  alert.level === 'High' ? 'bg-rose-500' : 
                  alert.level === 'Moderate' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="text-sm font-bold text-slate-800">{alert.msg}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">{alert.time}</span>
                    <span className="text-[10px] font-black uppercase text-slate-300">|</span>
                    <span className="text-[10px] font-black uppercase text-slate-400">Severity: {alert.level}</span>
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-black uppercase text-slate-500 hover:bg-white hover:border-slate-400 transition-all">
                View Summary
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Branding */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-3 grayscale opacity-60">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="text-slate-800">Horizon Strategy Console v2.0</span>
        </div>
        <div className="flex gap-8">
           <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-300" /> Fiscal Audit Ready</span>
           <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-300" /> Real-time Sync</span>
        </div>
        <div>© 2024 Institutional Intelligence Division</div>
      </div>

    </div>
  );
}