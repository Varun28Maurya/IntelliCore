'use client';

import React, { useState } from 'react';
import { 
  User, Mail, Shield, Lock, Smartphone, 
  History, Monitor, Download, 
  Trash2, Camera, CheckCircle2, ChevronRight,
  ShieldCheck, Fingerprint, Save, X,
  Clock, MapPin, CreditCard, TrendingUp
} from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Alexandra Sterling",
    email: "a.sterling@prestigebank.com",
    phone: "+1 (555) 234-5678",
    accountId: "PB-US-782451",
    role: "Senior Relationship Manager",
    dept: "Private Wealth Management",
    lastLogin: "Feb 18, 2026, 2:45 PM",
    location: "New York, NY",
    joinDate: "Jan 15, 2020",
    accountBalance: "$2,450,000",
    accountStatus: "Premium"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Logic for database update would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-4 md:p-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* TOP COMMAND BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">IntelliCore <span className="text-blue-600 not-italic">PORTAL</span></h1>
            <p className="text-slate-500 text-sm mt-1 font-bold uppercase tracking-widest">Client Identity & Security Vault</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-300 transition-all active:scale-95">
                  <X size={16} /> Cancel
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                  <Save size={16} /> Authorize Changes
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="px-10 py-3 bg-white border-2 border-slate-100 text-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-blue-300 hover:bg-blue-50 transition-all active:scale-95 shadow-sm">
                Modify Profile
              </button>
            )}
          </div>
        </div>

        {/* IDENTITY MASTER CARD */}
        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden transition-all">
          <div className="h-40 bg-gradient-to-r from-slate-900 via-blue-900 to-blue-700 relative">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          <div className="px-10 pb-12">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8 -mt-16 mb-10">
              <div className="relative group">
                <div className="w-40 h-40 bg-white rounded-[2.5rem] p-1 shadow-2xl transform transition-transform group-hover:rotate-2">
                  <div className="w-full h-full bg-slate-50 rounded-[2.3rem] flex items-center justify-center text-slate-300 overflow-hidden border-2 border-slate-100">
                    <User size={80} />
                  </div>
                </div>
                <button className="absolute -bottom-2 -right-2 bg-blue-600 p-3 rounded-2xl text-white shadow-xl border-4 border-white hover:bg-blue-700 transition-all">
                  <Camera size={18} />
                </button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{formData.name}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-black border border-blue-100 uppercase tracking-widest shadow-sm">
                    <ShieldCheck size={14} /> {formData.role}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black border border-emerald-100 uppercase tracking-widest">
                    <CheckCircle2 size={14} /> {formData.accountStatus} Member
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { label: 'Legal Designation', value: formData.name, key: 'name', type: 'text' },
                { label: 'Secure Email', value: formData.email, icon: Mail, disabled: true },
                { label: 'Internal Serial', value: formData.accountId, icon: Fingerprint, disabled: true },
                { label: 'Mobile Link', value: formData.phone, key: 'phone', type: 'tel' },
                { label: 'Assigned Region', value: formData.location, icon: MapPin, disabled: true },
                { label: 'Tenure Start', value: formData.joinDate, icon: Clock, disabled: true },
              ].map((field, i) => (
                <div key={i} className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{field.label}</label>
                  {field.disabled ? (
                    <div className="flex items-center gap-4 px-5 py-4 bg-slate-50 rounded-2xl text-slate-500 font-bold border-2 border-transparent text-sm">
                      {field.icon && <field.icon size={18} className="text-slate-300" />}
                      {field.value}
                    </div>
                  ) : (
                    <input 
                      type={field.type}
                      disabled={!isEditing}
                      value={field.value}
                      onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                      className={`w-full rounded-2xl px-5 py-4 text-slate-800 font-bold text-sm transition-all outline-none border-2 ${isEditing ? 'bg-white border-blue-200 focus:border-blue-600 shadow-inner' : 'bg-slate-50 border-transparent cursor-not-allowed'}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BANKING METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-900/20 group hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Liquidity Value</p>
              <CreditCard size={20} className="text-blue-500" />
            </div>
            <p className="text-4xl font-black tracking-tighter">{formData.accountBalance}</p>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <TrendingUp size={14} /> +0.4% this week
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Risk Profile</p>
              <ShieldCheck size={20} className="text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">CONSERVATIVE</p>
            <p className="text-slate-400 text-xs font-bold mt-4 uppercase tracking-wider italic">System Verified Log</p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Global Ranking</p>
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">TOP 2%</p>
            <p className="text-blue-600 text-xs font-bold mt-4 uppercase tracking-wider">Tier: Elite Portfolio</p>
          </div>
        </div>

        {/* SECURITY & SESSION ARCHITECTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter">
              <Lock size={24} className="text-blue-600" /> Security Matrix
            </h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-6 bg-slate-50 border-2 border-transparent rounded-3xl hover:border-blue-200 hover:bg-blue-50 transition-all group">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:text-blue-600 transition-colors"><Lock size={20} /></div>
                  <div className="text-left">
                    <p className="font-black text-slate-800 text-sm">Rotate Credentials</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Highly Recommended</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </button>

              <div className="flex items-center justify-between p-6 bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl">
                <div className="flex gap-5">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-600 font-black"><Fingerprint size={24} /></div>
                  <div>
                    <p className="font-black text-slate-800 text-sm">Biometric 2FA</p>
                    <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-1 italic">Identity Confirmed</p>
                  </div>
                </div>
                <div className="w-14 h-7 bg-emerald-500 rounded-full relative p-1 shadow-inner cursor-pointer">
                   <div className="w-5 h-5 bg-white rounded-full ml-auto shadow-md"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter">
              <History size={24} className="text-blue-600" /> Active Terminals
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border-l-8 border-emerald-500">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-white rounded-2xl text-blue-600 shadow-sm"><Monitor size={24} /></div>
                  <div>
                    <p className="text-sm font-black text-slate-800">Primary Workstation</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{formData.lastLogin}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500 text-white text-[9px] font-black uppercase rounded-lg tracking-widest">Live</span>
              </div>
              <button className="w-full py-5 text-[10px] font-black text-blue-600 border-2 border-blue-100 rounded-3xl hover:bg-blue-600 hover:text-white transition-all uppercase tracking-[0.2em]">
                Secure All Terminals
              </button>
            </div>
          </section>
        </div>

        {/* DESTRUCTIVE ZONE: Dark Theme Compliance */}
        <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 border border-white/10 shadow-3xl shadow-blue-900/40">
          <div className="text-center md:text-left">
            <h4 className="font-black text-xl tracking-tighter uppercase mb-1">Encrypted Audit Data</h4>
            <p className="text-slate-400 text-sm font-medium">Generate a certified PDF of your financial identity and access logs.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-[10px] transition-all uppercase tracking-widest">
              <Download size={18} /> Export PDF
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-2xl font-black text-[10px] transition-all uppercase tracking-widest border border-red-500/20">
              <Trash2 size={18} /> Archive Identity
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}