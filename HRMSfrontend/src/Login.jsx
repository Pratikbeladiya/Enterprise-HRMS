import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Fingerprint,
  Globe2,
  Lock,
  Mail,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
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
    position: 'left-[8%] top-[16%]',
    delay: 0,
  },
  {
    title: 'Inspire Teams. Lead Managers.',
    detail: 'Give every manager a clear operating view of their people.',
    Icon: UsersRound,
    position: 'right-[8%] top-[32%]',
    delay: 0.25,
  },
  {
    title: 'Boost Performance. Empower Employees.',
    detail: 'Turn daily HR workflows into measurable business momentum.',
    Icon: Target,
    position: 'left-[13%] bottom-[26%]',
    delay: 0.5,
  },
  {
    title: 'Streamline Human Resource Management.',
    detail: 'Automate critical HR moments with enterprise-grade control.',
    Icon: UserRoundCheck,
    position: 'right-[13%] bottom-[10%]',
    delay: 0.75,
  },
];

const passwordChecks = [
  { label: '8+ characters', test: (value) => value.length >= 8 },
  { label: 'Uppercase', test: (value) => /[A-Z]/.test(value) },
  { label: 'Number', test: (value) => /\d/.test(value) },
  { label: 'Symbol', test: (value) => /[^A-Za-z0-9]/.test(value) },
];

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

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#4F46E5] via-[#A78BFA] to-[#14B8A6] text-white shadow-lg shadow-indigo-500/25">
        <BriefcaseBusiness className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-teal-400 dark:border-slate-950" />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">Arka</p>
        <p className="text-lg font-bold text-slate-950 dark:text-white">Enterprise HRMS</p>
      </div>
    </div>
  );
}

function GlassMessageCard({ item, index }) {
  const { Icon } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: [0, -12, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.6, delay: item.delay },
        scale: { duration: 0.6, delay: item.delay },
        y: { duration: 6 + index, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
      }}
      className={`absolute ${item.position} w-[min(76%,24rem)] rounded-[24px] border border-white/20 bg-white/15 p-5 text-white shadow-2xl shadow-slate-950/20 backdrop-blur-2xl`}
    >
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/20 shadow-inner">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-6">{item.title}</h3>
          <p className="mt-1 text-sm leading-5 text-white/78">{item.detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

function VisualPanel() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden lg:block lg:basis-[60%]">
      <img
        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"
        alt="Modern enterprise office workspace"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/62" />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-indigo-500/35 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -22, 0], y: [0, 18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 right-8 h-96 w-96 rounded-full bg-teal-400/24 blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(167,139,250,0.20),transparent_30%),linear-gradient(135deg,rgba(79,70,229,0.40),transparent_42%,rgba(20,184,166,0.22))]" />

      <div className="relative z-10 flex h-screen flex-col justify-between p-12 xl:p-16">
        <div className="flex items-center justify-between">
          <div className="rounded-[24px] border border-white/18 bg-white/12 p-3 pr-5 text-white shadow-xl backdrop-blur-xl">
            <LogoMark />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/16 bg-white/12 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl">
            <ShieldCheck className="h-4 w-4 text-teal-200" />
            WCAG-ready access
          </div>
        </div>

        <div className="max-w-2xl pb-10 text-white">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/12 px-4 py-2 text-sm font-semibold backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4 text-violet-200" />
            Intelligent workforce operations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="max-w-2xl text-5xl font-semibold leading-[1.04] tracking-normal xl:text-6xl"
          >
            Premium HR control for people-first enterprises.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34 }}
            className="mt-6 max-w-xl text-lg leading-8 text-white/78"
          >
            A secure portal for managers, employees, and HR leaders to move from fragmented workflows to calm operational clarity.
          </motion.p>
        </div>
      </div>

      {messages.map((item, index) => (
        <GlassMessageCard key={item.title} item={item} index={index} />
      ))}
    </section>
  );
}

