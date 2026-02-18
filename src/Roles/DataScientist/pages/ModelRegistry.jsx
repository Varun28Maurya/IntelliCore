import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  MoreVertical, 
  Database, 
  Layers, 
  Server, 
  History, 
  RefreshCcw, 
  ArrowUpCircle, 
  Archive, 
  Undo2,
  CheckCircle2,
  Clock,
  User,
  Activity,
  Filter
} from 'lucide-react';

// --- Mock Data ---

const models = [
  { 
    id: 1, 
    name: 'CreditRisk', 
    version: 'v3.2', 
    stage: 'Production', 
    status: 'Active', 
    owner: 'A. Sharma', 
    accuracy: '94.2%', 
    drift: 'Healthy', 
    updated: '2026-02-18',
    versions: [
      { v: 'v3.2', acc: '94.2%', date: '2026-02-18', data: 'dset_v12', notes: 'Final XGBoost tuning' },
      { v: 'v3.1', acc: '93.8%', date: '2026-01-10', data: 'dset_v11', notes: 'Baseline production' }
    ]
  },
  { 
    id: 2, 
    name: 'LoanApproval', 
    version: 'v2.1', 
    stage: 'Staging', 
    status: 'Testing', 
    owner: 'M. Patel', 
    accuracy: '91.8%', 
    drift: 'Warning', 
    updated: '2026-02-15',
    versions: [
      { v: 'v2.1', acc: '91.8%', date: '2026-02-15', data: 'dset_loan_v4', notes: 'Experimental features' }
    ]
  },
  { 
    id: 3, 
    name: 'FraudDet', 
    version: 'v1.4', 
    stage: 'Production', 
    status: 'Active', 
    owner: 'K. Tanaka', 
    accuracy: '98.1%', 
    drift: 'Healthy', 
    updated: '2026-02-10',
    versions: [
      { v: 'v1.4', acc: '98.1%', date: '2026-02-10', data: 'fraud_base_v2', notes: 'Hotfix for false positives' }
    ]
  },
  { 
    id: 4, 
    name: 'ChurnPred', 
    version: 'v1.0', 
    stage: 'Development', 
    status: 'Draft', 
    owner: 'J. Doe', 
    accuracy: '88.5%', 
    drift: 'Healthy', 
    updated: '2026-02-17',
    versions: [
      { v: 'v1.0', acc: '88.5%', date: '2026-02-17', data: 'churn_v1', notes: 'Initial development' }
    ]
  },
  { 
    id: 5, 
    name: 'MarketingMix', 
    version: 'v2.0', 
    stage: 'Archived', 
    status: 'Idle', 
    owner: 'S. Lee', 
    accuracy: '82.4%', 
    drift: 'Critical Drift', 
    updated: '2025-11-20',
    versions: [
      { v: 'v2.0', acc: '82.4%', date: '2025-11-20', data: 'mkt_legacy', notes: 'Deprecated due to data drift' }
    ]
  }
];

const activityTimeline = [
  { id: 1, type: 'deploy', msg: 'Model CreditRisk_v3.2 promoted to Production', time: '2 hours ago' },
  { id: 2, type: 'retrain', msg: 'Retraining triggered for LoanApproval (Drift Detected)', time: '5 hours ago' },
  { id: 3, type: 'rollback', msg: 'Version v1.3 rolled back for FraudDet', time: '1 day ago' },
  { id: 4, type: 'drift', msg: 'Critical drift retraining executed on MarketingMix', time: '2 days ago' },
];

// --- Subcomponents ---

const KPICard = ({ label, value, subtitle, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
    <div>
      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</span>
      <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <span className="text-[10px] text-slate-400 font-medium uppercase">{subtitle}</span>
      <div className={`w-2 h-2 rounded-full ${colorClass}`} />
    </div>
  </div>
);

const StageBadge = ({ stage }) => {
  const styles = {
    Production: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Staging: 'bg-blue-50 text-blue-700 border-blue-100',
    Development: 'bg-slate-100 text-slate-700 border-slate-200',
    Archived: 'bg-slate-100 text-slate-400 border-slate-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${styles[stage] || styles.Development}`}>
      {stage.toUpperCase()}
    </span>
  );
};

const DriftBadge = ({ status }) => {
  const styles = {
    Healthy: 'text-emerald-600 bg-emerald-50',
    Warning: 'text-amber-600 bg-amber-50',
    'Critical Drift': 'text-rose-600 bg-rose-50',
  };
  return (
    <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${styles[status]}`}>
      <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'Healthy' ? 'bg-emerald-500' : status === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'}`} />
      {status}
    </div>
  );
};

// --- Main Component ---

