import React, { useState } from 'react';
import { 
  Infinity, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  // Handle standard form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // Triggers the authentication state in App.jsx
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-slate-950 font-sans antialiased">
      
      {/* 
        LEFT PANEL: Branding & Visuals (Hidden on smaller screens)
      */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 flex-col justify-between p-12 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-indigo-500/50 blur-[80px]" />
          <div className="absolute bottom-[10%] -right-[20%] w-[60%] h-[60%] rounded-full bg-violet-500/40 blur-[100px]" />
        </div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3 text-white">
          <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-white/10">
            <Infinity size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">HRise Systems</span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 text-white max-w-lg mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-sm font-medium mb-6 backdrop-blur-sm">
            <ShieldCheck size={16} className="text-emerald-300" />
            Enterprise Grade Security
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Manage your workforce with complete clarity.
          </h1>
          <p className="text-indigo-100 text-lg leading-relaxed font-light">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde corrupti earum eius sapiente, sequi expedita at qui alias similique dolor!
          </p>
        </div>

        {/* Bottom Testimonial/Footer */}
        <div className="relative z-10">
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 max-w-md">
            <p className="text-indigo-50 text-sm italic mb-4">
              "HRise has completely transformed how we handle onboarding and payroll. It's incredibly intuitive and fast."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-300 overflow-hidden border-2 border-white/20">
                <img src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Pratik Beladiya</h4>
                <span className="text-xs text-indigo-200">HR Director, HRise</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        RIGHT PANEL: Login Form 
      */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 relative z-10 bg-slate-50 dark:bg-slate-900">
        
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Logo (Only visible on small screens) */}
          <div className="flex lg:hidden items-center gap-3 justify-center mb-8">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg">
              <Infinity size={28} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              HRise Systems
            </span>
          </div>

          {/* Form Header */}
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Please enter your details to access your dashboard.
            </p>
          </div>

          {/* Microsoft SSO Button */}
          <button 
            type="button"
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 py-3 px-4 rounded-xl font-semibold transition-all shadow-sm active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" className="w-5 h-5">
              <path fill="#00a4ef" d="M0 45.918h35.687v34.422L0 75.48z"/>
              <path fill="#ffb900" d="M0 12.402l35.687-4.86v34.423H0z"/>
              <path fill="#f25022" d="M39.692 6.463L88 0v41.965H39.692z"/>
              <path fill="#7fba00" d="M39.692 45.918H88V88l-48.308-6.69z"/>
            </svg>
            Continue with Microsoft
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-xs text-slate-400 font-medium uppercase tracking-wider">Or sign in with email</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Work Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-12 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Checkbox & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg shadow-indigo-500/30 active:scale-[0.98] mt-2"
            >
              Sign In <ArrowRight size={18} />
            </button>
          </form>

        </div>
        
        {/* Simple Footer */}
        <p className="absolute bottom-6 text-[11px] text-slate-400 text-center w-full max-w-md">
          By signing in, you agree to our <a href="#" className="underline hover:text-slate-600 dark:hover:text-slate-300">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600 dark:hover:text-slate-300">Privacy Policy</a>.
        </p>

      </div>

    </div>
  );
}