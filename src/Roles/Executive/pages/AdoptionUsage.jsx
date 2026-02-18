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
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Users, 
  Activity, 
  LayoutGrid, 
  PlusCircle, 
  ArrowUpRight, 
  TrendingUp,
  Building2,
  PieChart as PieIcon
} from 'lucide-react';

/**
 * AdoptionUsage Component
 * Executive-level view of AI growth and departmental penetration.
 * Focuses on business adoption metrics rather than technical telemetry.
 */

// --- Mock Data ---
const deptUsageData = [
  { name: 'Retail Banking', requests: 1200000 },
  { name: 'Cust. Support', requests: 1100000 },
  { name: 'Risk & Comp.', requests: 850000 },
  { name: 'Lending', requests: 620000 },
  { name: 'Fraud Detect', requests: 430000 },
];

const usageTrendData = [
  { month: 'Oct', total: 1.2 },
  { month: 'Nov', total: 1.8 },
  { month: 'Dec', total: 2.4 },
  { month: 'Jan', total: 3.1 },
  { month: 'Feb', total: 3.8 },
  { month: 'Mar', total: 4.2 },
];

const deploymentGrowthData = [
  { month: 'Oct', models: 22 },
  { month: 'Nov', models: 25 },
  { month: 'Dec', models: 31 },
  { month: 'Jan', models: 35 },
  { month: 'Feb', models: 38 },
  { month: 'Mar', models: 42 },
];

const splitData = [
  { name: 'LLM Systems', value: 55, color: '#3b82f6' },
  { name: 'Traditional ML', value: 45, color: '#94a3b8' },
];

// --- Sub-components ---

const KPICard = ({ title, value, subtitle, trend, trendValue, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between min-h-[140px]">
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
        <Icon size={16} />
      </div>
    </div>
    <div className="mt-4">
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <div className="flex items-center mt-1 gap-1.5">
        {trend && (
          <span className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend === 'up' ? <ArrowUpRight size={14} /> : null}
            {trendValue}
          </span>
        )}
        <span className="text-xs text-slate-500 font-medium">{subtitle}</span>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* Header Area */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Adoption & Usage</h1>
        <p className="text-slate-500 text-sm">Organizational AI penetration and system utilization growth.</p>
      </div>

      {/* SECTION 1 — Adoption KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Active AI Systems" 
          value="42" 
          subtitle="18 ML • 24 LLM" 
          icon={LayoutGrid}
        />
        <KPICard 
          title="Departments Using AI" 
          value="7 / 10" 
          subtitle="Enterprise penetration" 
          trend="up" 
          trendValue="+2 this Q"
          icon={Building2}
        />
        <KPICard 
          title="Monthly AI Requests" 
          value="4.2M" 
          subtitle="Platform-wide volume" 
          trend="up" 
          trendValue="+18% MoM"
          icon={Activity}
        />
        <KPICard 
          title="New Models (30D)" 
          value="06" 
          subtitle="4 ML • 2 LLM" 
          trend="up" 
          trendValue="+1 vs Last"
          icon={PlusCircle}
        />
      </div>

      {/* SECTION 2 — Usage by Department */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Request Volume by Department</h3>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Growth Trend: Positive</span>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptUsageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                hide 
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`${(value / 1000000).toFixed(1)}M`, 'Requests']}
              />
              <Bar dataKey="requests" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 3 — Growth Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Monthly Request Growth ($M)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageTrendData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deployment Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Model Inventory Expansion</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deploymentGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="stepAfter" 
                  dataKey="models" 
                  stroke="#94a3b8" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#94a3b8', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECTION 4 — ML vs LLM Adoption Split */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 h-56 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={splitData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {splitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-900">55%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">LLM Share</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PieIcon size={18} className="text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Strategic Shift Analysis</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                LLM usage increased <span className="font-bold text-slate-900">12% QoQ</span> driven by customer support automation and new lending advisory modules. Traditional ML remains stable as the backbone for fraud detection and risk scoring.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">LLM Adoption Rate</p>
                <p className="text-lg font-bold text-blue-600">+14.2% QoQ</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ML Backbone Stability</p>
                <p className="text-lg font-bold text-slate-700">99.8% Core</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5 — Strategic Insights */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Key Adoption Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3 group hover:border-blue-200 transition-all">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
            <p className="text-sm font-semibold text-slate-700 leading-snug">
              Retail Banking adoption increased <span className="text-emerald-600 font-bold">22%</span> this quarter following the release of the "Smart-Advisor" model.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3 group hover:border-blue-200 transition-all">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <PlusCircle size={16} />
            </div>
            <p className="text-sm font-semibold text-slate-700 leading-snug">
              LLM adoption expanded to <span className="text-blue-600 font-bold">Fraud Detection</span> team to assist in summarizing suspicious pattern reports.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3 group hover:border-blue-200 transition-all">
            <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center">
              <Users size={16} />
            </div>
            <p className="text-sm font-semibold text-slate-700 leading-snug">
              AI penetration reached <span className="text-slate-900 font-bold">70%</span> of eligible departments, outperforming the YTD target of 65%.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;