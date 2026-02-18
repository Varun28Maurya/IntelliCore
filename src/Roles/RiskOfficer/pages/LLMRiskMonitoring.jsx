import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { 
  ShieldAlert, 
  Zap, 
  MessageSquare, 
  Lock, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown,
  ChevronRight,
  Clock,
  EyeOff
} from 'lucide-react';

// --- Mock Data ---

const hallucinationData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  rate: (1.5 + Math.random() * 2.5).toFixed(2),
}));

const securityThreatData = [
  { name: 'Prompt Injection', value: 45, color: '#ef4444' },
  { name: 'Jailbreak Attempts', value: 32, color: '#f59e0b' },
  { name: 'Toxic Outputs', value: 12, color: '#6366f1' },
  { name: 'Data Leakage', value: 8, color: '#ef4444' },
  { name: 'Policy Violations', value: 24, color: '#64748b' },
];

const securityIncidents = [
  { id: 'INC-902', type: 'Prompt Injection', model: 'Retail Chatbot', severity: 'Critical', status: 'Blocked', time: '14:20' },
  { id: 'INC-899', type: 'PII Pattern', model: 'Doc Analyzer', severity: 'High', status: 'Flagged', time: '13:45' },
  { id: 'INC-895', type: 'Jailbreak', model: 'Retail Chatbot', severity: 'High', status: 'Blocked', time: '12:10' },
  { id: 'INC-882', type: 'Policy Violation', model: 'Internal Assistant', severity: 'Medium', status: 'Logged', time: '09:30' },
];

const modelSafetyScores = [
  { name: 'Retail Chatbot v2', env: 'Prod', safety: 92, toxicity: 0.2, injection: 88, risk: 'Low' },
  { name: 'Internal Assistant', env: 'Prod', safety: 84, toxicity: 1.1, injection: 76, risk: 'Moderate' },
  { name: 'Document Analyzer', env: 'UAT', safety: 79, toxicity: 0.8, injection: 82, risk: 'Moderate' },
  { name: 'Credit Explainer LLM', env: 'Prod', safety: 96, toxicity: 0.1, injection: 94, risk: 'Low' },
];

const escalations = [
  { id: 1, title: 'Repeated jailbreak attempt detected in Retail Chatbot', time: '12 mins ago', severity: 'Critical' },
  { id: 2, title: 'PII leakage pattern detected in Document Analyzer', time: '1 hour ago', severity: 'Critical' },
  { id: 3, title: 'Sudden hallucination spike in Credit Explainer (UAT)', time: '3 hours ago', severity: 'Warning' },
];

// --- Reusable Components ---

const Badge = ({ children, status }) => {
  const styles = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    High: 'bg-rose-50 text-rose-700 border-rose-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
    Blocked: 'bg-slate-100 text-slate-700 border-slate-200',
    Flagged: 'bg-amber-50 text-amber-700 border-amber-100',
    Logged: 'bg-blue-50 text-blue-700 border-blue-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || styles.Moderate}`}>
      {children}
    </span>
  );
};

