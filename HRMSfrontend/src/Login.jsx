import { useState } from 'react';
import { 
  Infinity, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  User,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

<<<<<<< HEAD
  //submit handler
=======
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 4000);
  };

  // ---------------------------------------------------------
  // GOOGLE AUTHENTICATION LOGIC
  // ---------------------------------------------------------
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user details from Google using the access token
        const res = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + tokenResponse.access_token);
        const googleData = await res.json();
        
        const users = JSON.parse(localStorage.getItem('hrise_users')) || [];
        let user = users.find((u) => u.email === googleData.email);

        if (!user) {
          // Auto-register the Google user if they don't exist
          user = { 
            name: googleData.name, 
            email: googleData.email, 
            password: '', // No local password needed for Google users
            authProvider: 'google' 
          };
          users.push(user);
          localStorage.setItem('hrise_users', JSON.stringify(users));
        }

        localStorage.setItem('hrise_current_user', JSON.stringify(user));
        showMessage(`Welcome back, ${user.name}!`, 'success');
        
        setTimeout(() => {
          onLogin(user);
        }, 1000);

      } catch (error) {
        showMessage('Failed to fetch Google profile.', 'error');
      }
    },
    onError: () => {
      showMessage('Google Sign-In Failed. Please try again.', 'error');
    }
  });

  // ---------------------------------------------------------
  // STANDARD EMAIL/PASSWORD LOGIC
  // ---------------------------------------------------------
>>>>>>> 38d3169 (Add register functionality in login #2)
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('hrise_users')) || [];

    if (isRegistering) {
      const userExists = users.find((user) => user.email === email);
      if (userExists) {
        showMessage('Email is already registered. Please sign in.', 'error');
        return;
      }

      const newUser = { name, email, password, authProvider: 'local' };
      users.push(newUser);
      localStorage.setItem('hrise_users', JSON.stringify(users));
      
      showMessage('Registration successful! You can now sign in.', 'success');
      setIsRegistering(false);
      setPassword('');
    } else {
      const validUser = users.find((user) => user.email === email && user.password === password);
      
      if (validUser) {
        showMessage(`Welcome back, ${validUser.name || 'User'}!`, 'success');
        localStorage.setItem('hrise_current_user', JSON.stringify(validUser));
        setTimeout(() => {
          onLogin(validUser);
        }, 1000);
      } else {
        showMessage('Invalid email or password. Please try again.', 'error');
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.6, staggerChildren: 0.15 } 
    }
  };

  //Items varients
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen w-full flex bg-white dark:bg-slate-950 font-sans antialiased"
    >
      {/* LEFT PANEL: Branding & Visuals */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 flex-col justify-between p-12 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-indigo-500/50 blur-[80px]" />
          <div className="absolute bottom-[10%] -right-[20%] w-[60%] h-[60%] rounded-full bg-violet-500/40 blur-[100px]" />
        </div>

        <div className="relative z-10 flex items-center gap-3 text-white">
          <div className="bg-white/25 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-white/10">
            <Infinity size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">HRise Systems</span>
        </div>

        <div className="relative z-10 text-white max-w-lg mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-sm font-medium mb-6 backdrop-blur-sm">
            <ShieldCheck size={16} className="text-emerald-300" />
            Enterprise Grade Security
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Manage your workforce with complete clarity.
          </h1>
          <p className="text-indigo-100 text-lg leading-relaxed font-light">
            Streamline your human resource processes, handle onboarding, and secure payroll management all in one centralized platform.
          </p>
        </div>

        <div className="relative z-10">
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 max-w-md">
            <p className="text-indigo-50 text-sm italic mb-4">
              "HRise has completely transformed how we handle onboarding and payroll. It's incredibly intuitive and fast."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-300 overflow-hidden border-2 border-white/20">
                <img src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=687&auto=format&fit=crop" alt="User" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Pratik Beladiya</h4>
                <span className="text-xs text-indigo-200">HR Director, HRise</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT PANEL: Login / Register Form */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 relative z-10 bg-slate-50 dark:bg-slate-900"
      >
        <motion.div variants={containerVariants} className="w-full max-w-md space-y-6">
          
          <motion.div variants={itemVariants} className="flex lg:hidden items-center gap-3 justify-center mb-6">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg"><Infinity size={28} /></div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">HRise Systems</span>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {isRegistering ? "Create an Account" : "Welcome back !"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isRegistering ? "Enter your information to set up your profile." : "Please enter your details to access your dashboard."}
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

          {!isRegistering && (
            <>
              {/* GOOGLE LOGIN BUTTON */}
              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => loginWithGoogle()}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 py-3 px-4 rounded-xl font-semibold transition-all shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                Continue with Google
              </motion.button>

              <motion.div variants={itemVariants} className="relative flex items-center py-1">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-slate-400 font-medium uppercase tracking-wider">Or sign in with email</span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              </motion.div>
            </>
          )}

          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><User size={18} /></div>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe" 
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100" 
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
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Lock size={18} /></div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-12 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition-all shadow-md mt-2"
            >
              {isRegistering ? "Register Account" : "Sign In"} <ArrowRight size={18} />
            </motion.button>
          </motion.form>

          {/* Toggle between Login and Register views */}
          <div className="text-center pt-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
              <button 
                type="button" 
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setMessage({ text: '', type: '' });
                }} 
                className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400 ml-1"
              >
                {isRegistering ? "Sign In" : "Register"}
              </button>
            </p>
          </div>

        </motion.div>
        
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-4 text-[11px] text-slate-400 text-center w-full max-w-md">
          By signing in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
