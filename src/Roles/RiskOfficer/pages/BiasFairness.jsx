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
  LineChart,
  Line,
  Legend,
  Cell
} from 'recharts';
import { 
  Scale, 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Clock,
  Info,
  ChevronRight
} from 'lucide-react';

// --- Mock Data ---

const groupPerformanceData = [
  { category: 'Gender (M/F)', ref: 88, comp: 86 },
  { category: 'Age (25-45/55+)', ref: 92, comp: 74 },
  { category: 'Income Bracket', ref: 85, comp: 82 },
  { category: 'Geography (Urban/Rural)', ref: 90, comp: 89 },
];

const disparateImpactData = [
  { model: 'Retail Credit v4', attribute: 'Age', ref: '25-45', comp: '55+', ratio: 0.72, status: 'Critical' },
  { model: 'Loan Alpha', attribute: 'Gender', ref: 'Male', comp: 'Female', ratio: 0.94, status: 'Healthy' },
  { model: 'Fraud Shield', attribute: 'Zip Code', ref: 'Region A', comp: 'Region C', ratio: 0.81, status: 'Review' },
  { model: 'LLM Credit Explainer', attribute: 'Language', ref: 'English', comp: 'Spanish', ratio: 0.89, status: 'Healthy' },
];

const biasTrendData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  score: i === 20 ? 72 : Math.floor(88 + Math.random() * 6),
}));

const auditChecklist = [
  { id: 1, label: 'Fairness Evaluation Completed', status: 'Completed' },
  { id: 2, label: 'Protected Attributes Assessed', status: 'Completed' },
  { id: 3, label: 'Adverse Impact Testing Logged', status: 'Completed' },
  { id: 4, label: 'Documentation Stored', status: 'Completed' },
  { id: 5, label: 'Governance Approval Pending', status: 'Pending' },
];

// --- Reusable Components ---

const Badge = ({ status }) => {
  const styles = {
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Watch: 'bg-amber-50 text-amber-700 border-amber-100',
    Review: 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles[status] || styles.Watch}`}>
      {status}
    </span>
  );
};

const MetricCard = ({ title, value, status, desc, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
        <Icon size={20} />
      </div>
      <Badge status={status} />
    </div>
    <div>
      <h3 className="text-3xl font-bold text-slate-900 leading-none">{value}</h3>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">{title}</p>
      <p className="text-[11px] text-slate-400 mt-1 leading-tight">{desc}</p>
    </div>
  </div>
);

const SectionCard = ({ title, subtitle, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    <div className="mb-6">
      <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </div>
);

// --- Main Page Component ---

export default function BiasFairness() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bias & Fairness Monitoring</h1>
            <p className="text-slate-500 text-sm">Equity governance and disparate impact assessment across all model assets</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            <ShieldCheck size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Compliance Validated</span>
          </div>
        </div>

        {/* SECTION 1: Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Overall Fairness Score" 
            value="91%" 
            status="Healthy" 
            desc="Weighted average across top-tier models." 
            icon={Scale} 
          />
          <MetricCard 
            title="Disparate Impact Ratio" 
            value="0.92" 
            status="Healthy" 
            desc="Measures selection rate parity (Target: >0.80)." 
            icon={Users} 
          />
          <MetricCard 
            title="Bias Alerts (7D)" 
            value="03" 
            status="Watch" 
            desc="Anomalies detected in group variance." 
            icon={AlertCircle} 
          />
          <MetricCard 
            title="Protected Attribute Gaps" 
            value="02" 
            status="Critical" 
            desc="Groups currently falling below threshold." 
            icon={AlertCircle} 
          />
        </div>

        {/* SECTION 2: Group Performance Comparison */}
        <SectionCard 
          title="Group Performance Comparison" 
          subtitle="Variance in model accuracy/approval rates across key demographics"
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupPerformanceData} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <ReferenceLine y={80} stroke="#cbd5e1" strokeDasharray="3 3" label={{ position: 'right', value: 'Fairness Floor', fill: '#94a3b8', fontSize: 10 }} />
                <Bar name="Reference Group" dataKey="ref" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar name="Compared Group" dataKey="comp" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-50 rounded-xl flex items-start gap-3">
            <Info size={16} className="text-indigo-500 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-bold text-slate-700">Fairness Policy:</span> Performance variance beyond <span className="text-rose-600 font-bold">10%</span> between reference and compared groups triggers an automated fairness review workflow and alert to the DPO.
            </p>
          </div>
        </SectionCard>

        {/* SECTION 3: Disparate Impact Analysis Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Disparate Impact Analysis</h2>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
              Audit Data: Q2 2024
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Model Asset</th>
                  <th className="px-6 py-4">Attribute</th>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Compared</th>
                  <th className="px-6 py-4">Impact Ratio</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {disparateImpactData.map((row, idx) => (
                  <tr key={idx} className={`hover:bg-slate-50/50 transition-colors ${row.ratio < 0.8 ? 'bg-rose-50/20' : ''}`}>
                    <td className="px-6 py-4 font-bold text-slate-700">{row.model}</td>
                    <td className="px-6 py-4 text-slate-500">{row.attribute}</td>
                    <td className="px-6 py-4 text-slate-500">{row.ref}</td>
                    <td className="px-6 py-4 text-slate-500">{row.comp}</td>
                    <td className="px-6 py-4">
                      <span className={`font-mono font-bold ${row.ratio < 0.8 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {row.ratio.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SECTION 4: Bias Drift Over Time */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Bias Drift Trend</h2>
              <div className="flex gap-4 text-[10px] font-bold uppercase text-slate-400">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"/> Fairness Score</span>
              </div>
            </div>
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={biasTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" hide />
                  <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              {/* Manual Annotation Tooltip/Text */}
              <div className="absolute top-2/3 left-2/3 bg-rose-50 border border-rose-100 p-2 rounded-lg shadow-sm max-w-[160px]">
                <p className="text-[10px] font-bold text-rose-700 leading-tight">
                  <AlertCircle size={10} className="inline mr-1 mb-0.5" /> 
                  Significant deviation detected on Day 21 due to underlying demographic shift.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 5: Regulatory Audit Readiness */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              Regulatory Audit Registry
            </h2>
            <div className="space-y-4">
              {auditChecklist.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    {item.status === 'Completed' ? (
                      <div className="bg-emerald-100 text-emerald-600 p-1 rounded-full">
                        <CheckCircle2 size={16} />
                      </div>
                    ) : (
                      <div className="bg-amber-100 text-amber-600 p-1 rounded-full">
                        <Clock size={16} />
                      </div>
                    )}
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                  {item.status === 'Pending' && (
                    <span className="text-[10px] font-bold text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                      Pending
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
              Generate Audit Package <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[11px] font-medium uppercase tracking-widest gap-4">
          <p>IntelliCore Fairness Governance &copy; 2024</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Fairness Methodology</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Impact</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Log Explorer</a>
          </div>
        </div>

      </div>
    </div>
  );
}