import React, { useState } from 'react';
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
  Legend,
  Cell,
  ReferenceLine,
  AreaChart,
  Area
} from 'recharts';
import { 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ArrowRight, 
  Layers, 
  Database,
  Search,
  ChevronRight,
  Filter
} from 'lucide-react';

// --- Mock Data ---

const driftTrendData = [
  { day: '01 Oct', CreditRisk: 0.12, FraudDet: 0.05, LoanApp: 0.21 },
  { day: '05 Oct', CreditRisk: 0.14, FraudDet: 0.06, LoanApp: 0.24 },
  { day: '10 Oct', CreditRisk: 0.18, FraudDet: 0.04, LoanApp: 0.28 },
  { day: '15 Oct', CreditRisk: 0.16, FraudDet: 0.07, LoanApp: 0.26 },
  { day: '20 Oct', CreditRisk: 0.22, FraudDet: 0.05, LoanApp: 0.31 },
  { day: '25 Oct', CreditRisk: 0.21, FraudDet: 0.08, LoanApp: 0.29 },
  { day: '30 Oct', CreditRisk: 0.25, FraudDet: 0.09, LoanApp: 0.34 },
];

const featureDriftData = [
  { feature: 'Income', psi: 0.32, prevPsi: 0.21, change: '+52%', status: 'Red' },
  { feature: 'CreditScore', psi: 0.28, prevPsi: 0.15, change: '+86%', status: 'Red' },
  { feature: 'DebtToIncome', psi: 0.18, prevPsi: 0.17, change: '+5%', status: 'Amber' },
  { feature: 'LoanAmount', psi: 0.14, prevPsi: 0.12, change: '+16%', status: 'Amber' },
  { feature: 'Age', psi: 0.08, prevPsi: 0.09, change: '-11%', status: 'Green' },
  { feature: 'EmpDuration', psi: 0.05, prevPsi: 0.04, change: '+25%', status: 'Green' },
  { feature: 'ZipCode', psi: 0.04, prevPsi: 0.04, change: '0%', status: 'Green' },
  { feature: 'ExistingCredit', psi: 0.02, prevPsi: 0.03, change: '-33%', status: 'Green' },
];

const distributionData = [
  { bin: '0-20k', training: 15, production: 12 },
  { bin: '20-40k', training: 25, production: 18 },
  { bin: '40-60k', training: 30, production: 22 },
  { bin: '60-80k', training: 20, production: 32 },
  { bin: '80-100k', training: 8, production: 12 },
  { bin: '100k+', training: 2, production: 4 },
];

const stabilityTable = [
  { model: 'LoanApproval_v2', score: 72, status: 'Unstable', lastCheck: '10m ago', trigger: 'Yes' },
  { model: 'CreditRisk_v3', score: 88, status: 'Warning', lastCheck: '1h ago', trigger: 'No' },
  { model: 'FraudDet_v1.2', score: 96, status: 'Healthy', lastCheck: '4h ago', trigger: 'No' },
  { model: 'Churn_Final', score: 94, status: 'Healthy', lastCheck: '2h ago', trigger: 'No' },
];

const alerts = [
  { id: 1, type: 'critical', feature: 'Income', msg: 'PSI exceeded threshold (0.32)', time: '12 mins ago' },
  { id: 2, type: 'warning', feature: 'CreditScore', msg: 'Distribution shift detected in segment A', time: '45 mins ago' },
  { id: 3, type: 'info', feature: 'LoanAmount', msg: 'Variance increased by 18% vs training', time: '2 hours ago' },
];

// --- Subcomponents ---

const MetricCard = ({ label, value, subtitle, status, delta, isPositive }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
        status === 'Healthy' ? 'bg-emerald-50 text-emerald-700' :
        status === 'Warning' ? 'bg-amber-50 text-amber-700' :
        'bg-rose-50 text-rose-700'
      }`}>
        {status}
      </span>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
      <div className="flex items-center mt-1">
        <span className={`flex items-center text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <TrendingDown size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1" />}
          {delta}
        </span>
        <span className="text-slate-400 text-xs ml-2 font-medium">{subtitle}</span>
      </div>
    </div>
  </div>
);

