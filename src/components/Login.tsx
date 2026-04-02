import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (role: 'Volunteer' | 'Donor') => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'jay' && password === '1234') {
      toast.success('Login Successful!', { description: 'Welcome back, Volunteer.' });
      onLoginSuccess('Volunteer');
    } else if (email === 'donor' && password === '1234') {
      toast.success('Login Successful!', { description: 'Welcome back, Donor.' });
      onLoginSuccess('Donor');
    } else {
      toast.error('Invalid Credentials', { description: 'Please check your username and password.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-10 md:p-12 border border-slate-100"
      >
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jay"
                className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-4"
          >
            Login
          </button>
        </form>

        <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Demo Credentials</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Volunteer:</span>
              <span className="text-slate-900 font-mono">jay / 1234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Donor:</span>
              <span className="text-slate-900 font-mono">donor / 1234</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
