import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Activity, 
  Server, 
  Database, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  ChevronRight, 
  RefreshCcw, 
  Filter, 
  ArrowRight,
  Cpu,
  Globe,
  HardDrive,
  Box,
  Terminal,
  Zap
} from 'lucide-react';

// --- Mock Data ---

const statusBlocks = [
  { name: 'API Gateway', status: 'Healthy', uptime: '99.99%', latency: '42ms', errors: '0.01%' },
  { name: 'Model Serving Cluster', status: 'Healthy', uptime: '99.95%', latency: '185ms', errors: '0.04%' },
  { name: 'Feature Store', status: 'Degraded', uptime: '99.82%', latency: '12ms', errors: '1.24%' },
  { name: 'Vector Database', status: 'Healthy', uptime: '99.99%', latency: '8ms', errors: '0.00%' },
  { name: 'Auth Service', status: 'Healthy', uptime: '100%', latency: '24ms', errors: '0.00%' },
  { name: 'Logging Service', status: 'Healthy', uptime: '99.91%', latency: '310ms', errors: '0.02%' },
];

const latencyTrend = [
  { time: '10:00', avg: 142, p95: 280, error: 0.1 },
  { time: '11:00', avg: 155, p95: 310, error: 0.2 },
  { time: '12:00', avg: 184, p95: 420, error: 0.8 },
  { time: '13:00', avg: 162, p95: 350, error: 0.4 },
  { time: '14:00', avg: 148, p95: 290, error: 0.2 },
  { time: '15:00', avg: 152, p95: 300, error: 0.1 },
];

const nodes = [
  { id: 'node-us-east-1a', region: 'US-East-1', cpu: 74, mem: 82, disk: 45, status: 'Active' },
  { id: 'node-us-east-1b', region: 'US-East-1', cpu: 89, mem: 91, disk: 48, status: 'Critical' },
  { id: 'node-eu-west-1a', region: 'EU-West-1', cpu: 42, mem: 56, disk: 32, status: 'Active' },
  { id: 'node-eu-west-1b', region: 'EU-West-1', cpu: 51, mem: 58, disk: 34, status: 'Active' },
];

const alerts = [
  { id: 1, type: 'High CPU Usage', severity: 'High', service: 'Inference-Node-02', time: '4m ago' },
  { id: 2, type: 'Service Restart', severity: 'Medium', service: 'Auth-API', time: '12m ago' },
  { id: 3, type: 'API Spike', severity: 'Medium', service: 'Gateway-Main', time: '18m ago' },
  { id: 4, type: 'Timeout Error', severity: 'High', service: 'Feature-Store-Sync', time: '24m ago' },
];

// --- Subcomponents ---

const Badge = ({ status }) => {
  const styles = {
    Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Degraded: 'bg-amber-50 text-amber-700 border-amber-100',
    Warning: 'bg-amber-50 text-amber-700 border-amber-100',
    Medium: 'bg-amber-50 text-amber-700 border-amber-100',
    Down: 'bg-rose-50 text-rose-700 border-rose-100',
    Critical: 'bg-rose-50 text-rose-700 border-rose-100',
    High: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
      {status.toUpperCase()}
    </span>
  );
};

const StatusBlock = ({ name, status, uptime, latency, errors }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-slate-300">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{name}</h3>
      <Badge status={status} />
    </div>
    <div className="grid grid-cols-3 gap-2 mt-4">
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase">Uptime</p>
        <p className="text-sm font-bold text-slate-900">{uptime}</p>
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase">Latency</p>
        <p className="text-sm font-bold text-slate-900">{latency}</p>
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase">Errors</p>
        <p className={`text-sm font-bold ${parseFloat(errors) > 1 ? 'text-rose-600' : 'text-slate-900'}`}>{errors}</p>
      </div>
    </div>
  </div>
);

// --- Main Application Component ---

