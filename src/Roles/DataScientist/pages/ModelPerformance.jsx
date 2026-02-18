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
  Area,
  Legend,
  ComposedChart
} from 'recharts';
import { 
  ChevronDown, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Info,
  ArrowRight,
  Target,
  BarChart2,
  Activity,
  Calendar
} from 'lucide-react';

// --- Mock Data ---

const trendData = [
  { date: '2023-10-01', accuracy: 93.2, precision: 91.5, recall: 90.1 },
  { date: '2023-10-05', accuracy: 93.8, precision: 92.0, recall: 90.5 },
  { date: '2023-10-10', accuracy: 94.1, precision: 92.4, recall: 91.2 },
  { date: '2023-10-15', accuracy: 93.9, precision: 92.1, recall: 90.8 },
  { date: '2023-10-20', accuracy: 94.5, precision: 92.8, recall: 91.5 },
  { date: '2023-10-25', accuracy: 94.2, precision: 92.6, recall: 91.4 },
];

const thresholdData = [
  { threshold: 0.1, precision: 50, recall: 99 },
  { threshold: 0.2, precision: 62, recall: 95 },
  { threshold: 0.3, precision: 75, recall: 92 },
  { threshold: 0.4, precision: 82, recall: 88 },
  { threshold: 0.5, precision: 88, recall: 82 },
  { threshold: 0.6, precision: 92, recall: 75 },
  { threshold: 0.7, precision: 95, recall: 60 },
  { threshold: 0.8, precision: 98, recall: 45 },
  { threshold: 0.9, precision: 99, recall: 20 },
];

const comparisonData = [
  { model: 'CreditRisk_v3', version: 'v3.2.1', accuracy: '94.2%', precision: '92.8%', recall: '91.5%', f1: '92.1%', updated: '2h ago', status: 'Optimal' },
  { model: 'CreditRisk_v3', version: 'v3.2.0', accuracy: '93.8%', precision: '92.1%', recall: '90.4%', f1: '91.2%', updated: '5d ago', status: 'Deprecated' },
  { model: 'FraudDet_v1.2', version: 'v1.2.4', accuracy: '91.5%', precision: '88.2%', recall: '85.5%', f1: '86.8%', updated: '1d ago', status: 'Warning' },
  { model: 'LoanApp_v2', version: 'v2.1.0', accuracy: '95.1%', precision: '94.5%', recall: '93.2%', f1: '93.8%', updated: '12h ago', status: 'Optimal' },
];

// --- Subcomponents ---

const KPIBox = ({ label, value, delta, status, isPositive }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
        status === 'Optimal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
      }`}>
        {status}
      </span>
    </div>
    <div className="flex items-baseline space-x-2">
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <span className={`text-xs font-medium flex items-center ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isPositive ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
        {delta}
      </span>
    </div>
    <p className="text-slate-400 text-[10px] mt-1">vs. previous period</p>
  </div>
);

