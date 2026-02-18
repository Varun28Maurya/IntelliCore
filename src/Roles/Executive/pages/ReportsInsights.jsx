import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2, 
  Calendar,
  ExternalLink,
  ChevronRight,
  Zap,
  Users,
  Search,
  Filter,
  MoreVertical,
  ArrowRight,
  FileSpreadsheet,
  Plus
} from 'lucide-react';

/**
 * ReportsInsights Component - Upgraded Version
 * Professional MLOps / AI Executive Reporting View.
 */

// --- Mock Data ---
const reportLibrary = [
  { id: 1, name: 'Q1 AI Governance Report', category: 'Governance', author: 'L. Chen', size: '2.4 MB', date: 'Mar 12, 2024', status: 'Approved', statusType: 'emerald' },
  { id: 2, name: 'AI Cost & ROI Summary', category: 'Financial', author: 'S. Jenkins', size: '1.8 MB', date: 'Mar 10, 2024', status: 'Approved', statusType: 'emerald' },
  { id: 3, name: 'Model Risk Assessment', category: 'Risk', author: 'D. Varma', size: '4.1 MB', date: 'Mar 08, 2024', status: 'Pending Review', statusType: 'amber' },
  { id: 4, name: 'LLM Safety Audit', category: 'Safety', author: 'M. Ross', size: '0.9 MB', date: 'Feb 28, 2024', status: 'Draft', statusType: 'slate' },
];

const strategicInsights = [
  { 
    id: 1, 
    type: 'Efficiency',
    title: 'LLM adoption driving retail banking automation', 
    desc: 'Customer support response times reduced by 18% following the Q1 LLM cluster expansion.', 
    color: 'border-blue-500',
    icon: <Zap size={16} className="text-blue-500" />
  },
  { 
    id: 2, 
    type: 'Stability',
    title: 'ML models stabilized after drift recalibration', 
    desc: 'Predictive accuracy for credit risk models returned to 98.4% after February’s retraining cycle.', 
    color: 'border-emerald-500',
    icon: <ShieldCheck size={16} className="text-emerald-500" />
  },
  { 
    id: 3, 
    type: 'Economy',
    title: 'Cost growth aligns with projected usage', 
    desc: 'Financial velocity remains 2.4% below the 2024 growth cap despite increased model count.', 
    color: 'border-slate-400',
    icon: <TrendingUp size={16} className="text-slate-500" />
  },
];

const upcomingReviews = [
  { id: 1, event: 'Next Governance Review', date: 'March 28, 2024', type: 'Policy', priority: 'High' },
  { id: 2, event: 'Quarterly Board Presentation', date: 'April 05, 2024', type: 'Strategy', priority: 'Medium' },
  { id: 3, event: 'Compliance Audit Submission', date: 'April 12, 2024', type: 'Regulatory', priority: 'High' },
];

// --- Sub-components ---

