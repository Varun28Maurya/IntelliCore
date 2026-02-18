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
  Legend
} from 'recharts';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Gavel, 
  AlertTriangle, 
  FileSearch, 
  History, 
  ArrowRight,
  ChevronRight,
  Lock,
  Eye,
  Flag,
  UserCheck,
  ZapOff
} from 'lucide-react';

// --- Mock Data ---

const COMPLIANCE_TREND = [
  { month: 'Jan', score: 92 },
  { month: 'Feb', score: 94 },
  { month: 'Mar', score: 89 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 88 },
  { month: 'Jun', score: 84 },
];

const VIOLATIONS_BY_CAT = [
  { category: 'Data Privacy', count: 4, fill: '#334155' },
  { category: 'Bias Violation', count: 7, fill: '#f43f5e' },
  { category: 'Hallucination', count: 5, fill: '#f59e0b' },
  { category: 'SLA Breach', count: 9, fill: '#64748b' },
  { category: 'Policy Gap', count: 2, fill: '#0f172a' },
];

const HIGH_RISK_MODELS = [
  { name: 'Loan-Approval-V4', risk: 82, type: 'High Bias', updated: '2h ago', status: 'Under Review' },
  { name: 'Fraud-Engine-X', risk: 74, type: 'Data Drift', updated: '5h ago', status: 'Escalated' },
  { name: 'Wealth-Advisor-GPT', risk: 68, type: 'Hallucination', updated: '1d ago', status: 'Monitoring' },
  { name: 'Equity-Trader-ML', risk: 45, type: 'SLA Breach', updated: '3h ago', status: 'Stable' },
];

const BIAS_ALERTS = [
  { model: 'Retail-Credit-Score', group: 'Protected Group A', metric: 'Disp. Impact', severity: 'Critical', status: 'Open' },
  { model: 'Mortgage-Screener', group: 'Age (18-24)', metric: 'False Positive', severity: 'High', status: 'Under Review' },
  { model: 'Hiring-Assistant-AI', group: 'Gender', metric: 'Selection Rate', severity: 'Medium', status: 'Pending' },
];

const AUDIT_LOGS = [
  { time: '2024-05-24 14:20', action: 'Model Deployment Approved', user: 'Director of Risk', model: 'Credit-V4', impact: 'High' },
  { time: '2024-05-24 11:05', action: 'Risk Threshold Updated', user: 'Compliance Officer', model: 'System Global', impact: 'Medium' },
  { time: '2024-05-23 16:45', action: 'Compliance Review Completed', user: 'Senior Auditor', model: 'Fraud-Engine', impact: 'Low' },
];

// --- Reusable UI Components ---

const RiskBadge = ({ level }) => {
  const styles = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-100',
    High: 'bg-rose-50 text-rose-700 border-rose-100',
    Critical: 'bg-rose-100 text-rose-800 border-rose-200 font-bold',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ₹{styles[level] || styles.Moderate}`}>
      {level}
    </span>
  );
};

const SectionCard = ({ title, children, className = "", subtitle = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col ₹{className}`}>
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        {subtitle && <p className="text-[10px] text-slate-400 font-medium">{subtitle}</p>}
      </div>
      <button className="text-slate-300 hover:text-slate-500">
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const MetricCard = ({ title, value, status, icon: Icon, subText }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-xl">
        <Icon className="w-5 h-5 text-slate-600" />
      </div>
      <RiskBadge level={status} />
    </div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-2xl font-black text-slate-900 leading-tight">{value}</h3>
    <p className="text-[10px] text-slate-500 mt-1">{subText}</p>
  </div>
);

// --- Main Component ---

