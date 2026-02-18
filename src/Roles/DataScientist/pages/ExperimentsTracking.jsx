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
  Beaker, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Filter, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Zap, 
  Terminal, 
  ShieldCheck,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

// --- Mock Data ---

const kpiData = [
  { label: 'Total Experiments (30D)', value: '42', delta: '+8', isPositive: true },
  { label: 'Successful Runs', value: '31', delta: '+4', isPositive: true },
  { label: 'Failed Runs', value: '6', delta: '-2', isPositive: true },
  { label: 'Best Accuracy Achieved', value: '95.6%', delta: '+0.4%', isPositive: true },
];

const epochData = [
  { epoch: 1, runA: 65, runB: 62, runC: 68 },
  { epoch: 2, runA: 72, runB: 70, runC: 75 },
  { epoch: 3, runA: 78, runB: 76, runC: 81 },
  { epoch: 4, runA: 82, runB: 80, runC: 84 },
  { epoch: 5, runA: 85, runB: 84, runC: 88 },
  { epoch: 6, runA: 88, runB: 87, runC: 91 },
  { epoch: 7, runA: 91, runB: 89, runC: 93 },
  { epoch: 8, runA: 93, runB: 92, runC: 94 },
  { epoch: 9, runA: 94, runB: 94, runC: 95 },
  { epoch: 10, runA: 95, runB: 94, runC: 96 },
];

const experimentsTable = [
  { id: 'exp-942', model: 'CreditRisk', version: 'v3.2.1', acc: '95.6%', pre: '94.8%', rec: '92.1%', f1: '93.4%', params: 'LR: 0.001, B: 64', status: 'Completed', time: '1h 24m', date: '2026-02-18 14:20', best: true },
  { id: 'exp-941', model: 'CreditRisk', version: 'v3.2.0', acc: '94.2%', pre: '92.5%', rec: '91.8%', f1: '92.1%', params: 'LR: 0.005, B: 32', status: 'Completed', time: '1h 10m', date: '2026-02-18 11:05', best: false },
  { id: 'exp-940', model: 'FraudDet', version: 'v1.4.2', acc: '98.1%', pre: '97.2%', rec: '96.5%', f1: '96.8%', params: 'LR: 0.001, B: 128', status: 'Running', time: '45m', date: '2026-02-18 15:45', best: false },
  { id: 'exp-939', model: 'LoanApp', version: 'v2.1.0', acc: '82.4%', pre: '78.5%', rec: '74.2%', f1: '76.3%', params: 'LR: 0.01, B: 64', status: 'Failed', time: '12m', date: '2026-02-17 09:30', best: false },
];

const hyperparams = {
  runA: { name: 'exp-942', lr: '0.001', batch: '64', opt: 'AdamW', reg: 'L2 (0.01)', epochs: '100' },
  runB: { name: 'exp-941', lr: '0.005', batch: '32', opt: 'SGD', reg: 'None', epochs: '50' }
};

// --- Subcomponents ---

