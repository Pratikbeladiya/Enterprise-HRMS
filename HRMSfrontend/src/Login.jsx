import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Target,
  User,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';

const messages = [
  {
    title: 'Complete Management. Ultimate Success.',
    detail: 'Unify people data, attendance, leaves, teams, and performance.',
    Icon: Building2,
    position: 'left-[6%] top-[12%]',
    delay: 0.1,
  },
  {
    title: 'Inspire Teams. Lead Managers.',
    detail: 'Give every manager a clear operating view of their people.',
    Icon: UsersRound,
    position: 'right-[6%] top-[22%]',
    delay: 0.25,
  },
  {
    title: 'Boost Performance. Empower Employees.',
    detail: 'Turn daily HR workflows into measurable business momentum.',
    Icon: Target,
    position: 'left-[6%] bottom-[24%]',
    delay: 0.4,
  },
  {
    title: 'Streamline Human Resource Management.',
    detail: 'Automate critical HR moments with enterprise-grade control.',
    Icon: UserRoundCheck,
    position: 'right-[6%] bottom-[14%]',
    delay: 0.55,
  },
];

const passwordChecks = [
  { label: '8+ chars', test: (value) => value.length >= 8 },
  { label: 'Uppercase', test: (value) => /[A-Z]/.test(value) },
  { label: 'Number', test: (value) => /\d/.test(value) },
  { label: 'Symbol', test: (value) => /[^A-Za-z0-9]/.test(value) },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9Z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7Z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9L6.2 33.1C9.5 39.6 16.2 44 24 44Z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9Z" />
  </svg>
);

const MicrosoftIcon = () => (
  <span aria-hidden="true" className="grid h-5 w-5 grid-cols-2 gap-0.5">
    <span className="rounded-[2px] bg-[#F25022]" />
    <span className="rounded-[2px] bg-[#7FBA00]" />
    <span className="rounded-[2px] bg-[#00A4EF]" />
    <span className="rounded-[2px] bg-[#FFB900]" />
  </span>
);

