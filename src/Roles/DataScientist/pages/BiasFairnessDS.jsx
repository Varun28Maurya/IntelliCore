import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Legend
} from 'recharts';
import { 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  Scale, 
  Info, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

// --- Mock Data ---

const approvalRateData = [
  { group: 'Male', rate: 84 },
  { group: 'Female', rate: 78 },
  { group: 'Age < 30', rate: 72 },
  { group: 'Age 30–50', rate: 86 },
  { group: 'Age > 50', rate: 81 },
];

const gapAnalysisData = [
  { group: 'Gender', fpr: 4.2, fnr: 6.8 },
  { group: 'Age Group', fpr: 7.5, fnr: 3.2 },
  { group: 'Income Level', fpr: 3.1, fnr: 8.4 },
  { group: 'Ethnicity', fpr: 5.8, fnr: 4.1 },
];

const fairnessMetricsTable = [
  { model: 'CreditRisk_v3', group: 'Gender', rate: '78.2%', fpr: '4.2%', fnr: '6.8%', parity: '-0.06', flag: 'Within Threshold', status: 'green' },
  { model: 'LoanApproval_v2', group: 'Age < 30', rate: '72.4%', fpr: '7.5%', fnr: '3.2%', parity: '-0.14', flag: 'Review Required', status: 'amber' },
  { model: 'Mortgage_v1.1', group: 'Income', rate: '64.1%', fpr: '8.2%', fnr: '9.5%', parity: '-0.21', flag: 'Critical Deviation', status: 'red' },
  { model: 'FraudDet_v1.2', group: 'Region', rate: '91.2%', fpr: '2.1%', fnr: '1.8%', parity: '-0.02', flag: 'Within Threshold', status: 'green' },
];

const modelFairnessScores = [
  { name: 'CreditRisk_v3', score: 82 },
  { name: 'LoanApproval_v2', score: 74 },
  { name: 'FraudDet_v1.2', score: 95 },
  { name: 'Mortgage_v1.1', score: 62 },
];

const alerts = [
  { id: 1, severity: 'critical', msg: 'Gender approval gap exceeded 6% in CreditRisk_v3', time: '1 hour ago' },
  { id: 2, severity: 'warning', msg: 'FPR disparity (7.5%) detected for Age < 30 group', time: '3 hours ago' },
  { id: 3, severity: 'critical', msg: 'Equal opportunity violation (EO_Diff > 0.2) in LoanApproval_v2', time: '5 hours ago' },
];

// --- Subcomponents ---

const MetricCard = ({ label, value, subtitle, status, delta }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
        status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
        status === 'Warning' ? 'bg-amber-50 text-amber-700 border-amber-100' :
        'bg-rose-50 text-rose-700 border-rose-100'
      }`}>
        {status}
      </span>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
      <div className="flex items-center mt-1">
        <span className="text-slate-400 text-xs font-medium">{subtitle}</span>
        <span className="ml-2 text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
          {delta}
        </span>
      </div>
    </div>
  </div>
);

const SectionCard = ({ title, subtitle, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    <div className="mb-6">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
    {children}
  </div>
);

// --- Main Component ---

export default function BiasFairnessDS() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-900 text-white rounded-xl">
              <Scale size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Bias & Fairness Audit</h1>
              <p className="text-slate-500 text-sm font-medium">Compliance Monitoring • Regulatory Reporting (Article 14)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Download Audit PDF</button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">Run New Evaluation</button>
          </div>
        </div>

        {/* SECTION 1: Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            label="Models Evaluated" 
            value="12" 
            subtitle="Active production" 
            status="Healthy" 
            delta="+2" 
          />
          <MetricCard 
            label="Within Threshold" 
            value="9" 
            subtitle="Parity diff < 0.1" 
            status="Healthy" 
            delta="0" 
          />
          <MetricCard 
            label="Requiring Review" 
            value="3" 
            subtitle="Action requested" 
            status="Warning" 
            delta="+1" 
          />
          <MetricCard 
            label="Largest Approval Gap" 
            value="7.2%" 
            subtitle="vs. baseline group" 
            status="Critical" 
            delta="+0.8%" 
          />
        </div>

        {/* SECTION 2: Approval Rate by Demographic */}
        <SectionCard title="Demographic Approval Rates" subtitle="Approval percentage across protected class variables">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={approvalRateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="group" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <ReferenceLine y={80} label={{ position: 'right', value: 'Threshold', fill: '#94a3b8', fontSize: 10 }} stroke="#94a3b8" strokeDasharray="5 5" />
                <Bar dataKey="rate" radius={[4, 4, 0, 0]} barSize={50}>
                  {approvalRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.rate < 75 ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* SECTION 3: FPR / FNR Gap Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="False Positive Rate Gap" subtitle="Type I Error disparity across groups">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gapAnalysisData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="group" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600 }} width={100} />
                  <Tooltip />
                  <Bar dataKey="fpr" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20}>
                    {gapAnalysisData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fpr > 5 ? '#f59e0b' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
          
          <SectionCard title="False Negative Rate Gap" subtitle="Type II Error disparity (Opportunity Cost)">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gapAnalysisData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="group" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600 }} width={100} />
                  <Tooltip />
                  <Bar dataKey="fnr" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20}>
                    {gapAnalysisData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fnr > 5 ? '#ef4444' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* SECTION 4: Statistical Fairness Table */}
        <SectionCard title="Fairness Metrics Registry" subtitle="Detailed breakdown of model parity and bias indicators">
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-4">Model Instance</th>
                  <th className="px-4 py-4">Protected Class</th>
                  <th className="px-4 py-4">Approval Rate</th>
                  <th className="px-4 py-4">FPR / FNR</th>
                  <th className="px-4 py-4">Parity Diff</th>
                  <th className="px-4 py-4 text-right">Bias Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fairnessMetricsTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-bold text-slate-900">{row.model}</div>
                      <div className="text-[10px] text-slate-400 font-medium">Production v3.2</div>
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-600">{row.group}</td>
                    <td className="px-4 py-4 font-mono font-bold text-slate-700">{row.rate}</td>
                    <td className="px-4 py-4 font-mono text-slate-500">{row.fpr} / {row.fnr}</td>
                    <td className="px-4 py-4">
                      <span className={`font-mono font-bold ${parseFloat(row.parity) < -0.1 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {row.parity}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold border ${
                        row.status === 'green' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        row.status === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                      }`}>
                        {row.flag}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SECTION 5: Model-Level Fairness Score */}
          <SectionCard title="Model Fairness Scores" subtitle="Aggregated fairness index (0-100)" className="lg:col-span-2">
            <div className="space-y-6 mt-4">
              {modelFairnessScores.map((model, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-slate-700">{model.name}</span>
                    <span className={`text-sm font-bold ${model.score < 70 ? 'text-rose-600' : model.score < 85 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {model.score}/100
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        model.score < 70 ? 'bg-rose-500' : model.score < 85 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${model.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3">
              <Info className="text-slate-400 mt-0.5" size={18} />
              <p className="text-xs text-slate-500 leading-relaxed">
                Scores are calculated based on weighted average of Statistical Parity, Equal Opportunity, and Predictive Equality. 
                Scores below 80 trigger an automatic internal compliance review.
              </p>
            </div>
          </SectionCard>

          {/* SECTION 6: Bias Alerts Panel */}
          <SectionCard title="Priority Bias Alerts" subtitle="Recent policy violations">
            <div className="space-y-4 mt-2">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-all group">
                  <div className="flex justify-between items-start mb-1">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${alert.severity === 'critical' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{alert.time}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-snug">{alert.msg}</p>
                  <button className="mt-4 w-full py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all flex items-center justify-center">
                    REVIEW MODEL <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest py-2">
              View All Violations
            </button>
          </SectionCard>
        </div>

      </div>
    </div>
  );
}