const SectionCard = ({ title, subtitle, children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 ${className}`}>
    <div className="mb-6">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
    {children}
  </div>
);

// --- Main Component ---

export default function ModelPerformance() {
  const [selectedModel, setSelectedModel] = useState('CreditRisk_v3');

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* SECTION 1: Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-900 text-white rounded-xl">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Model Performance Deep-Dive</h1>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-tight">Technical Analysis & Evaluation</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select 
                className="appearance-none bg-slate-50 border border-slate-200 text-sm rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200 font-medium"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option>CreditRisk_v3</option>
                <option>FraudDet_v1.2</option>
                <option>LoanApp_v2</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-slate-400" size={16} />
            </div>

            <div className="relative">
              <select className="appearance-none bg-slate-50 border border-slate-200 text-sm rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200 font-medium">
                <option>Version v3.2.1 (Latest)</option>
                <option>Version v3.2.0</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-slate-400" size={16} />
            </div>

            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
              {['24h', '7d', '30d'].map((period) => (
                <button key={period} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${period === '7d' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: Core Performance KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <KPIBox label="Accuracy" value="94.2%" delta="+0.4%" status="Optimal" isPositive={true} />
          <KPIBox label="Precision" value="92.8%" delta="+1.2%" status="Optimal" isPositive={true} />
          <KPIBox label="Recall" value="91.5%" delta="-0.2%" status="Optimal" isPositive={false} />
          <KPIBox label="F1 Score" value="92.1%" delta="+0.5%" status="Optimal" isPositive={true} />
          <KPIBox label="ROC-AUC" value="0.96" delta="+0.01" status="Optimal" isPositive={true} />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* SECTION 3: Performance Trend Chart */}
          <SectionCard 
            title="Performance Stability" 
            subtitle="7-day accuracy, precision, and recall tracking"
            className="lg:col-span-2"
          >
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    tickFormatter={(val) => val.split('-').slice(1).join('/')}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[88, 96]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '12px', paddingBottom: '20px' }} />
                  <Line name="Accuracy" type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                  <Line name="Precision" type="monotone" dataKey="precision" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                  <Line name="Recall" type="monotone" dataKey="recall" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          {/* SECTION 4: Confusion Matrix */}
          <SectionCard 
            title="Confusion Matrix" 
            subtitle="Validation set: n=2,450"
          >
            <div className="mt-2 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                <div></div>
                <div>Predicted Pos</div>
                <div>Predicted Neg</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Actual Pos</div>
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                  <span className="block text-xl font-bold text-emerald-700">842</span>
                  <span className="text-[10px] text-emerald-600 font-medium">True Pos</span>
                </div>
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl text-center">
                  <span className="block text-xl font-bold text-rose-700">76</span>
                  <span className="text-[10px] text-rose-600 font-medium">False Neg</span>
                </div>

                <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Actual Neg</div>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-center">
                  <span className="block text-xl font-bold text-amber-700">58</span>
                  <span className="text-[10px] text-amber-600 font-medium">False Pos</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                  <span className="block text-xl font-bold text-slate-700">1024</span>
                  <span className="text-[10px] text-slate-600 font-medium">True Neg</span>
                </div>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">FPR</p>
                  <p className="text-lg font-bold text-slate-700">5.3%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">FNR</p>
                  <p className="text-lg font-bold text-slate-700">8.2%</p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* SECTION 5: Threshold Analysis */}
          <SectionCard 
            title="Threshold Optimization" 
            subtitle="Precision-Recall tradeoff curve"
            className="lg:col-span-1"
          >
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={thresholdData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPre" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="threshold" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="precision" stroke="#10b981" fillOpacity={1} fill="url(#colorPre)" strokeWidth={2} />
                  <Area type="monotone" dataKey="recall" stroke="#6366f1" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-slate-900 rounded-xl text-white flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">Optimal Threshold</p>
                <p className="text-lg font-bold">0.45</p>
              </div>
              <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                Apply Threshold
              </button>
            </div>
          </SectionCard>

          {/* SECTION 6: Performance Comparison Table */}
          <SectionCard 
            title="Model Version Comparison" 
            subtitle="Historical performance metrics across iterations"
            className="lg:col-span-2"
          >
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="pb-3 px-2">Model/Version</th>
                    <th className="pb-3 px-2">Accuracy</th>
                    <th className="pb-3 px-2">Precision</th>
                    <th className="pb-3 px-2">Recall</th>
                    <th className="pb-3 px-2">F1 Score</th>
                    <th className="pb-3 px-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 px-2">
                        <div className="font-bold text-slate-900">{row.model}</div>
                        <div className="text-[10px] text-slate-400 font-medium flex items-center">
                          <Calendar size={10} className="mr-1" /> Updated {row.updated}
                        </div>
                      </td>
                      <td className="py-4 px-2 font-mono font-medium">{row.accuracy}</td>
                      <td className="py-4 px-2 font-mono font-medium">{row.precision}</td>
                      <td className="py-4 px-2 font-mono font-medium">{row.recall}</td>
                      <td className="py-4 px-2 font-mono font-medium">{row.f1}</td>
                      <td className="py-4 px-2 text-right">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                          row.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : 
                          row.status === 'Warning' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}