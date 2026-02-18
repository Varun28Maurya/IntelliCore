import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Cpu, 
  Database, 
  Activity, 
  DollarSign, 
  Zap, 
  ShieldAlert, 
  ArrowUpRight, 
  ChevronRight, 
  Filter, 
  Globe, 
  Box, 
  Maximize2, 
  TrendingUp, 
  Clock,
  MoreHorizontal
} from 'lucide-react';

// --- Mock Data ---

const usageTrendData = [
  { time: '08:00', cpu: 62, mem: 74, gpu: 45, network: 320 },
  { time: '10:00', cpu: 68, mem: 78, gpu: 52, network: 410 },
  { time: '12:00', cpu: 85, mem: 92, gpu: 74, network: 580 },
  { time: '14:00', cpu: 75, mem: 88, gpu: 68, network: 510 },
  { time: '16:00', cpu: 64, mem: 82, gpu: 58, network: 440 },
  { time: '18:00', cpu: 72, mem: 85, gpu: 62, network: 490 },
];

const clusterUtilization = [
  { name: 'Inference-Cluster-A', region: 'us-east-1', cpu: 82, mem: 91, gpu: 74, pods: 142, status: 'Overloaded' },
  { name: 'Training-Cluster-01', region: 'us-west-2', cpu: 45, mem: 52, gpu: 88, pods: 64, status: 'Healthy' },
  { name: 'LLM-Gateway-Prod', region: 'eu-central-1', cpu: 24, mem: 38, gpu: 12, pods: 28, status: 'Healthy' },
  { name: 'Vector-DB-Cluster', region: 'us-east-1', cpu: 78, mem: 84, gpu: 0, pods: 56, status: 'Warning' },
];

const scalingEvents = [
  { day: 'Mon', events: 12 },
  { day: 'Tue', events: 8 },
  { day: 'Wed', events: 15 },
  { day: 'Thu', events: 24 },
  { day: 'Fri', events: 18 },
  { day: 'Sat', events: 6 },
  { day: 'Sun', events: 4 },
];

const costBreakdown = [
  { category: 'Compute', amount: 8400, color: '#3b82f6' },
  { category: 'Storage', amount: 2100, color: '#a855f7' },
  { category: 'Network', amount: 1400, color: '#f59e0b' },
  { category: '3rd Party API', amount: 2300, color: '#10b981' },
];

const resourceAlerts = [
  { id: 'AL-502', type: 'High Memory', cluster: 'Inference-Cluster-A', threshold: '90%', value: '94%', severity: 'Critical', status: 'Active' },
  { id: 'AL-501', type: 'GPU Starvation', cluster: 'Training-Cluster-01', threshold: '10%', value: '4%', severity: 'High', status: 'Investigating' },
  { id: 'AL-498', type: 'CPU Spike', cluster: 'Vector-DB-Cluster', threshold: '70%', value: '82%', severity: 'Medium', status: 'Acknowledged' },
];

// --- Subcomponents ---

const Badge = ({ status }) => {
  const styles = {
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Optimal: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    High: 'bg-amber-50 text-amber-700 border-amber-100',
    'Over Budget': 'bg-rose-50 text-rose-700 border-rose-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
    Overloaded: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
      {status.toUpperCase()}
    </span>
  );
};

