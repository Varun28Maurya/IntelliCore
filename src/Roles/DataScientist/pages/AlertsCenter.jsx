import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  User, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowDownCircle, 
  RefreshCcw, 
  UserPlus, 
  ShieldCheck,
  Zap
} from 'lucide-react';

// --- Mock Data ---

const kpiData = [
  { label: 'Total Active Alerts', value: '12', delta: '+2', status: 'Warning', severity: 'Medium' },
  { label: 'Critical Alerts', value: '2', delta: '0', status: 'Critical', severity: 'Critical' },
  { label: 'Drift Alerts', value: '4', delta: '+1', status: 'Warning', severity: 'High' },
  { label: 'Bias Alerts', value: '3', delta: '0', status: 'Warning', severity: 'Medium' },
];

const alertsData = [
  { 
    id: 'AL-901', 
    time: '2026-02-18 09:42', 
    type: 'Accuracy Drop', 
    model: 'CreditRisk_v3', 
    metric: 'Accuracy', 
    value: '91.2%', 
    threshold: '94%', 
    severity: 'High', 
    status: 'Investigating', 
    assigned: 'A. Sharma',
    rootCause: 'Data drift in income feature distribution',
    suggestedAction: 'Trigger retraining with Q1-2026 dataset',
    trend: [
      { time: '08:00', val: 94.2 }, { time: '08:30', val: 94.1 }, { time: '09:00', val: 93.8 }, { time: '09:30', val: 91.2 }
    ]
  },
  { 
    id: 'AL-902', 
    time: '2026-02-18 08:15', 
    type: 'Bias Violation', 
    model: 'LoanApproval_v2', 
    metric: 'Parity Diff', 
    value: '-0.14', 
    threshold: '-0.10', 
    severity: 'Critical', 
    status: 'Open', 
    assigned: 'Unassigned',
    rootCause: 'Unexpected FPR gap in Age < 30 segment',
    suggestedAction: 'Review sampling weights for training data',
    trend: [
      { time: '07:00', val: -0.08 }, { time: '07:30', val: -0.09 }, { time: '08:00', val: -0.11 }, { time: '08:15', val: -0.14 }
    ]
  },
  { 
    id: 'AL-903', 
    time: '2026-02-18 07:30', 
    type: 'Drift Detected', 
    model: 'FraudDet_v1.2', 
    metric: 'PSI Score', 
    value: '0.28', 
    threshold: '0.25', 
    severity: 'Medium', 
    status: 'Resolved', 
    assigned: 'M. Patel',
    rootCause: 'Feature "Trans_Amt" distribution shifted',
    suggestedAction: 'Update normalization bounds',
    trend: [
      { time: '06:00', val: 0.15 }, { time: '06:30', val: 0.18 }, { time: '07:00', val: 0.22 }, { time: '07:30', val: 0.28 }
    ]
  },
];

const timelineData = [
  { event: 'Alert Triggered', time: '09:42 AM', user: 'System Agent', desc: 'Metric threshold violation detected' },
  { event: 'Assigned to Analyst', time: '09:55 AM', user: 'Ops Manager', desc: 'Assigned to A. Sharma for triage' },
  { event: 'Investigation Started', time: '10:05 AM', user: 'A. Sharma', desc: 'Analyzing feature level distribution shifts' },
  { event: 'Retraining Triggered', time: '10:30 AM', user: 'A. Sharma', desc: 'Pipeline scheduled for retraining' },
];

// --- Subcomponents ---

