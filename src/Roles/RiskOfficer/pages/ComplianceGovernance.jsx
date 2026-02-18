import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  ClipboardCheck, 
  AlertOctagon, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  History,
  Lock,
  Search,
  Filter
} from 'lucide-react';

// --- Mock Data ---

const frameworks = [
  { name: 'EU AI Act', scope: 'Global / EU', models: 12, compliance: 94, lastReview: '2024-05-10', status: 'Compliant' },
  { name: 'SR 11-7 (Fed/OCC)', scope: 'Banking / US', models: 18, compliance: 100, lastReview: '2024-04-28', status: 'Compliant' },
  { name: 'RBI AI Guidelines', scope: 'Banking / IN', models: 8, compliance: 78, lastReview: '2024-05-12', status: 'Partial' },
  { name: 'ISO 42001 (AIMS)', scope: 'Enterprise', models: 24, compliance: 88, lastReview: '2024-05-01', status: 'Partial' },
  { name: 'Internal Risk Policy', scope: 'Corporate', models: 32, compliance: 100, lastReview: '2024-05-14', status: 'Compliant' },
];

const modelApprovals = [
  { name: 'Retail Credit Scorer v4', type: 'ML', tier: 'Tier 1', stage: 'Compliance Review', authority: 'Risk Committee', updated: '2h ago' },
  { name: 'Customer Support Bot', type: 'LLM', tier: 'Tier 3', stage: 'Approved', authority: 'System Auto', updated: '1d ago' },
  { name: 'Fraud Shield Pro', type: 'ML', tier: 'Tier 1', stage: 'Risk Review', authority: 'CRO Office', updated: '4h ago' },
  { name: 'Loan Alpha Engine', type: 'ML', tier: 'Tier 2', stage: 'Validation', authority: 'Model Validation Group', updated: '3d ago' },
  { name: 'Doc Analysis Agent', type: 'LLM', tier: 'Tier 2', stage: 'Compliance Review', authority: 'DPO', updated: '12h ago' },
];

const controlLibrary = [
  { label: 'Data Validation Checks', active: true },
  { label: 'Bias Monitoring Enabled', active: true },
  { label: 'Drift Monitoring Enabled', active: true },
  { label: 'Human Oversight Required', active: true },
  { label: 'Explainability Reports Generated', active: true },
  { label: 'Stress Testing Completed', active: false },
  { label: 'PII Scrubbing Verified', active: true },
  { label: 'Red Teaming Logged', active: false },
];

const auditTrail = [
  { name: 'Model Risk Assessment Report', version: 'v2.1', updated: '2024-05-14', owner: 'M. Chen', status: 'Approved' },
  { name: 'Fairness Evaluation Report', version: 'v1.4', updated: '2024-05-12', owner: 'A. Kumar', status: 'Pending Review' },
  { name: 'LLM Safety Assessment', version: 'v1.0', updated: '2024-05-10', owner: 'J. Smith', status: 'Approved' },
  { name: 'Validation Summary Report', version: 'v3.0', updated: '2024-04-22', owner: 'S. Patel', status: 'Expired' },
];

const incidentLog = [
  { date: '2024-05-14', type: 'Bias threshold exceeded', model: 'Retail Credit v4', severity: 'High', status: 'Resolved' },
  { date: '2024-05-11', type: 'Unauthorized PII Access', model: 'Doc Agent', severity: 'Critical', status: 'In Progress' },
  { date: '2024-05-08', type: 'Drift Limit Breach', model: 'Fraud Shield', severity: 'Medium', status: 'Resolved' },
];

// --- Reusable Components ---