export default function SystemHealth() {
  const [env, setEnv] = useState('Prod');

  return (
    <div className="bg-slate-50 p-6 space-y-6 min-h-screen font-sans text-slate-900">
      
      {/* SECTION 1: Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Health Monitoring</h1>
          <p className="text-slate-500 text-sm font-medium italic">Infrastructure stability and runtime performance tracking.</p>
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
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Auto-Refresh: ON</span>
          </div>
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none">
            <option>Last 1 Hour</option>
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
          </select>
        </div>
      </div>

      {/* SECTION 2: Infrastructure Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statusBlocks.map((block, i) => (
          <StatusBlock key={i} {...block} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 3: API Latency Trend Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Activity size={20} className="text-slate-400" />
              Runtime Latency & Reliability
            </h2>
            <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" /> Avg</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-purple-500 rounded-sm" /> p95</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-rose-500 rounded-sm" /> Error Rate</span>
            </div>
          </div>
          <div className="h-[300px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                <Line type="monotone" dataKey="p95" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7', strokeWidth: 2, stroke: '#fff' }} />
                <Line type="monotone" dataKey="error" stroke="#f43f5e" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 7: SLA Compliance Panel */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck size={20} className="text-slate-400" />
              SLA Compliance
            </h2>
            <p className="text-sm text-slate-500">Service Level Agreement tracking</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="364.4" strokeDashoffset="0.8" className="text-emerald-500" strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-bold text-slate-900 block">99.98%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Target SLA: 99.9%</span>
                <span className="text-emerald-600">+0.08% Margin</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.98%' }} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Breaches (7d)</p>
                  <p className="text-lg font-bold">0</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Downtime</p>
                  <p className="text-lg font-bold">12m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 4: Node Health Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Server size={20} className="text-slate-400" />
              Compute Node Inventory
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Node ID</th>
                  <th className="px-6 py-4">Region</th>
                  <th className="px-6 py-4">CPU Usage</th>
                  <th className="px-6 py-4">Memory</th>
                  <th className="px-6 py-4">Disk</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {nodes.map((node, idx) => (
                  <tr key={idx} className={`hover:bg-slate-50 transition-colors ${node.cpu > 80 || node.mem > 85 ? 'bg-rose-50/30' : ''}`}>
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                      <Box size={14} className="text-slate-400" />
                      {node.id}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{node.region}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold ${node.cpu > 80 ? 'text-rose-600' : 'text-slate-700'}`}>{node.cpu}%</span>
                        <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${node.cpu > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${node.cpu}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">{node.mem}%</td>
                    <td className="px-6 py-4 font-mono text-slate-600">{node.disk}%</td>
                    <td className="px-6 py-4 text-right">
                      <Badge status={node.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 6: Alerts Snapshot */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Zap size={20} className="text-slate-400" />
              Health Alerts
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge status={alert.severity} />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{alert.service}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{alert.type}</p>
                  <span className="text-[10px] text-slate-400 font-medium">Triggered: {alert.time}</span>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <button className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
              View Audit Log
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 5: Service Dependency Map (Simplified) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold mb-8 flex items-center gap-2">
          <Globe size={20} className="text-slate-400" />
          Service Dependency Topology
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-10">
          
          <div className="flex flex-col items-center gap-3">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm w-40 text-center relative">
              <div className="absolute -top-2 -right-2"><Badge status="Healthy" /></div>
              <Globe className="mx-auto text-blue-500 mb-2" size={24} />
              <p className="text-xs font-bold">API Gateway</p>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">External Traffic</p>
          </div>

          <ArrowRight className="hidden md:block text-slate-300" size={24} />

          <div className="flex flex-col items-center gap-3">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm w-40 text-center relative">
              <div className="absolute -top-2 -right-2"><Badge status="Healthy" /></div>
              <Zap className="mx-auto text-amber-500 mb-2" size={24} />
              <p className="text-xs font-bold">Model Service</p>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Compute Layer</p>
          </div>

          <ArrowRight className="hidden md:block text-slate-300" size={24} />

          <div className="flex flex-col items-center gap-3">
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm w-40 text-center relative">
              <div className="absolute -top-2 -right-2"><Badge status="Degraded" /></div>
              <Database className="mx-auto text-amber-600 mb-2" size={24} />
              <p className="text-xs font-bold">Database</p>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Persistence</p>
          </div>

          <ArrowRight className="hidden md:block text-slate-300" size={24} />

          <div className="flex flex-col items-center gap-3">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm w-40 text-center relative">
              <div className="absolute -top-2 -right-2"><Badge status="Healthy" /></div>
              <HardDrive className="mx-auto text-emerald-500 mb-2" size={24} />
              <p className="text-xs font-bold">Object Storage</p>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Model Assets</p>
          </div>

        </div>
      </div>

    </div>
  );
}