const ImpactCard = ({ title, value, icon: Icon, colorClass, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all group overflow-hidden relative">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg bg-slate-50 ${colorClass} group-hover:scale-110 transition-transform`}>
        <Icon size={18} />
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend > 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {Math.abs(trend)}%
        </span>
      </div>
    </div>
    <div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1">{value}</div>
    </div>
    {/* Abstract Sparkline Decoration */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-50">
      <div className={`h-full opacity-30 ${trend > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: '65%' }}></div>
    </div>
  </div>
);

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      
      {/* 1. Enhanced Header with Search/Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Intelligence & Reporting</h1>
          <p className="text-slate-500 text-sm">Strategic performance summaries for Executive Oversight.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-all">
            <Filter size={18} />
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-800 transition-all">
            <Plus size={16} />
            Create
          </button>
        </div>
      </div>

      {/* 2. Executive Hero Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="flex-1 p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Priority Briefing • Q1 2024</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Quarterly AI Performance Summary</h2>
            <p className="text-slate-600 leading-relaxed max-w-2xl mb-8">
              The organization has successfully scaled AI capabilities while maintaining rigorous governance standards. 
              Inference volumes have surpassed initial projections, yet operational costs remain within the 5% variance threshold. 
              Our strategic shift toward localized LLM deployments is yielding significant ROI in back-office automation.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-all active:scale-95">
                <Download size={18} />
                Download Full Report
              </button>
              <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all active:scale-95">
                <FileSpreadsheet size={18} className="text-emerald-500" />
                Raw Data Export
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-72 p-8 bg-slate-50/50 flex flex-col justify-center">
            <div className="space-y-6">
              {[
                { label: 'Adoption Rate', value: '+18.2%', color: 'text-emerald-600' },
                { label: 'Governance Index', value: '94.1%', color: 'text-blue-600' },
                { label: 'Incident Volume', value: '-12.0%', color: 'text-rose-600' },
                { label: 'SLA Reliability', value: '99.3%', color: 'text-emerald-600' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</span>
                  <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Impact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ImpactCard title="Revenue Impact" value="+$4.2M" icon={TrendingUp} colorClass="text-emerald-600" trend={4.2} />
        <ImpactCard title="Ops Efficiency" value="22.4%" icon={Zap} colorClass="text-blue-600" trend={1.8} />
        <ImpactCard title="Risk Mitigation" value="-15.0%" icon={ShieldCheck} colorClass="text-rose-600" trend={-2.4} />
        <ImpactCard title="CX Saturation" value="88.1%" icon={Users} colorClass="text-amber-600" trend={12.5} />
      </div>

      {/* 4. Report Repository (Table) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Model Documentation Repository</h3>
            <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tight">Active Models & Governance Papers</p>
          </div>
          <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700 px-3 py-1.5 bg-blue-50 rounded-lg transition-colors">
            Browse All <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Filename</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Metadata</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Owner</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportLibrary.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all border border-transparent group-hover:border-slate-200 shadow-sm">
                        <FileText size={20} />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-800 block">{report.name}</span>
                        <span className="text-[10px] font-medium text-slate-400">{report.category} • Updated {report.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-semibold text-slate-500">{report.size}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 border border-white shadow-sm flex items-center justify-center text-[8px] font-black text-slate-500">
                        {report.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{report.author}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      report.statusType === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                      report.statusType === 'amber' ? 'bg-amber-50 text-amber-600' : 
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 shadow-sm">
                        <Download size={14} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 shadow-sm">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Strategic Intelligence & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Strategic Intelligence Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategic Intelligence</h3>
            <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 uppercase tracking-widest">Auto-Generated <Clock size={10} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategicInsights.map((insight) => (
              <div key={insight.id} className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 ${insight.color} flex flex-col hover:shadow-md transition-shadow group`}>
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2">
                      {insight.icon}
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{insight.type}</span>
                   </div>
                   <ArrowRight size={14} className="text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{insight.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{insight.desc}</p>
              </div>
            ))}
            <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white transition-all">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-blue-500 group-hover:border-blue-200 group-hover:shadow-sm transition-all mb-3">
                 <Plus size={20} />
              </div>
              <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600">Request Custom Insight</span>
            </div>
          </div>
        </div>

        {/* Timeline View */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Key Deadlines</h3>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="space-y-8 relative">
              {/* Central vertical line */}
              <div className="absolute left-1 top-0 bottom-0 w-[1px] bg-slate-100" />
              
              {upcomingReviews.map((item, idx) => (
                <div key={item.id} className="relative pl-8 group">
                  {/* Marker */}
                  <div className={`absolute left-0 top-1 w-2 h-2 rounded-full border-2 border-white ring-4 transition-all ${item.priority === 'High' ? 'bg-rose-500 ring-rose-50' : 'bg-blue-500 ring-blue-50'}`} />
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.event}</p>
                      <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${item.priority === 'High' ? 'text-rose-600 bg-rose-50' : 'text-blue-600 bg-blue-50'}`}>
                        {item.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">
                      <Calendar size={10} />
                      {item.date}
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      {item.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-[10px] font-semibold leading-tight text-slate-500">
                  Data verified by Governance Engine <br/>
                  <span className="text-slate-400 font-medium">Last sync 12m ago</span>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

// Internal icon for the sparkline trend
const ArrowDownRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m7 7 10 10" />
    <path d="M17 7v10H7" />
  </svg>
);

export default App;