const KPIBox = ({ label, value, delta, isPositive }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
    <div className="flex items-baseline space-x-2 mt-2">
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {delta}
      </span>
    </div>
    <p className="text-slate-400 text-[10px] mt-1 font-medium">vs. previous period</p>
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

export default function ExperimentsTracking() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-900 text-white rounded-xl">
              <Beaker size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Experiment Tracking</h1>
              <p className="text-slate-500 text-sm font-medium">Training logs & Hyperparameter optimization</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">Compare Runs</button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">New Experiment</button>
          </div>
        </div>

        {/* SECTION 1: KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {kpiData.map((kpi, i) => (
            <KPIBox key={i} {...kpi} />
          ))}
        </div>

        {/* SECTION 2: Filter Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Experiment ID..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="relative">
              <select className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:outline-none">
                <option>All Models</option>
                <option>CreditRisk</option>
                <option>FraudDet</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-slate-400" size={16} />
            </div>
            <div className="relative">
              <select className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:outline-none">
                <option>Status: All</option>
                <option>Completed</option>
                <option>Running</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-slate-400" size={16} />
            </div>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* SECTION 3: Experiment Comparison Chart */}
        <SectionCard title="Learning Curves" subtitle="Validation accuracy across multiple training epochs">
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={epochData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="epoch" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                  label={{ value: 'Epochs', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#94a3b8' }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[60, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '11px', paddingBottom: '20px' }} />
                <Line name="exp-942 (Best)" type="monotone" dataKey="runC" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line name="exp-941" type="monotone" dataKey="runA" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#fff' }} />
                <Line name="exp-940" type="monotone" dataKey="runB" stroke="#6366f1" strokeWidth={2} dot={{ r: 3, fill: '#fff' }} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* SECTION 4: Experiment Results Table */}
        <SectionCard title="Training Run Registry" subtitle="Detailed performance and configuration summary">
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-4 py-4">Run ID</th>
                  <th className="px-4 py-4">Model / Ver</th>
                  <th className="px-4 py-4">Accuracy</th>
                  <th className="px-4 py-4">F1 Score</th>
                  <th className="px-4 py-4">Hyperparams</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {experimentsTable.map((run, idx) => (
                  <tr key={idx} className={`hover:bg-slate-50 transition-all ${run.best ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-4 py-5">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{run.id}</span>
                        {run.best && <Zap size={14} className="text-amber-500 fill-amber-500" />}
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">{run.model}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{run.version}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 font-mono font-bold text-slate-900">{run.acc}</td>
                    <td className="px-4 py-5 font-mono text-slate-600">{run.f1}</td>
                    <td className="px-4 py-5 text-[10px] text-slate-500 font-mono italic max-w-[150px] truncate">{run.params}</td>
                    <td className="px-4 py-5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        run.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        run.status === 'Running' ? 'bg-blue-50 text-blue-700 animate-pulse' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {run.status}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-right text-slate-400 text-[10px] font-medium uppercase leading-tight">
                      {run.date} <br/> <span className="text-slate-300">({run.time})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Layout for Comparison & Promotion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* SECTION 5: Hyperparameter Comparison Panel */}
          <SectionCard title="Comparison: Hyperparameters" subtitle="Differential analysis between selected candidates">
            <div className="mt-4 grid grid-cols-3 gap-0 border border-slate-100 rounded-xl overflow-hidden">
              <div className="bg-slate-50 p-4 font-bold text-[10px] uppercase text-slate-400 space-y-6">
                <div className="h-4">Run ID</div>
                <div>Learning Rate</div>
                <div>Batch Size</div>
                <div>Optimizer</div>
                <div>Regularization</div>
                <div>Epochs</div>
              </div>
              <div className="p-4 space-y-6 text-sm">
                <div className="font-bold text-blue-600">{hyperparams.runA.name}</div>
                <div className="font-mono text-slate-600">{hyperparams.runA.lr}</div>
                <div className="font-mono text-slate-600">{hyperparams.runA.batch}</div>
                <div className="font-medium text-slate-700">{hyperparams.runA.opt}</div>
                <div className="text-slate-500">{hyperparams.runA.reg}</div>
                <div className="text-slate-500">{hyperparams.runA.epochs}</div>
              </div>
              <div className="p-4 space-y-6 text-sm border-l border-slate-50">
                <div className="font-bold text-slate-400">{hyperparams.runB.name}</div>
                <div className="font-mono text-slate-400">{hyperparams.runB.lr}</div>
                <div className="font-mono text-slate-400">{hyperparams.runB.batch}</div>
                <div className="font-medium text-slate-400">{hyperparams.runB.opt}</div>
                <div className="text-slate-300">{hyperparams.runB.reg}</div>
                <div className="text-slate-300">{hyperparams.runB.epochs}</div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
              <button className="text-xs font-bold text-slate-400 flex items-center hover:text-slate-900 transition-colors">
                <Filter size={14} className="mr-2" /> Adjust Selection (2 Selected)
              </button>
            </div>
          </SectionCard>

          {/* SECTION 6: Promotion Decision Panel */}
          <SectionCard title="Promotion Governance" subtitle="ML lifecycle decision for candidate models">
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold flex items-center">
                    exp-942
                    <span className="ml-3 px-2 py-0.5 bg-emerald-500 text-[10px] rounded uppercase">Best Candidate</span>
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 italic">Highest F1 and recall balance observed</p>
                </div>
                <ShieldCheck className="text-emerald-400" size={28} />
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Validation Acc</p>
                  <p className="text-2xl font-bold">95.6%</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Drift / Bias Score</p>
                  <p className="text-2xl font-bold">94 / 88</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-slate-100 transition-all">
                  Promote to Staging <ChevronRight size={18} className="ml-2" />
                </button>
                <button className="w-full py-3 bg-white/10 border border-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all">
                  Discard Run
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Recommendation Engine</p>
              <div className="p-4 border border-slate-100 rounded-xl bg-slate-50">
                <div className="flex items-start space-x-3">
                  <Terminal size={18} className="text-slate-400 mt-1" />
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated analysis suggests <span className="font-bold text-slate-900">exp-942</span> due to minimal bias variance across Age segments and superior recall on minority class 'High-Risk'.
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

        </div>

      </div>
    </div>
  );
}