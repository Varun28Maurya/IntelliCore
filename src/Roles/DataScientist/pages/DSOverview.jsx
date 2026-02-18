import React, { useState, useMemo } from 'react';
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
  Cell
} from 'recharts';
import { 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Clock,
  ArrowUpRight,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';

// --- Mock Data ---

const accuracyData = [
  { day: 'Mon', CreditRisk: 94.5, FraudDet: 98.1, ChurnPred: 91.2 },
  { day: 'Tue', CreditRisk: 94.2, FraudDet: 97.9, ChurnPred: 91.5 },
  { day: 'Wed', CreditRisk: 93.8, FraudDet: 98.2, ChurnPred: 90.8 },
  { day: 'Thu', CreditRisk: 94.6, FraudDet: 98.4, ChurnPred: 91.1 },
  { day: 'Fri', CreditRisk: 94.1, FraudDet: 97.8, ChurnPred: 91.9 },
  { day: 'Sat', CreditRisk: 94.3, FraudDet: 98.0, ChurnPred: 92.2 },
  { day: 'Sun', CreditRisk: 94.2, FraudDet: 98.1, ChurnPred: 91.8 },
];

const driftData = [
  { model: 'CreditRisk_v3', psi: 0.12, status: 'Amber', change: '+12%' },
  { model: 'LoanApproval_v2', psi: 0.28, status: 'Red', change: '+45%' },
  { model: 'FraudDet_v1.2', psi: 0.04, status: 'Green', change: '-2%' },
  { model: 'Churn_Model_final', psi: 0.08, status: 'Green', change: '+1%' },
  { model: 'MarketSegmentation', psi: 0.18, status: 'Amber', change: '+8%' },
];

const biasData = [
  { model: 'LoanApproval_v2', approvalDiff: '0.08', fprGap: '0.04', flag: 'Review Required', critical: true },
  { model: 'CreditRisk_v3', approvalDiff: '0.02', fprGap: '0.01', flag: 'Within Threshold', critical: false },
  { model: 'InsurancePrice_v1', approvalDiff: '0.01', fprGap: '0.02', flag: 'Within Threshold', critical: false },
  { model: 'MortgageScreener', approvalDiff: '0.06', fprGap: '0.05', flag: 'Review Required', critical: true },
];

const alerts = [
  { id: 1, type: 'critical', message: 'Accuracy dropped 3% for CreditRisk_v3', time: '12 mins ago' },
  { id: 2, type: 'warning', message: 'Data drift detected in Income feature (PSI > 0.25)', time: '45 mins ago' },
  { id: 3, type: 'critical', message: 'Bias threshold exceeded for LoanApproval_v2 (Gender Gap)', time: '2 hours ago' },
  { id: 4, type: 'info', message: 'Scheduled retraining completed for FraudDet_v1.2', time: '5 hours ago' },
];

// --- Subcomponents ---

const MetricCard = ({ title, value, subtitle, status, delta, isPositive }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <span className="text-slate-500 text-sm font-medium">{title}</span>
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
        status === 'Warning' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
        'bg-rose-50 text-rose-700 border border-rose-100'
      }`}>
        {status}
      </span>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
      <div className="flex items-center mt-1">
        <span className={`flex items-center text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
          {delta}
        </span>
        <span className="text-slate-400 text-xs ml-2">{subtitle}</span>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-lg font-bold text-slate-900">{title}</h2>
    <p className="text-sm text-slate-500">{subtitle}</p>
  </div>
);

const SectionCard = ({ children, title, subtitle, className = "" }) => (
  <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    <SectionHeader title={title} subtitle={subtitle} />
    {children}
  </div>
);

// --- Main Component ---