const SectionCard = ({ title, subtitle, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    <div className="mb-6 flex justify-between items-start">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <button className="text-slate-400 hover:text-slate-900 transition-colors">
        <Filter size={18} />
      </button>
    </div>
    {children}
  </div>
);

// --- Main Component ---

export default function DriftMonitoring() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
              <Layers className="text-slate-900" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Drift & Feature Stability</h1>
              <p className="text-slate-500 text-sm font-medium">Monitoring data distribution shifts and PSI compliance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search models..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
              />
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
              Manual Check
            </button>
          </div>
        </div>

        {/* SECTION 1: Drift Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            label="Models Monitored" 
            value="18" 
            subtitle="total in production" 
            status="Healthy" 
            delta="0" 
            isPositive={true} 
          />
          <MetricCard 
            label="Models with Active Drift" 
            value="3" 
            subtitle="vs. previous week" 
            status="Warning" 
            delta="+1" 
            isPositive={false} 
          />
          <MetricCard 
            label="Features with High PSI" 
            value="7" 
            subtitle="PSI > 0.25 threshold" 
            status="Critical" 
            delta="+2" 
            isPositive={false} 
          />
          <MetricCard 
            label="Avg PSI Score" 
            value="0.18" 
            subtitle="portfolio average" 
            status="Warning" 
            delta="+0.04" 
            isPositive={false} 
          />
        </div>

        {/* SECTION 2: Model Drift Trend */}
        <SectionCard 
          title="Population Stability Index (PSI) Trend" 
          subtitle="7-day rolling drift score across major models"
        >
          <div className="h-[320px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={driftTrendData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '12px', paddingBottom: '20px' }} />
                <ReferenceLine y={0.25} label={{ position: 'right', value: 'Threshold', fill: '#ef4444', fontSize: 10, fontWeight: 'bold' }} stroke="#ef4444" strokeDasharray="5 5" />
                <Line name="CreditRisk_v3" type="monotone" dataKey="CreditRisk" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line name="LoanApproval_v2" type="monotone" dataKey="LoanApp" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} />
                <Line name="FraudDet_v1.2" type="monotone" dataKey="FraudDet" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* SECTION 3: Feature Drift Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Feature PSI Ranking" subtitle="Top 8 features by current drift score">
            <div className="h-[350px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureDriftData} layout="vertical" margin={{ left: 30, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="feature" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} width={100} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="psi" radius={[0, 4, 4, 0]} barSize={20}>
                    {featureDriftData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.psi > 0.25 ? '#ef4444' : entry.psi > 0.1 ? '#f59e0b' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Drift Monitoring Matrix" subtitle="Comparative analysis of feature stability">
            <div className="mt-2 overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Feature</th>
                    <th className="px-4 py-3">PSI Score</th>
                    <th className="px-4 py-3 text-right">Change %</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {featureDriftData.slice(0, 6).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-800">{row.feature}</td>
                      <td className="px-4 py-3 font-mono text-slate-600">{row.psi}</td>
                      <td className={`px-4 py-3 text-right font-medium ${row.change.startsWith('+') ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {row.change}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'Green' ? 'bg-emerald-50 text-emerald-600' : 
                          row.status === 'Amber' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* SECTION 4: Data Distribution Comparison */}
        <SectionCard title="Data Distribution: 'Income' Feature" subtitle="Comparing Training vs. Production (Last 24h)">
          <div className="h-[280px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="bin" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="top" align="right" iconType="rect" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} />
                <Bar name="Training Distribution" dataKey="training" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar name="Production Distribution" dataKey="production" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="text-blue-600" size={20} />
              <p className="text-xs text-blue-800 font-medium">
                Distribution shift detected in **60-80k** bin. Sample size: 12,450 inferences.
              </p>
            </div>
            <button className="text-blue-700 text-xs font-bold flex items-center hover:underline uppercase tracking-tight">
              View Detailed Segment <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* SECTION 5: Drift Alert Panel */}
          <SectionCard title="Drift Alerts" subtitle="Recent threshold violations" className="lg:col-span-1">
            <div className="space-y-3 mt-2">
              {alerts.map((alert) => (
                <div key={alert.id} className="relative overflow-hidden p-4 bg-slate-50 border border-slate-100 rounded-xl group transition-all hover:border-slate-200">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    alert.type === 'critical' ? 'bg-rose-500' : 'bg-amber-500'
                  }`} />
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{alert.feature}</h4>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{alert.msg}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] text-slate-400 font-medium flex items-center">
                      <Clock size={12} className="mr-1" /> {alert.time}
                    </span>
                    <button className="text-[10px] font-bold text-slate-900 flex items-center hover:translate-x-1 transition-transform">
                      VIEW FEATURE <ArrowRight size={12} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* SECTION 6: Stability Metrics Table */}
          <SectionCard title="Model Stability Registry" subtitle="Deployment health status" className="lg:col-span-2">
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="pb-3 px-2">Model Instance</th>
                    <th className="pb-3 px-2">Stability Score</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2">Last Checked</th>
                    <th className="pb-3 px-2 text-right">Retrain Triggered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {stabilityTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 px-2">
                        <span className="font-bold text-slate-900 block">{row.model}</span>
                        <span className="text-[10px] text-slate-400 font-medium">Production v4.1</span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-slate-700">{row.score}%</span>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${row.score > 90 ? 'bg-emerald-500' : row.score > 80 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                              style={{ width: `${row.score}%` }} 
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                          row.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 
                          row.status === 'Warning' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-slate-500 font-medium">{row.lastCheck}</td>
                      <td className="py-4 px-2 text-right">
                        <span className={`text-[10px] font-bold ${row.trigger === 'Yes' ? 'text-rose-600' : 'text-slate-400'}`}>
                          {row.trigger}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

      </div>
    </div>
  );
}