export default function ModelRegistry() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModels = models.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Enterprise Model Registry</h1>
            <p className="text-slate-500 text-sm font-medium">Global ML Asset Repository • {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">Export Inventory</button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-slate-800 transition-all">Register New Model</button>
          </div>
        </div>

        {/* SECTION 1: Registry Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard label="Total Models" value="26" subtitle="Registered assets" colorClass="bg-slate-300" />
          <KPICard label="Production" value="18" subtitle="Live deployments" colorClass="bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <KPICard label="Staging" value="5" subtitle="Pending validation" colorClass="bg-blue-500" />
          <KPICard label="Archived" value="3" subtitle="Legacy models" colorClass="bg-slate-400" />
        </div>

        {/* SECTION 2: Model Search & Filters */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by model name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none">
              <option>Lifecycle Stage</option>
              <option>Production</option>
              <option>Staging</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none">
              <option>Owner</option>
              <option>A. Sharma</option>
              <option>M. Patel</option>
            </select>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Layout Grid: Table (Left) and Panels (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* SECTION 3: Model Registry Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold">Model Inventory</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">Model Name</th>
                      <th className="px-6 py-4">Lifecycle</th>
                      <th className="px-6 py-4">Owner</th>
                      <th className="px-6 py-4">Accuracy</th>
                      <th className="px-6 py-4">Drift</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredModels.map((model) => (
                      <tr 
                        key={model.id} 
                        onClick={() => setSelectedModel(model)}
                        className={`hover:bg-slate-50 transition-all cursor-pointer group ${selectedModel.id === model.id ? 'bg-slate-50' : ''}`}
                      >
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{model.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{model.version} • {model.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5"><StageBadge stage={model.stage} /></td>
                        <td className="px-6 py-5">
                          <div className="flex items-center text-slate-600 font-medium">
                            <User size={14} className="mr-1.5 text-slate-400" />
                            {model.owner}
                          </div>
                        </td>
                        <td className="px-6 py-5 font-mono font-bold text-slate-700">{model.accuracy}</td>
                        <td className="px-6 py-5"><DriftBadge status={model.drift} /></td>
                        <td className="px-6 py-5 text-right">
                          <button className="text-slate-300 hover:text-slate-900"><MoreVertical size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Panels */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* SECTION 4: Version History Panel */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-md font-bold text-slate-900 flex items-center">
                  <History size={18} className="mr-2 text-slate-400" />
                  Version History: {selectedModel.name}
                </h3>
              </div>
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                {selectedModel.versions.map((ver, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center z-10">
                      <div className="w-2 h-2 bg-slate-400 rounded-full" />
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-slate-900">{ver.v}</span>
                      <span className="text-[10px] font-bold text-slate-400">{ver.date}</span>
                    </div>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Accuracy:</span>
                        <span className="font-bold text-slate-700">{ver.acc}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Dataset:</span>
                        <span className="font-mono text-slate-600">{ver.data}</span>
                      </div>
                      <p className="text-slate-400 mt-2 italic">"{ver.notes}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: Deployment Activity Timeline */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-md font-bold text-slate-900 mb-6 flex items-center">
                <Activity size={18} className="mr-2 text-slate-400" />
                Deployment Activity
              </h3>
              <div className="space-y-4">
                {activityTimeline.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 group">
                    <div className={`mt-1 p-1.5 rounded-lg ${
                      item.type === 'deploy' ? 'bg-emerald-50 text-emerald-600' :
                      item.type === 'rollback' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {item.type === 'deploy' && <ArrowUpCircle size={14} />}
                      {item.type === 'rollback' && <Undo2 size={14} />}
                      {item.type === 'retrain' && <RefreshCcw size={14} />}
                      {item.type === 'drift' && <Activity size={14} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{item.msg}</p>
                      <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 6: Model Actions Panel */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-md font-bold text-slate-900 mb-4 uppercase tracking-tighter text-xs text-slate-400">Model Actions</h3>
              <div className="grid grid-cols-1 gap-2">
                <button className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="flex items-center">
                    <ArrowUpCircle className="text-emerald-500 mr-3" size={18} />
                    <span className="text-sm font-bold text-slate-700">Promote to Production</span>
                  </div>
                  <ChevronDown className="-rotate-90 text-slate-300 group-hover:text-slate-900" size={14} />
                </button>
                <button className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="flex items-center">
                    <RefreshCcw className="text-blue-500 mr-3" size={18} />
                    <span className="text-sm font-bold text-slate-700">Trigger Retraining</span>
                  </div>
                  <ChevronDown className="-rotate-90 text-slate-300 group-hover:text-slate-900" size={14} />
                </button>
                <button className="flex items-center justify-between w-full p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="flex items-center">
                    <Undo2 className="text-amber-500 mr-3" size={18} />
                    <span className="text-sm font-bold text-slate-700">Rollback Version</span>
                  </div>
                  <ChevronDown className="-rotate-90 text-slate-300 group-hover:text-slate-900" size={14} />
                </button>
                <button className="flex items-center justify-between w-full p-3 border border-rose-100 rounded-xl hover:bg-rose-50 transition-all group">
                  <div className="flex items-center">
                    <Archive className="text-rose-400 mr-3" size={18} />
                    <span className="text-sm font-bold text-rose-700">Archive Model</span>
                  </div>
                  <ChevronDown className="-rotate-90 text-rose-300 group-hover:text-rose-900" size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}