export default function DSOverview() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header Area */}
        <div className="flex justify-between items-end pb-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Model Production Overview</h1>
            <p className="text-slate-500">ML Lifecycle & Reliability Dashboard • Last sync: Today, 14:30</p>
          </div>
          <div className="flex gap-2 text-sm font-medium">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Export Report</button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">Manage Models</button>
          </div>
        </div>

        {/* SECTION 1: KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Active Production Models" 
            value="18" 
            subtitle="vs last week" 
            status="Healthy" 
            delta="+2" 
            isPositive={true} 
          />
          <MetricCard 
            title="Avg Accuracy (7D)" 
            value="94.2%" 
            subtitle="vs last week" 
            status="Healthy" 
            delta="+0.4%" 
            isPositive={true} 
          />
          <MetricCard 
            title="Models with Drift" 
            value="3" 
            subtitle="vs last week" 
            status="Warning" 
            delta="+1" 
            isPositive={false} 
          />
          <MetricCard 
            title="Models with Bias Flags" 
            value="2" 
            subtitle="vs last week" 
            status="Critical" 
            delta="0" 
            isPositive={true} 
          />
        </div>

        {/* SECTION 2: Accuracy Trend */}
        <SectionCard title="7-Day Model Accuracy" subtitle="Historical performance across primary production endpoints">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyData} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis domain={[85, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} align="right" iconType="circle" />
                <Line type="monotone" dataKey="CreditRisk" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="FraudDet" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="ChurnPred" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* SECTION 3: Drift Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Feature Drift: Top 5 Models" subtitle="Population Stability Index (PSI) rankings">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={driftData} layout="vertical" margin={{ left: 40, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="model" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} width={100} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="psi" radius={[0, 4, 4, 0]} barSize={24}>
                    {driftData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.psi > 0.25 ? '#ef4444' : entry.psi > 0.1 ? '#f59e0b' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Drift Monitoring Table" subtitle="Real-time feature stability metrics">
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Model</th>
                    <th className="px-4 py-3">PSI Score</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Change %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {driftData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.model}</td>
                      <td className="px-4 py-3 font-mono text-slate-600">{row.psi}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          row.status === 'Green' ? 'text-emerald-700 bg-emerald-50' : 
                          row.status === 'Amber' ? 'text-amber-700 bg-amber-50' : 
                          'text-rose-700 bg-rose-50'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            row.status === 'Green' ? 'bg-emerald-500' : 
                            row.status === 'Amber' ? 'bg-amber-500' : 
                            'bg-rose-500'
                          }`} />
                          {row.status}
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-right font-medium ${row.change.startsWith('+') ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {row.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* SECTION 4: Bias & Fairness */}
        <SectionCard title="Fairness & Bias Analysis" subtitle="Regulatory compliance checks for disparity and parity gaps">
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold">
                <tr>
                  <th className="px-4 py-3">Model Name</th>
                  <th className="px-4 py-3">Approval Rate Diff</th>
                  <th className="px-4 py-3">FPR Gap</th>
                  <th className="px-4 py-3">Bias Flag</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {biasData.map((row, idx) => (
                  <tr key={idx} className={row.critical ? 'bg-rose-50/30' : 'hover:bg-slate-50 transition-colors'}>
                    <td className="px-4 py-3 font-medium text-slate-900">{row.model}</td>
                    <td className="px-4 py-3 font-mono">{row.approvalDiff}</td>
                    <td className="px-4 py-3 font-mono">{row.fprGap}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        row.critical ? 'text-rose-700 bg-rose-50 border border-rose-100' : 'text-slate-600 bg-slate-100 border border-slate-200'
                      }`}>
                        {row.flag}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-slate-400 hover:text-slate-900"><MoreHorizontal size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* SECTION 5: Inference Performance */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">System Infrastructure Health</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Avg Latency', value: '42ms', trend: '-2ms', color: 'emerald' },
              { label: 'p95 Latency', value: '185ms', trend: '+12ms', color: 'amber' },
              { label: 'Throughput', value: '1.2k req/s', trend: '+15%', color: 'emerald' },
              { label: 'Failure Rate', value: '0.04%', trend: '-0.01%', color: 'emerald' },
            ].map((perf, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-medium">{perf.label}</p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-xl font-bold text-slate-900">{perf.value}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${perf.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {perf.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: Recent Model Alerts */}
        <SectionCard title="Active System Alerts" subtitle="Recent anomalies and threshold violations across environments">
          <div className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-all cursor-default">
                <div className="flex items-center space-x-4">
                  <div className={`w-1 h-10 rounded-full ${
                    alert.type === 'critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 
                    alert.type === 'warning' ? 'bg-amber-500' : 'bg-slate-300'
                  }`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{alert.message}</p>
                    <div className="flex items-center mt-0.5 text-slate-400 text-xs">
                      <Clock size={12} className="mr-1" />
                      {alert.time}
                    </div>
                  </div>
                </div>
                <button className="flex items-center text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-tight">
                  Investigate <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors border-t border-slate-100 pt-4">
            View All Historical Logs
          </button>
        </SectionCard>

      </div>
    </div>
  );
}