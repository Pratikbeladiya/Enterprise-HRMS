import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff, Sparkles, CheckCircle2 } from "lucide-react";

export const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || isCooldown) return;

    if (!formData.username || !formData.password) {
      showError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setIsCooldown(true);

    try {
      const res = await login(formData);
      if (res?.success) {
        showSuccess("Welcome back! Authentication successful.");
        navigate(from, { replace: true });
      } else {
        showError(res?.message || "Invalid username or password");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Authentication request failed. Please check backend status or wait a moment.";
      showError(msg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsCooldown(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-slate-900/90 border border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Left Side: Brand Showcase */}
        <div className="p-8 sm:p-10 bg-gradient-to-b from-indigo-950/60 to-slate-950/80 border-r border-slate-800/80 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                H
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">HRMS Portal</h3>
                <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">Enterprise Automation</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h2 className="text-xl font-semibold text-white leading-relaxed">
                Streamline Your Workforce & Payroll Systems
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                All-in-one HR platform with automated attendance tracking, leave workflows, department analytics, and compensation management.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800/80 text-sm">
              <div className="flex items-center gap-2.5 text-slate-300 font-normal">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bank-Grade 256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 font-normal">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real-Time Attendance & Leave Workflows</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 font-normal">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated Payroll Calculation</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 relative z-10 flex items-center justify-between text-xs text-slate-400">
            <span>© 2026 HRMS Enterprise</span>
            <span className="flex items-center gap-1.5 text-indigo-400 font-medium">
              <Sparkles className="w-4 h-4" /> Secure Portal
            </span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Sign In</h2>
              <p className="text-sm text-slate-400 mt-1 font-normal">
                Enter your registered credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Username"
                name="username"
                placeholder="e.g. pratik12 or Utsav Beladiya"
                value={formData.username}
                onChange={handleChange}
                icon={User}
                helperText="Use your exact Username, not your email address."
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  icon={Lock}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-[38px] text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 text-sm mt-2 font-semibold"
                isLoading={loading}
                disabled={isCooldown}
              >
                Sign In to Portal <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-sm text-slate-400 font-normal">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};