function TextField({ id, label, icon: Icon, error, rightSlot, ...props }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <div className="group relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-500" />
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-14 w-full rounded-2xl border bg-white/90 pl-12 text-[15px] font-medium text-slate-950 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/12 dark:bg-slate-900/72 dark:text-white dark:placeholder:text-slate-500 ${
            rightSlot ? 'pr-14' : 'pr-4'
          } ${error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/12 dark:border-rose-500/60' : 'border-slate-200 dark:border-slate-700'}`}
          {...props}
        />
        {rightSlot}
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-300">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}

function PasswordStrength({ password }) {
  const passed = passwordChecks.filter((check) => check.test(password)).length;
  const strength = Math.round((passed / passwordChecks.length) * 100);
  const label = passed <= 1 ? 'Weak' : passed <= 3 ? 'Balanced' : 'Strong';
  const color = passed <= 1 ? 'bg-rose-500' : passed <= 3 ? 'bg-amber-500' : 'bg-teal-500';

  return (
    <div className="space-y-3" aria-live="polite">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-slate-500 dark:text-slate-400">Password strength</span>
        <span className="text-slate-700 dark:text-slate-200">{password ? label : 'Required'}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={false}
          animate={{ width: `${password ? strength : 0}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 sm:grid-cols-4">
        {passwordChecks.map((check) => {
          const isPassed = check.test(password);
          return (
            <span key={check.label} className={`flex items-center gap-1.5 ${isPassed ? 'text-teal-600 dark:text-teal-300' : ''}`}>
              <CheckCircle2 className="h-3.5 w-3.5" />
              {check.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast.text && (
        <motion.div
          initial={{ opacity: 0, y: -18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.96 }}
          className={`fixed right-4 top-4 z-50 flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur-xl ${
            toast.type === 'success'
              ? 'border-teal-200 bg-white/92 text-teal-700 shadow-teal-500/12 dark:border-teal-400/20 dark:bg-slate-900/92 dark:text-teal-200'
              : 'border-rose-200 bg-white/92 text-rose-700 shadow-rose-500/12 dark:border-rose-400/20 dark:bg-slate-900/92 dark:text-rose-200'
          }`}
          role="status"
        >
          {toast.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{toast.text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SocialButton({ icon, children, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:bg-slate-50 hover:shadow-lg hover:shadow-slate-200/70 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-indigo-400/40 dark:hover:bg-slate-800"
    >
      {icon}
      {children}
    </motion.button>
  );
}

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('hrise_login_theme') === 'dark');
  const [toast, setToast] = useState({ text: '', type: 'success' });
  const [touched, setTouched] = useState({});

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('hrise_login_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const errors = useMemo(() => {
    const next = {};
    if (!email.trim()) {
      next.email = 'Enter your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address.';
    }

    if (!password) {
      next.password = 'Enter your password.';
    } else if (password.length < 8) {
      next.password = 'Use at least 8 characters.';
    }

    return next;
  }, [email, password]);

  const notify = (text, type = 'success') => {
    setToast({ text, type });
    window.clearTimeout(notify.timeoutId);
    notify.timeoutId = window.setTimeout(() => setToast({ text: '', type }), 3600);
  };

  const completeLogin = (user) => {
    if (rememberSession) {
      localStorage.setItem('hrise_current_user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('hrise_current_user', JSON.stringify(user));
      localStorage.removeItem('hrise_current_user');
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

        notify(`Welcome back, ${user.name || 'there'}.`, 'success');
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
      notify('Microsoft workspace connected.', 'success');
      completeLogin(user);
      setIsLoading(false);
    }, 800);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });

    if (Object.keys(errors).length) {
      notify('Please fix the highlighted fields.', 'error');
      return;
    }

    setIsLoading(true);
    const users = JSON.parse(localStorage.getItem('hrise_users')) || [];
    let user = users.find((item) => item.email === email && item.password === password);

    if (!user && email.endsWith('@arkaenterprise.com')) {
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
        notify('Invalid credentials. Try an @arkaenterprise.com email for demo access.', 'error');
        return;
      }

      notify(`Welcome back, ${user.name || 'there'}.`, 'success');
      completeLogin(user);
      setIsLoading(false);
    }, 800);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#F8FAFC] font-['Inter',ui-sans-serif,system-ui] text-[#111827] dark:bg-slate-950 dark:text-white"
    >
      <Toast toast={toast} />
      <div className="flex min-h-screen flex-col lg:flex-row">
        <VisualPanel />

        <section className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden px-4 py-8 sm:px-8 lg:basis-[40%] lg:px-10 xl:px-14">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(167,139,250,0.20),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(20,184,166,0.17),transparent_30%)]" />
          <button
            type="button"
            onClick={() => setIsDark((value) => !value)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.62, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-[31rem]"
          >
            <div className="mb-8 flex justify-center lg:hidden">
              <LogoMark />
            </div>

            <div className="rounded-[24px] border border-white bg-white/95 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/92 dark:shadow-black/30 sm:p-8">
              <div className="mb-8">
                <div className="mb-6 hidden lg:block">
                  <LogoMark />
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-300">
                  <Fingerprint className="h-4 w-4" />
                  Secure employee access
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-4xl">
                  Welcome back
                </h1>
                <p className="mt-3 text-base leading-7 text-slate-500 dark:text-slate-400">
                  Sign in to manage attendance, teams, leaves, tasks, and employee operations from one premium HRMS workspace.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <TextField
                  id="email"
                  label="Email address"
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setTouched((value) => ({ ...value, email: true }))}
                  placeholder="name@arkaenterprise.com"
                  autoComplete="email"
                  error={touched.email ? errors.email : ''}
                />

                <TextField
                  id="password"
                  label="Password"
                  icon={Lock}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onBlur={() => setTouched((value) => ({ ...value, password: true }))}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  error={touched.password ? errors.password : ''}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition-colors duration-300 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  }
                />

                <PasswordStrength password={password} />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberSession}
                      onChange={(event) => setRememberSession(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 accent-[#4F46E5] focus:ring-indigo-500 dark:border-slate-600"
                    />
                    Remember me
                  </label>
                  <a href="#forgot-password" className="text-sm font-semibold text-indigo-600 transition-colors duration-300 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:text-indigo-300">
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ y: isLoading ? 0 : -2 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#14B8A6] px-5 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <>
                      Login
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <SocialButton icon={<MicrosoftIcon />} onClick={handleMicrosoftLogin}>
                  Microsoft
                </SocialButton>
                <SocialButton icon={<GoogleIcon />} onClick={() => loginWithGoogle()}>
                  Google
                </SocialButton>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950/60">
                {[
                  ['99.9%', 'Uptime'],
                  ['SOC2', 'Controls'],
                  ['24/7', 'Access'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-sm font-bold text-slate-950 dark:text-white">{value}</p>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <footer className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <a href="#privacy" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-300">Privacy Policy</a>
              <a href="#terms" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-300">Terms & Conditions</a>
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="h-3.5 w-3.5" />
                Version 2.6.0
              </span>
            </footer>
          </motion.div>
        </section>
      </div>
    </motion.main>
  );
}
