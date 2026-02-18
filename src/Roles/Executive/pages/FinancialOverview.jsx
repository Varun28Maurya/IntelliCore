import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  TrendingUp, 
  Target, 
  AlertCircle, 
  Wallet,
  ArrowRight
} from 'lucide-react';

/**
 * FinancialOverview Component
 * Strategic financial oversight for the Intellicore platform.
 * Focuses on budget utilization, spend trends, and cost-risk vectors.
 */

// --- Mock Data ---
const spendBreakdown = [
  { name: 'LLM (Inference)', value: 1650000, color: '#3b82f6' },
  { name: 'Traditional ML', value: 750000, color: '#94a3b8' },
];

const monthlyTrend = [
  { month: 'Oct', spend: 1.8 },
  { month: 'Nov', spend: 1.9 },
  { month: 'Dec', spend: 2.1 },
  { month: 'Jan', spend: 2.3 },
  { month: 'Feb', spend: 2.2 },
  { month: 'Mar', spend: 2.4 },
];

const highGrowthDepts = [
  { dept: 'Retail Banking', growth: '+18%', cost: '$420k' },
  { dept: 'Customer Support', growth: '+12%', cost: '$310k' },
  { dept: 'Risk Management', growth: '+9%', cost: '$280k' },
];

const alerts = [
  { id: 1, type: 'rose', title: 'GPT-4o cluster exceeded daily budget threshold', time: '1h ago', desc: 'Auto-scaling triggered by batch processing job #882.' },
  { id: 2, type: 'amber', title: 'LLM cost increased 18% in Retail Banking', time: '4h ago', desc: 'New customer interaction model deployment phase 2.' },
  { id: 3, type: 'amber', title: 'Forecast nearing quarterly cap', time: '1d ago', desc: 'Projected spend is within 2% of total Q1 allocation.' },
];

// --- Sub-components ---

const KPICard = ({ title, value, subtitle, trend, trendValue, status }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between min-h-[140px]">
    <div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      <div className="flex items-baseline gap-2 mt-4">
        <h2 className="text-3xl font-bold text-slate-900">{value}</h2>
        {status && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${status === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {status === 'emerald' ? 'Within Budget' : 'Review Required'}
          </span>
        )}
      </div>
    </div>
    <div className="flex items-center gap-1.5 mt-2">
      {trend && (
        <span className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-rose-600' : 'text-emerald-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trendValue}
        </span>
      )}
      <span className="text-xs text-slate-500 font-medium">{subtitle}</span>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Area */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Overview</h1>
        <p className="text-slate-500 text-sm">Strategic cost management and budget allocation metrics.</p>
      </div>

      {/* SECTION 1 — High-Level Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total AI Spend (MTD)" 
          value="$2.4M" 
          subtitle="vs. last month" 
          trend="up" 
          trendValue="+12%" 
        />
        <KPICard 
          title="Budget Utilization" 
          value="82%" 
          subtitle="$2.4M of $3.0M allocation" 
        />
        <KPICard 
          title="Forecasted Month-End" 
          value="$2.8M" 
          subtitle="Projected settlement" 
          status="emerald"
        />
        <KPICard 
          title="Cost Growth Rate" 
          value="+9%" 
          subtitle="MoM spend velocity" 
          trend="up" 
          trendValue="+2% vs Avg"
        />
      </div>

      {/* SECTION 2 — Spend Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Spend Breakdown by System</h3>
          <div className="flex flex-col md:flex-row items-center gap-8 h-64">
            <div className="w-full h-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendBreakdown}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {spendBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-900">$2.4M</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Total MTD</span>
              </div>
            </div>
            <div className="w-full space-y-4">
              {spendBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-semibold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {((item.value / 2400000) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Monthly Spend Trend ($M)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
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
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="spend" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorSpend)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECTION 3 — Budget vs Forecast */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Budget Consumption Strategy</h3>
            <p className="text-xs text-slate-500 mt-1">Projected to remain within quarterly allocation ($9.0M Cap).</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Remaining Budget</p>
              <p className="text-lg font-bold text-slate-900">$600k</p>
            </div>
            <div className="text-right border-l pl-4 border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Forecast Variance</p>
              <p className="text-lg font-bold text-emerald-600">-3.4%</p>
            </div>
          </div>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-[10px] font-bold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-50">
                Current Usage
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold inline-block text-blue-600">82%</span>
            </div>
          </div>
          <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-slate-100">
            <div style={{ width: "82%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-1000"></div>
          </div>
        </div>
      </div>

      {/* SECTION 4 — Cost Risk Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Anomaly Events</p>
            <p className="text-sm font-bold text-slate-900">3 Detected <span className="text-xs font-normal text-slate-400">(30d)</span></p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High Growth Area</p>
            <p className="text-sm font-bold text-slate-900">Retail Banking <span className="text-xs font-normal text-slate-400">(+18%)</span></p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
            <Target size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Models Near Cap</p>
            <p className="text-sm font-bold text-slate-900">4 Active <span className="text-xs font-normal text-slate-400">(≥ 90%)</span></p>
          </div>
        </div>
      </div>

      {/* SECTION 5 — Executive Alerts (Financial) */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Financial Alerts & Briefings</h3>
        <div className="grid grid-cols-1 gap-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex items-center group hover:border-blue-300 transition-all cursor-pointer">
              <div className={`w-1.5 self-stretch ${alert.type === 'rose' ? 'bg-rose-500' : 'bg-amber-500'}`} />
              <div className="flex-1 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${alert.type === 'rose' ? 'bg-rose-50' : 'bg-amber-50'}`}>
                    <DollarSign size={18} className={alert.type === 'rose' ? 'text-rose-600' : 'text-amber-600'} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{alert.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{alert.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{alert.time}</span>
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Analysis <ArrowRight size={12} />
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