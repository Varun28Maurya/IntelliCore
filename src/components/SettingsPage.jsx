import React, { useState } from 'react';
import { 
  Sun, Moon, Layout, RefreshCw, Bell, 
  ShieldAlert, Database, Download, Trash2, 
  Gauge, Activity, CreditCard, ChevronRight
} from 'lucide-react';

const Settings = () => {
  // Local state for interactive UI
  const [theme, setTheme] = useState('light');
  const [density, setDensity] = useState('comfortable');
  const [sensitivity, setSensitivity] = useState('medium');

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">SYSTEM CONFIGURATION</h1>
          <p className="text-slate-500 font-medium mt-1">SENTINEL / Enterprise Governance Portal / v1.0.4</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
            Restore Defaults
          </button>
          <button className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            Apply Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1️⃣ APPEARANCE: Visual Environment */}
        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
            <Layout size={22} className="text-blue-600" /> Appearance & View
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600 italic">Theme Mode</span>
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button onClick={() => setTheme('light')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${theme === 'light' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>
                  <Sun size={14} /> LIGHT
                </button>
                <button onClick={() => setTheme('dark')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${theme === 'dark' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400'}`}>
                  <Moon size={14} /> DARK
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600 italic">Layout Density</span>
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                {['comfortable', 'compact'].map((d) => (
                  <button key={d} onClick={() => setDensity(d)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${density === d ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auto Refresh</label>
                <select className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none cursor-pointer">
                  <option>30 SEC</option>
                  <option>1 MIN</option>
                  <option>5 MIN</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Default Landing</label>
                <select className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none cursor-pointer">
                  <option>OVERVIEW</option>
                  <option>REPORTS</option>
                  <option>LAST VISITED</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* 2️⃣ NOTIFICATIONS: Alerting Channels */}
        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
            <Bell size={22} className="text-blue-600" /> Notifications
          </h3>
          
          <div className="space-y-3">
            {[
              { label: 'In-App Notifications', desc: 'Real-time dashboard alerts' },
              { label: 'Email Alerts', desc: 'Critical system event emails' },
              { label: 'Weekly Summary', desc: 'Consolidated performance reports' },
              { label: 'Critical Mode Only', desc: 'Silence low-priority events' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-blue-100 transition-all cursor-pointer">
                <div>
                  <p className="text-sm font-black text-slate-800 tracking-tight">{item.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative p-1 transition-colors ${idx === 3 ? 'bg-slate-300' : 'bg-blue-600'}`}>
                   <div className={`w-3 h-3 bg-white rounded-full transition-all ${idx === 3 ? 'ml-0' : 'ml-auto'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3️⃣ ALERT SENSITIVITY: Risk Thresholds */}
        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
            <ShieldAlert size={22} className="text-blue-600" /> Sensitivity Controls
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Risk Alert Sensitivity</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1 rounded-2xl">
                {['low', 'medium', 'high'].map((level) => (
                  <button key={level} onClick={() => setSensitivity(level)} className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sensitivity === level ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-slate-50 rounded-2xl flex items-center gap-4 group hover:border-blue-100 transition-all cursor-pointer">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Gauge size={18} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800">Performance Alert</p>
                  <p className="text-[10px] text-emerald-600 font-black uppercase">ACTIVE</p>
                </div>
              </div>
              <div className="p-4 border-2 border-slate-50 rounded-2xl flex items-center gap-4 group hover:border-blue-100 transition-all cursor-pointer">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800">Cost Spike Alert</p>
                  <p className="text-[10px] text-emerald-600 font-black uppercase">ACTIVE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4️⃣ DATA & PRIVACY: Governance Audit */}
        <section className="bg-slate-900 p-8 rounded-3xl text-white space-y-6 shadow-2xl shadow-blue-900/30">
          <h3 className="text-lg font-black flex items-center gap-3 uppercase tracking-tighter">
            <Database size={22} className="text-blue-400" /> Data & Governance
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
              <div>
                <p className="text-sm font-black">Enable Activity Logging</p>
                <p className="text-[10px] text-slate-400 font-medium">Capture user actions for audit logs</p>
              </div>
              <div className="w-10 h-5 bg-blue-500 rounded-full relative p-1 cursor-pointer">
                 <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-between px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/10">
                <span className="text-xs font-black uppercase tracking-widest flex items-center gap-3">
                  <Download size={16} className="text-blue-400" /> Download Usage Data
                </span>
                <ChevronRight size={14} className="text-slate-600 group-hover:translate-x-1 transition-all" />
              </button>
              <button className="flex items-center justify-between px-6 py-4 bg-red-500/10 hover:bg-red-500/20 rounded-2xl transition-all group border border-red-500/20">
                <span className="text-xs font-black uppercase tracking-widest flex items-center gap-3 text-red-400">
                  <Trash2 size={16} /> Clear Preferences
                </span>
                <ChevronRight size={14} className="text-red-900 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;