const MetricCard = ({ label, value, trend, status, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
        <Icon size={18} className="text-slate-500" />
      </div>
      <Badge status={status} />
    </div>
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
      <h3 className="text-3xl font-bold text-slate-900 mt-1">{value}</h3>
      <p className="text-[11px] text-slate-400 mt-1 font-medium italic">{trend}</p>
    </div>
  </div>
);

// --- Main Component ---

export default function ResourceUtilization() {
  const [env, setEnv] = useState('Production');

  return (
    <div className="bg-slate-50 p-6 space-y-6 min-h-screen font-sans text-slate-900">
      
      {/* SECTION 1: Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resource Utilization</h1>
          <p className="text-slate-500 text-sm font-medium italic">Infrastructure performance and compute consumption analytics.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {['Prod', 'UAT', 'Dev'].map((e) => (
              <button 
                key={e} 
                onClick={() => setEnv(e)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${env === e ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {e}
              </button>
            ))}
          </div>
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none">
            <option>All Clusters</option>
            <option>Inference-A</option>
            <option>Training-01</option>
          </select>
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* SECTION 2: Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Avg CPU Usage" value="68.4%" trend="+4.2% vs yesterday" status="Optimal" icon={Cpu} />
        <MetricCard label="Avg Memory Usage" value="82.1%" trend="+1.5% vs yesterday" status="High" icon={Activity} />
        <MetricCard label="GPU Utilization" value="45.8%" trend="-12% vs last cycle" status="Optimal" icon={Zap} />
        <MetricCard label="Infra Cost (7d)" value="$14,200" trend="On track to budget" status="Optimal" icon={DollarSign} />
      </div>

      {/* SECTION 3: Resource Usage Trend Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Activity size={20} className="text-slate-400" />
            Consumption Trends
          </h2>
          <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase">
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" /> CPU %</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-purple-500 rounded-sm" /> Mem %</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /> GPU %</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-orange-500 rounded-sm" /> Network (MB/s)</span>
          </div>
        </div>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Line name="CPU" type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={3} dot={false} />
              <Line name="Memory" type="monotone" dataKey="mem" stroke="#a855f7" strokeWidth={3} dot={false} />
              <Line name="GPU" type="monotone" dataKey="gpu" stroke="#10b981" strokeWidth={3} dot={false} />
              <Line name="Network" type="monotone" dataKey="network" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* SECTION 4: Cluster Utilization Table */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Globe size={20} className="text-slate-400" />
              Cluster Utilization Matrix
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Cluster Name</th>
                  <th className="px-6 py-4">Region</th>
                  <th className="px-6 py-4">CPU %</th>
                  <th className="px-6 py-4">Memory %</th>
                  <th className="px-6 py-4">GPU %</th>
                  <th className="px-6 py-4">Pods</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clusterUtilization.map((row, idx) => (
                  <tr key={idx} className={`hover:bg-slate-50 transition-colors ${row.cpu > 80 || row.mem > 80 ? 'bg-rose-50/30' : ''}`}>
                    <td className="px-6 py-5 font-bold text-slate-900">{row.name}</td>
                    <td className="px-6 py-5 text-slate-500 font-medium">{row.region}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold ${row.cpu > 80 ? 'text-rose-600' : 'text-slate-700'}`}>{row.cpu}%</span>
                        <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${row.cpu > 80 ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ width: `${row.cpu}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-mono text-slate-600">{row.mem}%</td>
                    <td className="px-6 py-5 font-mono text-slate-600">{row.gpu}%</td>
                    <td className="px-6 py-5 font-bold text-slate-700">{row.pods}</td>
                    <td className="px-6 py-5 text-right">
                      <Badge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5: Container Scaling Panel */}
        <div className="xl:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <Box size={18} className="text-slate-400" />
            Scaling Metrics
          </h2>
          <div className="space-y-6 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Current Pods</p>
                <p className="text-xl font-bold">234</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Peak (24h)</p>
                <p className="text-xl font-bold">288</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scaling Events (7d)</p>
              <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scalingEvents}>
                    <Bar dataKey="events" fill="#6366f1" radius={[2, 2, 0, 0]} />
                    <XAxis dataKey="day" hide />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-500">Avg Scale-up Time</span>
                <span className="text-slate-900">42s</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-500">Avg Scale-down Time</span>
                <span className="text-slate-900">145s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION 6: Cost Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-lg font-bold">Cost Distribution</h2>
              <p className="text-sm text-slate-500">Resource expenditure by category (MTD)</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Est. Monthly Total</p>
              <p className="text-2xl font-bold text-slate-900">$14,200</p>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costBreakdown} layout="vertical" margin={{ left: 20, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold' }} width={100} />
                <Tooltip />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={32}>
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 7: Resource Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShieldAlert size={20} className="text-rose-500" />
              Resource Violations
            </h2>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Alert ID</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Metric</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resourceAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-[11px] font-bold text-slate-400">{alert.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{alert.type}</td>
                    <td className="px-6 py-4">
                      <span className="text-rose-600 font-bold">{alert.value}</span>
                      <span className="text-slate-400 ml-1">(&gt;{alert.threshold})</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        alert.severity === 'Critical' ? 'bg-rose-600 text-white' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition-all shadow-sm">
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
            <button className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest">
              View All System Alarms
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}