function GlassMessageCard({ item, index }) {
  const { Icon } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.8, delay: item.delay, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.8, delay: item.delay, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 7 + index * 0.8, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={`absolute ${item.position} w-[min(65%,18rem)] rounded-[20px] border border-white/20 bg-white/15 p-3 text-white shadow-xl shadow-slate-950/20 backdrop-blur-2xl cursor-default`}
    >
      <div className="flex items-start gap-2.5">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/20 shadow-inner">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <h3 className="text-xs font-semibold leading-4">{item.title}</h3>
          <p className="mt-0.5 text-[10px] leading-3 text-white/78">{item.detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

function VisualPanel() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden lg:block lg:basis-[60%]">
      <motion.img
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"
        alt="Modern enterprise office workspace"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/62" />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-indigo-500/35 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -28, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 right-8 h-96 w-96 rounded-full bg-teal-400/24 blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(167,139,250,0.20),transparent_30%),linear-gradient(135deg,rgba(79,70,229,0.40),transparent_42%,rgba(20,184,166,0.22))]" />

      <div className="relative z-10 flex h-screen flex-col justify-between p-10 xl:p-12">
        {/* <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 rounded-full border border-white/16 bg-white/12 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-xl"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-teal-200" />
            WCAG-ready access
          </motion.div>
        </div> */}

        {/* Center blank space plain white text with controlled horizontal constraints to avoid overlapping floating tiles */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-24 lg:px-32 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 max-w-md"
          >
            <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-white drop-shadow-md leading-snug">
              <span className="text-blue-400">Hrise</span> A Enterprise HRMS
            </h1>
            <p className="text-sm text-white/80 leading-relaxed">
              Empower your teams and streamline human resources with next-gen management controls.
            </p>
          </motion.div>
        </div>
      </div>

      {messages.map((item, index) => (
        <GlassMessageCard key={item.title} item={item} index={index} />
      ))}
    </section>
  );
}

function PasswordStrength({ password }) {
  const passed = passwordChecks.filter((check) => check.test(password)).length;
  const strength = Math.round((passed / passwordChecks.length) * 100);
  const label = passed <= 1 ? 'Weak' : passed <= 3 ? 'Balanced' : 'Strong';
  const color = passed <= 1 ? 'bg-rose-500' : passed <= 3 ? 'bg-amber-500' : 'bg-teal-500';

  return (
    <div className="space-y-2.5" aria-live="polite">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-slate-500 dark:text-slate-400">Password strategy</span>
        <span className="text-slate-700 dark:text-slate-200">{password ? label : 'Required'}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={false}
          animate={{ width: `${password ? strength : 0}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 sm:grid-cols-4">
        {passwordChecks.map((check) => {
          const isPassed = check.test(password);
          return (
            <span
              key={check.label}
              className={`flex items-center gap-1.5 transition-colors duration-300 ${isPassed ? 'text-teal-600 dark:text-teal-300 font-medium' : ''}`}
            >
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              {check.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'otp' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('hrise_remembered_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberSession(true);
    }
  }, []);

  const notify = (text, type = 'success') => {
    setMessage({ text, type });
    window.clearTimeout(notify.timeoutId);
    notify.timeoutId = window.setTimeout(() => setMessage({ text: '', type: '' }), 3600);
  };

  const completeLogin = (user) => {
    if (rememberSession) {
      localStorage.setItem('hrise_current_user', JSON.stringify(user));
      localStorage.setItem('hrise_remembered_email', user.email);
    } else {
      sessionStorage.setItem('hrise_current_user', JSON.stringify(user));
      localStorage.removeItem('hrise_current_user');
      localStorage.removeItem('hrise_remembered_email');
    }
    onLogin(user);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`);
        const googleData = await res.json();
        const users = JSON.parse(localStorage.getItem('hrise_users')) || [];
        let user = users.find((item) => item.email === googleData.email);

        if (!user) {
          user = {
            name: googleData.name,
            email: googleData.email,
            password: '',
            authProvider: 'google',
            role: 'HR Operations Lead',
          };
          users.push(user);
          localStorage.setItem('hrise_users', JSON.stringify(users));
        }

        notify(`Login successful! Welcome back, ${user.name || 'there'}.`, 'success');
        window.setTimeout(() => completeLogin(user), 650);
      } catch {
        notify('Google sign-in could not be completed.', 'error');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => notify('Google sign-in was cancelled or failed.', 'error'),
  });

  const handleMicrosoftLogin = () => {
    setIsLoading(true);
    const user = {
      name: 'Microsoft Workspace User',
      email: 'microsoft.user@arkaenterprise.com',
      authProvider: 'microsoft',
      role: 'People Operations',
    };

    window.setTimeout(() => {
      notify('Login successful! Microsoft workspace connected.', 'success');
      completeLogin(user);
      setIsLoading(false);
    }, 800);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notify('Please enter a valid work email address.', 'error');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      notify('Please enter your full name.', 'error');
      return;
    }

    if (mode === 'register' && password.length < 8) {
      notify('Password must be at least 8 characters long.', 'error');
      return;
    }

    if (mode === 'otp' && !otp.trim()) {
      notify('Please enter the 6-digit verification code.', 'error');
      return;
    }

    setIsLoading(true);
    const users = JSON.parse(localStorage.getItem('hrise_users')) || [];

    if (mode === 'register') {
      const existing = users.find((item) => item.email === email);
      if (existing) {
        setIsLoading(false);
        notify('An account with this email already exists. Try signing in.', 'error');
        return;
      }
      const newUser = {
        name,
        email,
        password,
        authProvider: 'local',
        role: 'HRMS Administrator',
      };
      users.push(newUser);
      localStorage.setItem('hrise_users', JSON.stringify(users));
      window.setTimeout(() => {
        setIsLoading(false);
        notify('Registration successful! Welcome to Arka.', 'success');
        completeLogin(newUser);
      }, 800);
      return;
    }

    if (mode === 'forgot') {
      window.setTimeout(() => {
        setIsLoading(false);
        notify('Password recovery instructions sent to your email.', 'success');
        setMode('login');
      }, 800);
      return;
    }

    if (mode === 'otp') {
      window.setTimeout(() => {
        setIsLoading(false);
        let user = users.find((item) => item.email === email);
        if (!user) {
          user = {
            name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
            email,
            authProvider: 'otp',
            role: 'Enterprise Member',
          };
          users.push(user);
          localStorage.setItem('hrise_users', JSON.stringify(users));
        }
        notify('Login successful! Verified via OTP.', 'success');
        completeLogin(user);
      }, 800);
      return;
    }

    let user = users.find((item) => item.email === email && item.password === password);
    if (!user && email.endsWith('@arkaenterprise.com') && password.length >= 8) {
      user = {
        name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
        email,
        password,
        authProvider: 'local',
        role: 'HRMS Administrator',
      };
      users.push(user);
      localStorage.setItem('hrise_users', JSON.stringify(users));
    }

    window.setTimeout(() => {
      if (!user) {
        setIsLoading(false);
        notify('Wrong details! Invalid email or password credentials.', 'error');
        return;
      }

      notify(`Login successful! Welcome back, ${user.name || 'there'}.`, 'success');
      completeLogin(user);
      setIsLoading(false);
    }, 800);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#F8FAFC] font-['Inter',ui-sans-serif,system-ui] text-[#111827] dark:bg-slate-950 dark:text-white"
    >
      <div className="flex min-h-screen flex-col lg:flex-row">
        <VisualPanel />

        {/* RIGHT PANEL: Login / Register Form */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 relative z-10 bg-slate-50 dark:bg-slate-900"
        >
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-full max-w-md space-y-6">
            
            <motion.div variants={itemVariants} className="text-center lg:text-left space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {mode === 'register' && "Create an Account"}
                {mode === 'forgot' && "Reset Password"}
                {mode === 'otp' && "Verify OTP Code"}
                {mode === 'login' && "Welcome back !"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {mode === 'register' && "Enter your information to set up your profile."}
                {mode === 'forgot' && "Enter your verified work email to recover your enterprise credentials."}
                {mode === 'otp' && "Enter the quick passcode delivered to your email address to log in instantly."}
                {mode === 'login' && "Please enter your details to access your dashboard."}
              </p>
            </motion.div>

            {/* Feedback Message Banner */}
            <AnimatePresence>
              {message.text && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center gap-2.5 p-3.5 rounded-xl text-sm font-medium border ${
                    message.type === 'success' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                      : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                  }`}
                >
                  {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{message.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {mode === 'login' && (
              <>
                {/* MICROSOFT & GOOGLE LOGIN BUTTONS SIDE BY SIDE */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleMicrosoftLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 py-3 px-3 rounded-xl font-semibold transition-all shadow-sm text-sm no-underline"
                  >
                    <MicrosoftIcon />
                    Microsoft
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => loginWithGoogle()}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 py-3 px-3 rounded-xl font-semibold transition-all shadow-sm text-sm no-underline"
                  >
                    <GoogleIcon />
                    Google
                  </motion.button>
                </motion.div>

                <motion.div variants={itemVariants} className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                  <span className="flex-shrink-0 mx-4 text-xs text-slate-400 font-medium uppercase tracking-wider">Or sign in with email</span>
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                </motion.div>
              </>
            )}

            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4" noValidate>
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><User size={18} /></div>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe" 
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 no-underline" 
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Work Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Mail size={18} /></div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com" 
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 no-underline" 
                  />
                </div>
              </div>

              {mode === 'otp' && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Verification Code (OTP)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><KeyRound size={18} /></div>
                    <input 
                      type="text" 
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit code" 
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 no-underline" 
                    />
                  </div>
                </div>
              )}

              {(mode === 'login' || mode === 'register') && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Lock size={18} /></div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full pl-10 pr-12 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 no-underline" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 no-underline">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'register' && <PasswordStrength password={password} />}

              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm py-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300 font-medium no-underline">
                    <input 
                      type="checkbox"
                      checked={rememberSession}
                      onChange={(e) => setRememberSession(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Remember me
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setMode('forgot')}
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 no-underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition-all shadow-md mt-2 disabled:opacity-70 no-underline"
              >
                {isLoading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <>
                    {mode === 'login' && "Sign In"}
                    {mode === 'register' && "Register Account"}
                    {mode === 'forgot' && "Send Recovery Link"}
                    {mode === 'otp' && "Verify & Sign In"}
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Toggle between Login, Register, and OTP views */}
            <div className="text-center pt-2 space-y-2">
              {mode === 'login' && (
                <>
                  <p className="text-sm text-slate-500 dark:text-slate-400 no-underline">
                    Sign in with code instead?{" "}
                    <button type="button" onClick={() => setMode('otp')} className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 ml-1 no-underline">
                      Use OTP Auth
                    </button>
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 no-underline">
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setMode('register')} className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 ml-1 no-underline">
                      Register
                    </button>
                  </p>
                </>
              )}

              {(mode === 'register' || mode === 'forgot' || mode === 'otp') && (
                <p className="text-sm text-slate-500 dark:text-slate-400 no-underline">
                  <button type="button" onClick={() => setMode('login')} className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 no-underline">
                    Back to standard sign in
                  </button>
                </p>
              )}
            </div>

          </motion.div>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-4 text-[11px] text-slate-400 text-center w-full max-w-md no-underline">
            By signing in, you agree to our <a href="#" className="no-underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="no-underline hover:text-slate-600">Privacy Policy</a>.
          </motion.p>
        </motion.div>
      </div>
    </motion.main>
  );
}