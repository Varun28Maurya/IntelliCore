import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  BarChart3, 
  Clock, 
  ShieldAlert, 
  Layers,
  ChevronRight,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// --- Mock Data ---

const PERFORMANCE_TREND = [
  { name: 'Mon', accuracy: 94.1, precision: 92.5, recall: 91.8 },
  { name: 'Tue', accuracy: 94.4, precision: 92.8, recall: 91.5 },
  { name: 'Wed', accuracy: 93.8, precision: 92.1, recall: 92.0 },
  { name: 'Thu', accuracy: 94.2, precision: 93.0, recall: 92.4 },
  { name: 'Fri', accuracy: 94.5, precision: 93.2, recall: 92.6 },
  { name: 'Sat', accuracy: 94.0, precision: 92.7, recall: 91.9 },
  { name: 'Sun', accuracy: 94.2, precision: 92.9, recall: 92.2 },
];

const DRIFT_DATA = [
  { feature: 'Annual Income', score: 0.045, status: 'Stable', change: '+0.002' },
  { feature: 'Credit Score', score: 0.124, status: 'Warning', change: '+0.041' },
  { feature: 'Loan Amount', score: 0.021, status: 'Stable', change: '-0.005' },
  { feature: 'Debt-to-Income', score: 0.282, status: 'Critical', change: '+0.095' },
  { feature: 'Employment Length', score: 0.088, status: 'Stable', change: '+0.012' },
];

const BIAS_DATA = [
  { group: 'Age 18-25', approval: 62, fpr: 0.12, bias: true },
  { group: 'Age 26-45', approval: 78, fpr: 0.08, bias: false },
  { group: 'Age 46-65', approval: 81, fpr: 0.07, bias: false },
  { group: 'Age 65+', approval: 74, fpr: 0.09, bias: false },
];

const ALERTS = [
  { id: 1, type: 'critical', msg: 'PSI Threshold exceeded for "Debt-to-Income"', time: '12 mins ago' },
  { id: 2, type: 'warning', msg: 'Accuracy drop detected (3.2%) in Credit Scoring V2', time: '1 hour ago' },
  { id: 3, type: 'info', msg: 'Feature Drift detected in "Home Ownership Type"', time: '3 hours ago' },
  { id: 4, type: 'critical', msg: 'Bias Flag: Demographic Parity violation in Region-South', time: '5 hours ago' },
];

// --- Reusable UI Components ---