const KPIBox = ({ label, value, delta, severity }) => {
  const sevColors = {
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
    High: 'bg-rose-50 text-rose-600 border-rose-100',
    Medium: 'bg-amber-50 text-amber-700 border-amber-100',
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${sevColors[severity]}`}>
          {severity}
        </span>
      </div>
      <div className="flex items-baseline space-x-2">
        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
        <span className={`text-xs font-bold ${delta.startsWith('+') ? 'text-rose-600' : 'text-emerald-600'}`}>
          {delta} vs yesterday
        </span>
      </div>
    </div>
  );
};

const SeverityBadge = ({ severity }) => {
  const styles = {
    Critical: 'bg-rose-600 text-white',
    High: 'bg-rose-100 text-rose-700',
    Medium: 'bg-amber-100 text-amber-700',
    Low: 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${styles[severity] || styles.Low}`}>
      {severity}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Open: 'bg-rose-50 text-rose-600 border-rose-100',
    Investigating: 'bg-blue-50 text-blue-600 border-blue-100',
    Resolved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

// --- Main Component ---

export default function AlertsCenter() {
  const [selectedAlert, setSelectedAlert] = useState(alertsData[0]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
              <Bell className="text-slate-900" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Model Alerts Center</h1>
              <p className="text-slate-500 text-sm font-medium">Anomaly management & Resolution console</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search alert id..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
              />
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-800 transition-all">
              Mark All Read
            </button>
          </div>
        </div>

        {/* SECTION 1: Alert Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {kpiData.map((kpi, i) => (
            <KPIBox key={i} {...kpi} />
          ))}
        </div>

        {/* SECTION 2: Filters Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Severity</label>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none">
              <option>All Severities</option>
              <option>Critical</option>
              <option>High</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Model</label>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none">
              <option>All Models</option>
              <option>CreditRisk_v3</option>
              <option>LoanApproval_v2</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Alert Type</label>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none">
              <option>All Types</option>
              <option>Accuracy Drop</option>
              <option>Drift Detected</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</label>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none">
              <option>All Status</option>
              <option>Open</option>
              <option>Investigating</option>
              <option>Resolved</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
              <Filter size={16} /> Apply Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* SECTION 3: Alerts Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold">Active Incidents</h2>
              <span className="text-xs text-slate-400 font-medium">Last updated: 10:42 AM</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Type / Model</th>
                    <th className="px-6 py-4">Metric / Value</th>
                    <th className="px-6 py-4">Severity</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {alertsData.map((alert) => (
                    <tr 
                      key={alert.id} 
                      onClick={() => setSelectedAlert(alert)}
                      className={`hover:bg-slate-50 transition-all cursor-pointer group ${selectedAlert.id === alert.id ? 'bg-slate-50' : ''}`}
                    >
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{alert.time.split(' ')[1]}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{alert.time.split(' ')[0]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700">{alert.type}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{alert.model}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-mono font-bold text-slate-900">{alert.value}</span>
                          <span className="text-[10px] text-slate-400">Threshold: {alert.threshold}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5"><SeverityBadge severity={alert.severity} /></td>
                      <td className="px-6 py-5"><StatusBadge status={alert.status} /></td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-slate-300 hover:text-slate-900"><MoreVertical size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Detail Panels */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* SECTION 4: Alert Detail Panel */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-md font-bold text-slate-900">{selectedAlert.id}: {selectedAlert.type}</h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase mt-1 tracking-tight">{selectedAlert.model}</p>
                </div>
                <div className={`p-2 rounded-xl ${selectedAlert.severity === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
                  <ShieldAlert size={20} />
                </div>
              </div>

              <div className="h-[120px] w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedAlert.trend}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={selectedAlert.severity === 'Critical' ? '#e11d48' : '#3b82f6'} stopOpacity={0.1}/>
                        <stop offset="95%" stopColor={selectedAlert.severity === 'Critical' ? '#e11d48' : '#3b82f6'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="val" 
                      stroke={selectedAlert.severity === 'Critical' ? '#e11d48' : '#3b82f6'} 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#colorVal)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Root Cause Analysis</h4>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">{selectedAlert.rootCause}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Suggested Mitigation</h4>
                  <p className="text-sm text-slate-600">{selectedAlert.suggestedAction}</p>
                </div>
              </div>
            </div>

            {/* SECTION 5: Alert Timeline */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-md font-bold text-slate-900 mb-6 flex items-center">
                <Clock size={18} className="mr-2 text-slate-400" /> Incident Timeline
              </h3>
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                {timelineData.map((item, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center z-10">
                      <div className="w-2 h-2 bg-slate-300 rounded-full" />
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-slate-900">{item.event}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{item.desc} — <span className="font-bold">{item.user}</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 6: Action Panel */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Incident Resolution</h3>
              <div className="grid grid-cols-1 gap-2">
                <button className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="flex items-center">
                    <UserPlus className="text-blue-500 mr-3" size={18} />
                    <span className="text-sm font-bold text-slate-700">Assign Analyst</span>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-slate-900" size={14} />
                </button>
                <button className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="flex items-center">
                    <RefreshCcw className="text-amber-500 mr-3" size={18} />
                    <span className="text-sm font-bold text-slate-700">Trigger Retraining</span>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-slate-900" size={14} />
                </button>
                <button className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="flex items-center">
                    <ShieldCheck className="text-rose-500 mr-3" size={18} />
                    <span className="text-sm font-bold text-slate-700">Escalate to Risk</span>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-slate-900" size={14} />
                </button>
                <button className="flex items-center justify-between w-full p-3 bg-emerald-600 border border-emerald-600 rounded-xl hover:bg-emerald-700 transition-all group">
                  <div className="flex items-center text-white">
                    <CheckCircle2 className="mr-3" size={18} />
                    <span className="text-sm font-bold">Mark as Resolved</span>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}