const StatusBadge = ({ status }) => {
  const styles = {
    Compliant: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Approved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Partial: 'bg-amber-50 text-amber-700 border-amber-100',
    Review: 'bg-amber-50 text-amber-700 border-amber-100',
    'Pending Review': 'bg-amber-50 text-amber-700 border-amber-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
    'Non-Compliant': 'bg-rose-50 text-rose-700 border-rose-100',
    Expired: 'bg-slate-100 text-slate-600 border-slate-200',
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || styles.Partial}`}>
      {status}
    </span>
  );
};

const MetricCard = ({ title, value, status, desc, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
        <Icon size={18} />
      </div>
      <StatusBadge status={status} />
    </div>
    <h3 className="text-3xl font-bold text-slate-900 leading-none">{value}</h3>
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">{title}</p>
    <p className="text-[11px] text-slate-400 mt-1">{desc}</p>
  </div>
);

const SectionContainer = ({ title, subtitle, children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
      <div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      <button className="text-slate-300 hover:text-indigo-600 transition-colors">
        <ExternalLink size={18} />
      </button>
    </div>
    {children}
  </div>
);

// --- Main Page Component ---

export default function ComplianceGovernance() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
              <Lock size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Compliance & Governance Center</h1>
              <p className="text-slate-500 text-sm">Regulatory control interface for AI assets and policy adherence</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
            <History size={16} className="text-slate-400" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Last Audit: 12 May 2024</span>
          </div>
        </div>

        {/* SECTION 1: Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Regulatory Coverage" 
            value="96%" 
            status="Healthy" 
            desc="Across all active global jurisdictions." 
            icon={ShieldCheck} 
          />
          <MetricCard 
            title="Policy Controls" 
            value="28" 
            status="Healthy" 
            desc="Active automated policy enforcements." 
            icon={ClipboardCheck} 
          />
          <MetricCard 
            title="Pending Approvals" 
            value="03" 
            status="Review" 
            desc="Models awaiting risk committee sign-off." 
            icon={Clock} 
          />
          <MetricCard 
            title="Compliance Incidents" 
            value="01" 
            status="Critical" 
            desc="Unresolved breaches in last 30 days." 
            icon={AlertOctagon} 
          />
        </div>

        {/* SECTION 2: Regulatory Framework Coverage */}
        <SectionContainer title="Regulatory Framework Coverage" subtitle="Adherence status across mandated AI guidelines and internal policies">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Framework</th>
                  <th className="px-6 py-4">Scope</th>
                  <th className="px-6 py-4 text-center">Models Covered</th>
                  <th className="px-6 py-4">Compliance %</th>
                  <th className="px-6 py-4">Last Review</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {frameworks.map((fw, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{fw.name}</td>
                    <td className="px-6 py-4 text-slate-500">{fw.scope}</td>
                    <td className="px-6 py-4 text-center font-mono text-slate-600">{fw.models}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full max-w-[60px]">
                          <div 
                            className={`h-full rounded-full ${fw.compliance === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                            style={{ width: `${fw.compliance}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700">{fw.compliance}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{fw.lastReview}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={fw.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionContainer>

        {/* SECTION 3: Model Approval Workflow */}
        <SectionContainer title="Model Approval Lifecycle" subtitle="Current status of assets moving through the governance gatekeeping process">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Model Name</th>
                  <th className="px-6 py-4">Type / Tier</th>
                  <th className="px-6 py-4">Current Stage</th>
                  <th className="px-6 py-4">Approval Authority</th>
                  <th className="px-6 py-4">Last Update</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {modelApprovals.map((m, idx) => {
                  const isStuck = m.stage === 'Compliance Review' || m.stage === 'Risk Review';
                  return (
                    <tr key={idx} className={`hover:bg-slate-50/50 transition-colors ${isStuck ? 'bg-amber-50/20' : ''}`}>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{m.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">{m.type}</span>
                          <span className="text-xs text-slate-400">{m.tier}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-semibold ${isStuck ? 'text-amber-700 font-bold' : 'text-slate-600'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${m.stage === 'Approved' ? 'bg-emerald-500' : isStuck ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`} />
                          {m.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{m.authority}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{m.updated}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-600 font-bold text-xs hover:underline">Manage</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SECTION 4: Policy & Control Library */}
          <SectionContainer title="Policy & Control Library" subtitle="Mandatory safeguards required for production deployment">
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {controlLibrary.map((control, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/30">
                  <div className="flex items-center gap-3">
                    {control.active ? (
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    ) : (
                      <AlertOctagon size={18} className="text-amber-500 shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${control.active ? 'text-slate-700' : 'text-slate-400 italic'}`}>
                      {control.label}
                    </span>
                  </div>
                  {!control.active && <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Action Req.</span>}
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <button className="w-full py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors">
                Update Policy Framework
              </button>
            </div>
          </SectionContainer>

          {/* SECTION 5: Documentation & Audit Trail */}
          <SectionContainer title="Audit Trail & Documentation" subtitle="Official repository of model validation and risk reports">
            <div className="divide-y divide-slate-100">
              {auditTrail.map((doc, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded text-slate-400">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{doc.name}</p>
                      <div className="flex gap-3 text-[10px] text-slate-400 mt-0.5">
                        <span>Version: {doc.version}</span>
                        <span>Owner: {doc.owner}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={doc.status} />
                    <p className="text-[10px] text-slate-400 mt-1">{doc.updated}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50/50 flex justify-center border-t border-slate-100">
              <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">
                Access Audit Logs
              </button>
            </div>
          </SectionContainer>
        </div>

        {/* SECTION 6: Compliance Incident Log */}
        <SectionContainer title="Compliance Incident Log" subtitle="History of identified breaches and resolution status">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Incident Type</th>
                  <th className="px-6 py-4">Affected Model</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13px]">
                {incidentLog.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-mono">{log.date}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{log.type}</td>
                    <td className="px-6 py-4 text-slate-600">{log.model}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${log.severity === 'Critical' ? 'text-rose-600' : 'text-amber-600'}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionContainer>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[11px] font-medium uppercase tracking-widest gap-4">
          <p>IntelliCore Regulatory Reporting System &copy; 2024</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Data Privacy Notice</a>
            <a href="#" className="hover:text-slate-900 transition-colors">System Health</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact DPO</a>
          </div>
        </div>

      </div>
    </div>
  );
}