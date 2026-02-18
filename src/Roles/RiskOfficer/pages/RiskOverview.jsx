import React, { useMemo } from 'react';
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
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Scale, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown,
  Clock,
  ExternalLink
} from 'lucide-react';

// --- Mock Data ---

const riskTrendData = [
  { day: 'Mon', score: 42 },
  { day: 'Tue', score: 45 },
  { day: 'Wed', score: 40 },
  { day: 'Thu', score: 52 },
  { day: 'Fri', score: 48 },
  { day: 'Sat', score: 55 },
  { day: 'Sun', score: 54 },
];

const systemDistributionData = [
  { name: 'Traditional ML', value: 34 },
  { name: 'LLM Systems', value: 48 },
  { name: 'Infrastructure', value: 12 },
  { name: 'Data Pipeline', value: 22 },
];

const riskBreakdownData = [
  { name: 'Compliance', value: 30, color: '#6366f1' },
  { name: 'Bias', value: 25, color: '#f59e0b' },
  { name: 'Operational', value: 20, color: '#10b981' },
  { name: 'Security', value: 25, color: '#ef4444' },
];

const highRiskModels = [
  { id: 1, name: 'Loan Approval v3', type: 'ML', score: 88, category: 'Bias', status: 'Critical' },
  { id: 2, name: 'Customer Service Bot', type: 'LLM', score: 82, category: 'Security', status: 'Warning' },
  { id: 3, name: 'Fraud Detection Engine', type: 'ML', score: 75, category: 'Operational', status: 'Warning' },
  { id: 4, name: 'Credit Scoring Alpha', type: 'ML', score: 91, category: 'Compliance', status: 'Critical' },
  { id: 5, name: 'Marketing Personalizer', type: 'LLM', score: 42, category: 'Compliance', status: 'Healthy' },
];

const escalations = [
  { id: 1, title: 'Bias threshold exceeded (Loan Model v3)', time: '12 mins ago', severity: 'Critical' },
  { id: 2, title: 'Hallucination spike detected (LLM Customer Bot)', time: '45 mins ago', severity: 'High' },
  { id: 3, title: 'Compliance breach flagged (Credit Model)', time: '2 hours ago', severity: 'Warning' },
];

// --- Reusable Sub-components ---

const Badge = ({ children, status }) => {
  const styles = {
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.Warning}`}>
      {children}
    </span>
  );
};

const MetricCard = ({ title, value, status, trend, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">
        <Icon size={20} className="text-slate-600" />
      </div>
      <Badge status={status}>{status}</Badge>
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
      <div className="flex items-end gap-2">
        <h3 className="text-3xl font-bold text-slate-900 leading-none">{value}</h3>
        <span className={`text-sm font-medium flex items-center mb-0.5 ${trend.startsWith('+') ? 'text-rose-600' : 'text-emerald-600'}`}>
          {trend.startsWith('+') ? <TrendingUp size={14} className="mr-0.5" /> : <TrendingDown size={14} className="mr-0.5" />}
          {trend}
        </span>
      </div>
    </div>
  </div>
);

const SectionCard = ({ title, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      <button className="text-slate-400 hover:text-slate-600 transition-colors">
        <Clock size={18} />
      </button>
    </div>
    {children}
  </div>
);

// --- Main Page Component ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900">
      {/* Header Area */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Risk Overview Dashboard</h1>
          <p className="text-slate-500">IntelliCore AI Observability & Governance Control Center</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Session Role</p>
            <p className="text-sm font-bold text-slate-700">Chief Risk Officer (CRO)</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-600">
            JD
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* SECTION 1: Top Risk KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="AI Risk Index" 
            value="54/100" 
            status="Warning" 
            trend="+2.4%" 
            icon={Activity} 
          />
          <MetricCard 
            title="Active High-Risk Models" 
            value="12" 
            status="Critical" 
            trend="+1" 
            icon={AlertTriangle} 
          />
          <MetricCard 
            title="Open Compliance Violations" 
            value="04" 
            status="Warning" 
            trend="-2" 
            icon={Scale} 
          />
          <MetricCard 
            title="Bias Alerts (7D)" 
            value="08" 
            status="Critical" 
            trend="+3" 
            icon={ShieldCheck} 
          />
        </div>

        {/* SECTION 2: AI Risk Index Trend */}
        <SectionCard title="AI Risk Index Trend (7-Day Overview)">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* SECTION 3: Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Risk Distribution by System Type">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={systemDistributionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    width={100}
                  />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" fill="#94a3b8" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Risk Category Breakdown">
            <div className="h-[300px] w-full flex flex-col md:flex-row items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* SECTION 4 & 5: Table and Escalations */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Table */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">High Risk Models Oversight</h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                    <th className="px-6 py-4">Model Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Risk Score</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {highRiskModels.map((model) => (
                    <tr 
                      key={model.id} 
                      className={`hover:bg-slate-50 transition-colors ${model.status === 'Critical' ? 'bg-rose-50/30' : ''}`}
                    >
                      <td className="px-6 py-4 font-semibold text-slate-700 text-sm">{model.name}</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">{model.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${model.score > 80 ? 'bg-rose-500' : 'bg-amber-500'}`} 
                              style={{ width: `${model.score}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-600">{model.score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{model.category}</td>
                      <td className="px-6 py-4">
                        <Badge status={model.status}>{model.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50">
                          <ExternalLink size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Escalations Panel */}
          <SectionCard title="Recent Escalations" className="flex flex-col">
            <div className="space-y-4 flex-grow">
              {escalations.map((item) => (
                <div key={item.id} className="relative pl-4 flex flex-col gap-1">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${
                    item.severity === 'Critical' ? 'bg-rose-500' : 
                    item.severity === 'High' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <p className="text-sm font-bold text-slate-800 leading-tight">{item.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> {item.time}
                    </span>
                    <button className="text-xs font-bold text-blue-600 hover:underline">
                      Investigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              Go to Escalation Center
            </button>
          </SectionCard>
        </div>

      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-200 flex justify-between items-center text-slate-400 text-xs">
        <p>&copy; 2024 IntelliCore Financial Observability. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-600">Governance Policy</a>
          <a href="#" className="hover:text-slate-600">Audit Logs</a>
          <a href="#" className="hover:text-slate-600">Help Center</a>
        </div>
      </div>
    </div>
  );
}