const MetricCard = ({ title, value, subValue, trend, status, icon: Icon }) => {
  const statusColors = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    danger: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">
          <Icon className="w-5 h-5 text-slate-600" />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full border ₹{statusColors[status]}`}>
          {status === 'success' ? 'Healthy' : status === 'warning' ? 'Issue' : 'Critical'}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 leading-none">{value}</h3>
      </div>
      <div className="mt-4 flex items-center text-xs">
        {trend > 0 ? (
          <span className="flex items-center text-emerald-600 font-medium mr-2">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> {Math.abs(trend)}%
          </span>
        ) : (
          <span className="flex items-center text-rose-600 font-medium mr-2">
            <ArrowDownRight className="w-3 h-3 mr-0.5" /> {Math.abs(trend)}%
          </span>
        )}
        <span className="text-slate-400">{subValue}</span>
      </div>
    </div>
  );
};

const SectionCard = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ₹{className}`}>
    <div className="px-6 py-4 border-b border-slate-50">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const OperationalMetric = ({ label, value, trend, unit = "" }) => (
  <div className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col">
    <span className="text-xs text-slate-500 mb-1">{label}</span>
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-bold text-slate-900">{value}</span>
      <span className="text-xs text-slate-400 font-normal">{unit}</span>
    </div>
    <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ₹{trend > 80 ? 'bg-rose-500' : 'bg-blue-500'}`} 
        style={{ width: `₹{Math.min(trend, 100)}%` }}
      />
    </div>
  </div>
);

// --- Main Component ---

export default function DataScientistDashboard() {
  const [model, setModel] = useState('Credit-Risk-V2');
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6 font-sans text-slate-900">
      
      {/* Header & Identity */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Model Observability</h1>
          <p className="text-slate-500 text-sm">Monitoring production integrity for Retail Banking models.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            <button className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-900 rounded-md">Live</button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900">History</button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Activity className="w-4 h-4" />
            Run Diagnostic
          </button>
        </div>
      </div>

      {/* SECTION 1: Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Active Models" 
          value="24" 
          subValue="vs 22 last month" 
          trend={8.2} 
          status="success" 
          icon={Layers}
        />
        <MetricCard 
          title="Avg Accuracy" 
          value="94.2%" 
          subValue="Last 7 days" 
          trend={1.3} 
          status="success" 
          icon={BarChart3}
        />
        <MetricCard 
          title="Drift Status" 
          value="High" 
          subValue="2 features drifting" 
          trend={-12.4} 
          status="warning" 
          icon={ShieldAlert}
        />
        <MetricCard 
          title="Bias Alerts" 
          value="2" 
          subValue="Requires review" 
          trend={0} 
          status="danger" 
          icon={AlertTriangle}
        />
      </div>

      {/* SECTION 2: Filters Row */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Filters</span>
        </div>
        
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Model Name</label>
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option>Credit-Risk-V2</option>
            <option>Fraud-Detection-RNN</option>
            <option>Churn-Predictor-XG</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Version</label>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none">
            <option>v2.4.1 (Stable)</option>
            <option>v2.4.0 (Legacy)</option>
            <option>v2.5.0-beta</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1">Time Range</label>
          <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-0.5">
            {['24h', '7d', '30d'].map((range) => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs rounded-md transition-all ₹{timeRange === range ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-slate-500'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Accuracy Trend (%)">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_TREND}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorAcc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Precision vs Recall">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PERFORMANCE_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis domain={[90, 95]} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '12px'}} />
                <Line type="monotone" dataKey="precision" stroke="#059669" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="recall" stroke="#8b5cf6" strokeWidth={2} dot={{r: 4}} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* SECTION 4: Drift Monitoring */}
      <SectionCard title="Feature Drift & PSI Analysis">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="h-[240px]">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DRIFT_DATA} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="feature" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} width={100} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
               </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 italic text-center">Top drifting features by PSI score (Population Stability Index)</p>
          </div>

          <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-4 py-3 first:rounded-l-lg">Feature</th>
                  <th className="px-4 py-3">PSI Score</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 last:rounded-r-lg">24h Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DRIFT_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700">{row.feature}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{row.score.toFixed(3)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ₹{
                        row.score < 0.1 ? 'text-emerald-600 bg-emerald-50' : 
                        row.score < 0.25 ? 'text-amber-600 bg-amber-50' : 
                        'text-rose-600 bg-rose-50'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-xs ₹{row.change.startsWith('+') ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {row.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionCard>

      {/* SECTION 5 & 6: Bias and Operational Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bias & Fairness */}
        <div className="lg:col-span-2">
          <SectionCard title="Bias & Fairness Monitoring">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BIAS_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="group" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                    <Tooltip />
                    <Bar dataKey="approval" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px] text-left">
                  <thead className="text-slate-400 font-bold border-b border-slate-50">
                    <tr>
                      <th className="pb-2">Group</th>
                      <th className="pb-2 text-center">FPR</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {BIAS_DATA.map((item, i) => (
                      <tr key={i} className={item.bias ? "bg-rose-50/50" : ""}>
                        <td className="py-3 font-medium text-slate-700">{item.group}</td>
                        <td className="py-3 text-center text-slate-600">{item.fpr.toFixed(2)}</td>
                        <td className="py-3 text-right">
                          {item.bias ? (
                            <span className="text-rose-600 font-bold flex items-center justify-end gap-1">
                              <ShieldAlert className="w-3 h-3" /> Flagged
                            </span>
                          ) : (
                            <span className="text-emerald-600 font-medium">Within Limit</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Operational Metrics */}
        <div className="lg:col-span-1 space-y-4">
           <h3 className="text-sm font-semibold text-slate-800 px-1">Infrastructure Load</h3>
           <div className="grid grid-cols-2 gap-4">
              <OperationalMetric label="Avg Latency" value="124" unit="ms" trend={45} />
              <OperationalMetric label="p95 Latency" value="482" unit="ms" trend={85} />
              <OperationalMetric label="Throughput" value="12k" unit="req/m" trend={60} />
              <OperationalMetric label="Failure Rate" value="0.02" unit="%" trend={5} />
           </div>
           
           <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
              <div className="flex justify-between items-center mb-4">
                <Activity className="w-6 h-6 opacity-80" />
                <span className="text-[10px] bg-blue-500 px-2 py-1 rounded font-bold uppercase tracking-widest">Optimized</span>
              </div>
              <p className="text-xs opacity-80 mb-1">Total Predictions (24h)</p>
              <h4 className="text-2xl font-bold">1,482,903</h4>
              <div className="mt-4 pt-4 border-t border-blue-500/50 flex items-center gap-2 text-xs font-medium">
                <span className="flex items-center text-blue-100">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> +12%
                </span>
                <span className="opacity-60">vs prev period</span>
              </div>
           </div>
        </div>
      </div>

      {/* SECTION 7: Recent Alerts Panel */}
      <SectionCard title="Recent Security & Integrity Alerts">
        <div className="space-y-3">
          {ALERTS.map((alert) => (
            <div 
              key={alert.id} 
              className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-slate-300 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-1.5 h-10 rounded-full ₹{
                  alert.type === 'critical' ? 'bg-rose-500' : 
                  alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div>
                  <h5 className="text-sm font-semibold text-slate-800">{alert.msg}</h5>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center text-[11px] text-slate-400">
                      <Clock className="w-3 h-3 mr-1" /> {alert.time}
                    </span>
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tight">Production env</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Review Case <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ))}
          <button className="w-full py-3 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
            View All Historical Alerts
          </button>
        </div>
      </SectionCard>

      {/* Footer Branding */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-slate-900">Sentinel ML <span className="text-slate-400 font-normal">v4.0</span></span>
        </div>
        <div className="text-xs text-slate-400">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

    </div>
  );
}