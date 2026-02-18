import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  Shield,
  Key,
  Mail,
  User,
  ArrowRight,
  ChevronLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Zap
} from 'lucide-react';

/**
 * INTELLICORE AUTHENTICATION SYSTEM
 * Theme: Enterprise AI Observability
 * Styling: Blue Accents + Deep Midnight Background
 */

// --- CLEAN BACKGROUND COMPONENT ---
const DeepSpaceBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617] overflow-hidden">
      {/* Soft Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-900/5 blur-[120px] rounded-full" />
    </div>
  );
};

// --- SHARED COMPONENTS ---

const CardWrapper = ({ children, title, subtitle, onBack }) => (
  <div className="min-h-screen flex items-center justify-center p-6 font-sans antialiased relative">
    <DeepSpaceBackground />
    <div className="max-w-md w-full bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl p-10 space-y-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-10 left-10 flex items-center text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium group"
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        )}

        {/* Centered Logo & Brand */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src={logo}
            alt="IntelliCore Logo"
            className="h-14 w-14 object-contain"
          />

          <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">
            IntelliCore
          </span>
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-[280px] mx-auto">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  </div>
);

const Input = ({ label, type = "text", placeholder, value, onChange, icon: Icon, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${Icon ? 'pl-12' : 'px-4'} pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all duration-200 font-medium`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

const PrimaryButton = ({ children, onClick, disabled, type = "button", loading }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-[0.98] focus:ring-4 focus:ring-blue-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
  >
    {loading ? <span>Syncing...</span> : children}
  </button>
);

// --- VIEWS ---

const Login = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('2fa');
  };

  return (
    <CardWrapper
      title="Terminal Access"
      subtitle="Authorized personnel only. Secure credentials required."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Corporate Email"
          type="email"
          placeholder="name@intellicore.ai"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="space-y-1">
          <Input
            label="Access Token"
            type="password"
            placeholder="••••••••"
            icon={Key}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between text-xs pt-2">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
              <span className="text-slate-500 group-hover:text-slate-900 transition-colors">Trust this device</span>
            </label>
            <button
              type="button"
              onClick={() => onNavigate('forgot')}
              className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
            >
              Recover Access
            </button>
          </div>
        </div>
        <PrimaryButton type="submit">
          <span>Sign In to IntelliCore</span>
          <ArrowRight className="w-4 h-4" />
        </PrimaryButton>
      </form>
      <div className="text-center pt-2">
        <p className="text-slate-400 text-xs">
          New to the core?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="text-blue-600 font-bold hover:underline"
          >
            Create Workspace
          </button>
        </p>
      </div>
    </CardWrapper>
  );
};

const Signup = ({ onNavigate }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const roles = ['Executive', 'Risk Officer', 'Data Scientist', 'LLM Engineer', 'AIOps Engineer'];

  return (
    <CardWrapper
      title="Join IntelliCore"
      subtitle="Initialize your professional observability profile"
      onBack={() => onNavigate('login')}
    >
      <form className="space-y-4" onSubmit={(e) => {
        e.preventDefault();
        localStorage.setItem("role", form.role);  // 🔥 ADD THIS
        onNavigate('login');
      }}
      >
        <Input
          label="Full Name"
          placeholder="Commander Data"
          icon={User}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label="Work Email"
          type="email"
          placeholder="name@company.com"
          icon={Mail}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Role</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Briefcase size={18} />
            </div>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all appearance-none font-medium"
              required
            >
              <option value="" disabled>Select Designation</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <Input
          label="Master Password"
          type="password"
          placeholder="••••••••"
          icon={Key}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <PrimaryButton type="submit">
          Initialize Account
        </PrimaryButton>
      </form>
    </CardWrapper>
  );
};

const ForgotPassword = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <CardWrapper title="Relay Dispatched" subtitle="Check your secure communications">
        <div className="text-center py-4 space-y-8">
          <div className="flex justify-center">
            <div className="p-6 bg-blue-50 text-blue-600 rounded-[2rem] relative">
              <Mail className="w-12 h-12 relative z-10" />
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed px-4">
            If <span className="font-bold text-slate-900">{email}</span> is in our core database, you will receive a recovery relay.
          </p>
          <PrimaryButton onClick={() => onNavigate('login')}>
            Return to Terminal
          </PrimaryButton>
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper
      title="Recover Access"
      subtitle="Identity verification required for credential override"
      onBack={() => onNavigate('login')}
    >
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        <Input
          label="Recovery Email"
          type="email"
          placeholder="name@company.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PrimaryButton type="submit">
          Dispatch Recovery Relay
        </PrimaryButton>
      </form>
    </CardWrapper>
  );
};

const ResetPassword = ({ onNavigate }) => {
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <CardWrapper title="Core Restored" subtitle="Security protocols updated successfully">
        <div className="text-center py-4 space-y-8">
          <div className="flex justify-center">
            <div className="p-6 bg-blue-600 text-white rounded-[2rem] shadow-xl shadow-blue-500/30">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          </div>
          <p className="text-slate-500 text-sm">Your access credentials have been synchronized across all IntelliCore nodes.</p>
          <PrimaryButton onClick={() => onNavigate('login')}>
            Login to Terminal
          </PrimaryButton>
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper
      title="Override Password"
      subtitle="Ensure your new credentials meet IntelliCore standards"
    >
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSuccess(true); }}>
        <Input
          label="New Master Token"
          type="password"
          placeholder="••••••••"
          icon={Key}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <Input
          label="Verify Token"
          type="password"
          placeholder="••••••••"
          icon={Key}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <PrimaryButton type="submit">
          Finalize Override
        </PrimaryButton>
      </form>
    </CardWrapper>
  );
};

const TwoFactorVerification = ({ onNavigate }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputs = useRef([]);


  const mockOTP = "123456";

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const entered = otp.join('');
    if (entered === mockOTP) {
      setSuccess(true);
      setError(false);

      // 🔥 ADD THIS
      setTimeout(() => {
        const role = localStorage.getItem("role") || "Executive";

switch (role) {
  case "Executive":
    onNavigate("executive");
    break;
  case "Risk Officer":
    onNavigate("risk");
    break;
  case "Data Scientist":
    onNavigate("datascientist");
    break;
  case "LLM Engineer":
    onNavigate("llm");
    break;
  case "AIOps Engineer":
    onNavigate("aiops");
    break;
  default:
    onNavigate("executive");
}


      }, 1500);


    } else {
      setError(true);
      setOtp(['', '', '', '', '', '']);
      inputs.current[0].focus();
    }
  };


  if (success) {
    return (
      <CardWrapper title="Authorization Verified" subtitle="Securing session handshake...">
        <div className="text-center py-4 space-y-8">
          <div className="flex justify-center">
            <div className="p-6 bg-blue-600 text-white rounded-full animate-pulse shadow-2xl shadow-blue-500/50">
              <Shield className="w-12 h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-slate-900 font-bold text-xl uppercase tracking-tighter">Handshake Complete</p>
            <p className="text-slate-500 text-sm">Welcome back to IntelliCore. Initializing workspace...</p>
          </div>
          <div className="flex justify-center items-center space-x-2 text-blue-600">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
          </div>
          <button onClick={() => onNavigate('login')} className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">
            Terminate Session
          </button>
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper
      title="Identity Challenge"
      subtitle="Secondary verification required. Enter the code sent to your relay."
      onBack={() => onNavigate('login')}
    >
      <div className="space-y-10">
        <div className="flex justify-between gap-2 px-1">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => inputs.current[i] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-full h-16 text-center text-3xl font-black rounded-2xl border-2 outline-none transition-all duration-300 ${error
                ? 'border-red-200 bg-red-50 text-red-600 focus:border-red-500'
                : 'border-slate-50 bg-slate-50 focus:border-blue-600 focus:bg-white focus:ring-8 focus:ring-blue-600/5'
                }`}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-600 text-xs font-bold uppercase tracking-widest bg-red-50 py-3 rounded-2xl border border-red-100">
            <AlertCircle className="w-4 h-4" />
            <span>Auth Failed</span>
          </div>
        )}

        <div className="space-y-6">
          <PrimaryButton onClick={handleVerify} disabled={otp.some(d => !d)}>
            Verify Identity
          </PrimaryButton>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium">
              Delay in transmission?{' '}
              <button className="text-blue-600 font-black uppercase tracking-widest hover:underline text-[10px] ml-1">Request New Relay</button>
            </p>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

// --- MAIN APPLICATION ENTRY ---

export default function App() {
  const [view, setView] = useState('login');

  const renderView = () => {
    switch (view) {
      case 'login': return <Login onNavigate={setView} />;
      case 'signup': return <Signup onNavigate={setView} />;
      case 'forgot': return <ForgotPassword onNavigate={setView} />;
      case 'reset': return <ResetPassword onNavigate={setView} />;
      case '2fa': return <TwoFactorVerification onNavigate={setView} />;

      case 'executive': return <div>Executive Dashboard</div>;
      case 'llm': return <div>LLM Dashboard</div>;
      case 'risk': return <div>Risk Dashboard</div>;
      case 'datascientist': return <div>Data Scientist Dashboard</div>;
      case 'aiops': return <div>AIOps Dashboard</div>;

      default: return <Login onNavigate={setView} />;
    }
  };


  return (
    <div className="selection:bg-blue-600 selection:text-white">
      {renderView()}

      {/* Infrastructure Footer */}
      <div className="fixed bottom-8 w-full flex justify-center pointer-events-none select-none">
        <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-white/5">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">IntelliCore Infrastructure</p>
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