export default function RiskOfficerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6 font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Risk & Governance Oversight</h1>
          <p className="text-slate-500 text-sm">Regulatory compliance and AI Model risk management system.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
            Export Audit Report
          </button>
          <button className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-md flex items-center gap-2">
            <Lock className="w-3 h-3" /> Governance Panel
          </button>
        </div>
      </div>

      {/* SECTION 1: AI Risk Index (Hero) */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldAlert size={180} />
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex items-center gap-8">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * 68) / 100} className="text-amber-500" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black">68</span>
                <span className="text-[10px] font-bold uppercase opacity-60">Score</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Corporate AI Risk Index</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30 w-fit">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-black uppercase">Moderate Risk Level</span>
              </div>
              <p className="text-slate-400 text-xs mt-3 max-w-sm leading-relaxed">
                Risk exposure increased by 4.2% this week due to bias alerts in the Loan-Approval cluster.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Drift Risk', val: 'Low', color: 'text-emerald-400' },
              { label: 'Bias Risk', val: 'High', color: 'text-rose-400' },
              { label: 'SLA Risk', val: 'Med', color: 'text-amber-400' },
              { label: 'Security', val: 'Safe', color: 'text-emerald-400' }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">{item.label}</span>
                <span className={`text-sm font-black ₹{item.color}`}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: Risk KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="High-Risk Models" value="4" status="High" icon={ShieldAlert} subText="Require manual review" />
        <MetricCard title="Compliance Gaps" value="12" status="Moderate" icon={Gavel} subText="Open across 6 models" />
        <MetricCard title="Active Bias Alerts" value="3" status="Critical" icon={AlertTriangle} subText="Drastic variance detected" />
        <MetricCard title="SLA Breaches" value="8" status="Low" icon={ZapOff} subText="In the last 7 days" />
      </div>

      {/* SECTION 3 & 4: Tables and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* High-Risk Models Table */}
        <div className="lg:col-span-2">
          <SectionCard title="Priority Risk Watchlist" subtitle="Models exceeding institutional risk thresholds">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                  <tr>
                    <th className="pb-3">Model Identity</th>
                    <th className="pb-3 text-center">Score</th>
                    <th className="pb-3">Main Threat</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {HIGH_RISK_MODELS.map((model, i) => (
                    <tr key={i} className={`hover:bg-slate-50 transition-colors ₹{model.risk > 80 ? 'bg-rose-50/30' : ''}`}>
                      <td className="py-4">
                        <div className="font-bold text-slate-800">{model.name}</div>
                        <div className="text-[10px] text-slate-400">Updated {model.updated}</div>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`font-mono font-bold ₹{model.risk > 75 ? 'text-rose-600' : 'text-amber-600'}`}>
                          {model.risk}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="text-xs font-medium text-slate-600">{model.type}</span>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">
                          {model.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-blue-600 font-bold text-xs hover:underline">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* Compliance Trend Chart */}
        <div className="lg:col-span-1">
          <SectionCard title="Compliance Health Trend" subtitle="Overall score across all regulatory silos">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={COMPLIANCE_TREND}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#0f172a" strokeWidth={3} dot={{r: 4, fill: '#0f172a'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Resolved Gaps</span>
                <span className="text-xl font-bold text-emerald-600">84%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Critical Gaps</span>
                <span className="text-xl font-bold text-rose-600">02</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* SECTION 5 & 6: Bias and Lifecycle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bias Alerts Table */}
        <SectionCard title="Bias & Fairness Monitoring" subtitle="Automated detection of demographic disparity">
          <div className="space-y-4">
            {BIAS_ALERTS.map((alert, i) => (
              <div key={i} className={`p-4 rounded-xl border flex justify-between items-center ₹{alert.severity === 'Critical' ? 'border-rose-200 bg-rose-50/50' : 'border-slate-100 bg-white'}`}>
                <div className="flex gap-4 items-center">
                  <div className={`p-2 rounded-lg ₹{alert.severity === 'Critical' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                    <Flag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{alert.model}</h4>
                    <p className="text-[11px] text-slate-500">{alert.affected_group} • <span className="font-mono">{alert.metric}</span></p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <RiskBadge level={alert.severity} />
                  <button className="p-1 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-xl">
              View All 14 Alerts
            </button>
          </div>
        </SectionCard>

        {/* Governance & Lifecycle */}
        <SectionCard title="Governance Pipeline" subtitle="Lifecycle movements and audit checkpoints">
           <div className="space-y-6">
              {[
                { type: 'Pending Approval', count: 3, items: ['Credit-Scoring-V5', 'Fraud-Detection-Plus'], color: 'bg-blue-600' },
                { type: 'Shadow Deployment', count: 1, items: ['Market-Sentiment-Beta'], color: 'bg-amber-500' },
                { type: 'Active Production', count: 18, items: [], color: 'bg-emerald-500' }
              ].map((group, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ₹{group.color} mt-1.5`} />
                    <div className="w-px h-full bg-slate-100 mt-2" />
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-800">{group.type}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold">{group.count}</span>
                    </div>
                    {group.items.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {group.items.map((item, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-1 bg-white border border-slate-200 rounded-md font-medium text-slate-600">{item}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
           </div>
        </SectionCard>
      </div>

      {/* SECTION 7: Audit Logs */}
      <SectionCard title="Regulatory Audit Logs" subtitle="Immutable history of governance actions">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-separate border-spacing-y-2">
            <thead className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
              <tr>
                <th className="px-4 pb-2">Timestamp</th>
                <th className="px-4 pb-2">Action Taken</th>
                <th className="px-4 pb-2">Authorized By</th>
                <th className="px-4 pb-2">Associated Model</th>
                <th className="px-4 pb-2 text-right">Severity</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_LOGS.map((log, i) => (
                <tr key={i} className="bg-slate-50/50 hover:bg-slate-100 transition-all rounded-lg">
                  <td className="px-4 py-3 font-mono text-slate-500 rounded-l-xl">{log.time}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{log.action}</td>
                  <td className="px-4 py-3 text-slate-600 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 opacity-50" /> {log.user}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{log.model}</td>
                  <td className="px-4 py-3 text-right rounded-r-xl">
                    <span className={`font-bold ₹{log.impact === 'High' ? 'text-rose-500' : 'text-slate-400'}`}>
                      {log.impact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* SECTION 8: Critical Alerts Panel */}
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <h3 className="text-sm font-black uppercase text-rose-900 tracking-tighter">System Integrity Alerts</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
             <div className="flex justify-between items-start mb-2">
               <span className="text-[10px] font-black text-rose-600 uppercase">Violation</span>
               <span className="text-[10px] text-slate-400">14:02</span>
             </div>
             <p className="text-xs font-bold text-slate-800">AI Risk Index exceeded threshold (65.0)</p>
             <button className="mt-3 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Investigate Case</button>
           </div>
           <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
             <div className="flex justify-between items-start mb-2">
               <span className="text-[10px] font-black text-rose-600 uppercase">Bias Detection</span>
               <span className="text-[10px] text-slate-400">11:45</span>
             </div>
             <p className="text-xs font-bold text-slate-800">High bias detected in Retail-Credit-Score</p>
             <button className="mt-3 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Escalate to Committee</button>
           </div>
           <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
             <div className="flex justify-between items-start mb-2">
               <span className="text-[10px] font-black text-rose-600 uppercase">Compliance</span>
               <span className="text-[10px] text-slate-400">Yesterday</span>
             </div>
             <p className="text-xs font-bold text-slate-800">Missing PII documentation for Model-V3</p>
             <button className="mt-3 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Issue Notice</button>
           </div>
        </div>
      </div>

      {/* Footer / Branding */}
      <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <span className="text-slate-800">Governance Sentinel v9.2</span>
        </div>
        <div className="flex gap-6">
          <span>GDPR Compliant</span>
          <span>CCPA Compliant</span>
          <span>EU AI Act Compliant (Draft)</span>
        </div>
        <div>© 2024 Banking Global Risk Division</div>
      </div>

    </div>
  );
}