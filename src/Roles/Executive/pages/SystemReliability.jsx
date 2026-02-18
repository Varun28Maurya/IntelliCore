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
  Cell 
} from 'recharts';
import { 
  Activity, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Globe, 
  Zap,
  TrendingUp
} from 'lucide-react';

/**
 * SystemReliability Component
 * Executive-level oversight of platform uptime and SLA compliance.
 * Focuses on business continuity and reliability trends.
 */

// --- Mock Data ---
const slaTrendData = [
  { month: 'Oct', compliance: 99.8 },
  { month: 'Nov', compliance: 99.5 },
  { month: 'Dec', compliance: 99.1 },
  { month: 'Jan', compliance: 98.8 },
  { month: 'Feb', compliance: 99.2 },
  { month: 'Mar', compliance: 98.9 },
];

const incidentSeverityData = [
  { severity: 'Critical', count: 2, color: '#f43f5e' }, // rose-500
  { severity: 'High', count: 5, color: '#f59e0b' },     // amber-500
  { severity: 'Medium', count: 12, color: '#3b82f6' },   // blue-500
  { severity: 'Low', count: 18, color: '#94a3b8' },      // slate-400
];

const alerts = [
  { id: 1, type: 'amber', title: 'SLA dipped below 99% for 2 consecutive days', time: '1h ago', desc: 'Latency in LLM inference nodes triggered automated failover protocols.' },
  { id: 2, type: 'emerald', title: 'LLM cluster incident resolved in 42 minutes', time: '6h ago', desc: 'Resolved via node recycling. Root cause: memory leak in deployment v2.4.' },
  { id: 3, type: 'blue', title: 'Regional latency spike detected in APAC', time: '12h ago', desc: 'Minimal impact on core banking operations; rerouting to backup gateways.' },
];

// --- Sub-components ---

const KPICard = ({ title, value, subtitle, status, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between min-h-[140px]">
    <div className="flex justify-between items-start">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      {status && (
        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
          status === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
          status === 'amber' ? 'bg-amber-50 text-amber-600' : 
          'bg-rose-50 text-rose-600'
        }`}>
          {status === 'emerald' ? 'Healthy' : status === 'amber' ? 'Warning' : 'Critical'}
        </span>
      )}
    </div>
    <div className="mt-4">
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <div className="flex items-center mt-1 gap-1.5 text-xs text-slate-500 font-medium">
        {Icon && <Icon size={14} className="text-slate-400" />}
        {subtitle}
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Reliability</h1>
        <p className="text-slate-500 text-sm">Service level objectives and platform stability metrics.</p>
      </div>

      {/* SECTION 1 — Reliability KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Overall Uptime" 
          value="99.34%" 
          subtitle="Rolling 30-day average" 
          status="emerald"
        />
        <KPICard 
          title="SLA Compliance" 
          value="98.9%" 
          subtitle="Target threshold ≥ 99%" 
          status="amber"
          icon={TrendingUp}
        />
        <KPICard 
          title="Total Downtime" 
          value="142 min" 
          subtitle="Aggregate (Last 30 days)" 
          icon={Clock}
        />
        <KPICard 
          title="Open Incidents" 
          value="03" 
          subtitle="1 Critical • 2 High" 
          status="amber"
        />
      </div>

      {/* SECTION 2 — SLA Compliance Trend */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">SLA Compliance Trend</h3>
            <p className="text-xs text-slate-500 mt-1">Service levels remain within quarterly thresholds.</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Average</span>
            <span className="text-sm font-bold text-slate-900">99.2%</span>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={slaTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                domain={[98, 100]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`${value}%`, 'Compliance']}
              />
              <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 3 — Incident Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metric Overview */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Incident Health (30D)</h3>
          <div className="grid grid-cols-2 gap-6 h-full">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Incidents</p>
                <p className="text-2xl font-bold text-slate-900">37</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Critical Incidents</p>
                <p className="text-2xl font-bold text-rose-600">02</p>
              </div>
            </div>
            <div className="space-y-6 border-l border-slate-100 pl-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Resolution (MTTR)</p>
                <p className="text-2xl font-bold text-slate-900">1.4h</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reliability Score</p>
                <p className="text-2xl font-bold text-emerald-600">94/100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Severity Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Incidents by Severity</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentSeverityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="severity" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                  width={80}
                />
                <Tooltip 
                   cursor={{ fill: '#f8fafc' }}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={24}>
                  {incidentSeverityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECTION 4 — System Stability Summary */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Platform Core Stability</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold uppercase">ML System Uptime</span>
              <span className="text-emerald-600 font-bold">99.98%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold uppercase">LLM System Uptime</span>
              <span className="text-amber-600 font-bold">98.42%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '98.4%' }}></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold uppercase">Infra Reliability</span>
              <span className="text-blue-600 font-bold">99.99%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '99.99%' }}></div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <Globe size={18} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-tight">Regional Impact: <span className="text-slate-900">None</span></span>
           </div>
           <div className="flex items-center gap-3">
              <Zap size={18} className="text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">System Health: Optimal</span>
           </div>
        </div>
      </div>

      {/* SECTION 5 — Executive Reliability Alerts */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Operational Briefings</h3>
        <div className="grid grid-cols-1 gap-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex items-center group hover:border-blue-300 transition-all cursor-pointer">
              <div className={`w-1.5 self-stretch ${alert.type === 'emerald' ? 'bg-emerald-500' : alert.type === 'amber' ? 'bg-amber-500' : 'bg-blue-500'}`} />
              <div className="flex-1 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${alert.type === 'emerald' ? 'bg-emerald-50' : alert.type === 'amber' ? 'bg-amber-50' : 'bg-blue-50'}`}>
                    <Activity size={18} className={alert.type === 'emerald' ? 'text-emerald-600' : alert.type === 'amber' ? 'text-amber-600' : 'text-blue-600'} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{alert.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{alert.desc}</p>
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