const StatCard = ({ title, value, badge, trend, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
        <Icon size={20} />
      </div>
      <Badge status={badge}>{badge}</Badge>
    </div>
    <h3 className="text-3xl font-bold text-slate-900 leading-none">{value}</h3>
    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2">{title}</p>
    <div className={`mt-3 flex items-center text-[11px] font-bold ${trend.startsWith('+') ? 'text-rose-500' : 'text-emerald-500'}`}>
      {trend.startsWith('+') ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
      {trend} vs last 7d
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

export default function LLMRiskMonitoring() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">LLM Risk & Safety Monitoring</h1>
            <p className="text-slate-500 text-sm">Automated adversarial detection and safety alignment governance</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Real-time Safeguards Active</span>
          </div>
        </div>

        {/* SECTION 1: Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active LLM Models" value="06" badge="Healthy" trend="+1" icon={MessageSquare} />
          <StatCard title="Safety Violations (7D)" value="18" badge="Moderate" trend="+12%" icon={ShieldAlert} />
          <StatCard title="Injection Attempts" value="12" badge="High" trend="+4" icon={Zap} />
          <StatCard title="Hallucination Rate" value="2.3%" badge="Low" trend="-0.4%" icon={EyeOff} />
        </div>

        {/* SECTION 2: Hallucination Trend */}
        <SectionCard title="Hallucination Trend (30 Days)" subtitle="Aggregated truthfulness monitoring across all production environments">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hallucinationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" hide />
                <YAxis domain={[0, 5]} unit="%" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`${value}%`, 'Hallucination Rate']}
                />
                <ReferenceLine y={3} stroke="#ef4444" strokeDasharray="5 5" label={{ value: '3% Threshold', position: 'right', fill: '#ef4444', fontSize: 10, fontWeight: 'bold' }} />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#3b82f6" 
                  strokeWidth={2.5} 
                  dot={false}
                  activeDot={{ r: 6, fill: '#3b82f6', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-slate-400 italic font-medium">
            * Hallucination threshold breach ( &gt;3% ) triggers an automated compliance review workflow and temporary model throttling.
          </p>
        </SectionCard>

        {/* SECTION 3: Security Threat Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Adversarial Threat Vectors" subtitle="Distribution of attempted security breaches">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={securityThreatData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    width={110}
                  />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {securityThreatData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Recent Security Incidents</h2>
              <p className="text-xs text-slate-400 mt-0.5">Automated detection logs for last 24 hours</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-6 py-3">Threat</th>
                    <th className="px-6 py-3">Model</th>
                    <th className="px-6 py-3">Severity</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[13px]">
                  {securityIncidents.map((inc) => (
                    <tr key={inc.id} className={inc.severity === 'Critical' ? 'bg-rose-50/20' : ''}>
                      <td className="px-6 py-4 font-bold text-slate-700">{inc.type}</td>
                      <td className="px-6 py-4 text-slate-500">{inc.model}</td>
                      <td className="px-6 py-4">
                        <span className={`font-bold ${inc.severity === 'Critical' ? 'text-rose-600' : 'text-amber-600'}`}>
                          {inc.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge status={inc.status}>{inc.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="w-full py-4 text-xs font-bold text-blue-600 border-t border-slate-100 hover:bg-slate-50 transition-colors uppercase tracking-widest">
              View All Security Logs
            </button>
          </div>
        </div>

        {/* SECTION 4: Safety Score by Model */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Model Safety Benchmarking</h2>
              <p className="text-xs text-slate-400 mt-0.5">Comparative alignment scores based on red-teaming datasets</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
              <ShieldCheck size={20} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Model Name</th>
                  <th className="px-6 py-4">Environment</th>
                  <th className="px-6 py-4">Safety Score</th>
                  <th className="px-6 py-4">Toxicity (P95)</th>
                  <th className="px-6 py-4">Injection Resist.</th>
                  <th className="px-6 py-4">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px]">
                {modelSafetyScores.map((model, idx) => (
                  <tr key={idx} className={model.safety < 85 ? 'bg-amber-50/30' : 'hover:bg-slate-50/30 transition-colors'}>
                    <td className="px-6 py-4 font-bold text-slate-800">{model.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500">{model.env}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold ${model.safety < 85 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {model.safety}%
                        </span>
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden md:block">
                          <div className={`h-full ${model.safety < 85 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${model.safety}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-mono">{model.toxicity}%</td>
                    <td className="px-6 py-4 text-slate-600 font-mono">{model.injection}%</td>
                    <td className="px-6 py-4">
                      <Badge status={model.risk}>{model.risk}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5: Compliance Escalations */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Compliance & Safety Escalations</h2>
            <p className="text-xs text-slate-400 mt-0.5">Critical items requiring immediate regulatory review</p>
          </div>
          <div className="divide-y divide-slate-100">
            {escalations.map((item) => (
              <div key={item.id} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors group">
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${item.severity === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-slate-800 leading-snug">{item.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                      <Clock size={12} /> {item.time}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider flex items-center">
                      Investigate <ChevronRight size={14} className="ml-1" />
                    </button>
                    <button className="text-[11px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 flex justify-center">
            <button className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-colors">
              Access Full Compliance Portal
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[11px] font-medium uppercase tracking-widest">
        <p>IntelliCore LLM Governance &copy; 2024</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-950 transition-colors">Adversarial Logs</a>
          <a href="#" className="hover:text-slate-950 transition-colors">Red Teaming Docs</a>
          <a href="#" className="hover:text-slate-950 transition-colors">Safety Policies</a>
        </div>
      </div>
    </div>
  );
}