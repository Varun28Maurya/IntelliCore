import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  AlertCircle, 
  TrendingUp, 
  Clock, 
  Target, 
  ExternalLink 
} from 'lucide-react';

/**
 * ExecutiveDashboard Component
 * A high-level strategic overview for the Intellicore platform.
 * Design System: White cards, Slate typography, Emerald/Amber/Rose status colors.
 */

// --- Mock Data ---
const financialSplitData = [
  { name: 'LLM Systems', value: 1500000, color: '#2563eb' },
  { name: 'Traditional ML', value: 900000, color: '#94a3b8' },
];

const adoptionData = [
  { name: 'Finance', usage: 85 },
  { name: 'Ops', usage: 72 },
  { name: 'Marketing', usage: 45 },
  { name: 'Product', usage: 92 },
  { name: 'HR', usage: 30 },
];

const slaTrendData = [
  { day: '01', sla: 99.1 },
  { day: '05', sla: 99.4 },
  { day: '10', sla: 99.2 },
  { day: '15', sla: 99.5 },
  { day: '20', sla: 99.1 },
  { day: '25', sla: 99.3 },
  { day: '30', sla: 99.3 },
];

const alerts = [
  { id: 1, type: 'amber', title: 'AI cost exceeded forecast by 8%', time: '2h ago', desc: 'Infrastructure scaling in US-East cluster triggered unexpected compute spend.' },
  { id: 2, type: 'rose', title: 'Moderate risk exposure in LLM cluster', time: '5h ago', desc: 'Safety filters triggered 14 high-severity injection attempts in last 60 mins.' },
  { id: 3, type: 'emerald', title: 'SLA recovery successful', time: '12h ago', desc: 'System reliability back to 99.3% after scheduled database maintenance.' },
];

// --- Sub-components ---

const KPICard = ({ title, value, subtitle, trend, trendValue, status }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between min-h-[140px]">
    <div className="flex justify-between items-start">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{title}</span>
      {status && (
        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${status.bg} ${status.text}`}>
          {status.label}
        </span>
      )}
    </div>
    <div className="mt-4">
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <div className="flex items-center mt-1 gap-1.5">
        {trend && (
          <span className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-rose-600' : 'text-emerald-600'}`}>
            {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trendValue}
          </span>
        )}
        <span className="text-xs text-slate-500 font-medium">{subtitle}</span>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title }) => (
  <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
);

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6 font-sans">
      
      {/* Page Title */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-slate-900">Executive Strategic Overview</h1>
        <p className="text-slate-500 text-sm">Real-time organizational AI performance, financial oversight, and risk exposure.</p>
      </div>

      {/* SECTION 1 — Strategic KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total AI Spend (MTD)" 
          value="$2.4M" 
          subtitle="vs monthly budget" 
          trend="up" 
          trendValue="+12%" 
        />
        <KPICard 
          title="Overall AI Risk Score" 
          value="28 / 100" 
          subtitle="Risk index stable" 
          status={{ label: 'Low Risk', bg: 'bg-emerald-50', text: 'text-emerald-600' }}
        />
        <KPICard 
          title="SLA Compliance" 
          value="99.3%" 
          subtitle="Target ≥ 99.0%" 
          trend="down" 
          trendValue="0.2%" 
        />
        <KPICard 
          title="Active AI Systems" 
          value="42" 
          subtitle="18 ML • 24 LLM" 
        />
      </div>

      {/* SECTION 2 — Financial & Risk Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Health */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <SectionHeader title="Financial Health Overview" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-64">
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                  <span>Budget Utilization</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">Forecasted month-end: $3.1M (Over budget by $100k)</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs font-semibold text-slate-600">Avg. Token Cost (LLM)</span>
                  <span className="text-sm font-bold text-slate-900">$0.0024</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs font-semibold text-slate-600">Model Compute Efficiency</span>
                  <span className="text-sm font-bold text-emerald-600">+14.2%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={financialSplitData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {financialSplitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-400 uppercase font-bold leading-none">Split</span>
                <span className="text-lg font-bold text-slate-900">Cost</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Exposure */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <SectionHeader title="Risk Exposure Summary" />
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ML Drift Risk</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-sm font-bold text-slate-900">Low Risk</span>
                </div>
              </div>
              <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">LLM Safety Risk</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-sm font-bold text-slate-900">Moderate</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
               <div className="flex items-center justify-between px-4 py-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <AlertCircle size={18} className="text-amber-500" />
                    <span className="text-sm font-semibold text-slate-700">Open Governance Reviews</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">5 Active</span>
               </div>
               <div className="flex items-center justify-between px-4 py-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    <span className="text-sm font-semibold text-slate-700">Critical Alerts (24h)</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900 text-rose-600">2 Critical</span>
               </div>
            </div>
            <button className="w-full py-2.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors uppercase tracking-widest">
              View Detailed Risk Report
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3 — Adoption & Growth */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <SectionHeader title="Adoption & Organizational Usage" />
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Dept. Growth</p>
              <p className="text-sm font-bold text-emerald-600">+24%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">New Deployments</p>
              <p className="text-sm font-bold text-slate-900">8 Models</p>
            </div>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adoptionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
              <YAxis hide />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="usage" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 4 — Reliability & Stability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <SectionHeader title="Stability Pulse" />
          <div className="flex-1 flex items-center justify-around py-4">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center mb-2">
                <span className="text-sm font-bold text-slate-900">99.98%</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Uptime</p>
            </div>
            <div className="h-12 w-px bg-slate-100"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">12m</div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Downtime (30D)</p>
            </div>
            <div className="h-12 w-px bg-slate-100"></div>
            <div className="text-center">
               <TrendingUp size={24} className="text-emerald-500 mx-auto mb-2" />
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SLA Trend: Stable</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <SectionHeader title="SLA Compliance Trend (30 Days)" />
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={slaTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" hide />
                <YAxis domain={[98.5, 100]} hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="sla" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Day 1</span>
            <span>Target ≥ 99%</span>
            <span>Day 30</span>
          </div>
        </div>
      </div>

      {/* SECTION 5 — Executive Alerts */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Executive Intervention Queue</h3>
        <div className="grid grid-cols-1 gap-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex items-center group hover:border-blue-200 transition-all">
              <div className={`w-1.5 self-stretch ${alert.type === 'emerald' ? 'bg-emerald-500' : alert.type === 'amber' ? 'bg-amber-500' : 'bg-rose-500'}`} />
              <div className="flex-1 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${alert.type === 'emerald' ? 'bg-emerald-50' : alert.type === 'amber' ? 'bg-amber-50' : 'bg-rose-50'}`}>
                    {alert.type === 'rose' ? <AlertCircle size={18} className="text-rose-600" /> : <ShieldCheck size={18} className={alert.type === 'amber' ? 'text-amber-600' : 'text-emerald-600'} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{alert.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{alert.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[11px] font-semibold text-slate-400">{alert.time}</span>
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Briefing <ExternalLink size={12} />
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